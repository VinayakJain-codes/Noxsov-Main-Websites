import { Metadata } from "next";
import Link from "next/link";
import {
  FileText,
  Shield,
  Scale,
  CheckCircle2,
  Mail,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Terms and Conditions of Service — Enterprise & Sovereign Licensing | NOXSOV",
  description:
    "Official NOXSOV Terms and Conditions of Service governing enterprise software deployment, sovereign data custody, acceptable use, and procurement.",
  keywords: [
    "NOXSOV Terms",
    "Enterprise Software Terms",
    "Sovereign Software Agreement",
    "DPDPA Compliance",
    "Kryptik Licensing Terms",
  ],
};

export default function TermsPage() {
  const lastUpdated = "October 14, 2026";
  const contactEmail = "support@noxsov.com";

  return (
    <main className="flex-1 pt-32 pb-24">
      {/* Background ambient lighting */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-cyan-500/10 via-sky-500/10 to-indigo-500/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-500/20">
            <Scale className="w-3.5 h-3.5" />
            <span>Master Enterprise Agreement</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Terms & Conditions of Service
          </h1>

          <p className="text-base text-slate-600 dark:text-neutral-300 leading-relaxed">
            These Terms govern your access to the NOXSOV sovereign enterprise software ecosystem, technical briefings, deployment documentation, and related platforms.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-slate-500 dark:text-neutral-400 pt-2">
            <span>Last Updated: <strong className="text-slate-800 dark:text-neutral-200">{lastUpdated}</strong></span>
            <span>•</span>
            <span>Entity: <strong className="text-slate-800 dark:text-neutral-200">NOXSOV Pvt. Ltd. (Estb. 2026)</strong></span>
            <span>•</span>
            <span>Inquiries: <a href={`mailto:${contactEmail}`} className="text-cyan-600 dark:text-cyan-400 underline">{contactEmail}</a></span>
          </div>
        </div>

        {/* Core Principles */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-cyan-500/30 bg-gradient-to-br from-cyan-500/[0.04] to-transparent shadow-xl space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2 font-mono">
            <Shield className="w-4 h-4 text-cyan-500" />
            <span>SOVEREIGN ENTERPRISE PRINCIPLES</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 dark:text-neutral-300">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Zero Per-User Seat Tax:</strong> Software licenses are granted on deterministic fleet or node scopes without hidden per-seat punitive fees.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Total Data Custody:</strong> Your enterprise retains 100% legal custody and operational ownership of all customer and operational data.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>DPDPA Affirmative Consent:</strong> In accordance with Indian statutory requirements, terms are not ticked by default.</span>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Air-Gapped Ready:</strong> Permitted for sovereign on-premises deployment without forced third-party cloud beaconing.</span>
            </div>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-10 text-sm text-slate-700 dark:text-neutral-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span className="text-cyan-600 dark:text-cyan-400 font-mono text-base">01.</span>
              <span>Acceptance of Terms</span>
            </h2>
            <p>
              By accessing the NOXSOV platform, submitting an enterprise inquiry via our contact interfaces, or engaging in commercial evaluation of NOXSOV software systems (including <strong>Kryptik</strong>, <strong>NOXSOV Events</strong>, and <strong>Tax Incubator</strong>), you acknowledge and agree to be bound by these Terms and Conditions.
            </p>
            <p>
              If you are accepting on behalf of an enterprise, security agency, government entity, or other legal entity, you represent and warrant that you possess the requisite authority to bind such entity to these Terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span className="text-cyan-600 dark:text-cyan-400 font-mono text-base">02.</span>
              <span>Software Licensing & Deployment Scopes</span>
            </h2>
            <p>
              NOXSOV grants licensed enterprises a non-exclusive, non-transferable, sovereign right to deploy and operate the designated software systems in accordance with the specific deployment tier agreed in the applicable Master Services Agreement (MSA) or Commercial Deployment Quote:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li>
                <strong>Multi-Tenant Workspace Isolation:</strong> Enterprise clients operate within hermetically sealed tenant schemas enforced by Supabase Row Level Security (RLS).
              </li>
              <li>
                <strong>On-Premises / Air-Gapped Rights:</strong> For qualified Sovereign Fleet tiers, enterprises receive binary deployment packages or containerized microservices (including the Python/Flask OpenCV verification service) operable in air-gapped enclaves.
              </li>
              <li>
                <strong>Prohibited Uses:</strong> Licensees shall not reverse-engineer, decompile, or redistribute the proprietary core algorithms or circumvent technological license safeguards.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span className="text-cyan-600 dark:text-cyan-400 font-mono text-base">03.</span>
              <span>Data Protection & DPDPA Compliance</span>
            </h2>
            <p>
              Our processing of personal data is governed strictly by our <Link href="/privacy" className="text-cyan-600 dark:text-cyan-400 underline font-semibold">Privacy Policy</Link> and the Digital Personal Data Protection Act, 2023 (DPDPA).
            </p>
            <p>
              NOXSOV upholds affirmative, uncoerced consent: no terms, privacy agreements, or non-essential cookies are pre-selected or pre-ticked by default on any NOXSOV property. You have the right to withdraw consent and request erasure of your data at any time by contacting <a href={`mailto:${contactEmail}`} className="text-cyan-600 dark:text-cyan-400 underline">{contactEmail}</a>.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span className="text-cyan-600 dark:text-cyan-400 font-mono text-base">04.</span>
              <span>Intellectual Property</span>
            </h2>
            <p>
              All software architectures, source code, neural/vision model weights, interface designs, logos, and trademarks (including &ldquo;NOXSOV&rdquo;, &ldquo;Kryptik by NOXSOV&rdquo;, &ldquo;NOXSOV Events&rdquo;, and &ldquo;Tax Incubator&rdquo;) remain the exclusive intellectual property of NOXSOV Pvt. Ltd. (Estb. 2026).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              <span className="text-cyan-600 dark:text-cyan-400 font-mono text-base">05.</span>
              <span>Warranty Disclaimers & Limitation of Liability</span>
            </h2>
            <p>
              Except as explicitly stated in a signed Master Services Agreement, software demonstration interfaces and preliminary technical briefings are provided &ldquo;as is&rdquo;. In no event shall NOXSOV be liable for indirect, punitive, or consequential damages resulting from operational network outages beyond our direct infrastructure custody.
            </p>
          </section>

          <section className="space-y-4 p-6 sm:p-8 rounded-3xl glass-panel border border-cyan-500/30 bg-slate-100/50 dark:bg-[#070b14]/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Legal & Enterprise Support Desk
                </h2>
                <p className="text-xs text-slate-500 dark:text-neutral-400">
                  Direct contact for contractual clarifications, MSAs, or compliance documentation.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-xs font-mono space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-neutral-500">Legal & Support Mailbox:</span>
                <a href={`mailto:${contactEmail}`} className="text-cyan-600 dark:text-cyan-400 font-bold hover:underline">
                  {contactEmail}
                </a>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-neutral-500">Corporate Headquarters:</span>
                <span className="text-slate-900 dark:text-white">NOXSOV Pvt. Ltd. (Estb. 2026)</span>
              </div>
            </div>
          </section>
        </div>

        {/* Action Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200 dark:border-white/[0.08]">
          <Link
            href="/privacy"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
          >
            <span>Review Privacy Policy (DPDPA 2023)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            href="/cookies"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
          >
            <span>Cookie Policy & Consent Log</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
