import Link from "next/link";
import { ArrowRight, ShieldCheck, Mail } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-14 overflow-hidden border border-cyan-500/30 bg-gradient-to-br from-[#0c1322] via-[#090d17] to-[#04060a] shadow-2xl shadow-cyan-950/40">
          {/* Radial ambient glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-400/10 text-cyan-300 border border-cyan-400/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Sovereign Enterprise Architecture Briefing</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Ready to Upgrade to Sovereign Enterprise Software?
            </h2>

            <p className="text-base text-neutral-300 leading-relaxed max-w-xl mx-auto">
              Whether you require multi-tenant guard management with Kryptik, stadium-scale ticketing with NOXSOV Events, or corporate finance with Tax Incubator, our engineering team is ready to assist.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link
                id="cta-store-btn"
                href="/store"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm text-black bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 transition-all shadow-lg shadow-cyan-500/25 active:scale-[0.98]"
              >
                <span>Browse Software Store</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                id="cta-sales-btn"
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-sm text-white bg-white/[0.08] hover:bg-white/[0.14] border border-white/[0.16] backdrop-blur-md transition-colors"
              >
                <span>Connect With Enterprise Sales</span>
              </Link>
            </div>

            <div className="pt-6 text-xs text-neutral-400 font-mono">
              Zero telemetric tracking • Guaranteed sovereign deployment models
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
