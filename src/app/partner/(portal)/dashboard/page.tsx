"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { loadPortalJson } from "@/lib/referral/client";
import { PartnerHeader } from "@/components/referral/PartnerHeader";
import { DealStatusBadge } from "@/components/referral/DealStatusBadge";
import { CommissionStatusBadge } from "@/components/referral/CommissionStatusBadge";
import { PartnerSummary, ReferralRecord } from "@/types/referral";
import {
  Coins,
  TrendingUp,
  Clock,
  CheckCircle,
  PlusCircle,
  ArrowRight,
  ShieldCheck,
  Building2,
} from "lucide-react";

export default function PartnerDashboardPage() {
  const [summary, setSummary] = useState<PartnerSummary | null>(null);
  const [recentReferrals, setRecentReferrals] = useState<ReferralRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    Promise.all([
      loadPortalJson("/api/referral/session?view=summary"),
      loadPortalJson("/api/referral/referrals"),
    ])
      .then(([session, data]) => {
        setSummary(session.summary);
        setRecentReferrals(data.referrals.slice(0, 5));
      })
      .catch((error) => setLoadError(error.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#04060a] text-slate-800 dark:text-neutral-200">
      <PartnerHeader />
      {loadError && <p role="alert" className="mx-auto max-w-7xl px-4 py-4 text-sm text-rose-600">{loadError}</p>}


      <main hidden={Boolean(loadError)} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Welcome Banner */}
        <div className="relative overflow-hidden rounded-xl p-6 sm:p-8 bg-slate-900 text-white shadow-sm border border-slate-800">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs tabular-nums bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Partner Code: {summary?.profile?.partnerCode ?? "Unavailable"}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                Welcome back, {summary?.partner?.name || "Partner"}
              </h1>
              <p className="text-sm text-slate-300 leading-relaxed">
                {(summary?.profile?.companyName ? `${summary.profile.companyName} • ` : "")}Submit prospective client deals, monitor commercial review approvals, and track earned commissions upon qualifying receipts.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="/partner/referrals/new"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-black bg-cyan-400 hover:bg-cyan-300 shadow-sm  transition-colors"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Submit New Referral</span>
              </Link>

              <Link
                href="/partner/commissions"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-white bg-white/10 hover:bg-white/15 border border-white/20 transition-colors"
              >
                <Coins className="w-4 h-4 text-cyan-400" />
                <span>View Payouts</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Overview Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Total Pipeline */}
          <div className="p-5 rounded-xl surface-panel border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] space-y-3">
            <div className="flex items-center justify-between text-xs tabular-nums text-slate-500 dark:text-neutral-400">
              <span>APPROVED PIPELINE</span>
              <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-500">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold tabular-nums text-slate-900 dark:text-white">
                ₹{(summary?.totalApprovedPipeline || 0).toLocaleString("en-IN")}
              </div>
              <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1">
                Across {summary?.wonCount || 0} won & {summary?.activeLeadsCount || 0} active leads
              </p>
            </div>
          </div>

          {/* Pending Review */}
          <div className="p-5 rounded-xl surface-panel border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] space-y-3">
            <div className="flex items-center justify-between text-xs tabular-nums text-slate-500 dark:text-neutral-400">
              <span>PENDING REVIEW</span>
              <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500">
                <Clock className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold tabular-nums text-amber-600 dark:text-amber-400">
                {summary?.pendingReviewCount || 0}
              </div>
              <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1">
                Awaiting agency terms approval
              </p>
            </div>
          </div>

          {/* Total Commission Earned */}
          <div className="p-5 rounded-xl surface-panel border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] space-y-3">
            <div className="flex items-center justify-between text-xs tabular-nums text-slate-500 dark:text-neutral-400">
              <span>EARNED COMMISSION</span>
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500">
                <CheckCircle className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
                ₹{(summary?.commissionEarned || 0).toLocaleString("en-IN")}
              </div>
              <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1">
                From verified customer receipts
              </p>
            </div>
          </div>

          {/* Available for Payout */}
          <div className="p-5 rounded-xl surface-panel border border-cyan-500/30 bg-cyan-500/[0.03] dark:bg-cyan-500/[0.02] space-y-3">
            <div className="flex items-center justify-between text-xs tabular-nums text-cyan-600 dark:text-cyan-400">
              <span>AVAILABLE BALANCE</span>
              <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-500">
                <Coins className="w-4 h-4" />
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold tabular-nums text-slate-900 dark:text-white">
                ₹{(summary?.commissionAvailable || 0).toLocaleString("en-IN")}
              </div>
              <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1">
                Paid to date: ₹{(summary?.commissionPaid || 0).toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>

        {/* Recent Submissions */}
        <div className="rounded-xl surface-panel border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] overflow-hidden shadow-sm">
          <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-white/[0.06] flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Recent Referral Deals
              </h2>
              <p className="text-xs text-slate-500 dark:text-neutral-400">
                Your submitted opportunities and their current commercial verification stage
              </p>
            </div>

            <Link
              href="/partner/referrals"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
            >
              <span>View All Referrals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {loading ? (
            <div className="p-12 text-center text-sm text-slate-500">Loading referral records...</div>
          ) : recentReferrals.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <p className="text-sm text-slate-500 dark:text-neutral-400">
                No referrals submitted yet. Submit your first client deal to start tracking commercial terms.
              </p>
              <Link
                href="/partner/referrals/new"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-black bg-cyan-400 hover:bg-cyan-300"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Submit Referral</span>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.01] text-xs tabular-nums uppercase text-slate-500 dark:text-neutral-400">
                    <th className="py-3 px-4 sm:px-6">Customer / Company</th>
                    <th className="py-3 px-4">Solution / Scope</th>
                    <th className="py-3 px-4">Proposed Quote</th>
                    <th className="py-3 px-4">Approved Quote</th>
                    <th className="py-3 px-4">Deal Status</th>
                    <th className="py-3 px-4">Commission</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-white/[0.06]">
                  {recentReferrals.map((r) => (
                    <tr
                      key={r.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="py-4 px-4 sm:px-6">
                        <div className="font-semibold text-slate-900 dark:text-white">
                          {r.customerName}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-neutral-400 flex items-center gap-1.5 mt-0.5">
                          {r.companyName ? (
                            <>
                              <Building2 className="w-3 h-3 text-slate-400" />
                              <span>{r.companyName}</span>
                            </>
                          ) : (
                            <span>{r.city || "Direct Lead"}</span>
                          )}
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <div className="font-medium text-slate-800 dark:text-neutral-200 line-clamp-1">
                          {r.referralType === "catalogue"
                            ? r.productNameSnapshot || r.productId
                            : r.customProjectTitle}
                        </div>
                        <div className="text-xs tabular-nums text-slate-400 capitalize">
                          {r.referralType === "catalogue" ? "Catalogue Product" : "Custom Project"}
                        </div>
                      </td>

                      <td className="py-4 px-4 tabular-nums font-medium text-slate-700 dark:text-neutral-300">
                        ₹{r.proposedQuoteAmount.toLocaleString("en-IN")}
                      </td>

                      <td className="py-4 px-4 tabular-nums">
                        {r.approvedQuoteAmount ? (
                          <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                            ₹{r.approvedQuoteAmount.toLocaleString("en-IN")}
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400 italic">Pending Review</span>
                        )}
                      </td>

                      <td className="py-4 px-4">
                        <DealStatusBadge status={r.dealStatus} size="sm" />
                      </td>

                      <td className="py-4 px-4">
                        <CommissionStatusBadge status={r.commissionStatus} size="sm" />
                      </td>

                      <td className="py-4 px-4 text-right">
                        <Link
                          href={`/partner/referrals/${r.id}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 transition-colors"
                        >
                          <span>Inspect</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
