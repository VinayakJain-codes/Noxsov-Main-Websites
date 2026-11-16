import { NextRequest, NextResponse } from "next/server";
import {
  changeReferral, getReferralById, getPaymentsByReferral, getCommissionLedger, getActivities, publicReferral,
} from "@/lib/referral/db";
import { PortalError, portalErrorResponse, requireSession } from "@/lib/referral/session";
import { calculateIndicativeCommission } from "@/lib/referral/money";
import { readCommercialTerms } from "@/lib/referral/terms";
import { field, objectFields, portalBody } from "@/lib/referral/validation";
import { activeStatuses, editableStatuses, nextDealStatuses, reviewStatuses } from "@/lib/referral/workflow";
import type { DealStatus } from "@/types/referral";

type Context = { params: Promise<{ id: string }> };

async function accessReferral(context: Context) {
  const actor = await requireSession();
  const { id } = await context.params;
  const referral = await getReferralById(id, actor.role === "partner" ? actor.id : undefined);
  if (!referral) throw new PortalError("Referral not found.", 404);
  return { actor, referral };
}

export async function GET(_req: NextRequest, context: Context) {
  try {
    const { actor, referral } = await accessReferral(context);
    const [payments, ledger, activities] = await Promise.all([
      getPaymentsByReferral(referral.id),
      getCommissionLedger(referral.partnerId, referral.id),
      getActivities(referral.id),
    ]);
    const visibleActivities = actor.role === "admin" ? activities : activities.map((activity) =>
      activity.action === "Deal Status Changed" || activity.action.includes("→") ||
      activity.action === "Customer Payment Recorded"
        ? { ...activity, note: undefined }
        : activity
    );
    return NextResponse.json({
      success: true,
      referral: publicReferral(referral, actor),
      payments,
      ledger,
      activities: visibleActivities,
    });
  } catch (error) {
    return portalErrorResponse(error);
  }
}

export async function PATCH(req: NextRequest, context: Context) {
  try {
    const { actor, referral } = await accessReferral(context);
    const body = await portalBody(req);
    const { action } = body;

    if (action === "update_details") {
      if (!editableStatuses.includes(referral.dealStatus)) {
        throw new PortalError("This referral is closed for proposal edits.", 409);
      }
      const updates = objectFields(body.updates);
      const terms = readCommercialTerms(
        updates.proposedQuoteAmount ?? referral.proposedQuoteAmount,
        updates.proposedCommissionType ?? referral.proposedCommissionType,
        updates.proposedCommissionValue ?? referral.proposedCommissionValue,
      );
      const updated = await changeReferral(referral, {
        proposed_quote_amount: terms.amount,
        proposed_commission_type: terms.type,
        proposed_commission_value: terms.commission,
        proposed_indicative_commission: calculateIndicativeCommission(terms.amount, terms.type, terms.commission),
        pricing_notes: field(updates.pricingNotes, "Pricing notes", 5000),
        deal_status: "pending_review",
      }, actor, "Proposal Resubmitted",
      `Previous proposal: ${referral.currency} ${referral.proposedQuoteAmount}, ${referral.proposedCommissionValue} (${referral.proposedCommissionType}).`);
      return NextResponse.json({ success: true, referral: publicReferral(updated, actor) });
    }

    if (actor.role !== "admin") throw new PortalError("Only administrators can review referrals.", 403);

    if (action === "approve") {
      if (!reviewStatuses.includes(referral.dealStatus)) throw new PortalError("Only referrals in review can be approved.", 409);
      const terms = readCommercialTerms(body.approvedQuoteAmount, body.approvedCommissionType, body.approvedCommissionValue);
      const updated = await changeReferral(referral, {
        approved_quote_amount: terms.amount,
        approved_commission_type: terms.type,
        approved_commission_value: terms.commission,
        approved_indicative_commission: calculateIndicativeCommission(terms.amount, terms.type, terms.commission),
        internal_admin_notes: field(body.internalAdminNotes, "Internal notes", 5000),
        customer_facing_notes: field(body.customerFacingNotes, "Partner notes", 5000) ?? "",
        assigned_sales_owner: field(body.assignedSalesOwner, "Sales owner", 200),
        deal_status: "approved",
        commission_status: "not_eligible",
        approved_at: new Date().toISOString(),
      }, actor, "Commercial Terms Approved");
      return NextResponse.json({ success: true, referral: updated });
    }

    if (action === "request_changes" || action === "reject") {
      if (!reviewStatuses.includes(referral.dealStatus)) throw new PortalError("This referral is outside the review workflow.", 409);
      const reason = field(body.reason, "Reason", 5000, true);
      const updated = await changeReferral(referral, {
        deal_status: action === "reject" ? "rejected" : "changes_requested",
        commission_status: "not_eligible",
        customer_facing_notes: reason,
      }, actor, action === "reject" ? "Referral Rejected" : "Changes Requested", reason);
      return NextResponse.json({ success: true, referral: updated });
    }

    if (action === "update_deal_status") {
      const status = body.status as DealStatus;
      const allowed = nextDealStatuses(referral.dealStatus);
      if (!allowed.includes(status) ||
          (activeStatuses.includes(referral.dealStatus) && referral.approvedQuoteAmount == null)) {
        throw new PortalError("That deal status change is unavailable.", 409);
      }
      const updated = await changeReferral(referral, {
        deal_status: status,
        commission_status: status === "won" && (referral.approvedCommissionValue ?? 0) > 0 ? "pending" : "not_eligible",
      }, actor, `Deal Status Changed (${referral.dealStatus} → ${status})`, field(body.note, "Note", 5000));
      return NextResponse.json({ success: true, referral: updated });
    }

    throw new PortalError("Select a valid referral action.");
  } catch (error) {
    return portalErrorResponse(error);
  }
}
