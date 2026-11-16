"use client";

import { useState, useEffect } from "react";
import { AdminHeader } from "@/components/referral/AdminHeader";
import { loadPortalJson } from "@/lib/referral/client";
import { toMinorUnits } from "@/lib/referral/money";
import { PartnerSummary, ReferralPayout } from "@/types/referral";
import {
  CreditCard,
  PlusCircle,
  X,
} from "lucide-react";

export default function AdminPayoutsPage() {
  const [payouts, setPayouts] = useState<ReferralPayout[]>([]);
  const [partners, setPartners] = useState<{ partner: PartnerSummary["partner"]; profile: PartnerSummary["profile"]; summary: PartnerSummary }[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  // Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPartnerId, setSelectedPartnerId] = useState("");
  const [payoutAmount, setPayoutAmount] = useState<number | "">("");
  const [payoutMethod, setPayoutMethod] = useState<"bank_transfer" | "upi" | "cheque">("bank_transfer");
  const [transactionRef, setTransactionRef] = useState("");
  const [payoutNote, setPayoutNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function loadData() {
    try {
      const [history, accounts] = await Promise.all([
        loadPortalJson("/api/referral/payouts"),
        loadPortalJson("/api/referral/partners"),
      ]);
      setPayouts(history.payouts);
      setPartners(accounts.partners);
      setLoadError("");
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : "Failed to load payouts.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (active) void loadData();
    });
    return () => { active = false; };
  }, []);

  const totalDisbursed = payouts.reduce((sum, p) => sum + toMinorUnits(p.amount), 0) / 100;

  const handleRecordPayout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPartnerId || !payoutAmount || !transactionRef.trim()) {
      alert("Partner, amount, and transaction reference are required.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/referral/payouts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          partnerId: selectedPartnerId,
          amount: payoutAmount,
          paymentMethod: payoutMethod,
          transactionReference: transactionRef,
          note: payoutNote,
        }),
      });

      const data = await res.json();
      if (data.success) {
        alert(data.message || "Payout recorded successfully.");
        setModalOpen(false);
        setTransactionRef("");
        setPayoutAmount("");
        setSelectedPartnerId("");
        setPayoutNote("");
        loadData();
      } else {
        alert(data.error || "Failed to record payout");
      }
    } catch {
      alert("Error recording payout");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#04060a] text-slate-800 dark:text-neutral-200">
      <AdminHeader />
      {loadError && <p role="alert" className="mx-auto max-w-7xl px-4 py-4 text-sm text-rose-600">{loadError}</p>}

      <main hidden={Boolean(loadError)} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Commission Disbursements & Settlements
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-neutral-400 mt-1">
              Audit log of all partner disbursements, banking UTRs, and settlement references.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-black bg-cyan-400 hover:bg-cyan-300 shadow-sm"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Record Partner Payout</span>
          </button>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl surface-panel border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] space-y-2">
            <span className="text-xs tabular-nums text-slate-500 dark:text-neutral-400">
              TOTAL SETTLED VOLUME
            </span>
            <div className="text-2xl font-bold tabular-nums text-slate-900 dark:text-white">
              ₹{totalDisbursed.toLocaleString("en-IN")}
            </div>
            <p className="text-xs text-slate-400">Processed across {payouts.length} disbursements</p>
          </div>

          <div className="p-5 rounded-xl surface-panel border border-cyan-500/30 bg-cyan-500/[0.03] space-y-2">
            <span className="text-xs tabular-nums text-cyan-600 dark:text-cyan-400 font-semibold">
              SETTLEMENT RAILS
            </span>
            <div className="text-sm font-semibold text-slate-800 dark:text-neutral-200 mt-1">
              Bank transfers, UPI and cheques
            </div>
            <p className="text-xs text-slate-400">Fully auditable bank reference ledger</p>
          </div>
        </div>

        {/* Payouts Table */}
        <div className="rounded-xl surface-panel border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] overflow-hidden shadow-sm">
          {loading ? (
            <div className="p-16 text-center text-sm text-slate-500">Loading payout records...</div>
          ) : payouts.length === 0 ? (
            <div className="p-16 text-center text-sm text-slate-500">No payouts recorded yet.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-white/[0.06] bg-slate-50 dark:bg-white/[0.01] text-xs sm:text-xs tabular-nums uppercase text-slate-500 dark:text-neutral-400">
                    <th className="py-3 px-4 sm:px-6">Disbursement ID</th>
                    <th className="py-3 px-4">Partner</th>
                    <th className="py-3 px-4">Amount Disbursed</th>
                    <th className="py-3 px-4">Rail / Method</th>
                    <th className="py-3 px-4">Bank UTR / Transaction Ref</th>
                    <th className="py-3 px-4">Disbursement Notes</th>
                    <th className="py-3 px-4 text-right">Settlement Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-white/[0.06]">
                  {payouts.map((p) => (
                    <tr
                      key={p.id}
                      className="hover:bg-slate-50/80 dark:hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="py-3.5 px-4 sm:px-6 tabular-nums font-semibold text-cyan-600 dark:text-cyan-400">
                        {p.id}
                      </td>

                      <td className="py-3.5 px-4 font-semibold text-slate-900 dark:text-white">
                        {p.partnerName}
                      </td>

                      <td className="py-3.5 px-4 tabular-nums font-bold text-slate-900 dark:text-white">
                        ₹{p.amount.toLocaleString("en-IN")}
                      </td>

                      <td className="py-3.5 px-4 tabular-nums uppercase text-xs text-slate-600 dark:text-neutral-300">
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

        {/* Record Payout Modal */}
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-xl surface-panel border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-[#090d16] p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/[0.06]">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-cyan-500" />
                  <span>Record Partner Payout</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="p-1 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleRecordPayout} className="space-y-3 text-xs">
                <div>
                  <label className="block font-semibold mb-1">Select Partner *</label>
                  <select
                    required
                    value={selectedPartnerId}
                    onChange={(e) => setSelectedPartnerId(e.target.value)}
                    className="w-full p-2.5 text-sm rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-[#0c101a]"
                  >
                    <option value="">Choose a partner</option>
                    {partners.filter((p) => p.summary.commissionAvailable > 0).map((p) => (
                      <option key={p.partner.id} value={p.partner.id}>
                        {p.partner.name} ({p.profile?.companyName ?? "Company unavailable"}) — Available: ₹
                        {(p.summary?.commissionAvailable || 0).toLocaleString("en-IN")}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Payout Amount (INR ₹) *</label>
                  <input
                    type="number"
                    min={0.01}
                    required
                    step={0.01}
                    value={payoutAmount}
                    onChange={(e) => setPayoutAmount(e.target.value === "" ? "" : Number(e.target.value))}
                    className="w-full p-2.5 text-sm tabular-nums rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.04]"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Payment Rail *</label>
                  <select
                    value={payoutMethod}
                    onChange={(e) => setPayoutMethod(e.target.value as ReferralPayout["paymentMethod"])}
                    className="w-full p-2.5 text-sm rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-[#0c101a]"
                  >
                    <option value="bank_transfer">Bank Transfer (NEFT / RTGS)</option>
                    <option value="upi">UPI VPA</option>
                    <option value="cheque">Cheque</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Bank UTR / Transaction Ref *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. CMS-NEFT-99120938"
                    value={transactionRef}
                    onChange={(e) => setTransactionRef(e.target.value)}
                    className="w-full p-2.5 text-sm tabular-nums rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.04]"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Note / Settlement Details</label>
                  <input
                    type="text"
                    placeholder="e.g. Monthly settlement against won accounts"
                    value={payoutNote}
                    onChange={(e) => setPayoutNote(e.target.value)}
                    className="w-full p-2.5 text-sm rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.04]"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-slate-200 dark:border-white/[0.06]">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-3 py-1.5 text-slate-500 hover:text-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-black bg-cyan-400 hover:bg-cyan-300"
                  >
                    {submitting ? "Processing..." : "Confirm Disbursement"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
