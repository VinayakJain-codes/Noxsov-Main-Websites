"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "@/data/products";
import { StatusBadge, BrandTagBadge } from "@/components/ui/StatusBadge";
import { ArrowRight, CheckCircle2, Filter } from "lucide-react";

export default function ProductsDirectoryPage() {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  const filteredProducts = PRODUCTS.filter((p) => {
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    const matchesCategory = categoryFilter === "all" || p.categoryId === categoryFilter;
    return matchesStatus && matchesCategory;
  });

  return (
    <main className="flex-1 pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
            <span>Sovereign Product Portfolio</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            The NOXSOV Product Suite
          </h1>
          <p className="text-base text-slate-600 dark:text-neutral-300 leading-relaxed">
            Every product is engineered as an autonomous, sovereign component within the broader NOXSOV ecosystem. Tagged and certified as &ldquo;[Product] by NOXSOV&rdquo;.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <Link
              href="/store"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-black bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-md shadow-cyan-500/20"
            >
              <span>Explore Software Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-800 dark:text-white glass-panel hover:bg-slate-200/50 dark:hover:bg-white/[0.08] border border-slate-300 dark:border-white/[0.1] transition-colors"
            >
              <span>Contact Enterprise Sales</span>
            </Link>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="glass-panel p-4 rounded-2xl border border-slate-200 dark:border-white/[0.08] mb-12 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Status Filters */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-mono text-slate-500 dark:text-neutral-400 mr-2 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" /> Status:
            </span>
            {[
              { id: "all", label: "All Products" },
              { id: "Delivered", label: "Delivered (Live)" },
              { id: "In progress", label: "In Progress" },
              { id: "Concept", label: "Concept" },
            ].map((btn) => (
              <button
                key={btn.id}
                type="button"
                onClick={() => setStatusFilter(btn.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  statusFilter === btn.id
                    ? "bg-cyan-500 text-black shadow-md shadow-cyan-500/20"
                    : "text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-white/[0.02] hover:bg-slate-200 dark:hover:bg-white/[0.05]"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-mono text-slate-500 dark:text-neutral-400 mr-2">Category:</span>
            {[
              { id: "all", label: "All Verticals" },
              { id: "security", label: "Security" },
              { id: "finance", label: "Finance" },
              { id: "it-solutions", label: "IT Solutions" },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                  categoryFilter === cat.id
                    ? "bg-slate-900 text-white dark:bg-white/[0.15] dark:text-white border border-slate-700 dark:border-white/[0.2]"
                    : "text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-white/[0.02]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((prod) => (
            <div
              key={prod.id}
              className="glass-panel rounded-3xl border border-slate-200 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/[0.18] transition-all duration-300 p-6 flex flex-col justify-between group overflow-hidden shadow-xl"
            >
              <div className="space-y-4">
                {/* Product Image Thumbnail */}
                <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-slate-200 dark:border-white/[0.1] bg-slate-950 dark:bg-[#070b14]">
                  <Image
                    src={prod.image}
                    alt={prod.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                  <div className="absolute inset-0 bg-slate-950/20 dark:bg-[#06090e]/40 pointer-events-none" />
                  <div className="absolute top-2.5 left-2.5">
                    <StatusBadge status={prod.status} size="sm" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-medium">
                    {prod.categoryName}
                  </span>
                  <BrandTagBadge tag={prod.brandTag} />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                    {prod.name}
                  </h3>
                  {prod.formerName && (
                    <span className="text-[11px] font-mono text-slate-400 dark:text-neutral-500 block">
                      formerly {prod.formerName}
                    </span>
                  )}
                  <p className="text-xs text-cyan-600 dark:text-cyan-400/80 mt-1 font-medium">
                    {prod.tagline}
                  </p>
                </div>

                <p className="text-xs text-slate-600 dark:text-neutral-300 leading-relaxed line-clamp-3">
                  {prod.shortDescription}
                </p>

                {/* Key Capabilities */}
                <div className="space-y-1.5 pt-3 border-t border-slate-200 dark:border-white/[0.06]">
                  {prod.keyCapabilities.slice(0, 2).map((cap, i) => (
                    <div key={i} className="flex items-start gap-2 text-[11px] text-slate-600 dark:text-neutral-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                      <span className="line-clamp-1">{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Footer */}
              <div className="pt-6 mt-6 border-t border-slate-200 dark:border-white/[0.06] flex items-center justify-between">
                <Link
                  href={`/products/${prod.slug}`}
                  className="inline-flex items-center justify-between w-full text-xs font-semibold text-cyan-600 dark:text-cyan-400 group-hover:text-cyan-700 dark:group-hover:text-cyan-300"
                >
                  <span>
                    {prod.status === "Delivered" ? "View Product & Specs" : "View Development RFC"}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
