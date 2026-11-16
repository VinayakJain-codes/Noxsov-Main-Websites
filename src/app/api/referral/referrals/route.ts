import { NextRequest, NextResponse } from "next/server";
import { getReferrals, createReferral, publicReferral } from "@/lib/referral/db";
import { requireSession, PortalError, portalErrorResponse } from "@/lib/referral/session";
import { readCommercialTerms } from "@/lib/referral/terms";
import { emailAddress, field, portalBody } from "@/lib/referral/validation";

export async function GET(req: NextRequest) {
  try {
    const actor = await requireSession();
    const { searchParams } = req.nextUrl;
    const referrals = (await getReferrals({
      partnerId: actor.role === "partner" ? actor.id : searchParams.get("partnerId") || undefined,
      dealStatus: searchParams.get("dealStatus") || undefined,
      search: searchParams.get("search") || undefined,
    })).map((referral) => publicReferral(referral, actor));
    return NextResponse.json({ success: true, count: referrals.length, referrals });
  } catch (error) {
    return portalErrorResponse(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const actor = await requireSession("partner");
    const body = await portalBody(req);
    const { referralType } = body;
    if (referralType !== "catalogue" && referralType !== "custom") throw new PortalError("Select a referral type.");
    const terms = readCommercialTerms(body.proposedQuoteAmount, body.proposedCommissionType, body.proposedCommissionValue);
    const phone = field(body.customerPhone, "Customer phone", 40, true);
    if (phone.replace(/\D/g, "").length < 8) throw new PortalError("Enter a valid customer phone number.");
    const referral = await createReferral({
      customerName: field(body.customerName, "Customer name", 200, true),
      customerPhone: phone,
      customerEmail: emailAddress(body.customerEmail),
      companyName: field(body.companyName, "Company name", 200),
      city: field(body.city, "City", 200),
      customerNotes: field(body.customerNotes, "Customer notes", 5000),
      referralType,
      productId: referralType === "catalogue" ? field(body.productId, "Catalogue product", 120, true) : undefined,
      customProjectTitle: referralType === "custom" ? field(body.customProjectTitle, "Project title", 200, true) : undefined,
      customProjectDescription: referralType === "custom" ? field(body.customProjectDescription, "Project description", 5000, true) : undefined,
      expectedTimeline: field(body.expectedTimeline, "Expected timeline", 300),
      pricingNotes: field(body.pricingNotes, "Pricing notes", 5000),
      proposedQuoteAmount: terms.amount,
      proposedCommissionType: terms.type,
      proposedCommissionValue: terms.commission,
    }, actor);
    return NextResponse.json({
      success: true, message: "Referral submitted for review.", referral: publicReferral(referral, actor),
    }, { status: 201 });
  } catch (error) {
    return portalErrorResponse(error);
  }
}
