import { NextRequest, NextResponse } from "next/server";
import { recordCustomerPayment } from "@/lib/referral/db";
import { PortalError, requireSession, portalErrorResponse } from "@/lib/referral/session";
import { readAmount } from "@/lib/referral/terms";
import { dateTime, field, portalBody } from "@/lib/referral/validation";

export async function POST(req: NextRequest) {
  try {
    const actor = await requireSession("admin");
    const body = await portalBody(req);
    if (body.verified !== true) throw new PortalError("Confirm that the qualifying payment has been verified.");
    const result = await recordCustomerPayment({
      referralId: field(body.referralId, "Referral", 120, true),
      amountReceived: readAmount(body.amountReceived, "Qualifying payment amount"),
      paymentReference: field(body.paymentReference, "Payment reference", 200, true),
      receivedAt: dateTime(body.receivedAt, "Payment date"),
      actorName: actor.name,
    });
    return NextResponse.json({ success: true, message: "Verified payment recorded.", ...result }, { status: 201 });
  } catch (error) {
    return portalErrorResponse(error);
  }
}
