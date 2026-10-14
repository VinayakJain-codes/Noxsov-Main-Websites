import Link from "next/link";
import { ShieldAlert, Cpu, KeyRound, CreditCard } from "lucide-react";

export function EcosystemPrinciples() {
  const principles = [
    {
      icon: ShieldAlert,
      title: "Data Sovereignty & Local Enclaves",
      description:
        "Your security telemetry, financial ledgers, and operational data never egress to unverified foreign analytics or third-party tracking networks. Air-gapped deployment ready.",
      badge: "Sovereign Core",
    },
    {
      icon: Cpu,
      title: "Kernel-Level Precision Engineering",
      description:
        "From eBPF hooks running in the Linux/Windows kernel to in-memory event queues handling 25,000 turnstile scans per second, we prioritize raw performance and zero CPU bloat.",
      badge: "High Performance",
    },
    {
      icon: KeyRound,
      title: "Future-Ready Central Identity",
      description:
        "Architected from day one so your organization can manage single sign-on (SSO), role access, and multi-product entitlements under a single NOXSOV unified account in Phase 2.",
      badge: "Phase 2 Pipeline",
    },
    {
      icon: CreditCard,
      title: "Consolidated Enterprise Billing",
      description:
        "Say goodbye to dozens of fragmented software invoices. NOXSOV is engineering unified billing and entitlement APIs in Phase 3 to streamline enterprise procurement.",
      badge: "Phase 3 Pipeline",
    },
  ];

  return (
    <section className="py-24 border-t border-slate-200 dark:border-white/[0.08] relative overflow-hidden bg-grid-pattern">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/20">
              <span>Architectural Vision</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
              Why We Engineered the NOXSOV Software Suite & Store
            </h2>

            <p className="text-sm text-slate-600 dark:text-neutral-300 leading-relaxed">
              Enterprise technology has fractured into dozens of incompatible point solutions with opaque pricing and predatory per-seat licenses. NOXSOV brings software back to first principles: technical transparency, localized sovereignty, and cohesive interoperability without arbitrary seat tolls.
            </p>

            <div className="p-4 rounded-2xl glass-panel border border-slate-200 dark:border-white/[0.08] space-y-2">
              <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-semibold uppercase">
                The NOXSOV Standard:
              </div>
              <p className="text-xs text-slate-500 dark:text-neutral-400 leading-relaxed">
                Influenced by Apple&apos;s typographic precision, Zoho&apos;s multi-product breadth, Stripe&apos;s developer credibility, and Linear&apos;s restrained speed—synthesized into an original sovereign foundation.
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300"
              >
                <span>Read Our Mission & Engineering Charter &rarr;</span>
              </Link>
            </div>
          </div>

          {/* Right Grid of 4 Pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {principles.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-white/[0.08] glass-panel-hover flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08]">
                        <Icon className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                      </div>
                      <span className="text-[10px] font-mono text-slate-500 dark:text-neutral-400 bg-slate-100 dark:bg-white/[0.02] px-2 py-0.5 rounded border border-slate-200 dark:border-white/[0.06]">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-500 dark:text-neutral-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
