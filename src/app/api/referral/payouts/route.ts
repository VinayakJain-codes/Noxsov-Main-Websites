import { NextRequest, NextResponse } from "next/server";
import { getCommissionLedger, getPayouts, recordPartnerPayout } from "@/lib/referral/db";
import { PortalError, requireSession, portalErrorResponse } from "@/lib/referral/session";
import { readAmount } from "@/lib/referral/terms";
import { dateTime, field, portalBody } from "@/lib/referral/validation";

export async function GET(req: NextRequest) {
  try {
    const actor = await requireSession();
    const partnerId = actor.role === "partner" ? actor.id : req.nextUrl.searchParams.get("partnerId") || undefined;
    const payouts = await getPayouts(partnerId);
    const ledger = req.nextUrl.searchParams.get("includeLedger") === "true" ? await getCommissionLedger(partnerId) : undefined;
    return NextResponse.json({ success: true, count: payouts.length, payouts, ledger });
  } catch (error) {
    return portalErrorResponse(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const actor = await requireSession("admin");
    const body = await portalBody(req);
    const method = body.paymentMethod;
    if (method !== "bank_transfer" && method !== "upi" && method !== "cheque") {
      throw new PortalError("Select a valid payout method.");
    }
    const payout = await recordPartnerPayout({
      partnerId: field(body.partnerId, "Partner", 120, true),
      referralId: field(body.referralId, "Referral", 120) || null,
      amount: readAmount(body.amount, "Payout amount"),
      paymentMethod: method,
      transactionReference: field(body.transactionReference, "Transaction reference", 200, true),
      paidAt: dateTime(body.paidAt, "Payout date"),
      note: field(body.note, "Payout note", 5000),
      actorName: actor.name,
    });
    return NextResponse.json({ success: true, message: "Payout recorded.", payout }, { status: 201 });
  } catch (error) {
    return portalErrorResponse(error);
  }
}
