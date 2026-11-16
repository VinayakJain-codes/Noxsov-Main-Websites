import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { createAuthClient, createReferralClient } from "@/lib/supabase";
import type { PartnerUser } from "@/types/referral";

export const REFERRAL_SESSION_COOKIE = "noxsov_referral_access";

export class PortalError extends Error {
  constructor(message: string, readonly status = 400) {
    super(message);
  }
}

export function portalErrorResponse(error: unknown) {
  if (error instanceof PortalError) {
    return NextResponse.json({ success: false, error: error.message }, { status: error.status });
  }
  console.error("Referral portal request failed", error);
  return NextResponse.json(
    { success: false, error: "The referral portal is temporarily unavailable. Please try again." },
    { status: 503 }
  );
}

export async function getPortalAccount(authId: string): Promise<PartnerUser | null> {
  const { data, error } = await createReferralClient()
    .from("referral_users")
    .select("id,name,email,role,status,created_at")
    .eq("auth_user_id", authId)
    .eq("status", "active")
    .in("role", ["admin", "partner"])
    .maybeSingle();
  if (error) throw error;
  if (!data) return null;
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    role: data.role,
    status: data.status,
    createdAt: data.created_at,
  };
}

export async function getServerSession(): Promise<PartnerUser | null> {
  const token = (await cookies()).get(REFERRAL_SESSION_COOKIE)?.value;
  if (!token) return null;

  const { data, error } = await createAuthClient().auth.getUser(token);
  if (error && (!error.status || error.status >= 500)) throw error;
  return data.user ? getPortalAccount(data.user.id) : null;
}

export async function requireSession(role?: "partner" | "admin") {
  const user = await getServerSession();
  if (!user) throw new PortalError("Sign in to access the referral portal.", 401);
  if (role && user.role !== role) throw new PortalError("You do not have access to this action.", 403);
  return user;
}
