import { Metadata } from "next";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  FileCheck2,
  CheckCircle2,
  Mail,
  UserCheck,
  Server,
  ArrowRight,
  AlertCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy & Data Sovereignty — DPDPA 2023 & DPIIT Compliant | NOXSOV",
  description:
    "Official NOXSOV Privacy Policy and sovereign data protection notice. Compliant with India's Digital Personal Data Protection Act, 2023 (DPDPA) and DPIIT frameworks. Zero pre-ticked consent.",
  keywords: [
    "NOXSOV Privacy Policy",
    "DPDPA 2023 Compliant",
    "DPIIT Privacy Standards",
    "Sovereign Data Protection",
    "Data Fiduciary",
    "Air-Gapped Data Custody",
  ],
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "October 14, 2026";
  const contactEmail = "support@noxsov.com";

  return (
    <main className="flex-1 pt-32 pb-24">
      {/* Background ambient lighting */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-cyan-500/10 via-emerald-500/10 to-blue-500/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Digital Personal Data Protection Act, 2023 (DPDPA) Compliant</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Privacy Policy & Sovereign Data Governance
          </h1>

          <p className="text-base text-slate-600 dark:text-neutral-300 leading-relaxed">
            NOXSOV operates on a core tenet of digital sovereignty. We design our platforms from the silicon level up to safeguard data custody, eliminate telemetry surveillance, and uphold affirmative data principal rights.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-500 dark:text-neutral-400 pt-2">
            <span>Last Updated: <strong className="text-slate-800 dark:text-neutral-200">{lastUpdated}</strong></span>
            <span>•</span>
            <span>Data Fiduciary: <strong className="text-slate-800 dark:text-neutral-200">NOXSOV Pvt. Ltd. (Estb. 2026)</strong></span>
            <span>•</span>
            <span>Statutory Contact: <a href={`mailto:${contactEmail}`} className="text-cyan-600 dark:text-cyan-400 underline">{contactEmail}</a></span>
          </div>
        </div>

        {/* Quick Highlights Summary Card */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-cyan-500/30 bg-gradient-to-br from-cyan-500/[0.04] to-transparent shadow-xl space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 font-mono">
            <Lock className="w-4 h-4 text-cyan-500" />
            <span>EXECUTIVE PRIVACY & DPDPA COMMITMENTS</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 dark:text-neutral-300">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Zero Pre-Ticked Consents:</strong> In strict compliance with DPDPA Section 6(1), terms and non-essential cookies require affirmative, unforced opt-in.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Verifiable Consent Logs:</strong> Pursuant to Section 6(7), verifiable consent records and hashes are logged and reviewable in real time.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Air-Gapped Isolation:</strong> Our software suites deploy into hermetically sealed enterprise enclaves with zero external cloud telemetry leaks.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Zero Data Monetization:</strong> We never sell, lease, or broker your organizational or personal data to ad networks or data brokers.</span>
            </div>
          </div>
        </div>

        {/* Detailed Legal Sections */}
        <div className="space-y-12 text-sm text-slate-700 dark:text-neutral-300 leading-relaxed">
          {/* Section 1: Data Fiduciary */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span className="text-cyan-600 dark:text-cyan-400 font-mono text-base">01.</span>
              <span>Identification of the Data Fiduciary</span>
            </h2>
            <p>
              Under India&apos;s <strong>Digital Personal Data Protection Act, 2023 (&ldquo;DPDPA&rdquo;)</strong> and applicable international data sovereignty regulations, <strong>NOXSOV Pvt. Ltd. (Estb. 2026)</strong> (&ldquo;NOXSOV&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) acts as the <strong>Data Fiduciary</strong> regarding personal data collected through this website, enterprise contact forms, and client engagement channels.
            </p>
            <p>
              For enterprise deployments of our software (such as <strong>Kryptik</strong> multi-tenant guard management, <strong>NOXSOV Events</strong>, or <strong>Tax Incubator</strong>), the client enterprise operates as the primary Data Fiduciary regarding their own field operators, personnel, and end customers, while NOXSOV acts solely as a technical software provider or Data Processor under strict contractual tenant isolation.
            </p>
          </section>

          {/* Section 2: Categories of Data Collected */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span className="text-cyan-600 dark:text-cyan-400 font-mono text-base">02.</span>
              <span>Categories of Data Collected & Purpose of Processing</span>
            </h2>
            <p>
              Pursuant to the statutory principle of purpose limitation (Section 4 of the DPDPA), we process only the minimum digital personal data necessary to provide and manage sovereign enterprise systems:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Enterprise Inquiry Data:</strong> When submitting an architecture briefing request or quote inquiry via our contact form, we collect your full name, enterprise work email, organization name, role/department, target product, and operational scope details.
              </li>
              <li>
                <strong>Verifiable Consent & Preference Records:</strong> When managing cookies or submitting inquiries, we record a unique consent identifier (e.g. <code>DPDPA-2026-XXXX</code>), timestamp, selected categories, and an anonymized IP hash as mandated by DPDPA Section 6(7) and DPIIT frameworks.
              </li>
              <li>
                <strong>Technical & Security Metadata:</strong> Ephemeral server request headers, browser user agent strings, and light/dark theme preference (<code>noxsov-theme</code>) stored in client-side localStorage to ensure seamless rendering without screen flicker.
              </li>
              <li>
                <strong>Kryptik Guard Field Telemetry:</strong> In Kryptik production instances, guard biometric presence and uniform compliance are evaluated locally via a dedicated Python/Flask OpenCV microservice. No biometric imagery is ever offloaded to external public LLMs or ad networks.
              </li>
            </ul>
          </section>

          {/* Section 3: Notice & Affirmative Consent */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span className="text-cyan-600 dark:text-cyan-400 font-mono text-base">03.</span>
              <span>Notice, Affirmative Consent & Zero Pre-Ticked Checkboxes</span>
            </h2>
            <p>
              In strict accordance with <strong>Section 6(1) of the DPDPA 2023</strong>:
            </p>
            <blockquote className="p-4 rounded-xl border-l-4 border-cyan-500 bg-slate-100 dark:bg-white/[0.03] text-xs font-mono text-slate-600 dark:text-neutral-300">
              &ldquo;The consent given by the Data Principal shall be free, specific, informed, unconditional and unambiguous with a clear affirmative action, and shall signify an agreement to the processing of her personal data for the specified purpose...&rdquo;
            </blockquote>
            <p>
              To ensure full compliance, NOXSOV guarantees:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>Terms and conditions checkboxes across all inquiry and consent workflows are <strong>strictly unchecked by default</strong>.</li>
              <li>Non-essential cookie categories (Performance Analytics, Locale Preferences, and Marketing Communications) are <strong>disabled by default</strong>.</li>
              <li>You may withdraw your consent at any time without punitive degradation of core site access, as provided under Section 6(4) of the DPDPA.</li>
            </ul>
          </section>

          {/* Section 4: Rights of the Data Principal */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span className="text-cyan-600 dark:text-cyan-400 font-mono text-base">04.</span>
              <span>Statutory Rights of the Data Principal under DPDPA</span>
            </h2>
            <p>
              As a Data Principal whose digital personal data is processed by NOXSOV, you possess enforceable statutory rights under Chapter III of the DPDPA:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] space-y-1">
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-xs">
                  <UserCheck className="w-3.5 h-3.5 text-cyan-500" />
                  <span>Right to Access (Section 11)</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-neutral-400">
                  Request a summary of personal data being processed, processing activities, and identities of all entities with whom data has been shared.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] space-y-1">
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-xs">
                  <FileCheck2 className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Right to Correction & Erasure (Section 12)</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-neutral-400">
                  Request correction of inaccurate or misleading data, completion of incomplete data, or complete erasure when no longer necessary.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] space-y-1">
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-xs">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                  <span>Right of Grievance Redressal (Section 13)</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-neutral-400">
                  Readily accessible mechanism to register complaints regarding act/omission of the Data Fiduciary, resolved by our Grievance Officer.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] space-y-1">
                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 text-xs">
                  <Server className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Right to Nominate (Section 14)</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-neutral-400">
                  Nominate another individual to exercise your data principal rights in the event of death or incapacity.
                </p>
              </div>
            </div>
          </section>

          {/* Section 5: Data Security Safeguards */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span className="text-cyan-600 dark:text-cyan-400 font-mono text-base">05.</span>
              <span>Security Safeguards & Dual-Audit Certification</span>
            </h2>
            <p>
              In compliance with Section 8(5) of the DPDPA, NOXSOV implements reasonable security safeguards to prevent personal data breaches:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>End-to-end TLS 1.3 encryption in transit for all web transmissions and EmailJS notification bridges.</li>
              <li>Hardened Supabase PostgreSQL with strict Row Level Security (RLS) separating tenant datasets.</li>
              <li>Dual-pass security audit hardening removing hardcoded credentials and ungated AI inference endpoints.</li>
              <li>Anonymized SHA-256 IP hashing for consent log integrity verification.</li>
            </ul>
          </section>

          {/* Section 6: Grievance Redressal Officer */}
          <section className="space-y-4 p-6 sm:p-8 rounded-3xl glass-panel border border-cyan-500/30 bg-slate-100/50 dark:bg-[#070b14]/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Data Protection Officer & Grievance Redressal
                </h2>
                <p className="text-xs text-slate-500 dark:text-neutral-400">
                  Section 13, Digital Personal Data Protection Act, 2023 & DPIIT Regulatory Coordination
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-600 dark:text-neutral-300 leading-relaxed">
              If you have any questions, wish to exercise your rights of access, correction, erasure, or desire to file a formal privacy grievance, please communicate directly with our Data Protection Office:
            </p>

            <div className="p-4 rounded-xl bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-xs font-mono space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-neutral-500">Designated Office:</span>
                <span className="text-slate-900 dark:text-white font-bold">Office of the Data Protection Officer</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-neutral-500">Official Grievance Email:</span>
                <a href={`mailto:${contactEmail}`} className="text-cyan-600 dark:text-cyan-400 font-bold hover:underline">
                  {contactEmail}
                </a>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-neutral-500">Acknowledgment SLA:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">Within 24 Hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-neutral-500">Resolution Window:</span>
                <span className="text-slate-700 dark:text-neutral-300">Within 30 Calendar Days</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 dark:text-neutral-400">
              If your grievance is not resolved satisfactorily, you retain the statutory right to escalate your complaint to the <strong>Data Protection Board of India</strong> as constituted under Section 18 of the DPDPA.
            </p>
          </section>
        </div>

        {/* Action Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-white/[0.08]">
          <Link
            href="/cookies"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
          >
            <span>Review Cookie Policy & Verifiable Audit Log</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            href="/terms"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
          >
            <span>Terms of Service & Conditions</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
