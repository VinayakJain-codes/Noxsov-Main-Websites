import Link from "next/link";
import { CATEGORIES } from "@/data/categories";
import { PRODUCTS } from "@/data/products";
import { Shield, Coins, Server, ArrowRight } from "lucide-react";

export function CategoryShowcase() {
  const iconMap: Record<string, typeof Shield> = {
    security: Shield,
    finance: Coins,
    "it-solutions": Server,
  };

  return (
    <section id="categories" className="py-20 border-t border-slate-200 dark:border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold mb-2">
              Domain Verticals
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Engineered Across Three Core Disciplines
            </h2>
          </div>
          <p className="text-sm text-slate-600 dark:text-neutral-400 max-w-md leading-relaxed">
            Every NOXSOV solution is built inside a dedicated domain vertical, upholding strict technical sovereignty while sharing the unified NOXSOV core architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CATEGORIES.map((cat) => {
            const Icon = iconMap[cat.id] || Shield;
            const categoryProducts = PRODUCTS.filter((p) => p.categoryId === cat.id);

            return (
              <div
                key={cat.id}
                className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-white/[0.08] glass-panel-hover flex flex-col justify-between relative overflow-hidden"
              >
                {/* Accent glow corner */}
                <div
                  className={`absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl ${cat.gradient} rounded-bl-full pointer-events-none opacity-40 dark:opacity-50`}
                />

                <div className="space-y-6">
                  {/* Category Header */}
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-xl bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08]">
                      <Icon className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
                    </div>
                    <span className="text-xs font-mono text-slate-500 dark:text-neutral-400 bg-slate-100 dark:bg-white/[0.02] px-2.5 py-1 rounded-md border border-slate-200 dark:border-white/[0.06]">
                      {categoryProducts.length} {categoryProducts.length === 1 ? "Product" : "Products"}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                      {cat.name}
                    </h3>
                    <p className="text-xs font-mono text-cyan-600 dark:text-cyan-400/80 mt-1">
                      {cat.tagline}
                    </p>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-neutral-300 leading-relaxed">
                    {cat.description}
                  </p>

                  {/* Products Under this Category */}
                  <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-white/[0.06]">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-400">
                      Portfolio Solutions:
                    </div>
                    <div className="space-y-2">
                      {categoryProducts.map((p) => (
                        <Link
                          key={p.id}
                          href={`/products/${p.slug}`}
                          className="flex items-center justify-between p-2 rounded-lg bg-slate-100/70 hover:bg-slate-200/70 dark:bg-white/[0.02] dark:hover:bg-white/[0.05] border border-slate-200 dark:border-white/[0.04] hover:border-cyan-500/30 transition-all text-xs group"
                        >
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300">
                              {p.name}
                            </span>
                            {p.status === "Delivered" && (
                              <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-medium">
                                • Live
                              </span>
                            )}
                            {p.status === "In progress" && (
                              <span className="text-[10px] text-amber-700 dark:text-amber-400 font-medium">
                                • In Progress
                              </span>
                            )}
                            {p.status === "Concept" && (
                              <span className="text-[10px] text-cyan-700 dark:text-cyan-400 font-medium">
                                • Concept
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] font-mono text-slate-400 dark:text-neutral-500 group-hover:text-slate-600 dark:group-hover:text-neutral-300">
                            by NOXSOV
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Key Stats Bar */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    {cat.stats.slice(0, 2).map((s, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg bg-slate-100 dark:bg-black/30 border border-slate-200 dark:border-white/[0.04]">
                        <div className="text-xs text-slate-500 dark:text-neutral-400">{s.label}</div>
                        <div className="text-sm font-bold text-slate-900 dark:text-white font-mono mt-0.5">{s.value}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-6 mt-6 border-t border-slate-200 dark:border-white/[0.06]">
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="inline-flex items-center justify-between w-full text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 group"
                  >
                    <span>Explore {cat.name} Architecture</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
