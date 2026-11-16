"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { ShieldAlert, ArrowRight, Lock, KeyRound, Database } from "lucide-react";

import { safePortalRedirect } from "@/lib/referral/redirect";

function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = safePortalRedirect(searchParams.get("redirect"), "admin");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/referral/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          password,
          role: "admin",
        }),
      });

      const data = await res.json();
      if (data.success && data.authenticated) {
        router.replace(redirectTarget);
      } else {
        setErrorMsg(data.error || "Administrator authorization denied.");
      }
    } catch (err) {
      console.error("Admin login error:", err);
      setErrorMsg("Failed to connect to sovereign administration authority.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070a12] text-neutral-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background glow effects */}
      
      

      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-4 relative z-10">
        <div className="flex items-center justify-between max-w-md mx-auto mb-4">
          <BrandLogo size="lg" showTagline={false} />
          <ThemeToggle />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
          <ShieldAlert className="w-3.5 h-3.5 text-indigo-400" />
          <span>Administrator access</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
          Admin sign-in
        </h1>
        <p className="text-xs sm:text-sm text-neutral-400">
          Authorize commercial proposals, manage commission settlement ledgers, and disburse partner payouts.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="rounded-xl border border-white/[0.08] bg-[#0c101a]/90 backdrop-blur-2xl p-8 shadow-sm shadow-black/80 space-y-6">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5 font-mono">
                Administrator Identifier / Email
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-3.5 text-neutral-500" />
                <input
                  type="email"
                  autoComplete="username"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@noxsov.com"
                  className="w-full pl-10 pr-3 py-3 text-sm rounded-xl border border-white/[0.1] bg-white/[0.04] text-white focus:outline-none focus:border-indigo-500 transition-colors font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-300 mb-1.5 font-mono">
                Passcode / Sovereign Key
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-3.5 top-3.5 text-neutral-500" />
                <input
                  type="password"
                  autoComplete="current-password"
                  required
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 text-sm rounded-xl border border-white/[0.1] bg-white/[0.04] text-white focus:outline-none focus:border-indigo-500 transition-colors font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 shadow-sm  transition-all font-mono"
            >
              <span>{loading ? "Authenticating Authority..." : "Authorize Admin Session"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-white/[0.06] text-center space-y-3">
            <div className="text-xs text-neutral-500 flex items-center justify-center gap-1.5 font-mono">
              <Database className="w-3 h-3 text-emerald-400" />
              <span>Gated against Supabase PostgreSQL RLS</span>
            </div>

            <div>
              <Link
                href="/partner/login"
                className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-mono"
              >
                ← Return to Referral Partner Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#070a12] flex items-center justify-center text-white font-mono text-xs">
          Loading Administrator Console...
        </div>
      }
    >
      <AdminLoginForm />
    </Suspense>
  );
}

