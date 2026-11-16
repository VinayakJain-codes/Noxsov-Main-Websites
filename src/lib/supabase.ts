import { createClient } from "@supabase/supabase-js";

export function createReferralClient() {
  return referralClient("SUPABASE_SERVICE_ROLE_KEY");
}

export function createAuthClient() {
  return referralClient("NEXT_PUBLIC_SUPABASE_ANON_KEY");
}

function referralClient(keyName: "SUPABASE_SERVICE_ROLE_KEY" | "NEXT_PUBLIC_SUPABASE_ANON_KEY") {
  const { NEXT_PUBLIC_SUPABASE_URL: url } = process.env;
  const key = process.env[keyName];
  if (!url || !key) {
    throw new Error("The referral portal database is not configured.");
  }

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });
}
