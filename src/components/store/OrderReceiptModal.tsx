"use client";

import { useState } from "react";
import Link from "next/link";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { useCart } from "@/context/CartContext";
import {
  CheckCircle2,
  Copy,
  Check,
  Download,
  KeyRound,
  ExternalLink,
  ShieldCheck,
  X,
} from "lucide-react";

export function OrderReceiptModal() {
  const { activeOrderReceipt, setActiveOrderReceipt } = useCart();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!activeOrderReceipt) return null;

  const handleCopy = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleDownloadLicFile = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(activeOrderReceipt, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute(
      "download",
      `${activeOrderReceipt.orderId}-noxsov-license.json`
    );
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={() => setActiveOrderReceipt(null)}
        aria-hidden="true"
      />

      <div className="min-h-full flex items-center justify-center p-4 sm:p-6">
        <div className="relative w-full max-w-2xl bg-white dark:bg-[#070c16] rounded-3xl border border-emerald-500/40 shadow-2xl overflow-hidden text-left">
          {/* Header */}
          <div className="p-6 sm:p-8 bg-emerald-500/[0.08] border-b border-emerald-500/20 flex items-start justify-between">
            <div className="flex items-start gap-4">
              <BrandLogo size="md" clickable={false} showText={false} />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-bold border border-emerald-500/30">
                    Provisioning Successful
                  </span>
                  <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 font-semibold">
                    NOXSOV Certified
                  </span>
                </div>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Sovereign Licenses Issued
                </h3>
                <p className="text-xs text-slate-600 dark:text-neutral-400">
                  Order ID: <span className="font-mono text-cyan-600 dark:text-cyan-400 font-bold">{activeOrderReceipt.orderId}</span> • Organization: {activeOrderReceipt.customer.companyName}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveOrderReceipt(null)}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Licenses Section */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-cyan-500" />
                <span>Your Active License Keys</span>
              </h4>
              <p className="text-xs text-slate-500 dark:text-neutral-400">
                These keys are cryptographically signed for offline verification in air-gapped systems or private cloud enclaves.
              </p>
            </div>

            <div className="space-y-4">
              {activeOrderReceipt.licenses.map((lic, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white">
                        {lic.productName}
                      </div>
                      <div className="text-xs text-cyan-600 dark:text-cyan-400 font-mono">
                        {lic.tierName} • {lic.maxNodes}
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-semibold border border-emerald-500/30">
                      STATUS: {lic.status}
                    </span>
                  </div>

                  {/* Key Box */}
                  <div className="flex items-center justify-between gap-2 p-3 rounded-xl bg-slate-900 text-cyan-300 font-mono text-sm border border-cyan-500/30 select-all">
                    <span className="truncate">{lic.licenseKey}</span>
                    <button
                      type="button"
                      onClick={() => handleCopy(lic.licenseKey)}
                      className="px-2.5 py-1 text-xs rounded bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 flex items-center gap-1 transition-colors shrink-0"
                    >
                      {copiedKey === lic.licenseKey ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400 font-semibold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Key Metadata */}
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-500 dark:text-neutral-400 font-mono">
                    <div>Expires: {new Date(lic.expiresAt).toLocaleDateString()}</div>
                    <div className="truncate">Sig: {lic.digitalSignature.slice(0, 18)}...</div>
                  </div>

                  {/* Quick verify button */}
                  <div className="pt-1 flex items-center gap-2">
                    <Link
                      href={`/store/license?key=${encodeURIComponent(lic.licenseKey)}`}
                      onClick={() => setActiveOrderReceipt(null)}
                      className="text-xs text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
                    >
                      <span>Verify in Sovereign Licensing Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Financial Summary */}
            <div className="p-4 rounded-xl bg-slate-100 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] flex items-center justify-between text-xs font-mono">
              <span className="text-slate-600 dark:text-neutral-400">Total Billed ({activeOrderReceipt.currency})</span>
              <span className="text-base font-bold text-slate-900 dark:text-white">
                ₹{activeOrderReceipt.total.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="p-6 bg-slate-50/80 dark:bg-white/[0.02] border-t border-slate-200 dark:border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleDownloadLicFile}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-slate-200 hover:bg-slate-300 dark:bg-white/[0.08] dark:hover:bg-white/[0.14] text-slate-900 dark:text-white transition-colors"
            >
              <Download className="w-4 h-4 text-cyan-500" />
              <span>Download Signed License (.json)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveOrderReceipt(null)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-xs font-semibold bg-cyan-400 hover:bg-cyan-300 text-black shadow-md shadow-cyan-500/20 transition-colors"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Done & Continue Browsing Store</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
