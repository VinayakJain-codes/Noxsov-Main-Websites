"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { StoreProduct, PricingTierDetail } from "@/types/store";
import { StatusBadge } from "@/components/ui/StatusBadge";
import {
  Mail,
  Star,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

interface StoreProductCardProps {
  product: StoreProduct;
}

export function StoreProductCard({ product }: StoreProductCardProps) {
  const [selectedTierIndex, setSelectedTierIndex] = useState(
    product.pricing.findIndex((t) => t.popular) !== -1
      ? product.pricing.findIndex((t) => t.popular)
      : 0
  );

  const activeTier: PricingTierDetail =
    product.pricing[selectedTierIndex] || product.pricing[0];

  return (
    <div className="glass-panel rounded-3xl border border-slate-200 dark:border-white/[0.08] hover:border-cyan-500/40 dark:hover:border-cyan-500/40 transition-all duration-300 shadow-xl overflow-hidden flex flex-col justify-between group">
      {/* Top Media & Badges */}
      <div>
        <div className="relative aspect-[16/9] w-full bg-slate-950 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />

          {/* Top badges */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
            <StatusBadge status={product.status} />
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-cyan-400 border border-white/[0.1] font-semibold">
              {product.version}
            </span>
          </div>

          {/* Delivery tag on image bottom */}
          <div className="absolute bottom-2.5 left-3 flex items-center gap-1.5 text-[11px] text-white/90 font-mono backdrop-blur-md px-2 py-0.5 rounded bg-black/40">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>{product.deliveryType}</span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-6 space-y-4">
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 font-bold uppercase tracking-wider">
                {product.categoryName}
              </span>
              <div className="flex items-center gap-1 text-amber-500 text-xs font-bold font-mono">
                <Star className="w-3.5 h-3.5 fill-amber-500" />
                <span>{product.rating}</span>
                <span className="text-slate-400 dark:text-neutral-500 font-normal">
                  ({product.reviewsCount})
                </span>
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1 group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
              <Link href={`/products/${product.slug}`}>{product.name}</Link>
            </h3>

            <p className="text-xs text-slate-600 dark:text-neutral-400 mt-1 line-clamp-2">
              {product.tagline}
            </p>
          </div>

          {/* Platform tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {product.platforms.slice(0, 3).map((plat, i) => (
              <span
                key={i}
                className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-white/[0.04] text-slate-600 dark:text-neutral-300 border border-slate-200 dark:border-white/[0.06]"
              >
                {plat}
              </span>
            ))}
          </div>

          {/* Tier Selector & Scope Configuration */}
          <div className="p-3.5 rounded-2xl bg-slate-100/70 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] space-y-3">
            {/* Tier Select Buttons */}
            {product.pricing.length > 1 && (
              <div className="space-y-1">
                <label className="text-[11px] font-medium text-slate-500 dark:text-neutral-400 flex items-center justify-between">
                  <span>Deployment Tier:</span>
                  <span className="text-cyan-600 dark:text-cyan-400 font-bold text-[10px]">
                    {activeTier.maxNodes}
                  </span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                  {product.pricing.map((tier, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedTierIndex(idx)}
                      className={`px-2 py-1.5 rounded-lg text-[11px] font-semibold transition-all truncate text-center ${
                        selectedTierIndex === idx
                          ? "bg-cyan-500/15 border border-cyan-500 text-cyan-800 dark:text-cyan-300 shadow-sm"
                          : "border border-transparent bg-white/60 dark:bg-white/[0.03] text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white"
                      }`}
                      title={tier.name}
                    >
                      {tier.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Scope & Commercial Notice */}
            <div className="flex items-center justify-between pt-1 border-t border-slate-200 dark:border-white/[0.06]">
              <span className="text-xs text-slate-500 dark:text-neutral-400">
                Commercial Model:
              </span>
              <span className="text-xs font-mono font-semibold text-cyan-700 dark:text-cyan-300">
                Enterprise Quote
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer Buttons */}
      <div className="p-5 sm:p-6 pt-0 space-y-2">
        <Link
          href={`/contact?product=${product.slug}&tier=${encodeURIComponent(activeTier.name)}`}
          className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-bold text-black bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 shadow-md shadow-cyan-500/20 active:scale-[0.98] transition-all text-center"
        >
          <Mail className="w-3.5 h-3.5" />
          <span>Request Deployment Quote</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        <Link
          href={`/products/${product.slug}`}
          className="w-full flex items-center justify-center gap-1 py-1 text-[11px] text-slate-500 dark:text-neutral-400 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors group/link"
        >
          <span>View Deep Architecture & Specifications</span>
          <ArrowRight className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
