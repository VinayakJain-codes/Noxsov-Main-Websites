import { portalBody } from "@/lib/referral/validation";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getPortalAccount, getServerSession, PortalError, portalErrorResponse, REFERRAL_SESSION_COOKIE } from "@/lib/referral/session";
import { getAdminSummary, getPartnerSummary, getPartnerById } from "@/lib/referral/db";
import { createAuthClient } from "@/lib/supabase";

export async function GET(req: NextRequest) {
  try {
    const user = await getServerSession();
    if (!user) return NextResponse.json({ success: true, authenticated: false, user: null });
    const view = req.nextUrl.searchParams.get("view");
    if (view === "summary") {
      const summary = user.role === "admin" ? await getAdminSummary() : await getPartnerSummary(user.id);
      return NextResponse.json({ success: true, authenticated: true, user, summary });
    }
    if (view === "profile" && user.role === "partner") {
      const account = await getPartnerById(user.id);
      return NextResponse.json({ success: true, authenticated: true, user, profile: account?.profile ?? null });
    }
    return NextResponse.json({ success: true, authenticated: true, user });
  } catch (error) {
    return portalErrorResponse(error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { email, password, role } = await portalBody(req);
    if (typeof email !== "string" || !email.trim() || typeof password !== "string" || !password ||
        (role !== "admin" && role !== "partner")) {
      throw new PortalError("Enter your email and password.");
    }

    const { data, error } = await createAuthClient().auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });
    if (error && (!error.status || error.status >= 500)) throw error;
    const user = data.user ? await getPortalAccount(data.user.id) : null;
    if (!data.session || user?.role !== role) {
      throw new PortalError("Invalid credentials or inactive portal account.", 401);
    }

    const cookieStore = await cookies();
    cookieStore.set(REFERRAL_SESSION_COOKIE, data.session.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: data.session.expires_in,
    });
    return NextResponse.json({ success: true, authenticated: true, user });
  } catch (error) {
    return portalErrorResponse(error);
  }
}

export async function DELETE() {
  (await cookies()).delete(REFERRAL_SESSION_COOKIE);
  return NextResponse.json({ success: true, authenticated: false });
}
