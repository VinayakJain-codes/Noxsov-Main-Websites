import { Metadata } from "next";
import Link from "next/link";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { COMPANY_INFO } from "@/data/company";
import { ArrowRight, ChevronRight, Layers, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "About NOXSOV — Mission, Engineering Charter & Leadership",
  description:
    "Learn about NOXSOV Pvt. Ltd. (Estb. 2026): our mission, sovereign software principles, engineering council, and multi-phase roadmap.",
};

export default function AboutPage() {
  return (
    <main className="flex-1 pt-32 pb-24">
      {/* Hero */}
      <section className="relative pb-16 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/15 via-indigo-500/10 to-blue-500/15 rounded-full blur-[130px] pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-neutral-400 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-cyan-600 dark:text-cyan-400 font-semibold">About Company</span>
          </nav>

          <div className="max-w-4xl space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <BrandLogo size="md" showTagline={false} clickable={false} />
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                <Sparkles className="w-3.5 h-3.5" />
                <span>NOXSOV Pvt. Ltd. (Estb. 2026) • Engineering Charter & Mission</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              Software Sovereign by Nature. <br />
              Rigorous by Design.
            </h1>

            <p className="text-xl text-slate-700 dark:text-neutral-300 leading-relaxed font-medium">
              NOXSOV is the sovereign enterprise software platform for mission-critical systems. We reject fragile SaaS lock-in and opaque data tracking in favor of mathematically verifiable software.
            </p>
          </div>
        </div>
      </section>

      {/* Origin & Narrative */}
      <section className="py-16 border-t border-slate-200 dark:border-white/[0.08] bg-slate-100/30 dark:bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold">
                The NOXSOV Genesis
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Why We Engineered NOXSOV
              </h2>

              <p className="text-sm sm:text-base text-slate-600 dark:text-neutral-300 leading-relaxed">
                {COMPANY_INFO.story}
              </p>

              <p className="text-sm sm:text-base text-slate-600 dark:text-neutral-300 leading-relaxed">
                Rather than creating disconnected tools, we are systematically constructing a cohesive sovereign ecosystem. From computer vision guard verification in Kryptik to turnstile mesh synchronization in NOXSOV Events, every piece is built for organizations where failure is catastrophic.
              </p>
            </div>

            {/* Comparison Table / Architecture Blueprint */}
            <div className="lg:col-span-6 glass-panel rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-white/[0.1] space-y-6">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-400 font-semibold border-b border-slate-200 dark:border-white/[0.06] pb-3">
                Architectural Contrast
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3 p-4 rounded-xl bg-red-500/[0.04] border border-red-500/20">
                  <div className="text-xs font-mono text-red-600 dark:text-red-400 font-bold uppercase">
                    Legacy SaaS Silos
                  </div>
                  <ul className="text-xs text-slate-600 dark:text-neutral-400 space-y-2">
                    <li>• Opaque foreign cloud tracking</li>
                    <li>• Aggressive per-seat user taxes</li>
                    <li>• Fragile cloud-only dependency</li>
                    <li>• Fragmented billing invoices</li>
                  </ul>
                </div>

                <div className="space-y-3 p-4 rounded-xl bg-cyan-500/[0.06] border border-cyan-500/30">
                  <div className="text-xs font-mono text-cyan-700 dark:text-cyan-400 font-bold uppercase">
                    NOXSOV Ecosystem
                  </div>
                  <ul className="text-xs text-slate-800 dark:text-neutral-200 space-y-2 font-medium">
                    <li>• 100% sovereign data enclaves</li>
                    <li>• Deterministic node-based pricing</li>
                    <li>• Air-gapped & offline resilient</li>
                    <li>• Unified multi-phase ecosystem</li>
                  </ul>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] text-xs text-slate-600 dark:text-neutral-400">
                <span className="text-slate-900 dark:text-white font-medium">Design Synthesis:</span> Apple&apos;s typographic restraint, Zoho&apos;s ecosystem breadth, Stripe&apos;s developer precision, and Linear&apos;s responsive mechanics.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Core Principles */}
      <section id="principles" className="py-20 border-t border-slate-200 dark:border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold">
              Our Charter
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Foundational Architectural Principles
            </h2>
            <p className="text-sm text-slate-600 dark:text-neutral-300 leading-relaxed">
              These principles govern every product engineered across the NOXSOV software platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {COMPANY_INFO.principles.map((pr) => (
              <div
                key={pr.number}
                className="glass-panel p-8 rounded-3xl border border-slate-200 dark:border-white/[0.08] glass-panel-hover space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-mono font-extrabold text-cyan-600 dark:text-cyan-400">
                    {pr.number}
                  </span>
                  <div className="h-1.5 w-12 bg-cyan-500/20 rounded-full" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{pr.title}</h3>
                <p className="text-sm text-slate-600 dark:text-neutral-300 leading-relaxed">{pr.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Multi-Phase Software & Store Architecture Roadmap */}
      <section className="py-20 border-t border-slate-200 dark:border-white/[0.08] bg-slate-100/60 dark:bg-black/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
              <Layers className="w-3.5 h-3.5" />
              <span>Phased Evolution</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              The NOXSOV Ecosystem Masterplan
            </h2>
            <p className="text-sm text-slate-600 dark:text-neutral-300 leading-relaxed">
              How we layer central sovereignty, unified identity, and billing on top of our specialized products.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-panel p-6 rounded-2xl border border-cyan-500/40 bg-cyan-500/[0.04] space-y-3 relative">
              <div className="text-xs font-mono text-cyan-700 dark:text-cyan-400 font-bold uppercase">Phase 1 • Current</div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Discovery & Launch Suite</h3>
              <p className="text-xs text-slate-600 dark:text-neutral-300 leading-relaxed">
                Establish parent brand, product documentation, transparent specs, and enterprise sales channels.
              </p>
              <div className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold pt-2">
                ✓ Fully Delivered
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-white/[0.08] space-y-3">
              <div className="text-xs font-mono text-slate-500 dark:text-neutral-400 font-bold uppercase">Phase 2</div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Central Account System</h3>
              <p className="text-xs text-slate-600 dark:text-neutral-300 leading-relaxed">
                One NOXSOV account (signup/login) shared across products with central profile & team access management.
              </p>
              <div className="text-[11px] font-mono text-slate-500 dark:text-neutral-400 pt-2">
                Scheduled Next
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-white/[0.08] space-y-3">
              <div className="text-xs font-mono text-slate-500 dark:text-neutral-400 font-bold uppercase">Phase 3</div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Unified Billing & Entitlements</h3>
              <p className="text-xs text-slate-600 dark:text-neutral-300 leading-relaxed">
                Central payment orchestration with Razorpay/Stripe, entitlement APIs, and automated license provisioning.
              </p>
              <div className="text-[11px] font-mono text-slate-500 dark:text-neutral-400 pt-2">
                Planned
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-white/[0.08] space-y-3">
              <div className="text-xs font-mono text-slate-500 dark:text-neutral-400 font-bold uppercase">Phase 4</div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Full Product Integration</h3>
              <p className="text-xs text-slate-600 dark:text-neutral-300 leading-relaxed">
                Retrofit Kryptik, NOXSOV Events, and upcoming ERP suites to authenticate against the central cockpit.
              </p>
              <div className="text-[11px] font-mono text-slate-500 dark:text-neutral-400 pt-2">
                Planned
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Engineering Council */}
      <section className="py-20 border-t border-slate-200 dark:border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold">
              The Builders
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Engineering Council & Leadership
            </h2>
            <p className="text-sm text-slate-600 dark:text-neutral-300 leading-relaxed">
              Engineered by systems architects, kernel hackers, and distributed platform specialists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {COMPANY_INFO.leadership.map((member, idx) => (
              <div
                key={idx}
                className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/[0.08] glass-panel-hover space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-600 dark:text-cyan-400 font-mono font-bold text-base">
                    {member.avatarInitials}
                  </div>
                  {member.badge && (
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-neutral-300 border border-slate-200 dark:border-white/[0.08]">
                      {member.badge}
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{member.name}</h3>
                  <p className="text-xs font-mono text-cyan-600 dark:text-cyan-400 mt-0.5">{member.role}</p>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-300 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 border-t border-slate-200 dark:border-white/[0.08]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Collaborate With NOXSOV
          </h2>
          <p className="text-sm text-slate-600 dark:text-neutral-300 max-w-xl mx-auto leading-relaxed">
            Interested in enterprise deployment, research collaboration, or joining our engineering council? Reach out to our core team directly.
          </p>
          <div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-xs text-black bg-cyan-400 hover:bg-cyan-300 shadow-lg shadow-cyan-500/25 transition-all"
            >
              <span>Connect With Engineering & Sales</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
