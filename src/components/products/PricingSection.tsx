"use client";

import Link from "next/link";
import { PricingTier } from "@/data/products";
import { Check, ArrowRight, ShieldCheck, Mail } from "lucide-react";

interface PricingSectionProps {
  productName: string;
  productSlug: string;
  pricing: PricingTier[];
}

export function PricingSection({ productName, productSlug, pricing }: PricingSectionProps) {
  return (
    <section id="deployment-tiers" className="py-20 border-t border-slate-200 dark:border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Commercial Deployment Options</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Tailored Enterprise Deployment. Zero Per-User SaaS Taxes.
          </h2>
          <p className="text-sm text-slate-600 dark:text-neutral-300 leading-relaxed">
            Select the operational tier that aligns with your agency fleet or facility footprint. Contact our engineering team to receive a tailored deployment briefing and custom commercial quote.
          </p>
        </div>

        {/* Deployment Tier Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {pricing.map((tier, idx) => {
            const isPopular = tier.popular;

            return (
              <div
                key={idx}
                className={`glass-panel rounded-3xl p-8 flex flex-col justify-between relative transition-all duration-300 ${
                  isPopular
                    ? "border-cyan-500/50 shadow-2xl shadow-cyan-500/10 dark:shadow-cyan-950/50 bg-white/95 dark:bg-[#0d1424]/90 scale-105 z-10"
                    : "border-slate-200 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/[0.18]"
                }`}
              >
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-cyan-400 text-black text-[11px] font-bold uppercase tracking-wider shadow-md shadow-cyan-400/30">
                    Recommended
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">{tier.name}</h3>
                    <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1 min-h-[32px]">{tier.tagline}</p>
                  </div>

                  <div className="border-y border-slate-200 dark:border-white/[0.06] py-5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-400">
                        Commercial Terms
                      </span>
                      <span className="text-xs font-mono px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 font-semibold">
                        Custom Enterprise
                      </span>
                    </div>
                    <div className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                      Inquire for Fleet Pricing
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-neutral-400 font-mono mt-0.5">
                      Tailored to active nodes, sites & SLAs
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-400">
                      Included Capabilities & Scopes:
                    </div>
                    <ul className="space-y-2.5 text-xs text-slate-700 dark:text-neutral-300">
                      {tier.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-8 mt-6">
                  <Link
                    href={`/contact?product=${productSlug}&tier=${encodeURIComponent(tier.name)}`}
                    className={`w-full inline-flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl text-xs font-semibold transition-all ${
                      isPopular
                        ? "bg-cyan-400 hover:bg-cyan-300 text-black shadow-lg shadow-cyan-500/25 active:scale-[0.98]"
                        : "bg-slate-900 text-white dark:bg-white dark:text-black hover:opacity-90 shadow-md"
                    }`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>Request {tier.name} Quote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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
