"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { loadPortalJson } from "@/lib/referral/client";
import { PartnerHeader } from "@/components/referral/PartnerHeader";
import { DealStatusBadge } from "@/components/referral/DealStatusBadge";
import { CommissionStatusBadge } from "@/components/referral/CommissionStatusBadge";
import { ReferralRecord } from "@/types/referral";
import {
  Search,
  PlusCircle,
  Building2,
  ArrowRight,
} from "lucide-react";

export default function PartnerReferralsListPage() {
  const [referrals, setReferrals] = useState<ReferralRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  useEffect(() => {
    loadPortalJson("/api/referral/referrals")
      .then((data) => setReferrals(data.referrals))
      .catch((error) => setLoadError(error.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredReferrals = referrals.filter((r) => {
    const matchesSearch =
      r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.companyName && r.companyName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (r.productNameSnapshot && r.productNameSnapshot.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (r.customProjectTitle && r.customProjectTitle.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;

    if (selectedStatus === "all") return true;
    if (selectedStatus === "active") {
      return ["approved", "contacted", "qualified", "proposal_sent", "negotiation"].includes(
        r.dealStatus
      );
    }
    return r.dealStatus === selectedStatus;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#04060a] text-slate-800 dark:text-neutral-200">
      <PartnerHeader />
      {loadError && <p role="alert" className="mx-auto max-w-7xl px-4 py-4 text-sm text-rose-600">{loadError}</p>}


      <main hidden={Boolean(loadError)} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header & Primary Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              My Referral Portfolio
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 mt-1">
              Track deal qualification, review status, verified receipts, and commission milestones.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <Link
              href="/partner/referrals/new"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-black bg-cyan-400 hover:bg-cyan-300 shadow-sm transition-all"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Submit Referral</span>
            </Link>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="p-4 rounded-xl surface-panel border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search by customer name, company, ID, or product..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.04] text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Status Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar text-xs">
            {[
              { id: "all", label: "All Referrals" },
              { id: "pending_review", label: "Pending Review" },
              { id: "active", label: "Active Deals" },
              { id: "won", label: "Deals Won" },
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

        {/* Referral Table */}
        <div className="rounded-xl surface-panel border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] overflow-hidden shadow-sm">
          {loading ? (
            <div className="p-16 text-center text-sm text-slate-500">Loading referral portfolio...</div>
          ) : filteredReferrals.length === 0 ? (
            <div className="p-16 text-center space-y-3">
              <p className="text-sm text-slate-500 dark:text-neutral-400">
                No referrals found matching the selected filter criteria.
              </p>
              <Link
                href="/partner/referrals/new"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-black bg-cyan-400 hover:bg-cyan-300"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Submit New Referral</span>
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.01] text-xs tabular-nums uppercase text-slate-500 dark:text-neutral-400">
                    <th className="py-3.5 px-4 sm:px-6">Referral ID</th>
                    <th className="py-3.5 px-4">Customer & Organization</th>
                    <th className="py-3.5 px-4">Project Scope</th>
                    <th className="py-3.5 px-4">Proposed Quote</th>
                    <th className="py-3.5 px-4">Approved Quote</th>
                    <th className="py-3.5 px-4">Commission</th>
                    <th className="py-3.5 px-4">Deal Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-white/[0.06]">
                  {filteredReferrals.map((r) => (
                    <tr
                      key={r.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="py-4 px-4 sm:px-6">
                        <span className="tabular-nums text-xs font-semibold text-cyan-600 dark:text-cyan-400">
                          {r.id}
                        </span>
                        <div className="text-xs text-slate-400 tabular-nums mt-0.5">
                          {new Date(r.submittedAt).toLocaleDateString("en-IN")}
                        </div>
                      </td>

                      <td className="py-4 px-4">
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
                            <span>{r.city || "Independent"}</span>
                          )}
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <div className="font-medium text-slate-800 dark:text-neutral-200 line-clamp-1 max-w-[220px]">
                          {r.referralType === "catalogue"
                            ? r.productNameSnapshot || r.productId
                            : r.customProjectTitle}
                        </div>
                        <span className="text-xs tabular-nums text-slate-400 uppercase">
                          {r.referralType}
                        </span>
                      </td>

                      <td className="py-4 px-4 tabular-nums text-slate-700 dark:text-neutral-300">
                        ₹{r.proposedQuoteAmount.toLocaleString("en-IN")}
                        <div className="text-xs text-slate-400">
                          {r.proposedCommissionType === "percentage"
                            ? `${r.proposedCommissionValue}%`
                            : `₹${r.proposedCommissionValue.toLocaleString("en-IN")}`}
                        </div>
                      </td>

                      <td className="py-4 px-4 tabular-nums">
                        {r.approvedQuoteAmount ? (
                          <div>
                            <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                              ₹{r.approvedQuoteAmount.toLocaleString("en-IN")}
                            </span>
                            <div className="text-xs text-emerald-500 tabular-nums">
                              {r.approvedCommissionType === "percentage"
                                ? `${r.approvedCommissionValue}% net`
                                : `₹${(r.approvedCommissionValue || 0).toLocaleString("en-IN")}`}
                            </div>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400 italic">Pending Review</span>
                        )}
                      </td>

                      <td className="py-4 px-4">
                        <CommissionStatusBadge status={r.commissionStatus} size="sm" />
                      </td>

                      <td className="py-4 px-4">
                        <DealStatusBadge status={r.dealStatus} size="sm" />
                      </td>

                      <td className="py-4 px-4 text-right">
                        <Link
                          href={`/partner/referrals/${r.id}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 transition-colors"
                        >
                          <span>Details</span>
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
