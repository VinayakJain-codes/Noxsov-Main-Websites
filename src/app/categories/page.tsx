import { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES } from "@/data/categories";
import { PRODUCTS } from "@/data/products";
import { StatusBadge, BrandTagBadge } from "@/components/ui/StatusBadge";
import { Shield, Coins, Server, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Domain Categories — Security, Finance, & IT Solutions",
  description:
    "Explore NOXSOV's three core enterprise pillars: Security Solutions, Finance, and IT Solutions.",
};

export default function CategoriesIndexPage() {
  const iconMap: Record<string, typeof Shield> = {
    security: Shield,
    finance: Coins,
    "it-solutions": Server,
  };

  return (
    <main className="flex-1 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
            <span>Ecosystem Taxonomy</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Specialized Domains. <br />
            Unified Sovereignty.
          </h1>
          <p className="text-base text-slate-600 dark:text-neutral-300 leading-relaxed">
            NOXSOV clusters products into three dedicated vertical domains. Each vertical addresses deep technical challenges with specialized domain expertise, while remaining natively interoperable across the NOXSOV software platform.
          </p>
        </div>

        {/* Categories Stack */}
        <div className="space-y-16">
          {CATEGORIES.map((category) => {
            const Icon = iconMap[category.id] || Shield;
            const categoryProducts = PRODUCTS.filter((p) => p.categoryId === category.id);

            return (
              <section
                key={category.id}
                id={category.slug}
                className="glass-panel rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-white/[0.1] relative overflow-hidden"
              >
                {/* Accent glow */}
                <div
                  className={`absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl ${category.gradient} rounded-bl-full pointer-events-none opacity-30 dark:opacity-40`}
                />

                <div className="relative z-10 space-y-8">
                  {/* Category Title & Summary */}
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-8 space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08]">
                          <Icon className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                        </div>
                        <div>
                          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
                            {category.name}
                          </h2>
                          <p className="text-xs font-mono text-cyan-600 dark:text-cyan-400">{category.tagline}</p>
                        </div>
                      </div>

                      <p className="text-sm sm:text-base text-slate-600 dark:text-neutral-300 leading-relaxed">
                        {category.longDescription}
                      </p>

                      <div className="pt-2">
                        <Link
                          href={`/categories/${category.slug}`}
                          className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 group"
                        >
                          <span>Dedicated {category.name} Vertical Page</span>
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </div>
                    </div>

                    {/* Stats Strip */}
                    <div className="lg:col-span-4 grid grid-cols-2 gap-3">
                      {category.stats.map((s, idx) => (
                        <div
                          key={idx}
                          className="p-3 rounded-xl bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/[0.06]"
                        >
                          <div className="text-xs text-slate-500 dark:text-neutral-400">{s.label}</div>
                          <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-mono mt-0.5">
                            {s.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Products Grid for this category */}
                  <div className="pt-6 border-t border-slate-200 dark:border-white/[0.06]">
                    <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-400 mb-4">
                      Products in {category.name}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {categoryProducts.map((prod) => (
                        <div
                          key={prod.id}
                          className="p-5 rounded-2xl bg-slate-50/80 hover:bg-slate-100 dark:bg-white/[0.02] dark:hover:bg-white/[0.04] border border-slate-200 dark:border-white/[0.06] hover:border-cyan-500/30 transition-all flex flex-col justify-between group"
                        >
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <StatusBadge status={prod.status} size="sm" />
                              <BrandTagBadge tag={prod.brandTag} />
                            </div>

                            <div>
                              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                                {prod.name}
                              </h3>
                              {prod.formerName && (
                                <p className="text-[11px] font-mono text-slate-400 dark:text-neutral-500">
                                  formerly {prod.formerName}
                                </p>
                              )}
                            </div>

                            <p className="text-xs text-slate-600 dark:text-neutral-300 leading-relaxed line-clamp-3">
                              {prod.shortDescription}
                            </p>

                            <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-white/[0.04]">
                              {prod.keyCapabilities.slice(0, 2).map((cap, i) => (
                                <div key={i} className="flex items-start gap-2 text-[11px] text-slate-600 dark:text-neutral-400">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                                  <span className="line-clamp-1">{cap}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="pt-4 mt-4 border-t border-slate-200 dark:border-white/[0.04]">
                            <Link
                              href={`/products/${prod.slug}`}
                              className="inline-flex items-center justify-between w-full text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300"
                            >
                              <span>Explore Product</span>
                              <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
