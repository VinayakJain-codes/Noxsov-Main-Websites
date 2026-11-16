import { NextRequest, NextResponse } from "next/server";
import { checkDuplicateCustomer } from "@/lib/referral/db";
import { requireSession, portalErrorResponse } from "@/lib/referral/session";
import { field, portalBody } from "@/lib/referral/validation";

export async function POST(req: NextRequest) {
  try {
    await requireSession("partner");
    const body = await portalBody(req);
    const phone = field(body.phone, "Phone", 40) ?? "";
    const email = field(body.email, "Email", 254) ?? "";
    return NextResponse.json({ success: true, isDuplicate: await checkDuplicateCustomer(phone, email) });
  } catch (error) {
    return portalErrorResponse(error);
  }
}
