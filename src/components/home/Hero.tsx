"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "@/data/products";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ArrowRight, ChevronRight, CheckCircle2, ShoppingBag, KeyRound } from "lucide-react";

export function Hero() {
  const [selectedProductSlug, setSelectedProductSlug] = useState("kryptik");
  const activeProduct = PRODUCTS.find((p) => p.slug === selectedProductSlug) || PRODUCTS[0];

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-grid-pattern">
      {/* Background ambient lighting glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-tr from-cyan-500/15 via-indigo-500/10 to-blue-500/15 rounded-full blur-[120px] pointer-events-none -z-10" />
      <div className="absolute top-20 right-10 w-[350px] h-[350px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Announcement Pill */}
        <div className="flex justify-center mb-6">
          <Link
            href="/store"
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full glass-panel border border-cyan-500/30 text-xs text-slate-800 dark:text-neutral-200 shadow-lg shadow-cyan-500/10 hover:border-cyan-400/50 transition-colors"
          >
            <div className="w-4 h-4 rounded-md overflow-hidden shrink-0">
              <Image
                src="/noxsov-logo.png"
                alt="NOXSOV"
                width={16}
                height={16}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-medium text-slate-600 dark:text-neutral-300">Official Release:</span>
            <span className="text-cyan-600 dark:text-cyan-400 font-semibold">The Sovereign Software Store</span>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 dark:text-neutral-400" />
          </Link>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1]">
            One Sovereign Foundation. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-600 via-sky-500 to-indigo-600 dark:from-cyan-400 dark:via-sky-300 dark:to-indigo-400 bg-clip-text text-transparent">
              Mission-Critical Software.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 dark:text-neutral-300 max-w-2xl mx-auto leading-relaxed">
            NOXSOV delivers sovereign software systems across <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Security</span>, <span className="text-amber-600 dark:text-amber-400 font-semibold">Finance</span>, and <span className="text-blue-600 dark:text-blue-400 font-semibold">Enterprise IT</span>—with instant cryptographic licensing, air-gapped readiness, and zero per-seat taxes.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link
              id="hero-store-btn"
              href="/store"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-black bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all active:scale-[0.98]"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Browse Software Store</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              id="hero-license-portal-btn"
              href="/store/license"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm text-slate-900 dark:text-white glass-panel hover:bg-slate-200/50 dark:hover:bg-white/[0.08] border border-slate-300 dark:border-white/[0.12] transition-colors"
            >
              <KeyRound className="w-4 h-4 text-cyan-500" />
              <span>Verify License Portal</span>
            </Link>
          </div>

          {/* Ecosystem Highlights */}
          <div className="pt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
            <div className="glass-panel p-3.5 rounded-xl border border-slate-200 dark:border-white/[0.06]">
              <div className="text-xl font-bold text-slate-900 dark:text-white font-mono">5 Solutions</div>
              <div className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">3 Core Domains</div>
            </div>
            <div className="glass-panel p-3.5 rounded-xl border border-slate-200 dark:border-white/[0.06]">
              <div className="text-xl font-bold text-emerald-600 dark:text-emerald-400 font-mono">Sub-1.2ms</div>
              <div className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">Kernel Telemetry</div>
            </div>
            <div className="glass-panel p-3.5 rounded-xl border border-slate-200 dark:border-white/[0.06]">
              <div className="text-xl font-bold text-cyan-600 dark:text-cyan-400 font-mono">100% Sovereign</div>
              <div className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">Air-Gapped Ready</div>
            </div>
            <div className="glass-panel p-3.5 rounded-xl border border-slate-200 dark:border-white/[0.06]">
              <div className="text-xl font-bold text-indigo-600 dark:text-indigo-400 font-mono">Zero Lock-In</div>
              <div className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">Open Integrations</div>
            </div>
          </div>
        </div>

        {/* Interactive Real Product Showcase Console */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="glass-panel rounded-2xl border border-slate-200 dark:border-white/[0.12] p-2 sm:p-4 shadow-2xl shadow-slate-900/5 dark:shadow-cyan-950/40 relative">
            {/* Top Control Bar with Product Tabs */}
            <div className="flex flex-wrap items-center justify-between gap-2 p-2 border-b border-slate-200 dark:border-white/[0.08] mb-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
                {PRODUCTS.map((prod) => {
                  const isSelected = prod.slug === selectedProductSlug;
                  return (
                    <button
                      key={prod.id}
                      type="button"
                      onClick={() => setSelectedProductSlug(prod.slug)}
                      className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                        isSelected
                          ? "bg-cyan-500/10 dark:bg-white/[0.1] text-cyan-700 dark:text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10"
                          : "text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.04] border border-transparent"
                      }`}
                    >
                      <span>{prod.name}</span>
                      {prod.status === "Delivered" && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      )}
                      {prod.status === "In progress" && (
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                      )}
                      {prod.status === "Concept" && (
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                      )}
                    </button>
                  );
                })}
              </div>

              <div className="hidden md:flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-neutral-400">
                <div className="w-4 h-4 rounded overflow-hidden shrink-0">
                  <Image
                    src="/noxsov-logo.png"
                    alt="NOXSOV Ecosystem"
                    width={16}
                    height={16}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-cyan-600 dark:text-cyan-400 font-bold">{activeProduct.brandTag}</span>
              </div>
            </div>

            {/* Active Product Details & Screenshot Display */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 p-2 sm:p-4 items-center">
              {/* Left Info Panel */}
              <div className="lg:col-span-4 space-y-4 text-left">
                <div className="flex items-center gap-2">
                  <StatusBadge status={activeProduct.status} />
                  {activeProduct.formerName && (
                    <span className="text-[11px] text-slate-500 dark:text-neutral-400 font-mono">
                      (formerly {activeProduct.formerName})
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                    {activeProduct.name}
                  </h3>
                  <p className="text-xs font-mono text-cyan-600 dark:text-cyan-400 mt-0.5">
                    Category: {activeProduct.categoryName}
                  </p>
                </div>

                <p className="text-sm text-slate-600 dark:text-neutral-300 leading-relaxed">
                  {activeProduct.shortDescription}
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-white/[0.06]">
                  {activeProduct.keyCapabilities.slice(0, 3).map((cap, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-700 dark:text-neutral-300">
                      <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3">
                  <Link
                    href={`/products/${activeProduct.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 group"
                  >
                    <span>Full Product Specifications & Deep-Dive</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>

              {/* Right Screenshot Showcase */}
              <div className="lg:col-span-8 relative rounded-xl overflow-hidden border border-slate-200 dark:border-white/[0.1] bg-slate-950 dark:bg-[#070b14] shadow-xl group">
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={activeProduct.image}
                    alt={`${activeProduct.name} interface dashboard`}
                    fill
                    priority
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 650px"
                  />
                  {/* Subtle glass reflection overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 dark:from-[#06090e]/70 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Bottom caption banner */}
                <div className="absolute bottom-3 left-3 right-3 glass-panel px-3 py-2 rounded-lg border border-slate-200/50 dark:border-white/[0.1] flex items-center justify-between text-xs backdrop-blur-md">
                  <span className="text-white font-medium truncate">
                    {activeProduct.name} Production Interface
                  </span>
                  <Link
                    href={`/products/${activeProduct.slug}`}
                    className="text-cyan-400 font-semibold hover:underline shrink-0 flex items-center gap-1 text-[11px]"
                  >
                    View Details &rarr;
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
