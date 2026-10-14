import { Suspense } from "react";
import { Metadata } from "next";
import Link from "next/link";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { ContactForm } from "@/components/contact/ContactForm";
import { COMPANY_INFO } from "@/data/company";
import { Mail, ShieldCheck, Clock, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Enterprise Sales — NOXSOV",
  description:
    "Direct contact channels for NOXSOV enterprise deployments, sovereign air-gapped pilots, and security briefings.",
};

export default function ContactPage() {
  return (
    <main className="flex-1 pt-32 pb-24">
      {/* Background glow */}
      <div className="absolute top-0 right-1/3 w-[500px] h-[350px] bg-gradient-to-tr from-cyan-500/15 via-blue-500/10 to-indigo-500/15 rounded-full blur-[130px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-neutral-400 mb-8" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-cyan-600 dark:text-cyan-400 font-semibold">Contact & Sales</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct channels and info */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-3">
                <BrandLogo size="md" showTagline={false} clickable={false} />
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                  <span>Enterprise Dispatch</span>
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                Connect Directly With Engineering & Sales
              </h1>
              <p className="text-sm sm:text-base text-slate-600 dark:text-neutral-300 leading-relaxed">
                Whether assessing Kryptik for national infrastructure or exploring NOXSOV Events for high-volume venues, we connect you directly with systems engineers—not commission salespeople.
              </p>
            </div>

            {/* Direct Channel Cards */}
            <div className="space-y-4">
              <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-white/[0.08] flex items-start gap-4">
                <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-600 dark:text-cyan-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-500 dark:text-neutral-400 uppercase">Enterprise Support & Procurement</div>
                  <a
                    href="mailto:support@noxsov.com"
                    className="text-sm sm:text-base font-bold text-slate-900 dark:text-white hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors"
                  >
                    support@noxsov.com
                  </a>
                  <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
                    For commercial pricing, custom SLAs, DPDPA inquiries, and technical support.
                  </p>
                </div>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-white/[0.08] flex items-start gap-4">
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-500 dark:text-neutral-400 uppercase">Security Operations (SOC)</div>
                  <a
                    href="mailto:security@noxsov.com"
                    className="text-sm sm:text-base font-bold text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-300 transition-colors"
                  >
                    {COMPANY_INFO.contact.securityEmail}
                  </a>
                  <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
                    PGP encrypted channel for vulnerability reporting and air-gap audits.
                  </p>
                </div>
              </div>

              <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-white/[0.08] flex items-start gap-4">
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-slate-500 dark:text-neutral-400 uppercase">Response Commitment</div>
                  <div className="text-sm font-bold text-slate-900 dark:text-white">
                    {COMPANY_INFO.contact.availability}
                  </div>
                  <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
                    Guaranteed sub-4 business hour initial review on enterprise submissions.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="lg:col-span-7">
            <Suspense
              fallback={
                <div className="glass-panel rounded-3xl p-12 text-center text-slate-500 dark:text-neutral-400 font-mono text-xs">
                  Loading enterprise dispatch terminal...
                </div>
              }
            >
              <ContactForm />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  );
}
