"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { loadPortalJson } from "@/lib/referral/client";
import { AdminHeader } from "@/components/referral/AdminHeader";
import { CommissionLedgerEntry, AdminSummary } from "@/types/referral";
import {
  Search,
  ExternalLink,
  ArrowDownLeft,
  ArrowUpRight,
} from "lucide-react";

export default function AdminCommissionsPage() {
  const [summary, setSummary] = useState<AdminSummary | null>(null);
  const [ledger, setLedger] = useState<CommissionLedgerEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");

  useEffect(() => {
    Promise.all([
      loadPortalJson("/api/referral/session?view=summary"),
      loadPortalJson("/api/referral/payouts?includeLedger=true"),
    ])
      .then(([session, history]) => {
        setSummary(session.summary);
        setLedger(history.ledger);
      })
      .catch((error) => setLoadError(error.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredLedger = ledger.filter((l) => {
    const matchesSearch =
      l.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.partnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.referralId.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;
    if (selectedType === "all") return true;
    return l.entryType === selectedType;
  });

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#04060a] text-slate-800 dark:text-neutral-200">
      <AdminHeader />
      {loadError && <p role="alert" className="mx-auto max-w-7xl px-4 py-4 text-sm text-rose-600">{loadError}</p>}


      <main hidden={Boolean(loadError)} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Agency Commission Ledger
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 mt-1">
            Centrally governed double-entry accounting of qualifying receipts, accrued commissions, adjustments, and partner disbursements.
          </p>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl surface-panel border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] space-y-2">
            <span className="text-xs tabular-nums text-slate-500 dark:text-neutral-400">
              TOTAL COMMISSIONS EARNED
            </span>
            <div className="text-2xl font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
              ₹{(summary?.totalCommissionEarned || 0).toLocaleString("en-IN")}
            </div>
            <p className="text-xs text-slate-400">Accrued across all verified customer receipts</p>
          </div>

          <div className="p-5 rounded-xl surface-panel border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] space-y-2">
            <span className="text-xs tabular-nums text-slate-500 dark:text-neutral-400">
              TOTAL DISBURSED (PAID)
            </span>
            <div className="text-2xl font-bold tabular-nums text-slate-900 dark:text-white">
              ₹{(summary?.totalCommissionPaid || 0).toLocaleString("en-IN")}
            </div>
            <p className="text-xs text-slate-400">Settled via NEFT / RTGS / UPI</p>
          </div>

          <div className="p-5 rounded-xl surface-panel border border-cyan-500/30 bg-cyan-500/[0.03] space-y-2">
            <span className="text-xs tabular-nums text-cyan-600 dark:text-cyan-400 font-semibold">
              PENDING SETTLEMENT (BALANCE)
            </span>
            <div className="text-2xl font-bold tabular-nums text-slate-900 dark:text-white">
              ₹{(summary?.totalCommissionAvailable || 0).toLocaleString("en-IN")}
            </div>
            <p className="text-xs text-slate-400">Total earned balance awaiting payout</p>
          </div>
        </div>

        {/* Filter bar */}
        <div className="p-4 rounded-xl surface-panel border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search by entry ID, partner, customer, or referral..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.04]"
            />
          </div>

          <div className="flex items-center gap-2">
            {["all", "earned", "payout"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setSelectedType(t)}
                className={`px-3 py-1.5 rounded-xl text-xs capitalize transition-colors ${
                  selectedType === t
                    ? "bg-slate-900 text-white dark:bg-white dark:text-black font-semibold"
                    : "bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.04] text-slate-600 dark:text-neutral-400"
                }`}
              >
                {t === "all" ? "All Entries" : t}
              </button>
            ))}
          </div>
        </div>

        {/* Ledger Table */}
        <div className="rounded-xl surface-panel border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] overflow-hidden shadow-sm">
          {loading ? (
            <div className="p-16 text-center text-sm text-slate-500">Loading ledger data...</div>
          ) : filteredLedger.length === 0 ? (
            <div className="p-16 text-center text-sm text-slate-500">No ledger entries found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.01] text-xs sm:text-xs tabular-nums uppercase text-slate-500 dark:text-neutral-400">
                    <th className="py-3 px-4 sm:px-6">Entry ID</th>
                    <th className="py-3 px-4">Partner</th>
                    <th className="py-3 px-4">Deal Reference</th>
                    <th className="py-3 px-4">Qualifying Payment</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4">Basis / Note</th>
                    <th className="py-3 px-4 text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-white/[0.06]">
                  {filteredLedger.map((entry) => (
                    <tr
                      key={entry.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="py-3.5 px-4 sm:px-6">
                        <div className="flex items-center gap-2">
                          {entry.amount > 0 ? (
                            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500">
                              <ArrowDownLeft className="w-3.5 h-3.5" />
                            </div>
                          ) : (
                            <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-500">
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </div>
                          )}
                          <div>
                            <span className="tabular-nums text-xs font-semibold text-slate-900 dark:text-white">
                              {entry.id}
                            </span>
                            <div className="text-xs tabular-nums uppercase text-slate-400">
                              {entry.entryType}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                        {entry.partnerName}
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-medium text-slate-800 dark:text-neutral-200">
                          {entry.customerName}
                        </div>
                        {entry.referralId !== "AGENCY-PAYOUT" && (
                          <Link
                            href={`/admin/referrals/${entry.referralId}`}
                            className="text-xs tabular-nums text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1"
                          >
                            <span>{entry.referralId}</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </Link>
                        )}
                      </td>

                      <td className="py-3.5 px-4 tabular-nums text-slate-700 dark:text-neutral-300">
                        {entry.basisAmount ? (
                          `₹${entry.basisAmount.toLocaleString("en-IN")}`
                        ) : (
                          <span className="text-slate-400">—</span>
                        )}
                      </td>

                      <td className="py-3.5 px-4 tabular-nums font-bold">
                        <span
                          className={
                            entry.amount > 0
                              ? "text-emerald-600 dark:text-emerald-400"
                              : "text-slate-600 dark:text-neutral-300"
                          }
                        >
                          {entry.amount > 0 ? "+" : entry.amount < 0 ? "−" : ""}₹{Math.abs(entry.amount).toLocaleString("en-IN")}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-xs text-slate-500 dark:text-neutral-400">
                        {entry.commissionRateOrFixed || entry.note}
                      </td>

                      <td className="py-3.5 px-4 text-right tabular-nums text-slate-500 text-xs">
                        {new Date(entry.createdAt).toLocaleDateString("en-IN")}
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
