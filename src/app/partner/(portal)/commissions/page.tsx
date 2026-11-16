"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { loadPortalJson } from "@/lib/referral/client";
import { PartnerHeader } from "@/components/referral/PartnerHeader";
import {
  PartnerSummary,
  CommissionLedgerEntry,
  ReferralPayout,
} from "@/types/referral";
import {
  CreditCard,
  ArrowUpRight,
  ArrowDownLeft,
  ExternalLink,
} from "lucide-react";

export default function PartnerCommissionsPage() {
  const [summary, setSummary] = useState<PartnerSummary | null>(null);
  const [ledger, setLedger] = useState<CommissionLedgerEntry[]>([]);
  const [payouts, setPayouts] = useState<ReferralPayout[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    Promise.all([
      loadPortalJson("/api/referral/session?view=summary"),
      loadPortalJson("/api/referral/payouts?includeLedger=true"),
    ])
      .then(([session, history]) => {
        setSummary(session.summary);
        setLedger(history.ledger);
        setPayouts(history.payouts);
      })
      .catch((error) => setLoadError(error.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#04060a] text-slate-800 dark:text-neutral-200">
      <PartnerHeader />
      {loadError && <p role="alert" className="mx-auto max-w-7xl px-4 py-4 text-sm text-rose-600">{loadError}</p>}


      <main hidden={Boolean(loadError)} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Title */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Commission Ledger & Payouts
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 mt-1">
            Auditable accounting of verified client receipts, accrued commission shares, and bank/UPI disbursements.
          </p>
        </div>

        {/* 4 Cards: Earned, Paid, Available, Pending Pipeline */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl surface-panel border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] space-y-2">
            <span className="text-xs tabular-nums text-slate-500 dark:text-neutral-400">
              TOTAL EARNED (RECEIPTS)
            </span>
            <div className="text-2xl font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
              ₹{(summary?.commissionEarned || 0).toLocaleString("en-IN")}
            </div>
            <p className="text-xs text-slate-400">Accrued on verified customer payments</p>
          </div>

          <div className="p-5 rounded-xl surface-panel border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] space-y-2">
            <span className="text-xs tabular-nums text-slate-500 dark:text-neutral-400">
              DISBURSED / PAID
            </span>
            <div className="text-2xl font-bold tabular-nums text-slate-900 dark:text-white">
              ₹{(summary?.commissionPaid || 0).toLocaleString("en-IN")}
            </div>
            <p className="text-xs text-slate-400">Transferred via NEFT / RTGS / UPI</p>
          </div>

          <div className="p-5 rounded-xl surface-panel border border-cyan-500/30 bg-cyan-500/[0.03] dark:bg-cyan-500/[0.02] space-y-2">
            <span className="text-xs tabular-nums text-cyan-600 dark:text-cyan-400 font-semibold">
              AVAILABLE BALANCE
            </span>
            <div className="text-2xl font-bold tabular-nums text-slate-900 dark:text-white">
              ₹{(summary?.commissionAvailable || 0).toLocaleString("en-IN")}
            </div>
            <p className="text-xs text-slate-400">Ready for next scheduled payout run</p>
          </div>

          <div className="p-5 rounded-xl surface-panel border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] space-y-2">
            <span className="text-xs tabular-nums text-slate-500 dark:text-neutral-400">
              IN-FLIGHT PIPELINE
            </span>
            <div className="text-2xl font-bold tabular-nums text-amber-600 dark:text-amber-400">
              ₹{(summary?.commissionPending || 0).toLocaleString("en-IN")}
            </div>
            <p className="text-xs text-slate-400">Potential commission on active deals</p>
          </div>
        </div>

        {/* Section 1: Itemized Commission Ledger */}
        <div className="rounded-xl surface-panel border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] overflow-hidden shadow-sm">
          <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-white/[0.06] flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Itemized Commission Accrual Ledger
              </h2>
              <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
                Each commission credit is strictly linked to verified customer payment instalments.
              </p>
            </div>
            <span className="text-xs tabular-nums font-semibold text-emerald-600 dark:text-emerald-400">
              {ledger.length} Record{ledger.length === 1 ? "" : "s"}
            </span>
          </div>

          {loading ? (
            <div className="p-12 text-center text-sm text-slate-500">Loading ledger...</div>
          ) : ledger.length === 0 ? (
            <div className="p-12 text-center text-xs text-slate-500 dark:text-neutral-400">
              No commission entries recorded yet. Once clients remit payments against won deals, accruals appear here.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.01] text-xs sm:text-xs tabular-nums uppercase text-slate-500 dark:text-neutral-400">
                    <th className="py-3 px-4 sm:px-6">Ledger Entry</th>
                    <th className="py-3 px-4">Deal / Customer</th>
                    <th className="py-3 px-4">Qualifying Payment</th>
                    <th className="py-3 px-4">Accrued Amount</th>
                    <th className="py-3 px-4">Calculation Formula</th>
                    <th className="py-3 px-4 text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-white/[0.06]">
                  {ledger.map((entry) => (
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

                      <td className="py-3.5 px-4">
                        <div className="font-semibold text-slate-800 dark:text-neutral-200">
                          {entry.customerName}
                        </div>
                        {entry.referralId !== "AGENCY-PAYOUT" && (
                          <Link
                            href={`/partner/referrals/${entry.referralId}`}
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
                              : "text-slate-500"
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

        {/* Section 2: Payout Disbursements History */}
        <div className="rounded-xl surface-panel border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] overflow-hidden shadow-sm">
          <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-white/[0.06] flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Payout Disbursements History
              </h2>
              <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
                Bank transfers and UPI remittances processed by NOXSOV finance operations.
              </p>
            </div>
            <CreditCard className="w-5 h-5 text-slate-400" />
          </div>

          {payouts.length === 0 ? (
            <div className="p-12 text-center text-xs text-slate-500 dark:text-neutral-400">
              No payouts disbursed yet. Payouts are generated upon request against available earned commission.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.01] text-xs sm:text-xs tabular-nums uppercase text-slate-500 dark:text-neutral-400">
                    <th className="py-3 px-4 sm:px-6">Payout ID</th>
                    <th className="py-3 px-4">Amount Disbursed</th>
                    <th className="py-3 px-4">Method</th>
                    <th className="py-3 px-4">Transaction UTR / Ref</th>
                    <th className="py-3 px-4">Disbursement Notes</th>
                    <th className="py-3 px-4 text-right">Settled Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-white/[0.06]">
                  {payouts.map((p) => (
                    <tr
                      key={p.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="py-3.5 px-4 sm:px-6 tabular-nums font-semibold text-slate-900 dark:text-white">
                        {p.id}
                      </td>
                      <td className="py-3.5 px-4 tabular-nums font-bold text-slate-900 dark:text-white">
                        ₹{p.amount.toLocaleString("en-IN")}
                      </td>
                      <td className="py-3.5 px-4 uppercase tabular-nums text-xs text-cyan-600 dark:text-cyan-400">
                        {p.paymentMethod.replace("_", " ")}
                      </td>
                      <td className="py-3.5 px-4 tabular-nums text-slate-600 dark:text-neutral-400">
                        {p.transactionReference}
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 dark:text-neutral-400 text-xs">
                        {p.note || "Standard settlement"}
                      </td>
                      <td className="py-3.5 px-4 text-right tabular-nums text-slate-500 text-xs">
                        {new Date(p.paidAt).toLocaleDateString("en-IN")}
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
