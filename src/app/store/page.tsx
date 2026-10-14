import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { StoreCatalogView } from "@/components/store/StoreCatalogView";
import {
  Zap,
  Lock,
  ArrowRight,
  Server,
  Layers,
  Mail,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Software Solutions Catalog — Sovereign Enterprise Systems | NOXSOV",
  description:
    "Official NOXSOV Software Catalog. Explore sovereign enterprise systems across cybersecurity, finance, and IT operations with air-gapped readiness and zero per-user taxes.",
  keywords: [
    "NOXSOV Store",
    "Enterprise Software Solutions",
    "Kryptik Guard Management",
    "NOXSOV Events",
    "Sovereign Software Catalog",
    "Air-Gapped Software",
  ],
};

export default function StorePage() {
  return (
    <main className="flex-1 pt-32 pb-24">
      {/* Background ambient lighting */}
      <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-cyan-500/10 via-indigo-500/10 to-blue-500/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Store Hero */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel border border-cyan-500/30 text-xs text-slate-800 dark:text-neutral-200 shadow-lg shadow-cyan-500/10">
            <div className="w-4 h-4 rounded-md overflow-hidden shrink-0">
              <Image
                src="/noxsov-logo.png"
                alt="NOXSOV"
                width={16}
                height={16}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-semibold text-cyan-600 dark:text-cyan-400">
              NOXSOV Software Catalog:
            </span>
            <span>Enterprise Sovereign Solutions & Direct Deployment</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            Sovereign Enterprise Software. <br />
            <span className="bg-gradient-to-r from-cyan-600 via-sky-500 to-indigo-600 dark:from-cyan-400 dark:via-sky-300 dark:to-indigo-400 bg-clip-text text-transparent">
              Zero Per-Seat SaaS Taxes.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            Deploy production-ready software systems across <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Security</span>, <span className="text-amber-600 dark:text-amber-400 font-semibold">Finance</span>, and <span className="text-blue-600 dark:text-blue-400 font-semibold">IT Operations</span>. Every deployment includes isolated tenant workspaces, offline capability, and 100% data custody.
          </p>

          {/* Quick CTA Actions */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 shadow-lg shadow-cyan-500/20 active:scale-[0.98] transition-all"
            >
              <Mail className="w-4 h-4" />
              <span>Request Custom Enterprise Quote</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold glass-panel hover:bg-slate-200/50 dark:hover:bg-white/[0.08] border border-slate-300 dark:border-white/[0.12] text-slate-800 dark:text-white transition-colors"
            >
              <span>Explore Architectural Specs</span>
            </Link>
          </div>

          {/* Core Store Guarantees */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 text-left max-w-3xl mx-auto">
            <div className="p-3.5 rounded-2xl glass-panel border border-slate-200 dark:border-white/[0.06]">
              <Zap className="w-4 h-4 text-cyan-500 mb-1" />
              <div className="text-xs font-bold text-slate-900 dark:text-white">Rapid Onboarding</div>
              <div className="text-[11px] text-slate-500 dark:text-neutral-400">Direct engineering briefings</div>
            </div>
            <div className="p-3.5 rounded-2xl glass-panel border border-slate-200 dark:border-white/[0.06]">
              <Lock className="w-4 h-4 text-emerald-500 mb-1" />
              <div className="text-xs font-bold text-slate-900 dark:text-white">100% Data Sovereignty</div>
              <div className="text-[11px] text-slate-500 dark:text-neutral-400">Zero cloud telemetry leaks</div>
            </div>
            <div className="p-3.5 rounded-2xl glass-panel border border-slate-200 dark:border-white/[0.06]">
              <Server className="w-4 h-4 text-indigo-500 mb-1" />
              <div className="text-xs font-bold text-slate-900 dark:text-white">Air-Gapped Ready</div>
              <div className="text-[11px] text-slate-500 dark:text-neutral-400">Enclave & on-premise support</div>
            </div>
            <div className="p-3.5 rounded-2xl glass-panel border border-slate-200 dark:border-white/[0.06]">
              <Layers className="w-4 h-4 text-amber-500 mb-1" />
              <div className="text-xs font-bold text-slate-900 dark:text-white">Flat Node Tiers</div>
              <div className="text-[11px] text-slate-500 dark:text-neutral-400">Zero per-user penalties</div>
            </div>
          </div>
        </div>

        {/* Store Catalog Section */}
        <StoreCatalogView />

        {/* Enterprise Procurement Banner */}
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-cyan-500/30 bg-gradient-to-r from-cyan-500/[0.05] via-transparent to-indigo-500/[0.05] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-bold">
                Enterprise & Agency Procurement
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Need Multi-Cluster Sovereign Deployments or Custom Integrations?
              </h3>
              <p className="text-sm text-slate-600 dark:text-neutral-300 leading-relaxed max-w-2xl">
                For security agency fleets, corporate campuses, financial institutions, and event venues requiring tailored OpenCV computer vision verification, dedicated Supabase instances, or custom hardware drivers.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <Link
                href="/contact?inquiryType=enterprise-procurement"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs text-black bg-cyan-400 hover:bg-cyan-300 shadow-lg shadow-cyan-500/20 transition-all text-center"
              >
                <span>Request Custom Procurement Quote</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
