"use client";

import { useState } from "react";
import Link from "next/link";
import { PricingTier } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Check, ArrowRight, ShoppingCart, Zap } from "lucide-react";

interface PricingSectionProps {
  productName: string;
  productSlug: string;
  pricing: PricingTier[];
}

export function PricingSection({ productName, productSlug, pricing }: PricingSectionProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");
  const { addItem, setIsCheckoutOpen } = useCart();
  const [addedTier, setAddedTier] = useState<string | null>(null);

  // Helper to extract a numeric price or fallback
  const getNumericPrice = (priceStr: string): number => {
    const cleaned = priceStr.replace(/[^0-9]/g, "");
    if (!cleaned) return 29999;
    const num = parseInt(cleaned, 10);
    // If priced in dollars (e.g. $75), convert approximately to INR equivalent or scaled monthly tier
    return num < 1000 ? num * 85 * 30 : num;
  };

  const handleAddToCart = (tier: PricingTier) => {
    const priceStr = billingCycle === "annual" ? tier.priceAnnual : tier.priceMonthly;
    const numeric = getNumericPrice(priceStr);

    addItem({
      productSlug,
      productName,
      brandTag: `${productName} by NOXSOV`,
      tierName: tier.name,
      billingCycle,
      pricePerUnit: numeric,
      priceFormatted: priceStr,
      quantity: 1,
      categoryId: "security",
    });

    setAddedTier(tier.name);
    setTimeout(() => setAddedTier(null), 2000);
  };

  const handleBuyNow = (tier: PricingTier) => {
    const priceStr = billingCycle === "annual" ? tier.priceAnnual : tier.priceMonthly;
    const numeric = getNumericPrice(priceStr);

    addItem({
      productSlug,
      productName,
      brandTag: `${productName} by NOXSOV`,
      tierName: tier.name,
      billingCycle,
      pricePerUnit: numeric,
      priceFormatted: priceStr,
      quantity: 1,
      categoryId: "security",
    });

    setIsCheckoutOpen(true);
  };

  return (
    <section id="pricing" className="py-20 border-t border-slate-200 dark:border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
            <span>Transparent Commercial Tiers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Predictable Pricing. Zero Per-User Penalty.
          </h2>
          <p className="text-sm text-slate-600 dark:text-neutral-300 leading-relaxed">
            Choose the deployment tier that matches your operational scale. All plans include continuous security updates and data sovereignty.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="inline-flex items-center p-1 rounded-xl bg-slate-200/60 dark:bg-white/[0.04] border border-slate-300/80 dark:border-white/[0.08] mt-4">
            <button
              type="button"
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                billingCycle === "monthly"
                  ? "bg-white text-slate-900 shadow-sm dark:bg-white/[0.1] dark:text-white"
                  : "text-slate-600 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white"
              }`}
            >
              Monthly Billing
            </button>
            <button
              type="button"
              onClick={() => setBillingCycle("annual")}
              className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 ${
                billingCycle === "annual"
                  ? "bg-cyan-500 text-black shadow-md shadow-cyan-500/20"
                  : "text-slate-600 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white"
              }`}
            >
              <span>Annual Billing</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                billingCycle === "annual" ? "bg-black/20 text-black" : "bg-cyan-500/20 text-cyan-700 dark:text-cyan-300"
              }`}>
                Save 15%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
          {pricing.map((tier, idx) => {
            const isPopular = tier.popular;
            const price = billingCycle === "annual" ? tier.priceAnnual : tier.priceMonthly;
            const isCustom = price.toLowerCase().includes("custom") || price.toLowerCase().includes("volume");

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
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-extrabold text-slate-900 dark:text-white font-mono tracking-tight">
                        {price}
                      </span>
                      {!isCustom && (
                        <span className="text-xs text-slate-500 dark:text-neutral-400">
                          {price.includes("%") ? "" : "/ month"}
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-slate-500 dark:text-neutral-400 font-mono mt-1">
                      {billingCycle === "annual" ? "Billed annually" : "Billed monthly"}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-400">
                      Included Capabilities:
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

                <div className="pt-8 mt-6 space-y-2">
                  {isCustom ? (
                    <Link
                      href={`/contact?product=${productSlug}&tier=${encodeURIComponent(tier.name)}`}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold glass-panel hover:bg-slate-200/60 dark:hover:bg-white/[0.08] text-slate-800 dark:text-white border border-slate-300 dark:border-white/[0.12] transition-all"
                    >
                      <span>Contact Enterprise Sales</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={() => handleBuyNow(tier)}
                        className={`w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold transition-all ${
                          isPopular
                            ? "bg-cyan-400 hover:bg-cyan-300 text-black shadow-lg shadow-cyan-500/25 active:scale-[0.98]"
                            : "bg-slate-900 text-white dark:bg-white dark:text-black hover:opacity-90 shadow-md"
                        }`}
                      >
                        <Zap className="w-3.5 h-3.5" />
                        <span>Instant Buy License</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleAddToCart(tier)}
                        className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-semibold text-slate-700 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-white/[0.05] border border-slate-200 dark:border-white/[0.08] transition-colors"
                      >
                        <ShoppingCart className="w-3.5 h-3.5 text-cyan-500" />
                        <span>{addedTier === tier.name ? "Added to Cart ✓" : "Add to Cart"}</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
