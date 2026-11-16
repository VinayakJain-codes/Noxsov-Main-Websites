import type { Metadata } from "next";
import Link from "next/link";
import { StoreCatalogView } from "@/components/store/StoreCatalogView";import { ArrowRight } from "lucide-react";

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


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="flex flex-col justify-between gap-6 border-b border-slate-200 pb-10 dark:border-slate-800 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-medium text-cyan-700 dark:text-cyan-400">NOXSOV software</p>
            <h1 className="text-4xl font-medium tracking-tight sm:text-5xl">Find your next system.</h1>
            <p className="mt-5 text-base text-slate-600 dark:text-slate-400">Explore products for security, finance, and IT operations. Choose a deployment tier or discuss a custom solution with our team.</p>
          </div>
          <Link href="/contact" className="secondary-action self-start md:self-auto">Request a quote <ArrowRight size={16} /></Link>
        </div>

        {/* Store Catalog Section */}
        <StoreCatalogView />

        {/* Enterprise Procurement Banner */}
        <div className="surface-panel rounded-xl p-8 sm:p-12 border border-cyan-500/30 bg-gradient-to-r from-cyan-500/[0.05] via-transparent to-indigo-500/[0.05] relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs font-medium text-cyan-600 dark:text-cyan-400 font-bold">
                Enterprise & Agency Procurement
              </span>
              <h3 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-white tracking-tight">
                Need Multi-Cluster Sovereign Deployments or Custom Integrations?
              </h3>
              <p className="text-sm text-slate-600 dark:text-neutral-300 leading-relaxed max-w-2xl">
                For security agency fleets, corporate campuses, financial institutions, and event venues requiring tailored OpenCV computer vision verification, dedicated Supabase instances, or custom hardware drivers.
              </p>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
              <Link
                href="/contact?inquiryType=enterprise-procurement"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-xs text-black bg-cyan-400 hover:bg-cyan-300 shadow-sm  transition-all text-center"
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
