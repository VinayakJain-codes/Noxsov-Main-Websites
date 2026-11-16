"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { ArrowRight, Lock, ShieldCheck } from "lucide-react";
import { safePortalRedirect } from "@/lib/referral/redirect";

function PartnerLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = safePortalRedirect(searchParams.get("redirect"), "partner");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/referral/session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), password, role: "partner" }),
      });

      const data = await res.json();
      if (data.success && data.authenticated) {
        router.replace(redirectTarget);
      } else {
        setErrorMsg(data.error || "Unable to sign in.");
      }
    } catch {
      setErrorMsg("Database authentication service unreachable.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#04060a] text-slate-800 dark:text-neutral-200 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center space-y-4">
        <div className="flex items-center justify-between max-w-md mx-auto mb-2">
          <BrandLogo size="lg" showTagline={false} />
          <ThemeToggle />
        </div>

        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 mb-2 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Partner access</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Referral Partner Portal
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 mt-1">
            Submit enterprise client opportunities & track verified commission disbursements.
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="rounded-xl border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-[#070b14]/90 backdrop-blur-2xl p-8 shadow-sm space-y-6">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-medium">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSignIn} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1.5 font-mono">
                Registered Partner Email
              </label>
              <input
                type="email"
                autoComplete="username"
                required
                placeholder="partner@youragency.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 text-sm rounded-xl border border-slate-200 dark:border-white/[0.1] bg-slate-50/50 dark:bg-white/[0.04] text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1.5 font-mono">
                Password
              </label>
              <input
                type="password"
                required
                autoComplete="current-password"
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 text-sm rounded-xl border border-slate-200 dark:border-white/[0.1] bg-slate-50/50 dark:bg-white/[0.04] text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold text-black bg-cyan-400 hover:bg-cyan-300 shadow-sm  transition-all font-mono"
            >
              <span>{loading ? "Authenticating..." : "Sign In to Partner Portal"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-xs text-slate-600 dark:text-neutral-400">New partners can set their password using the invitation email.</p>

          <div className="pt-2 border-t border-slate-200 dark:border-white/[0.06] flex items-center justify-between text-xs font-mono">
            <Link
              href="/"
              className="text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
            >
              ← Main Website
            </Link>

            <Link
              href="/admin/login"
              className="text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              <Lock className="w-3 h-3" />
              <span>Admin Console →</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PartnerLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-50 dark:bg-[#04060a] flex items-center justify-center text-slate-500 font-mono text-xs">
          Loading Partner Portal...
        </div>
      }
    >
      <PartnerLoginForm />
    </Suspense>
  );
}
