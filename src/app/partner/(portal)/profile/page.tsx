"use client";

import { useState, useEffect } from "react";
import { PartnerHeader } from "@/components/referral/PartnerHeader";
import { PartnerProfile, PartnerUser } from "@/types/referral";
import {
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Save,
  AlertCircle,
} from "lucide-react";

export default function PartnerProfilePage() {
  const [user, setUser] = useState<PartnerUser | null>(null);
  const [profile, setProfile] = useState<PartnerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");

  // Editable Form fields
  const [companyName, setCompanyName] = useState("");
  const [phone, setPhone] = useState("");
  const [method, setMethod] = useState<"bank_transfer" | "upi">("bank_transfer");
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankAccountNumber, setBankAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [bankIfsc, setBankIfsc] = useState("");
  const [upiId, setUpiId] = useState("");

  const loadProfile = async () => {
    try {
      const sessionRes = await fetch("/api/referral/session?view=profile");
      const sessionData = await sessionRes.json();
      if (sessionData.success && sessionData.user) {
        setUser(sessionData.user);
        if (sessionData.profile) {
          const prof = sessionData.profile as PartnerProfile;
          setProfile(prof);
          setCompanyName(prof.companyName || "");
          setPhone(prof.phone || "");
          setMethod(prof.payoutDetails?.method || "bank_transfer");
          setBankAccountName(prof.payoutDetails?.bankAccountName || "");
          setBankAccountNumber(prof.payoutDetails?.bankAccountNumber || "");
          setBankName(prof.payoutDetails?.bankName || "");
          setBankIfsc(prof.payoutDetails?.bankIfsc || "");
          setUpiId(prof.payoutDetails?.upiId || "");
        }
      } else {
        setErrMsg(sessionData.error || "Unable to load your profile.");
      }
    } catch {
      setErrMsg("Unable to load your profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (active) void loadProfile();
    });
    return () => { active = false; };
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setSuccessMsg("");
    setErrMsg("");

    try {
      const res = await fetch("/api/referral/partners", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          profileUpdates: {
            companyName,
            phone,
            payoutDetails: {
              method,
              bankAccountName,
              bankAccountNumber,
              bankName,
              bankIfsc,
              upiId,
            },
          },
        }),
      });

      const data = await res.json();
      if (data.success) {
        setProfile(data.data?.profile ?? null);
        setSuccessMsg("Payout and profile details saved successfully.");
      } else {
        setErrMsg(data.error || "Failed to update profile");
      }
    } catch {
      setErrMsg("Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#04060a] text-slate-800 dark:text-neutral-200">
      <PartnerHeader />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Partner Profile & Payout Settlement
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 mt-1">
            Manage your partner organization credentials, banking coordinates, and operating agreement status.
          </p>
        </div>

        {successMsg && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 text-sm flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>{successMsg}</span>
          </div>
        )}

        {errMsg && (
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-400 text-sm flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <span>{errMsg}</span>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6">
          {/* Identity & Accreditation Card */}
          <div className="rounded-xl surface-panel border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] p-6 space-y-5 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-white/[0.06]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-500" />
                <h2 className="text-sm font-bold font-medium text-slate-900 dark:text-white">
                  Partner Credentials
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs tabular-nums text-slate-400">Partner Code:</span>
                <span className="text-xs tabular-nums font-bold px-2.5 py-1 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                  {profile?.partnerCode ?? "Unavailable"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1">
                  Full Name
                </label>
                <div className="p-2.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-white/[0.02] text-sm text-slate-700 dark:text-neutral-300">
                  {user?.name ?? "—"}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1">
                  Registered Email Address
                </label>
                <div className="p-2.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-white/[0.02] text-sm text-slate-700 dark:text-neutral-300">
                  {user?.email ?? "—"}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1">
                  Company / Agency Name
                </label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full p-2.5 text-sm rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.04] text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1">
                  Contact Phone Number
                </label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 text-sm rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.04] text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>

          {/* Banking / UPI Payout Details Card */}
          <div className="rounded-xl surface-panel border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] p-6 space-y-5 shadow-sm">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-white/[0.06]">
              <CreditCard className="w-5 h-5 text-emerald-500" />
              <div>
                <h2 className="text-sm font-bold font-medium text-slate-900 dark:text-white">
                  Banking & Commission Payout Coordinates
                </h2>
                <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
                  Used by NOXSOV finance operations to disburse earned commissions.
                </p>
              </div>
            </div>

            {/* Method Toggle */}
            <div className="flex items-center gap-3">
              <label className="text-xs font-semibold text-slate-700 dark:text-neutral-300">
                Disbursement Channel:
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMethod("bank_transfer")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                    method === "bank_transfer"
                      ? "border-cyan-500 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-semibold"
                      : "border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-neutral-400"
                  }`}
                >
                  Bank Transfer (NEFT / RTGS)
                </button>

                <button
                  type="button"
                  onClick={() => setMethod("upi")}
                  className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                    method === "upi"
                      ? "border-cyan-500 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-semibold"
                      : "border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-neutral-400"
                  }`}
                >
                  UPI VPA Settlement
                </button>
              </div>
            </div>

            {method === "bank_transfer" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1">
                    Beneficiary Account Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Acme Cyber Advisory Pvt Ltd"
                    value={bankAccountName}
                    onChange={(e) => setBankAccountName(e.target.value)}
                    className="w-full p-2.5 text-sm rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.04]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. HDFC Bank Ltd"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    className="w-full p-2.5 text-sm rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.04]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1">
                    Account Number
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 91802004819201"
                    value={bankAccountNumber}
                    onChange={(e) => setBankAccountNumber(e.target.value)}
                    className="w-full p-2.5 text-sm tabular-nums rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.04]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1">
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. HDFC0001024"
                    value={bankIfsc}
                    onChange={(e) => setBankIfsc(e.target.value.toUpperCase())}
                    className="w-full p-2.5 text-sm tabular-nums uppercase rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.04]"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1">
                    UPI ID / Virtual Payment Address (VPA)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. vikram@okhdfcbank"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    className="w-full p-2.5 text-sm tabular-nums rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.04]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1">
                    Account Holder Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Account Holder Name"
                    value={bankAccountName}
                    onChange={(e) => setBankAccountName(e.target.value)}
                    className="w-full p-2.5 text-sm rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.04]"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Operating Agreement Status */}
          <div className="p-5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-100/50 dark:bg-white/[0.01] flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {profile?.termsAcceptedAt ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <AlertCircle className="w-5 h-5 text-slate-500" />}
              <div>
                <div className="text-sm font-semibold text-slate-900 dark:text-white">
                  NOXSOV Partner Operating & Commission Agreement
                </div>
                <div className="text-xs text-slate-500 tabular-nums mt-0.5">
                  {profile?.termsAcceptedAt ? `Accepted on ${new Date(profile.termsAcceptedAt).toLocaleDateString("en-IN")}` : "Acceptance date unavailable"}
                </div>
              </div>
            </div>

          </div>

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={saving || loading || !user}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-black bg-cyan-400 hover:bg-cyan-300 shadow-sm  transition-colors disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? "Saving Coordinates..." : "Save Payout Coordinates"}</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
