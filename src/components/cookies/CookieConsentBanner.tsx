"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  CookieConsentPreferences,
  ConsentAuditRecord,
  getStoredConsent,
  recordConsent,
  DEFAULT_UNCHECKED_PREFERENCES,
  SUPPORT_EMAIL,
} from "@/lib/consentLog";
import {
  Cookie,
  ShieldCheck,
  CheckCircle2,
  X,
  Sliders,
  ExternalLink,
  Lock,
} from "lucide-react";

export function CookieConsentBanner() {
  const [mounted, setMounted] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Preference state - strictly NOT pre-ticked by default as per user request & DPDPA rules
  const [preferences, setPreferences] = useState<CookieConsentPreferences>({
    necessary: true,
    analytics: false,
    preferences: false,
    marketing: false,
  });

  // Terms and conditions agreement checkbox - strictly NOT ticked by default
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [termsError, setTermsError] = useState(false);
  const [savedRecord, setSavedRecord] = useState<ConsentAuditRecord | null>(null);

  useEffect(() => {
    setMounted(true);
    const existing = getStoredConsent();
    if (!existing) {
      // First visit: show the consent banner
      setShowBanner(true);
    } else {
      setSavedRecord(existing);
      setPreferences(existing.preferences);
    }

    // Listen to custom event to open preferences from footer or anywhere
    const handleOpenModal = () => setShowModal(true);
    window.addEventListener("open-cookie-preferences", handleOpenModal);
    return () => window.removeEventListener("open-cookie-preferences", handleOpenModal);
  }, []);

  if (!mounted) return null;

  const handleAcceptEssentialOnly = async () => {
    const essentialOnly = {
      necessary: true,
      analytics: false,
      preferences: false,
      marketing: false,
    };
    const record = await recordConsent(essentialOnly, "rejected");
    setSavedRecord(record);
    setShowBanner(false);
    setShowModal(false);
  };

  const handleAcceptAll = async () => {
    const allEnabled = {
      necessary: true,
      analytics: true,
      preferences: true,
      marketing: true,
    };
    const record = await recordConsent(allEnabled, "granted");
    setSavedRecord(record);
    setShowBanner(false);
    setShowModal(false);
  };

  const handleSaveCustomPreferences = async () => {
    if (!agreeToTerms) {
      setTermsError(true);
      return;
    }
    setTermsError(false);
    const record = await recordConsent(preferences, "customized");
    setSavedRecord(record);
    setShowBanner(false);
    setShowModal(false);
  };

  return (
    <>
      {/* Floating Bottom Cookie Consent Banner */}
      {showBanner && !showModal && (
        <aside
          aria-label="Cookie consent banner"
          className="fixed bottom-4 left-4 right-4 md:left-8 md:right-auto md:max-w-xl z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
        >
          <div className="glass-panel p-5 sm:p-6 rounded-3xl border border-cyan-500/30 bg-white/95 dark:bg-[#0b101c]/95 backdrop-blur-xl shadow-2xl text-slate-900 dark:text-neutral-100 space-y-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0 mt-0.5">
                <Cookie className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400">
                    DPDPA 2023 & DPIIT Notice
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-semibold">
                    Zero Pre-Ticked
                  </span>
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  We Respect Your Sovereign Privacy
                </h4>
                <p className="text-xs text-slate-600 dark:text-neutral-300 leading-relaxed">
                  Under India&apos;s Digital Personal Data Protection Act, 2023, non-essential cookies and marketing preferences require affirmative consent and are <strong>disabled by default</strong>. Essential cookies support zero-flicker theme and session security.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-200 dark:border-white/[0.08]">
              <button
                type="button"
                onClick={handleAcceptEssentialOnly}
                className="flex-1 min-w-[120px] py-2.5 px-3.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.06] dark:hover:bg-white/[0.12] text-slate-800 dark:text-white border border-slate-200 dark:border-white/[0.1] transition-colors text-center"
              >
                Essential Only
              </button>

              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="flex-1 min-w-[120px] inline-flex items-center justify-center gap-1.5 py-2.5 px-3.5 rounded-xl text-xs font-semibold glass-panel hover:bg-slate-200/50 dark:hover:bg-white/[0.08] text-slate-800 dark:text-white border border-slate-300 dark:border-white/[0.12] transition-colors"
              >
                <Sliders className="w-3.5 h-3.5 text-cyan-500" />
                <span>Customize</span>
              </button>

              <button
                type="button"
                onClick={handleAcceptAll}
                className="flex-1 min-w-[120px] py-2.5 px-3.5 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 shadow-md shadow-cyan-500/20 active:scale-[0.98] transition-all text-center"
              >
                Accept All
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-neutral-400 pt-0.5">
              <div className="flex items-center gap-2">
                <Link href="/privacy" className="hover:underline text-cyan-600 dark:text-cyan-400">
                  Privacy Policy
                </Link>
                <span>•</span>
                <Link href="/cookies" className="hover:underline text-cyan-600 dark:text-cyan-400">
                  Cookie Policy & Log
                </Link>
                <span>•</span>
                <Link href="/terms" className="hover:underline text-cyan-600 dark:text-cyan-400">
                  Terms
                </Link>
              </div>
              <span>{SUPPORT_EMAIL}</span>
            </div>
          </div>
        </aside>
      )}

      {/* Preferences & DPDPA Consent Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="glass-panel w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/[0.12] bg-white dark:bg-[#0b101c] shadow-2xl text-slate-900 dark:text-neutral-100 space-y-6">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/[0.08]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    DPDPA & DPIIT Cookie Consent Management
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-neutral-400">
                    Audit-logged consent record maintained for compliance. No non-essential options are pre-ticked.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.05] transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cookie Categories Accordion / Cards */}
            <div className="space-y-3.5">
              {/* 1. Necessary (Strictly required) */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      Strictly Necessary & Security Cookies
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-semibold">
                      Always Active
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed">
                    Essential for website functioning, anti-flicker light/dark theme preference (<code>noxsov-theme</code>), CSRF defense, and sovereign session security. Cannot be disabled.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={true}
                  disabled
                  className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-500 shrink-0 mt-1 cursor-not-allowed opacity-80"
                />
              </div>

              {/* 2. Analytics & Performance - UNCHECKED BY DEFAULT */}
              <label className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] flex items-start justify-between gap-4 cursor-pointer hover:border-cyan-500/40 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      Performance & System Analytics
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-white/[0.08] text-slate-600 dark:text-neutral-400">
                      Default: Unchecked
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed">
                    Collects anonymized aggregate telemetry regarding route latency, page load speed, and server uptime. No personally identifiable information or cross-site tracking.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) =>
                    setPreferences({ ...preferences, analytics: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-500 shrink-0 mt-1 cursor-pointer accent-cyan-500"
                />
              </label>

              {/* 3. Functional Preferences - UNCHECKED BY DEFAULT */}
              <label className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] flex items-start justify-between gap-4 cursor-pointer hover:border-cyan-500/40 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      Functional & Locale Preferences
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-white/[0.08] text-slate-600 dark:text-neutral-400">
                      Default: Unchecked
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed">
                    Remembers your preferred language (English / Hindi in Kryptik guard portals), view filters in the software catalog, and layout preferences across browser restarts.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.preferences}
                  onChange={(e) =>
                    setPreferences({ ...preferences, preferences: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-500 shrink-0 mt-1 cursor-pointer accent-cyan-500"
                />
              </label>

              {/* 4. Marketing - UNCHECKED BY DEFAULT */}
              <label className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] flex items-start justify-between gap-4 cursor-pointer hover:border-cyan-500/40 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      Enterprise Outreach & Communications
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 dark:bg-white/[0.08] text-slate-600 dark:text-neutral-400">
                      Default: Unchecked
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-neutral-400 leading-relaxed">
                    Permits relevant technical briefs, software release notices, and security advisories from NOXSOV. Never shared with third-party advertisers.
                  </p>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) =>
                    setPreferences({ ...preferences, marketing: e.target.checked })
                  }
                  className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-500 shrink-0 mt-1 cursor-pointer accent-cyan-500"
                />
              </label>
            </div>

            {/* Mandatory Terms & Privacy Affirmation Checkbox - UNCHECKED BY DEFAULT */}
            <div className={`p-4 rounded-2xl border transition-colors ${
              termsError
                ? "border-red-500/50 bg-red-500/[0.05]"
                : "border-cyan-500/20 bg-cyan-500/[0.02]"
            }`}>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => {
                    setAgreeToTerms(e.target.checked);
                    if (e.target.checked) setTermsError(false);
                  }}
                  className="w-4 h-4 rounded text-cyan-500 focus:ring-cyan-500 shrink-0 mt-0.5 cursor-pointer accent-cyan-500"
                />
                <span className="text-xs text-slate-700 dark:text-neutral-300 leading-relaxed">
                  I acknowledge and confirm that I have reviewed the{" "}
                  <Link href="/terms" target="_blank" className="text-cyan-600 dark:text-cyan-400 underline font-semibold">
                    Terms & Conditions
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" target="_blank" className="text-cyan-600 dark:text-cyan-400 underline font-semibold">
                    Privacy Policy
                  </Link>
                  . I grant affirmative, informed consent pursuant to the Digital Personal Data Protection Act, 2023 (DPDPA).
                </span>
              </label>
              {termsError && (
                <p className="text-xs text-red-500 mt-2 font-mono">
                  * Please confirm your agreement to the Terms & Conditions and Privacy Policy to save custom preferences.
                </p>
              )}
            </div>

            {/* Active Audit Record Display (if already logged) */}
            {savedRecord && (
              <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-black/50 border border-slate-200 dark:border-white/[0.06] text-xs font-mono space-y-1">
                <div className="flex items-center justify-between text-slate-500 dark:text-neutral-400">
                  <span>Current DPDPA Consent ID:</span>
                  <span className="text-cyan-600 dark:text-cyan-400 font-bold">{savedRecord.consentId}</span>
                </div>
                <div className="flex items-center justify-between text-slate-500 dark:text-neutral-400">
                  <span>Timestamp:</span>
                  <span>{new Date(savedRecord.timestamp).toLocaleString()}</span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <Link
                href="/cookies"
                className="inline-flex items-center gap-1.5 text-xs text-slate-500 dark:text-neutral-400 hover:text-cyan-600 dark:hover:text-cyan-400 font-mono"
              >
                <span>Read Full Cookie Policy & Audit Log</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleAcceptEssentialOnly}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-white/[0.06] border border-slate-300 dark:border-white/[0.1] transition-colors"
                >
                  Essential Only
                </button>
                <button
                  type="button"
                  onClick={handleSaveCustomPreferences}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl text-xs font-bold text-black bg-cyan-400 hover:bg-cyan-300 shadow-md shadow-cyan-500/20 transition-all active:scale-[0.98]"
                >
                  Save My Preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
