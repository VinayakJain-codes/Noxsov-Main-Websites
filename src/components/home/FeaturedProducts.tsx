import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "@/data/products";
import { StatusBadge, BrandTagBadge } from "@/components/ui/StatusBadge";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export function FeaturedProducts() {
  const liveProducts = PRODUCTS.filter((p) => p.status === "Delivered");
  const upcomingProducts = PRODUCTS.filter((p) => p.status !== "Delivered");

  return (
    <section id="products" className="py-24 border-t border-slate-200 dark:border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
            <span>Production Systems & Active Roadmap</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Honest Software. Built to Scale.
          </h2>
          <p className="text-base text-slate-600 dark:text-neutral-400 leading-relaxed">
            We hold ourselves to a strict standard: live products represent actual implemented code running in production. Upcoming solutions are labeled transparently with public milestones.
          </p>
        </div>

        {/* Live Delivered Products — Large Feature Cards */}
        <div className="space-y-16 mb-24">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Delivered & In Production
            </h3>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          {liveProducts.map((prod, index) => {
            const isReversed = index % 2 === 1;
            return (
              <div
                key={prod.id}
                className="glass-panel rounded-3xl border border-slate-200 dark:border-white/[0.1] p-6 sm:p-10 relative overflow-hidden shadow-2xl"
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                    isReversed ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  {/* Info Column */}
                  <div
                    className={`lg:col-span-5 space-y-6 ${
                      isReversed ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <div className="flex flex-wrap items-center gap-2.5">
                      <StatusBadge status={prod.status} />
                      <BrandTagBadge tag={prod.brandTag} />
                      {prod.formerName && (
                        <span className="text-xs text-slate-500 dark:text-neutral-400 font-mono">
                          (formerly {prod.formerName})
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                        {prod.name}
                      </h4>
                      <p className="text-xs font-mono text-cyan-600 dark:text-cyan-400 mt-1">
                        Vertical: {prod.categoryName}
                      </p>
                    </div>

                    <p className="text-sm text-slate-600 dark:text-neutral-300 leading-relaxed">
                      {prod.shortDescription}
                    </p>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-3 py-2">
                      {prod.stats.map((s, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06]"
                        >
                          <div className="text-xs text-slate-500 dark:text-neutral-400">{s.label}</div>
                          <div className="text-sm font-bold text-slate-900 dark:text-white font-mono mt-0.5">
                            {s.value}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Feature Bullets */}
                    <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-white/[0.06]">
                      {prod.keyCapabilities.slice(0, 3).map((cap, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-neutral-300">
                          <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>

                    {/* Action Links */}
                    <div className="flex flex-wrap items-center gap-4 pt-4">
                      <Link
                        href={`/products/${prod.slug}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-black bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-md shadow-cyan-500/20"
                      >
                        <span>View Architecture & Specs</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <Link
                        href={`/contact?product=${prod.slug}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-800 dark:text-white glass-panel hover:bg-slate-200/50 dark:hover:bg-white/[0.06] border border-slate-300 dark:border-white/[0.1] transition-colors"
                      >
                        <span>Request Demonstration</span>
                      </Link>
                    </div>
                  </div>

                  {/* Screenshot Image Column */}
                  <div
                    className={`lg:col-span-7 relative group ${
                      isReversed ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-white/[0.12] bg-slate-950 dark:bg-[#070b14] shadow-2xl">
                      <div className="relative aspect-[16/9] w-full">
                        <Image
                          src={prod.image}
                          alt={`${prod.name} dashboard screenshot`}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                          sizes="(max-width: 1024px) 100vw, 700px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 dark:from-[#04070e]/80 via-transparent to-transparent pointer-events-none" />
                      </div>

                      {/* Live overlay tag */}
                      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs glass-panel p-3 rounded-xl border border-slate-200/60 dark:border-white/[0.1] backdrop-blur-md">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-white font-medium">
                            {prod.name} Live Production Telemetry
                          </span>
                        </div>
                        <Link
                          href={`/products/${prod.slug}`}
                          className="text-cyan-400 hover:text-cyan-300 font-semibold inline-flex items-center gap-1"
                        >
                          Deep-Dive &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* In Progress & Concept Products Grid */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                In Development & Architectural Concepts
              </h3>
              <span className="w-2 h-2 rounded-full bg-amber-500" />
            </div>
            <span className="text-xs font-mono text-slate-500 dark:text-neutral-400">
              Transparent Evolution
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingProducts.map((prod) => (
              <div
                key={prod.id}
                className="glass-panel rounded-2xl border border-slate-200 dark:border-white/[0.08] glass-panel-hover p-6 flex flex-col justify-between group overflow-hidden"
              >
                <div className="space-y-4">
                  {/* Image Thumbnail */}
                  <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-slate-200 dark:border-white/[0.08] bg-slate-900">
                    <Image
                      src={prod.image}
                      alt={prod.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 350px"
                    />
                    <div className="absolute inset-0 bg-slate-950/30 dark:bg-[#06090e]/40 pointer-events-none" />
                    <div className="absolute top-2 left-2">
                      <StatusBadge status={prod.status} size="sm" />
                    </div>
                  </div>

                  <div>
                    <div className="text-xs font-mono text-cyan-600 dark:text-cyan-400 mb-1">
                      {prod.categoryName}
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                      {prod.name}
                    </h4>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-neutral-300 leading-relaxed line-clamp-3">
                    {prod.shortDescription}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-white/[0.06]">
                    {prod.keyCapabilities.slice(0, 2).map((cap, i) => (
                      <div key={i} className="flex items-start gap-2 text-[11px] text-slate-600 dark:text-neutral-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{cap}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200 dark:border-white/[0.06]">
                  <Link
                    href={`/products/${prod.slug}`}
                    className="inline-flex items-center justify-between w-full text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 group"
                  >
                    <span>Explore Roadmap & RFC</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Software Store Promotion Banner */}
        <div className="mt-16 glass-panel rounded-3xl p-6 sm:p-8 border border-cyan-500/30 bg-gradient-to-r from-cyan-500/[0.06] via-transparent to-blue-500/[0.06] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-left">
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-bold">
              Direct Software Procurement
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              Looking for Custom Enterprise Deployment & Technical Briefings?
            </h4>
            <p className="text-xs text-slate-600 dark:text-neutral-400">
              Browse our complete software catalog, review technical specifications, and request customized enterprise deployment terms.
            </p>
          </div>

          <Link
            href="/store"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-xs text-black bg-cyan-400 hover:bg-cyan-300 shadow-md shadow-cyan-500/20 transition-all active:scale-[0.98]"
          >
            <span>Explore Software Catalog</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
