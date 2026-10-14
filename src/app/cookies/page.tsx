"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  getStoredConsent,
  recordConsent,
  withdrawAllConsent,
  ConsentAuditRecord,
  SUPPORT_EMAIL,
  DPDPA_POLICY_VERSION,
} from "@/lib/consentLog";
import {
  Cookie,
  ShieldCheck,
  CheckCircle2,
  Download,
  RotateCcw,
  Sliders,
  ExternalLink,
  FileText,
  Mail,
  Lock,
} from "lucide-react";

export default function CookiesPage() {
  const [record, setRecord] = useState<ConsentAuditRecord | null>(null);
  const [allLogs, setAllLogs] = useState<any[]>([]);
  const [isLoadingLogs, setIsLoadingLogs] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const refreshConsent = () => {
    const existing = getStoredConsent();
    setRecord(existing);
  };

  const fetchServerLogs = async () => {
    setIsLoadingLogs(true);
    try {
      const res = await fetch("/api/consent/log");
      const data = await res.json();
      if (data.success && Array.isArray(data.logs)) {
        setAllLogs(data.logs);
      }
    } catch {
      // Graceful fallback
    } finally {
      setIsLoadingLogs(false);
    }
  };

  useEffect(() => {
    refreshConsent();
    fetchServerLogs();
  }, []);

  const handleWithdraw = async () => {
    const updated = await withdrawAllConsent();
    setRecord(updated);
    setStatusMessage("Non-essential consent successfully withdrawn pursuant to DPDPA Section 6(4).");
    fetchServerLogs();
    setTimeout(() => setStatusMessage(""), 4000);
  };

  const handleDownloadProof = () => {
    if (!record) return;
    const dataStr =
      "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(record, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `${record.consentId}-dpdpa-consent-proof.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const triggerBannerModal = () => {
    window.dispatchEvent(new Event("open-cookie-preferences"));
  };

  return (
    <main className="flex-1 pt-32 pb-24">
      {/* Background ambient lighting */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-cyan-500/10 via-emerald-500/10 to-blue-500/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
            <Cookie className="w-3.5 h-3.5" />
            <span>DPDPA 2023 & DPIIT Compliance Framework</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Cookie Policy & Consent Audit Log
          </h1>

          <p className="text-base text-slate-600 dark:text-neutral-300 leading-relaxed">
            In compliance with India&apos;s Digital Personal Data Protection Act, 2023 (DPDPA) and DPIIT guidelines, NOXSOV maintains an immutable, verifiable record of consent. Non-essential categories are never pre-ticked by default.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-mono text-slate-500 dark:text-neutral-400">
            <span>Policy Version: <strong className="text-slate-800 dark:text-neutral-200">{DPDPA_POLICY_VERSION}</strong></span>
            <span>•</span>
            <span>Grievance Contact: <a href={`mailto:${SUPPORT_EMAIL}`} className="text-cyan-600 dark:text-cyan-400 underline">{SUPPORT_EMAIL}</a></span>
          </div>
        </div>

        {/* Live User Consent Management Box */}
        <section aria-labelledby="live-consent-heading" className="glass-panel rounded-3xl p-6 sm:p-10 border border-cyan-500/30 bg-gradient-to-br from-cyan-500/[0.04] to-transparent shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/[0.08]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 id="live-consent-heading" className="text-xl font-bold text-slate-900 dark:text-white">
                  Your Active Verifiable Consent Record
                </h2>
                <p className="text-xs text-slate-500 dark:text-neutral-400">
                  Maintained locally and logged on the server under DPDPA Section 6(7).
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={triggerBannerModal}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-400 hover:bg-cyan-300 text-black shadow-md shadow-cyan-500/20 transition-all"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Adjust Preferences</span>
              </button>

              <button
                type="button"
                onClick={handleWithdraw}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-neutral-300 bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.1] border border-slate-200 dark:border-white/[0.08] transition-colors"
                title="Revoke non-essential consent under DPDPA Section 6(4)"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-500" />
                <span>Withdraw Non-Essential</span>
              </button>
            </div>
          </div>

          {statusMessage && (
            <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-xs font-mono text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
              <span>{statusMessage}</span>
            </div>
          )}

          {record ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] space-y-1">
                <span className="text-[11px] font-mono text-slate-400 dark:text-neutral-500">
                  Consent Audit ID
                </span>
                <div className="text-sm font-bold font-mono text-cyan-600 dark:text-cyan-400">
                  {record.consentId}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] space-y-1">
                <span className="text-[11px] font-mono text-slate-400 dark:text-neutral-500">
                  Timestamp (UTC)
                </span>
                <div className="text-xs font-semibold text-slate-900 dark:text-white">
                  {new Date(record.timestamp).toLocaleString()}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] space-y-1">
                <span className="text-[11px] font-mono text-slate-400 dark:text-neutral-500">
                  Active Status
                </span>
                <div className="text-xs font-semibold capitalize flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${
                    record.status === "granted" || record.status === "customized"
                      ? "bg-emerald-500"
                      : "bg-amber-500"
                  }`} />
                  <span className="text-slate-900 dark:text-white font-mono">{record.status}</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-[11px] font-mono text-slate-400 dark:text-neutral-500">
                    Audit Certificate
                  </span>
                  <div className="text-xs font-semibold text-slate-900 dark:text-white">
                    JSON Evidence
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleDownloadProof}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.12] text-cyan-600 dark:text-cyan-400 border border-slate-200 dark:border-white/[0.1] transition-colors"
                  title="Download verifiable JSON consent proof"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-6 text-xs text-slate-500 dark:text-neutral-400 font-mono space-y-2">
              <p>No custom consent choice recorded yet. Defaulting to strictly essential security cookies only.</p>
              <button
                type="button"
                onClick={triggerBannerModal}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/20 transition-colors"
              >
                Open Consent Preferences
              </button>
            </div>
          )}
        </section>

        {/* Detailed Cookie Classifications Table */}
        <section aria-labelledby="cookies-breakdown-heading" className="space-y-6">
          <div className="space-y-2">
            <h2 id="cookies-breakdown-heading" className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Detailed Breakdown of Cookies Employed
            </h2>
            <p className="text-sm text-slate-600 dark:text-neutral-300">
              Pursuant to the principle of purpose limitation under the DPDPA, we itemize every client-side storage element used across the NOXSOV platform:
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-white/[0.08] shadow-sm">
            <table className="w-full text-left text-xs divide-y divide-slate-200 dark:divide-white/[0.08]">
              <thead className="bg-slate-50 dark:bg-white/[0.03] font-mono uppercase text-slate-500 dark:text-neutral-400">
                <tr>
                  <th className="px-4 py-3 font-semibold">Storage Key / Cookie</th>
                  <th className="px-4 py-3 font-semibold">Classification</th>
                  <th className="px-4 py-3 font-semibold">Lawful Purpose</th>
                  <th className="px-4 py-3 font-semibold">Duration</th>
                  <th className="px-4 py-3 font-semibold">Default State</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-white/[0.06] bg-white dark:bg-[#070b14] font-mono">
                <tr>
                  <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">noxsov-theme</td>
                  <td className="px-4 py-3 text-emerald-600 dark:text-emerald-400">Strictly Necessary</td>
                  <td className="px-4 py-3 font-sans text-slate-600 dark:text-neutral-300">
                    Stores preferred color scheme (&ldquo;light&rdquo; or &ldquo;dark&rdquo;) to prevent SSR rendering flash.
                  </td>
                  <td className="px-4 py-3 text-slate-500">1 Year</td>
                  <td className="px-4 py-3 text-emerald-600 font-semibold">Light (Active)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">noxsov-cookie-consent</td>
                  <td className="px-4 py-3 text-emerald-600 dark:text-emerald-400">Strictly Necessary</td>
                  <td className="px-4 py-3 font-sans text-slate-600 dark:text-neutral-300">
                    Maintains user affirmative consent decisions for cookie categories.
                  </td>
                  <td className="px-4 py-3 text-slate-500">1 Year</td>
                  <td className="px-4 py-3 text-emerald-600 font-semibold">Essential Only</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">noxsov-consent-record</td>
                  <td className="px-4 py-3 text-emerald-600 dark:text-emerald-400">Strictly Necessary</td>
                  <td className="px-4 py-3 font-sans text-slate-600 dark:text-neutral-300">
                    Cryptographic audit trail of consent ID and timestamp for DPDPA verification.
                  </td>
                  <td className="px-4 py-3 text-slate-500">1 Year</td>
                  <td className="px-4 py-3 text-emerald-600 font-semibold">Auto-Generated</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">_nox_perf_telemetry</td>
                  <td className="px-4 py-3 text-cyan-600 dark:text-cyan-400">Analytics</td>
                  <td className="px-4 py-3 font-sans text-slate-600 dark:text-neutral-300">
                    Aggregate cluster response times and API latency benchmarks without PII.
                  </td>
                  <td className="px-4 py-3 text-slate-500">Session</td>
                  <td className="px-4 py-3 text-amber-600 dark:text-amber-400 font-semibold">Disabled (Unchecked)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-bold text-slate-900 dark:text-white">_nox_locale_pref</td>
                  <td className="px-4 py-3 text-indigo-600 dark:text-indigo-400">Functional</td>
                  <td className="px-4 py-3 font-sans text-slate-600 dark:text-neutral-300">
                    Remembers language choice (English / Hindi) in Kryptik guard workflows.
                  </td>
                  <td className="px-4 py-3 text-slate-500">6 Months</td>
                  <td className="px-4 py-3 text-amber-600 dark:text-amber-400 font-semibold">Disabled (Unchecked)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Server-Side Verifiable Consent Audit Log Viewer */}
        <section aria-labelledby="consent-audit-heading" className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 id="consent-audit-heading" className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                  Verifiable Consent Audit Log (Server Repository)
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-700 dark:text-cyan-400 font-bold">
                  DPIIT Audit Trail
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-neutral-300">
                Pursuant to Section 6(7) of the Digital Personal Data Protection Act, 2023, the Data Fiduciary must prove that consent was lawfully obtained with affirmative action.
              </p>
            </div>

            <button
              type="button"
              onClick={fetchServerLogs}
              disabled={isLoadingLogs}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.05] dark:hover:bg-white/[0.1] text-slate-700 dark:text-neutral-300 border border-slate-200 dark:border-white/[0.08] transition-colors"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isLoadingLogs ? "animate-spin" : ""}`} />
              <span>Refresh Log</span>
            </button>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-white/[0.08] bg-slate-950 p-4 font-mono text-xs text-slate-300 space-y-3 overflow-x-auto shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.08] text-slate-400 text-[11px]">
              <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                <FileText className="w-3.5 h-3.5" />
                <span>DATA/CONSENT_LOGS.JSON (LIVE AUDIT STREAM)</span>
              </span>
              <span>Total Entries Logged: {allLogs.length}</span>
            </div>

            {allLogs.length === 0 ? (
              <div className="py-8 text-center text-slate-500">
                Log stream initialized. Consent actions will register here with cryptographic hashes.
              </div>
            ) : (
              <div className="space-y-2 max-h-80 overflow-y-auto pr-2 scrollbar-thin">
                {allLogs.slice(0, 10).map((log, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-black/50 border border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-cyan-500/30 transition-colors"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-cyan-400 font-bold">{log.consentId}</span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-white/[0.08] text-slate-300">
                          {log.status}
                        </span>
                        <span className="text-slate-500 text-[10px] truncate max-w-[140px]">
                          IP Hash: {log.ipHash}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        Categories: Analytics={String(log.preferences?.analytics)}, Preferences={String(log.preferences?.preferences)}, Marketing={String(log.preferences?.marketing)}
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-500 shrink-0">
                      {new Date(log.timestamp).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* DPIIT Regulatory & Grievance Contact */}
        <section aria-labelledby="grievance-heading" className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/[0.08] space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <Mail className="w-4 h-4" />
            </div>
            <div>
              <h2 id="grievance-heading" className="text-lg font-bold text-slate-900 dark:text-white">
                Data Protection Officer & Grievance Redressal
              </h2>
              <p className="text-xs text-slate-500 dark:text-neutral-400">
                Direct statutory communication channel under the Digital Personal Data Protection Act, 2023.
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-neutral-300 leading-relaxed">
            For inquiries regarding verifiable consent logs, withdrawal of consent, data access requests, or grievance redressal, please contact our Data Protection Officer directly at:
          </p>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
            <div>
              <span className="text-slate-500 dark:text-neutral-400">Dedicated Compliance Email: </span>
              <a href={`mailto:${SUPPORT_EMAIL}`} className="text-cyan-600 dark:text-cyan-400 font-bold hover:underline">
                {SUPPORT_EMAIL}
              </a>
            </div>
            <div className="text-slate-500">
              SLA: Formal Grievance Acknowledgement &lt; 24 Hours
            </div>
          </div>
        </section>

        {/* Back Navigation */}
        <div className="text-center pt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
          >
            <span>&larr; Return to NOXSOV Sovereign Platform</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
