import { Metadata } from "next";
import Link from "next/link";
import {
  RefreshCw,
  Bug,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Mail,
  ArrowRight,
  ShieldAlert,
  CalendarCheck,
  AlertCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy — Subscription Licensing | NOXSOV",
  description:
    "Official NOXSOV Subscription Cancellation & Refund Policy. Cancel anytime with zero exit penalties. Refunds are provided exclusively in the event of verified, unresolvable software glitches.",
  keywords: [
    "NOXSOV Refund Policy",
    "Subscription Cancellation",
    "Software Glitch Refund",
    "Cancel Anytime Policy",
    "Enterprise Software Terms",
    "Sovereign Software Licensing",
  ],
};

export default function RefundPolicyPage() {
  const lastUpdated = "November 19, 2026";
  const contactEmail = "support@noxsov.com";

  return (
    <main className="flex-1 pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-500/20">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Subscription & Refund Terms</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-slate-900 dark:text-white">
            Cancellation & Refund Policy
          </h1>

          <p className="text-base text-slate-600 dark:text-neutral-300 leading-relaxed">
            NOXSOV operates on a clear, subscription-based licensing model designed for transparency and enterprise control. You can cancel your subscription anytime. Because software access and computational resources are provisioned immediately upon purchase, refunds are granted strictly in the event of verified software glitches that our engineering team cannot resolve.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-500 dark:text-neutral-400 pt-2">
            <span>Last Updated: <strong className="text-slate-800 dark:text-neutral-200">{lastUpdated}</strong></span>
            <span>•</span>
            <span>Entity: <strong className="text-slate-800 dark:text-neutral-200">NOXSOV Pvt. Ltd. (Estb. 2026)</strong></span>
            <span>•</span>
            <span>Inquiries: <a href={`mailto:${contactEmail}`} className="text-cyan-600 dark:text-cyan-400 underline">{contactEmail}</a></span>
          </div>
        </div>

        {/* Core Policy Highlights */}
        <div className="surface-panel rounded-xl p-6 sm:p-8 border border-cyan-500/30 bg-gradient-to-br from-cyan-500/[0.04] to-transparent shadow-sm space-y-5">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 font-mono">
            <ShieldAlert className="w-4 h-4 text-cyan-500" />
            <span>CORE SUBSCRIPTION & REFUND PRINCIPLES</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700 dark:text-neutral-300">
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50/50 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/[0.05]">
              <CalendarCheck className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 dark:text-white mb-0.5">Cancel Anytime:</strong>
                <span>You have the complete freedom to cancel recurring subscriptions at any point without lock-in, cancellation penalties, or hidden exit fees.</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50/50 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/[0.05]">
              <Bug className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 dark:text-white mb-0.5">Software Glitch Guarantee:</strong>
                <span>We only issue refunds if our software experiences a verified technical glitch or critical flaw that prevents intended operation and cannot be rectified by our engineers.</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50/50 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/[0.05]">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 dark:text-white mb-0.5">Active Until Period End:</strong>
                <span>Upon cancellation, your license and workspace access remain fully active through the conclusion of your prepaid billing cycle.</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50/50 dark:bg-white/[0.02] border border-slate-200/60 dark:border-white/[0.05]">
              <RefreshCw className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900 dark:text-white mb-0.5">Prompt 5-10 Day Reversal:</strong>
                <span>Once a software glitch is confirmed by our engineering desk as unresolvable, approved refunds are returned directly to your original payment method.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-10 text-sm text-slate-700 dark:text-neutral-300 leading-relaxed">
          {/* Section 01 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span className="text-cyan-600 dark:text-cyan-400 font-mono text-base">01.</span>
              <span>Subscription Licensing & &ldquo;Cancel Anytime&rdquo; Policy</span>
            </h2>
            <p>
              All NOXSOV software solutions—including <strong>Kryptik</strong> (autonomous guard management & CV AI), <strong>NOXSOV Events</strong> (stadium-scale ticketing & access control), <strong>Tax Incubator</strong>, and other sovereign enterprise systems—are made available on a subscription basis (billed monthly or annually).
            </p>
            <p>
              We believe in honest, non-coercive software relationships. You may cancel your active subscription at any time:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong>No Mandatory Lock-In:</strong> Except for custom negotiated multi-year enterprise Master Services Agreements (MSAs), standard subscriptions do not enforce long-term lock-in or punitive early-termination fees.
              </li>
              <li>
                <strong>Immediate Halt to Future Renewals:</strong> Canceling your subscription immediately stops all future automatic renewal charges from your credit card, bank mandate, or billing account.
              </li>
              <li>
                <strong>Full Retained Access Until Cycle Conclusion:</strong> Following cancellation, your license keys, administrative consoles, and tenant instances remain operational through the end of the current paid billing period.
              </li>
              <li>
                <strong>How to Cancel:</strong> You can initiate cancellation directly within your account settings, or by emailing our support desk at <a href={`mailto:${contactEmail}`} className="text-cyan-600 dark:text-cyan-400 underline">{contactEmail}</a> with your account email and license identifier.
              </li>
            </ul>
          </section>

          {/* Section 02 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span className="text-cyan-600 dark:text-cyan-400 font-mono text-base">02.</span>
              <span>Software Glitches & Refund Eligibility</span>
            </h2>
            <p>
              Because software licenses are instantly generated, cryptographic keys are provisioned, and dedicated compute/database instances are deployed immediately upon purchase, <strong>we strictly provide refunds only when software glitches occur</strong>.
            </p>
            <p>
              To be eligible for a refund under this policy, all of the following conditions must be met:
            </p>
            <div className="space-y-2.5 pt-1">
              <div className="flex items-start gap-2.5 p-3 rounded-lg border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-white/[0.02]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong>Verified Core Functionality Defect:</strong> The software manifests a demonstrable bug, technical failure, or repeatable glitch that fundamentally prevents the software from executing its advertised core capabilities.
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-lg border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-white/[0.02]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong>Timely Notification & Logs:</strong> The client notifies NOXSOV support within thirty (30) days of encountering the software glitch, providing reproducible steps, screenshots, error codes, or telemetry logs.
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-lg border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-white/[0.02]">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong>Engineering Remedy Window:</strong> NOXSOV Systems Engineering is afforded a reasonable cure period of up to ten (10) business days to inspect the defect, deploy a software patch, hotfix, or operational workaround.
                </div>
              </div>
            </div>
            <p className="pt-2">
              If the software defect is confirmed by our engineering team and cannot be rectified or patched within this timeframe, a full refund of the current billing cycle fee will be authorized without delay.
            </p>
          </section>

          {/* Section 03 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span className="text-cyan-600 dark:text-cyan-400 font-mono text-base">03.</span>
              <span>Non-Refundable Circumstances</span>
            </h2>
            <p>
              To maintain fair and predictable operations across our sovereign software ecosystem, refunds will <strong>not</strong> be granted in any of the following scenarios:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="flex items-start gap-2.5 p-3 rounded-lg border border-rose-500/20 bg-rose-500/[0.03]">
                <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                <span className="text-xs">
                  <strong>Change of Mind:</strong> Deciding you no longer want or need the software, or purchasing alternative third-party tools after license issuance.
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-lg border border-rose-500/20 bg-rose-500/[0.03]">
                <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                <span className="text-xs">
                  <strong>Inactivity or Lack of Usage:</strong> Periods where your subscription was active and available for use, but unused by your organization.
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-lg border border-rose-500/20 bg-rose-500/[0.03]">
                <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                <span className="text-xs">
                  <strong>User or Environment Misconfiguration:</strong> Failures resulting from unsupported operating systems, non-compliant network proxies, client hardware faults, or modifications made to proprietary binaries.
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-lg border border-rose-500/20 bg-rose-500/[0.03]">
                <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                <span className="text-xs">
                  <strong>Accidental Tier Selection:</strong> Ordering an incorrect plan or product tier. You may modify or cancel renewal anytime to adjust your tier.
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-lg border border-rose-500/20 bg-rose-500/[0.03]">
                <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                <span className="text-xs">
                  <strong>Third-Party Outages:</strong> Disruptions originating from external telecommunications providers, public cloud DNS outages, or customer infrastructure failure.
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-lg border border-rose-500/20 bg-rose-500/[0.03]">
                <XCircle className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
                <span className="text-xs">
                  <strong>Post-Cycle Requests:</strong> Refund claims submitted after the relevant subscription period has concluded.
                </span>
              </div>
            </div>
          </section>

          {/* Section 04 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span className="text-cyan-600 dark:text-cyan-400 font-mono text-base">04.</span>
              <span>Step-by-Step Glitch Refund Claim Procedure</span>
            </h2>
            <p>
              If you experience a software glitch that impairs your operations, follow this procedure to submit an engineering audit and refund claim:
            </p>
            <ol className="list-decimal pl-5 space-y-3">
              <li>
                <strong>Initiate Ticket:</strong> Dispatch an email to <a href={`mailto:${contactEmail}`} className="text-cyan-600 dark:text-cyan-400 underline font-semibold">{contactEmail}</a> with the subject line <em>&ldquo;Technical Glitch Refund Request — [Your License Key or Organization Name]&rdquo;</em>.
              </li>
              <li>
                <strong>Provide Diagnostic Information:</strong> Include an objective description of the glitch, steps required to reproduce the anomaly, system environment specifications (OS, browser, or deployment mode), and relevant error outputs or screenshots.
              </li>
              <li>
                <strong>Technical Triage:</strong> Our engineering council will inspect the report, cross-reference against our system logs, and attempt to resolve or patch the defect within ten (10) business days.
              </li>
              <li>
                <strong>Refund Authorization:</strong> If the software glitch cannot be resolved and prevents standard utilization of the software, a refund will be approved and confirmed via email.
              </li>
              <li>
                <strong>Remittance:</strong> Approved refunds will be reversed to the original payment source (credit/debit card, net banking, or corporate wire) within 5 to 10 business days, depending on your banking provider.
              </li>
            </ol>
          </section>

          {/* Section 05 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span className="text-cyan-600 dark:text-cyan-400 font-mono text-base">05.</span>
              <span>Data Sovereignty & Custody Upon Cancellation</span>
            </h2>
            <p>
              Consistent with our commitment to sovereign data ownership and the Digital Personal Data Protection Act, 2023 (DPDPA), canceling your subscription does not compromise your data rights:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                You may request a complete export of your enterprise tenant database and operational records prior to the expiration of your active subscription period.
              </li>
              <li>
                Upon conclusion of service or refund completion, you retain the statutory right to request permanent, unrecoverable erasure of your tenant data from NOXSOV storage nodes pursuant to our <Link href="/privacy" className="text-cyan-600 dark:text-cyan-400 underline font-semibold">Privacy Policy</Link>.
              </li>
            </ul>
          </section>

          {/* Section 06 */}
          <section className="space-y-4 p-6 sm:p-8 rounded-xl surface-panel border border-cyan-500/30 bg-slate-100/50 dark:bg-[#070b14]/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Technical Support & Billing Desk
                </h2>
                <p className="text-xs text-slate-500 dark:text-neutral-400">
                  Questions regarding an active subscription, cancellation instructions, or technical bug reporting.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-xs font-mono space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-neutral-500">Support & Billing Mailbox:</span>
                <a href={`mailto:${contactEmail}`} className="text-cyan-600 dark:text-cyan-400 font-bold hover:underline">
                  {contactEmail}
                </a>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-neutral-500">Operating Entity:</span>
                <span className="text-slate-900 dark:text-white">NOXSOV Pvt. Ltd. (Estb. 2026)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-neutral-500">Response Turnaround:</span>
                <span className="text-slate-900 dark:text-white">Within 24–48 Business Hours</span>
              </div>
            </div>
          </section>
        </div>

        {/* Action Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-white/[0.08]">
          <Link
            href="/terms"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
          >
            <span>Review Terms & Conditions of Service</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            href="/privacy"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
          >
            <span>Privacy Policy (DPDPA 2023)</span>
          </Link>

          <Link
            href="/cookies"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
          >
            <span>Cookie Preferences & Log</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
