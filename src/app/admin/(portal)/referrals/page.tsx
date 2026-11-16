"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { loadPortalJson } from "@/lib/referral/client";
import { AdminHeader } from "@/components/referral/AdminHeader";
import { DealStatusBadge } from "@/components/referral/DealStatusBadge";
import { CommissionStatusBadge } from "@/components/referral/CommissionStatusBadge";
import { ReferralRecord, AdminSummary } from "@/types/referral";
import {
  Search,
  Download,
  ArrowRight,
  Clock,
  TrendingUp,
  Coins,
  CheckCircle,
} from "lucide-react";

export default function AdminReferralsPage() {
  const [summary, setSummary] = useState<AdminSummary | null>(null);
  const [referrals, setReferrals] = useState<ReferralRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedPartner, setSelectedPartner] = useState<string>("all");

  useEffect(() => {
    Promise.all([loadPortalJson("/api/referral/session?view=summary"), loadPortalJson("/api/referral/referrals")])
      .then(([session, data]) => {
        setSummary(session.summary);
        setReferrals(data.referrals);
      })
      .catch((error) => setLoadError(error.message))
      .finally(() => setLoading(false));
  }, []);

  const partnersList = [...new Map(referrals.map((referral) => [referral.partnerId, referral.partnerName]))];

  const filteredReferrals = referrals.filter((r) => {
    const matchesSearch =
      r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.companyName && r.companyName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      r.partnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.productNameSnapshot && r.productNameSnapshot.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (r.customProjectTitle && r.customProjectTitle.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;
    if (selectedPartner !== "all" && r.partnerId !== selectedPartner) return false;
    if (selectedStatus === "all") return true;
    if (selectedStatus === "pending_review") return r.dealStatus === "pending_review";
    if (selectedStatus === "active") {
      return ["approved", "contacted", "qualified", "proposal_sent", "negotiation"].includes(
        r.dealStatus
      );
    }
    return r.dealStatus === selectedStatus;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#04060a] text-slate-800 dark:text-neutral-200">
      <AdminHeader />
      {loadError && <p role="alert" className="mx-auto max-w-7xl px-4 py-4 text-sm text-rose-600">{loadError}</p>}

      <main hidden={Boolean(loadError)} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Title */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Referral Deals Administration
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 mt-1">
              Review partner-submitted proposals, authorize commercial pricing & commission terms, and assign sales owners.
            </p>
          </div>

          <button
            type="button"
            onClick={() => window.open("/api/referral/export", "_blank")}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.04] text-slate-700 dark:text-neutral-200 hover:border-cyan-500/40 shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-cyan-500" />
            <span>Export Complete Dataset (.CSV)</span>
          </button>
        </div>

        {/* Agency Metrics Banner */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl surface-panel border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] space-y-2">
            <div className="flex items-center justify-between text-xs tabular-nums text-slate-500">
              <span>AWAITING REVIEW</span>
              <div className="p-1 rounded bg-amber-500/10 text-amber-500">
                <Clock className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl font-bold tabular-nums text-amber-600 dark:text-amber-400">
              {summary?.pendingReviewCount || 0}
            </div>
            <p className="text-xs text-slate-400">New submissions needing approval</p>
          </div>

          <div className="p-5 rounded-xl surface-panel border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] space-y-2">
            <div className="flex items-center justify-between text-xs tabular-nums text-slate-500">
              <span>ACTIVE PIPELINE</span>
              <div className="p-1 rounded bg-blue-500/10 text-blue-500">
                <TrendingUp className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl font-bold tabular-nums text-slate-900 dark:text-white">
              ₹{(summary?.totalApprovedValue || 0).toLocaleString("en-IN")}
            </div>
            <p className="text-xs text-slate-400">
              Across {summary?.activeLeadsCount || 0} active & {summary?.wonCount || 0} won deals
            </p>
          </div>

          <div className="p-5 rounded-xl surface-panel border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] space-y-2">
            <div className="flex items-center justify-between text-xs tabular-nums text-slate-500">
              <span>COMMISSION EARNED</span>
              <div className="p-1 rounded bg-emerald-500/10 text-emerald-500">
                <CheckCircle className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
              ₹{(summary?.totalCommissionEarned || 0).toLocaleString("en-IN")}
            </div>
            <p className="text-xs text-slate-400">Accrued against customer receipts</p>
          </div>

          <div className="p-5 rounded-xl surface-panel border border-cyan-500/30 bg-cyan-500/[0.03] space-y-2">
            <div className="flex items-center justify-between text-xs tabular-nums text-cyan-600 dark:text-cyan-400">
              <span>DISBURSED PAYOUTS</span>
              <div className="p-1 rounded bg-cyan-500/10 text-cyan-500">
                <Coins className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="text-2xl font-bold tabular-nums text-slate-900 dark:text-white">
              ₹{(summary?.totalCommissionPaid || 0).toLocaleString("en-IN")}
            </div>
            <p className="text-xs text-slate-400">
              Available to disburse: ₹{(summary?.totalCommissionAvailable || 0).toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        {/* Filters Toolbar */}
        <div className="p-4 rounded-xl surface-panel border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search referral ID, client, partner, scope..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.04] text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Partner Filter */}
            <select
              value={selectedPartner}
              onChange={(e) => setSelectedPartner(e.target.value)}
              className="p-2 text-xs rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-[#0c101a] text-slate-900 dark:text-white"
            >
              <option value="all">All Partners</option>
              {partnersList.map(([id, name]) => (
                  <option key={id} value={id}>{name}</option>
                ))}
            </select>
          </div>

          {/* Status Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
            {[
              { id: "all", label: "All" },
              { id: "pending_review", label: "Pending Review" },
              { id: "active", label: "Active Deals" },
              { id: "won", label: "Won Deals" },
              { id: "changes_requested", label: "Changes Requested" },
              { id: "rejected", label: "Rejected" },
            ].map((chip) => (
              <button
                key={chip.id}
                type="button"
                onClick={() => setSelectedStatus(chip.id)}
                className={`px-3 py-1.5 rounded-xl font-medium transition-colors whitespace-nowrap ${
                  selectedStatus === chip.id
                    ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-semibold shadow-sm"
                    : "bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.04] dark:hover:bg-white/[0.08] text-slate-600 dark:text-neutral-400"
                }`}
              >
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* Referrals Management Table */}
        <div className="rounded-xl surface-panel border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] overflow-hidden shadow-sm">
          {loading ? (
            <div className="p-16 text-center text-sm text-slate-500">Loading agency records...</div>
          ) : filteredReferrals.length === 0 ? (
            <div className="p-16 text-center text-sm text-slate-500">
              No referral deals found matching the query.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.01] text-xs sm:text-xs tabular-nums uppercase text-slate-500 dark:text-neutral-400">
                    <th className="py-3 px-4 sm:px-6">Referral ID</th>
                    <th className="py-3 px-4">Partner</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Scope / Solution</th>
                    <th className="py-3 px-4">Commercial Terms</th>
                    <th className="py-3 px-4">Deal Status</th>
                    <th className="py-3 px-4">Commission</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-white/[0.06]">
                  {filteredReferrals.map((r) => (
                    <tr
                      key={r.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="py-3.5 px-4 sm:px-6 tabular-nums">
                        <span className="font-semibold text-cyan-600 dark:text-cyan-400">
                          {r.id}
                        </span>
                        <div className="text-xs text-slate-400">
                          {new Date(r.submittedAt).toLocaleDateString("en-IN")}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-900 dark:text-white">
                          {r.partnerName}
                        </div>
                        <div className="text-xs text-slate-500 line-clamp-1">
                          {r.partnerEmail}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-900 dark:text-white">
                          {r.customerName}
                        </div>
                        <div className="text-xs text-slate-500 line-clamp-1">
                          {r.companyName || "Direct"}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-medium text-slate-800 dark:text-neutral-200 line-clamp-1 max-w-[200px]">
                          {r.referralType === "catalogue"
                            ? r.productNameSnapshot || r.productId
                            : r.customProjectTitle}
                        </div>
                        <div className="text-xs uppercase tabular-nums text-slate-400">
                          {r.referralType}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 tabular-nums text-xs">
                        {r.approvedQuoteAmount ? (
                          <div>
                            <div className="font-semibold text-emerald-600 dark:text-emerald-400">
                              ₹{r.approvedQuoteAmount.toLocaleString("en-IN")}
                            </div>
                            <div className="text-xs text-slate-400">
                              Comm:{" "}
                              {r.approvedCommissionType === "percentage"
                                ? `${r.approvedCommissionValue}%`
                                : `₹${(r.approvedCommissionValue || 0).toLocaleString("en-IN")}`}
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="text-slate-700 dark:text-neutral-300 font-medium">
                              Prop: ₹{r.proposedQuoteAmount.toLocaleString("en-IN")}
                            </div>
                            <div className="text-xs text-amber-500">
                              {r.proposedCommissionType === "percentage"
                                ? `${r.proposedCommissionValue}%`
                                : `₹${r.proposedCommissionValue.toLocaleString("en-IN")}`}{" "}
                              (Awaiting Approval)
                            </div>
                          </div>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <DealStatusBadge status={r.dealStatus} size="sm" />
                      </td>

                      <td className="py-3.5 px-4">
                        <CommissionStatusBadge status={r.commissionStatus} size="sm" />
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <Link
                          href={`/admin/referrals/${r.id}`}
                          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                            r.dealStatus === "pending_review"
                              ? "bg-cyan-400 text-black hover:bg-cyan-300 shadow-sm"
                              : "text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20"
                          }`}
                        >
                          <span>{r.dealStatus === "pending_review" ? "Review & Approve" : "Manage"}</span>
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
