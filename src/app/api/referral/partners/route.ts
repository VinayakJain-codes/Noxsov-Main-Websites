import { NextRequest, NextResponse } from "next/server";
import { getPartnersWithSummaries, getPartnerById, createPartner, updatePartnerProfile, updatePartnerStatus, getPartnerSummary } from "@/lib/referral/db";
import { PortalError, requireSession, portalErrorResponse } from "@/lib/referral/session";
import { emailAddress, field, objectFields, portalBody } from "@/lib/referral/validation";
import type { PartnerPayoutDetails } from "@/types/referral";

export async function GET(req: NextRequest) {
  try {
    await requireSession("admin");
    const id = req.nextUrl.searchParams.get("id");
    if (id) {
      const data = await getPartnerById(id);
      if (!data) throw new PortalError("Partner not found.", 404);
      return NextResponse.json({ success: true, ...data, summary: await getPartnerSummary(id) });
    }
    const enriched = (await getPartnersWithSummaries()).map((summary) => ({
      partner: summary.partner, profile: summary.profile, summary,
    }));
    return NextResponse.json({ success: true, count: enriched.length, partners: enriched });
  } catch (error) {
    return portalErrorResponse(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireSession("admin");
    const body = await portalBody(req);
    if (body.password !== undefined && (typeof body.password !== "string" || body.password.length < 10 || body.password.length > 128)) {
      throw new PortalError("Password must contain between 10 and 128 characters.");
    }
    await createPartner({
      password: body.password as string | undefined,
      name: field(body.name, "Partner name", 200, true),
      email: emailAddress(body.email),
      phone: field(body.phone, "Phone", 40, true),
      companyName: field(body.companyName, "Company name", 200, true),
    });
    return NextResponse.json({ success: true, message: body.password ? "Partner account created. They can sign in with their email and password." : "Partner invitation sent." }, { status: 201 });
  } catch (error) {
    return portalErrorResponse(error);
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const actor = await requireSession();
    const { userId, status, profileUpdates } = await portalBody(req);
    const id = field(userId, "Partner", 120, true);
    if (actor.role !== "admin" && (actor.id !== id || status !== undefined)) {
      throw new PortalError("You can only edit your own profile.", 403);
    }
    if (status !== undefined) {
      if (profileUpdates || (status !== "active" && status !== "suspended")) {
        throw new PortalError("Select a valid account status.");
      }
      await updatePartnerStatus(id, status);
    } else {
      const profile = objectFields(profileUpdates);
      const details = objectFields(profile.payoutDetails);
      if (details?.method !== "bank_transfer" && details?.method !== "upi") throw new PortalError("Select a payout method.");
      const payoutDetails: PartnerPayoutDetails = details.method === "upi"
        ? { method: "upi", upiId: field(details.upiId, "UPI ID", 200) }
        : {
            method: "bank_transfer",
            bankAccountName: field(details.bankAccountName, "Account holder", 200),
            bankAccountNumber: field(details.bankAccountNumber, "Account number", 50),
            bankName: field(details.bankName, "Bank name", 200),
            bankIfsc: field(details.bankIfsc, "IFSC", 20)?.toUpperCase(),
          };
      await updatePartnerProfile(id, {
        companyName: field(profile.companyName, "Company name", 200, true),
        phone: field(profile.phone, "Phone", 40, true),
        payoutDetails,
      });
    }
    return NextResponse.json({ success: true, data: await getPartnerById(id) });
  } catch (error) {
    return portalErrorResponse(error);
  }
}
