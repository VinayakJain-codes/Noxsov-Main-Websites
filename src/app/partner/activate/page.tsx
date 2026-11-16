"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

export default function ActivatePartnerPage() {
  const router = useRouter();
  const invite = useRef<{ access_token: string; refresh_token: string } | null>(null);
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const access_token = fragment.get("access_token");
    const refresh_token = fragment.get("refresh_token");
    if (fragment.get("type") === "invite" && access_token && refresh_token) {
      invite.current = { access_token, refresh_token };
      window.history.replaceState(null, "", window.location.pathname);
    }
  }, []);

  async function activate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (password !== confirmation) {
      setError("The passwords must match.");
      return;
    }
    if (!invite.current) {
      setError("Open the link in your invitation email. Ask your administrator for help if the link has expired.");
      return;
    }
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
      setError("Partner activation is temporarily unavailable.");
      return;
    }

    setSaving(true);
    try {
      const client = createClient(url, key, {
        auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
      });
      const session = await client.auth.setSession(invite.current);
      if (session.error) {
        setError("This invitation has expired. Contact the administrator to restore access.");
        return;
      }
      const result = await client.auth.updateUser({ password });
      if (result.error) {
        setError(result.error.message);
        return;
      }
      invite.current = null;
      await client.auth.signOut({ scope: "local" });
      router.replace("/partner/login");
    } catch {
      setError("Unable to set your password. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  const inputClass = "w-full rounded-xl border border-slate-300 bg-transparent px-3 py-2 dark:border-slate-700";

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4 dark:bg-[#04060a]">
      <form onSubmit={activate} className="w-full max-w-md space-y-5 rounded-xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-[#070b14]">
        <h1 className="text-2xl font-bold">Set your partner password</h1>
        <label className="block space-y-1">
          <span>New password</span>
          <input className={inputClass} type="password" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" minLength={8} required />
        </label>
        <label className="block space-y-1">
          <span>Confirm password</span>
          <input className={inputClass} type="password" value={confirmation} onChange={(e) => setConfirmation(e.target.value)} autoComplete="new-password" minLength={8} required />
        </label>
        {error && <p role="alert" className="text-sm text-rose-600 dark:text-rose-400">{error}</p>}
        <button disabled={saving} className="w-full rounded-xl bg-cyan-400 px-4 py-2 font-semibold text-slate-950 disabled:opacity-50">
          {saving ? "Saving…" : "Set password"}
        </button>
        <Link href="/partner/login" className="text-sm underline">Return to sign-in</Link>
      </form>
    </main>
  );
}
