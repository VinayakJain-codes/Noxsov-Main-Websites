"use client";

import { useState } from "react";
import Link from "next/link";
import { Calculator, ArrowRight, ShieldCheck, TrendingDown } from "lucide-react";

const formatNumber = (num: number) => {
  return num.toLocaleString("en-US");
};

export function RoiCalculator() {
  const [endpoints, setEndpoints] = useState(250);
  const [legacyPerSeat, setLegacyPerSeat] = useState(85);

  const legacyAnnualCost = endpoints * legacyPerSeat * 12;

  // NOXSOV flat license structure:
  // Flat tier based on scale rather than punitive per-seat linear multiplication
  let noxsovAnnualCost = 28000;
  if (endpoints <= 100) {
    noxsovAnnualCost = 14400; // ~1200/mo
  } else if (endpoints <= 500) {
    noxsovAnnualCost = 32000; // ~2666/mo
  } else if (endpoints <= 2000) {
    noxsovAnnualCost = 58000; // ~4833/mo
  } else {
    noxsovAnnualCost = 96000; // Enterprise unbounded sovereign deployment
  }

  const annualSavings = Math.max(0, legacyAnnualCost - noxsovAnnualCost);
  const savingsPercent = Math.round((annualSavings / legacyAnnualCost) * 100);

  return (
    <section id="tco-calculator" className="py-20 border-t border-slate-200 dark:border-white/[0.08] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold
            bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
            <Calculator className="w-3.5 h-3.5" />
            <span>Economic Sovereignty & TCO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Stop Paying the Per-Seat SaaS Tax
          </h2>
          <p className="text-sm text-slate-600 dark:text-neutral-300 leading-relaxed">
            Legacy SaaS platforms penalize your growth by multiplying per-seat seat fees while charging extra for audit logs and air-gapped isolation. NOXSOV provides predictable, flat sovereign node pricing.
          </p>
        </div>

        <div className="max-w-4xl mx-auto glass-panel rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-white/[0.1] shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Config Sliders */}
            <div className="lg:col-span-7 space-y-6">
              {/* Slider 1: Endpoints / Users */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <label htmlFor="endpoints-slider" className="text-slate-700 dark:text-neutral-300 font-semibold">
                    Protected Endpoints / Active Users:
                  </label>
                  <span className="text-cyan-600 dark:text-cyan-400 font-bold text-sm">
                    {formatNumber(endpoints)} seats
                  </span>
                </div>
                <input
                  id="endpoints-slider"
                  type="range"
                  min="25"
                  max="2500"
                  step="25"
                  value={endpoints}
                  onChange={(e) => setEndpoints(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-white/[0.1] rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-400 dark:text-neutral-500">
                  <span>25 nodes</span>
                  <span>500 nodes</span>
                  <span>1,500 nodes</span>
                  <span>2,500+ nodes</span>
                </div>
              </div>

              {/* Slider 2: Legacy Cost per seat */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono">
                  <label htmlFor="per-seat-slider" className="text-slate-700 dark:text-neutral-300 font-semibold">
                    Current Legacy SaaS Cost:
                  </label>
                  <span className="text-slate-900 dark:text-white font-bold text-sm">
                    ${legacyPerSeat} / seat / month
                  </span>
                </div>
                <input
                  id="per-seat-slider"
                  type="range"
                  min="30"
                  max="200"
                  step="5"
                  value={legacyPerSeat}
                  onChange={(e) => setLegacyPerSeat(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 dark:bg-white/[0.1] rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-400 dark:text-neutral-500">
                  <span>$30/mo (Basic)</span>
                  <span>$85/mo (Industry Avg)</span>
                  <span>$200/mo (Enterprise)</span>
                </div>
              </div>

              {/* Key Features included */}
              <div className="pt-2 grid grid-cols-2 gap-2 text-xs font-mono text-slate-600 dark:text-neutral-300">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Zero per-seat escalations</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>100% data custody</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Air-gapped deployment</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>Full source verification</span>
                </div>
              </div>
            </div>

            {/* Right Output Panel */}
            <div className="lg:col-span-5 rounded-2xl p-6 bg-slate-100/90 dark:bg-[#080d16] border border-slate-200 dark:border-cyan-500/30 flex flex-col justify-between space-y-6">
              <div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-400 mb-1">
                  Estimated Annual Capital Savings
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 font-mono tracking-tight flex items-baseline gap-1">
                  <span>${formatNumber(annualSavings)}</span>
                  <span className="text-xs font-sans text-slate-500 dark:text-neutral-400 font-normal">
                    / year
                  </span>
                </div>
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 mt-2">
                  <TrendingDown className="w-3.5 h-3.5" />
                  <span>{savingsPercent}% lower Total Cost of Ownership</span>
                </div>
              </div>

              <div className="space-y-2 border-t border-slate-200 dark:border-white/[0.08] pt-4 text-xs font-mono">
                <div className="flex justify-between text-slate-600 dark:text-neutral-400">
                  <span>Legacy Multiplied SaaS:</span>
                  <span className="line-through text-red-500/80 dark:text-red-400/80">
                    ${formatNumber(legacyAnnualCost)} / yr
                  </span>
                </div>
                <div className="flex justify-between font-bold text-slate-900 dark:text-white">
                  <span>NOXSOV Sovereign Tier:</span>
                  <span className="text-cyan-600 dark:text-cyan-400">
                    ${formatNumber(noxsovAnnualCost)} / yr flat
                  </span>
                </div>
              </div>

              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-black bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 shadow-md shadow-cyan-500/20 transition-all active:scale-[0.98]"
              >
                <span>Request Custom TCO Breakdown</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
