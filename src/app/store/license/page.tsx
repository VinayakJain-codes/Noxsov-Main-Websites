"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { BrandLogo } from "@/components/ui/BrandLogo";
import {
  KeyRound,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Search,
  Download,
  Building,
  Calendar,
  Lock,
  ArrowRight,
  Server,
  Loader2,
} from "lucide-react";
import { LicenseRecord } from "@/types/store";

function LicensePortalContent() {
  const searchParams = useSearchParams();
  const initialKey = searchParams.get("key") || "";

  const [inputKey, setInputKey] = useState(initialKey);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifiedData, setVerifiedData] = useState<{
    valid: boolean;
    license?: LicenseRecord;
    message: string;
    daysRemaining?: number;
  } | null>(null);

  useEffect(() => {
    if (initialKey) {
      handleVerify(initialKey);
    }
  }, [initialKey]);

  const handleVerify = async (keyToVerify?: string) => {
    const key = (keyToVerify || inputKey).trim().toUpperCase();
    if (!key) return;

    setIsVerifying(true);
    setVerifiedData(null);

    try {
      const res = await fetch(`/api/licenses/verify?key=${encodeURIComponent(key)}`);
      const data = await res.json();
      setVerifiedData(data);
    } catch {
      setVerifiedData({
        valid: false,
        message: "Failed to connect to NOXSOV Sovereign Licensing Authority.",
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleDownloadOfflineProof = () => {
    if (!verifiedData?.license) return;
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(verifiedData.license, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute(
      "download",
      `${verifiedData.license.licenseKey}-airgap-proof.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Search Input Box */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/[0.08] shadow-2xl space-y-4">
        <label className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-400 font-semibold block">
          Enter Sovereign License Key
        </label>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <KeyRound className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400 dark:text-neutral-500" />
            <input
              type="text"
              placeholder="e.g. NXV-KRYP-8F2A-4B19"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              className="w-full pl-10 pr-4 py-3 text-sm font-mono uppercase rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.03] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-neutral-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          <button
            type="button"
            disabled={isVerifying || !inputKey.trim()}
            onClick={() => handleVerify()}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-xs text-black bg-cyan-400 hover:bg-cyan-300 shadow-md shadow-cyan-500/20 active:scale-[0.98] transition-all disabled:opacity-50"
          >
            {isVerifying ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Auditing Signature...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Verify Entitlements</span>
              </>
            )}
          </button>
        </div>

        {/* Demo Keys Helper */}
        <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-slate-500 dark:text-neutral-400">
          <span>Quick Test Sample Keys:</span>
          <button
            type="button"
            onClick={() => {
              setInputKey("NXV-KRYP-DEMO-2026");
              handleVerify("NXV-KRYP-DEMO-2026");
            }}
            className="px-2.5 py-1 rounded-lg font-mono text-[11px] bg-slate-100 dark:bg-white/[0.04] text-cyan-700 dark:text-cyan-300 hover:bg-cyan-500/15 border border-slate-200 dark:border-white/[0.06] transition-colors"
          >
            Kryptik Demo: NXV-KRYP-DEMO-2026
          </button>
          <button
            type="button"
            onClick={() => {
              setInputKey("NXV-EVNT-DEMO-2026");
              handleVerify("NXV-EVNT-DEMO-2026");
            }}
            className="px-2.5 py-1 rounded-lg font-mono text-[11px] bg-slate-100 dark:bg-white/[0.04] text-indigo-700 dark:text-indigo-300 hover:bg-indigo-500/15 border border-slate-200 dark:border-white/[0.06] transition-colors"
          >
            Events Demo: NXV-EVNT-DEMO-2026
          </button>
        </div>
      </div>

      {/* Verification Results Panel */}
      {verifiedData && (
        <div
          className={`glass-panel rounded-3xl p-6 sm:p-8 border shadow-2xl space-y-6 ${
            verifiedData.valid
              ? "border-emerald-500/50 bg-emerald-500/[0.03]"
              : "border-red-500/50 bg-red-500/[0.03]"
          }`}
        >
          {/* Status Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/[0.08]">
            <div className="flex items-center gap-3.5">
              <BrandLogo size="md" clickable={false} showText={false} />
              <div
                className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                  verifiedData.valid
                    ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30"
                    : "bg-red-500/20 text-red-600 dark:text-red-400 border border-red-500/30"
                }`}
              >
                {verifiedData.valid ? (
                  <CheckCircle2 className="w-5 h-5" />
                ) : (
                  <AlertTriangle className="w-5 h-5" />
                )}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs font-mono font-bold uppercase px-2 py-0.5 rounded-full ${
                      verifiedData.valid
                        ? "bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30"
                        : "bg-red-500/20 text-red-700 dark:text-red-300 border border-red-500/30"
                    }`}
                  >
                    {verifiedData.valid ? "Cryptographically Valid" : "Verification Failed"}
                  </span>
                  {verifiedData.daysRemaining !== undefined && (
                    <span className="text-xs font-mono text-slate-500 dark:text-neutral-400">
                      {verifiedData.daysRemaining} days remaining in cycle
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                  {verifiedData.message}
                </h3>
              </div>
            </div>

            {verifiedData.valid && (
              <button
                type="button"
                onClick={handleDownloadOfflineProof}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white dark:bg-white/[0.08] hover:bg-slate-100 dark:hover:bg-white/[0.14] text-slate-900 dark:text-white border border-slate-200 dark:border-white/[0.1] transition-colors"
              >
                <Download className="w-4 h-4 text-cyan-500" />
                <span>Export Air-Gap Proof</span>
              </button>
            )}
          </div>

          {/* Details Grid */}
          {verifiedData.valid && verifiedData.license && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white/70 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] space-y-1">
                  <div className="text-[11px] font-mono text-slate-500 dark:text-neutral-400 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-cyan-500" />
                    <span>Licensed Organization</span>
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    {verifiedData.license.organizationName}
                  </div>
                  <div className="text-[11px] text-slate-400 dark:text-neutral-500 truncate">
                    {verifiedData.license.adminEmail}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/70 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] space-y-1">
                  <div className="text-[11px] font-mono text-slate-500 dark:text-neutral-400 flex items-center gap-1.5">
                    <Server className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Product & Entitlement Tier</span>
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    {verifiedData.license.productName}
                  </div>
                  <div className="text-[11px] text-cyan-600 dark:text-cyan-400 font-semibold">
                    {verifiedData.license.tierName}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white/70 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] space-y-1">
                  <div className="text-[11px] font-mono text-slate-500 dark:text-neutral-400 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-amber-500" />
                    <span>Validity & Node Quota</span>
                  </div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    {verifiedData.license.maxNodes}
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-neutral-400">
                    Expires: {new Date(verifiedData.license.expiresAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Cryptographic Signature Box */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-cyan-500/30 text-xs font-mono space-y-2">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="flex items-center gap-1.5 text-cyan-400">
                    <Lock className="w-3.5 h-3.5" />
                    <span>Sovereign Enclave Digital Signature</span>
                  </span>
                  <span>Topology: {verifiedData.license.deploymentType}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-black/60 text-slate-300 break-all select-all border border-white/[0.06]">
                  {verifiedData.license.digitalSignature}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Back to Store Footer */}
      <div className="text-center pt-4">
        <Link
          href="/store"
          className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
        >
          <span>Return to NOXSOV Software Store</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}

export default function LicensePortalPage() {
  return (
    <main className="flex-1 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="flex justify-center pb-1">
            <BrandLogo size="lg" showTagline={true} />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Sovereign Licensing Authority</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            License Verification Portal
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-neutral-300 leading-relaxed">
            Audit cryptographic license status, seat quotas, and deployment entitlements. All keys are verifiable offline in sovereign data centers and air-gapped enclaves.
          </p>
        </div>

        <Suspense
          fallback={
            <div className="py-20 text-center text-xs font-mono text-slate-500">
              Loading License Authority Engine...
            </div>
          }
        >
          <LicensePortalContent />
        </Suspense>
      </div>
    </main>
  );
}
