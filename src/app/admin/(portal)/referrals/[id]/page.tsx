"use client";

import { useState, useEffect, useCallback } from "react";
import { nextDealStatuses, reviewStatuses } from "@/lib/referral/workflow";
import { toMinorUnits } from "@/lib/referral/money";
import { useParams } from "next/navigation";
import Link from "next/link";
import { AdminHeader } from "@/components/referral/AdminHeader";
import { DealStatusBadge } from "@/components/referral/DealStatusBadge";
import { CommissionStatusBadge } from "@/components/referral/CommissionStatusBadge";
import { CommercialTermsComparison } from "@/components/referral/CommercialTermsComparison";
import {
  ReferralRecord,
  ReferralPayment,
  ReferralPayout,
  CommissionLedgerEntry,
  ReferralActivity,
  DealStatus,
  CommissionType,
} from "@/types/referral";
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  PlusCircle,
  CreditCard,
  History,
  ShieldCheck,
} from "lucide-react";

export default function AdminReferralDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [referral, setReferral] = useState<ReferralRecord | null>(null);
  const [payments, setPayments] = useState<ReferralPayment[]>([]);
  const [ledger, setLedger] = useState<CommissionLedgerEntry[]>([]);
  const [activities, setActivities] = useState<ReferralActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Approval Form State
  const [approvedQuote, setApprovedQuote] = useState<number>(0);
  const [approvedCommType, setApprovedCommType] = useState<CommissionType>("percentage");
  const [approvedCommVal, setApprovedCommVal] = useState<number>(0);
  const [internalNotes, setInternalNotes] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");
  const [assignedSalesOwner, setAssignedSalesOwner] = useState("");
  const [approving, setApproving] = useState(false);

  // Status Change State
  const [newDealStatus, setNewDealStatus] = useState<DealStatus>("approved");
  const [statusNote, setStatusNote] = useState("");
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // Payment Recording State
  const [paymentAmount, setPaymentAmount] = useState<number | "">("");
  const [paymentRef, setPaymentRef] = useState("");
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [recordingPayment, setRecordingPayment] = useState(false);

  // Payout Recording State
  const [payoutAmount, setPayoutAmount] = useState<number | "">("");
  const [payoutMethod, setPayoutMethod] = useState<"bank_transfer" | "upi" | "cheque">("bank_transfer");
  const [payoutRef, setPayoutRef] = useState("");
  const [payoutNote, setPayoutNote] = useState("");
  const [recordingPayout, setRecordingPayout] = useState(false);

  const fetchReferral = useCallback(async () => {
    if (!id) return;
    try {
      const res = await fetch(`/api/referral/referrals/${id}`);
      const data = await res.json();
      if (!data.success) {
        setError(data.error || "Referral not found");
      } else {
        setError("");
        setReferral(data.referral);
        setPayments(data.payments || []);
        setLedger(data.ledger || []);
        setActivities(data.activities || []);

        setApprovedQuote(data.referral.approvedQuoteAmount || data.referral.proposedQuoteAmount);
        setApprovedCommType(
          data.referral.approvedCommissionType || data.referral.proposedCommissionType
        );
        setApprovedCommVal(
          data.referral.approvedCommissionValue ?? data.referral.proposedCommissionValue
        );
        setInternalNotes(data.referral.internalAdminNotes || "");
        setCustomerNotes(data.referral.customerFacingNotes || "");
        setAssignedSalesOwner(data.referral.assignedSalesOwner || "");
        setNewDealStatus(data.referral.dealStatus);
      }
    } catch {
      setError("Failed to fetch referral details");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (active) void fetchReferral();
    });
    return () => { active = false; };
  }, [fetchReferral]);

  // Balance calculation for this referral
  const totalEarned = ledger
    .filter((l) => l.entryType !== "payout")
    .reduce((sum, l) => sum + toMinorUnits(l.amount), 0) / 100;
  const totalPaid = ledger
    .filter((l) => l.entryType === "payout")
    .reduce((sum, l) => sum + Math.abs(toMinorUnits(l.amount)), 0) / 100;
  const availablePayout = Math.max(0, toMinorUnits(totalEarned) - toMinorUnits(totalPaid)) / 100;

  const handleApprove = async () => {
    if (!referral) return;
    setApproving(true);
    try {
      const res = await fetch(`/api/referral/referrals/${referral.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "approve",
          approvedQuoteAmount: approvedQuote,
          approvedCommissionType: approvedCommType,
          approvedCommissionValue: approvedCommVal,
          internalAdminNotes: internalNotes,
          customerFacingNotes: customerNotes,
          assignedSalesOwner,
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert("Commercial terms successfully approved!");
        fetchReferral();
      } else {
        alert(data.error || "Failed to approve terms");
      }
    } catch {
      alert("Error approving terms");
    } finally {
      setApproving(false);
    }
  };

  const handleRequestChanges = async () => {
    const reason = prompt("Enter specific changes requested from partner (quote, scope, commission):");
    if (!reason || !reason.trim() || !referral) return;

    try {
      const res = await fetch(`/api/referral/referrals/${referral.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "request_changes",
          reason: reason.trim(),
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert("Changes requested recorded and notified to partner.");
        fetchReferral();
      }
    } catch {
      alert("Error requesting changes");
    }
  };

  const handleReject = async () => {
    const reason = prompt("Enter reason for rejecting this referral lead:");
    if (!reason || !reason.trim() || !referral) return;

    try {
      const res = await fetch(`/api/referral/referrals/${referral.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "reject",
          reason: reason.trim(),
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert("Referral rejected.");
        fetchReferral();
      }
    } catch {
      alert("Error rejecting referral");
    }
  };

  const handleUpdateDealStatus = async () => {
    if (!referral) return;
    setUpdatingStatus(true);
    try {
      const res = await fetch(`/api/referral/referrals/${referral.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update_deal_status",
          status: newDealStatus,
          note: statusNote || undefined,
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert("Deal status updated successfully.");
        setStatusNote("");
        fetchReferral();
      } else {
        alert(data.error || "Failed to update status");
      }
    } catch {
      alert("Error updating status");
    } finally {
      setUpdatingStatus(false);
    }
  };

  const handleRecordPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!referral) return;
    if (!paymentAmount || paymentAmount <= 0 || !paymentRef.trim()) {
      alert("Payment amount and reference are required.");
      return;
    }

    setRecordingPayment(true);
    try {
      const res = await fetch("/api/referral/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          referralId: referral.id,
          amountReceived: paymentAmount,
          paymentReference: paymentRef,
          verified: paymentVerified,
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert(data.message || "Payment recorded.");
        setPaymentRef("");
        setPaymentAmount("");
        setPaymentVerified(false);
        fetchReferral();
      } else {
        alert(data.error || "Failed to record payment");
      }
    } catch {
      alert("Error recording payment");
    } finally {
      setRecordingPayment(false);
    }
  };

  const handleRecordPayout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!referral) return;
    if (!payoutAmount || payoutAmount <= 0 || !payoutRef.trim()) {
      alert("Payout amount and transaction reference are required.");
      return;
    }

    setRecordingPayout(true);
    try {
      const res = await fetch("/api/referral/payouts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          partnerId: referral.partnerId,
          referralId: referral.id,
          amount: payoutAmount,
          paymentMethod: payoutMethod,
          transactionReference: payoutRef,
          note: payoutNote || `Payout against ${referral.id} (${referral.customerName})`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        alert(data.message || "Payout recorded.");
        setPayoutRef("");
        setPayoutNote("");
        fetchReferral();
      } else {
        alert(data.error || "Failed to record payout");
      }
    } catch {
      alert("Error recording payout");
    } finally {
      setRecordingPayout(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#04060a]">
        <AdminHeader />
        <div className="max-w-5xl mx-auto px-4 py-20 text-center text-sm text-slate-500">
          Loading referral governance dossier...
        </div>
      </div>
    );
  }

  if (error || !referral) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#04060a]">
        <AdminHeader />
        <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
          <div className="p-4 rounded-xl bg-rose-500/10 text-rose-600 text-sm font-semibold">
            {error || "Referral record does not exist"}
          </div>
          <Link
            href="/admin/referrals"
            className="inline-flex items-center gap-2 text-sm text-cyan-600 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Referrals Console</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#04060a] text-slate-800 dark:text-neutral-200">
      <AdminHeader />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/[0.08]">
          <div className="flex items-center gap-3">
            <Link
              href="/admin/referrals"
              className="p-2 rounded-xl border border-slate-200 dark:border-white/[0.08] hover:bg-slate-100 dark:hover:bg-white/[0.04] transition-colors"
            >
              <ArrowLeft className="w-4 h-4 text-slate-600 dark:text-neutral-400" />
            </Link>

            <div>
              <div className="flex items-center gap-2">
                <span className="tabular-nums text-xs uppercase tracking-wider text-slate-500">
                  Referral Governance Dossier
                </span>
                <span className="tabular-nums text-sm font-bold text-cyan-600 dark:text-cyan-400">
                  {referral.id}
                </span>
                <span className="text-xs tabular-nums px-2 py-0.5 rounded-full bg-slate-200 dark:bg-white/[0.08] text-slate-600 dark:text-neutral-400">
                  Partner: {referral.partnerName}
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                {referral.customerName}{" "}
                {referral.companyName && (
                  <span className="font-normal text-slate-500 dark:text-neutral-400">
                    ({referral.companyName})
                  </span>
                )}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <DealStatusBadge status={referral.dealStatus} />
            <CommissionStatusBadge status={referral.commissionStatus} />
          </div>
        </div>

        {/* SECTION 1: Commercial Terms Review & Authorization Panel */}
        <div className="rounded-xl surface-panel border border-cyan-500/30 bg-cyan-500/[0.02] dark:bg-cyan-500/[0.01] p-6 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-cyan-500/20">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Commercial Terms Review & Authorization
                </h2>
                <p className="text-xs text-slate-500 dark:text-neutral-400">
                  Validate proposed customer price and partner commission. Approved values form the official agreement.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={!reviewStatuses.includes(referral.dealStatus)}
                onClick={handleRequestChanges}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border border-orange-500/30 text-orange-600 dark:text-orange-400 bg-orange-500/10 hover:bg-orange-500/20 transition-colors"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Request Changes</span>
              </button>

              <button
                type="button"
                disabled={!reviewStatuses.includes(referral.dealStatus)}
                onClick={handleReject}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border border-rose-500/30 text-rose-600 dark:text-rose-400 bg-rose-500/10 hover:bg-rose-500/20 transition-colors"
              >
                <XCircle className="w-3.5 h-3.5" />
                <span>Reject</span>
              </button>
            </div>
          </div>

          {/* Side-by-side: Comparison Component */}
          <CommercialTermsComparison referral={referral} />

          {/* Form to Set / Amend Approved Terms */}
          <div className="pt-4 border-t border-slate-200 dark:border-white/[0.06] space-y-4">
            <h3 className="text-xs font-medium font-bold text-slate-900 dark:text-white">
              Set Official Approved Commercial Terms
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Approved Quote (INR ₹)</label>
                <input
                  type="number"
                  min={0.01}
                  step={0.01}
                  value={approvedQuote}
                  onChange={(e) => setApprovedQuote(Number(e.target.value))}
                  className="w-full p-2.5 text-sm tabular-nums rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.04]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Commission Type</label>
                <select
                  value={approvedCommType}
                  onChange={(e) => setApprovedCommType(e.target.value as CommissionType)}
                  className="w-full p-2.5 text-sm rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-[#0c101a]"
                >
                  <option value="percentage">Percentage (%) of Net Receipts</option>
                  <option value="fixed">Fixed Fee (₹)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">
                  Commission Value ({approvedCommType === "percentage" ? "%" : "₹"})
                </label>
                <input
                  type="number"
                  min={0}
                  step={0.01}
                  value={approvedCommVal}
                  onChange={(e) => setApprovedCommVal(Number(e.target.value))}
                  className="w-full p-2.5 text-sm tabular-nums rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.04]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1">
                  Assigned Internal Sales Lead
                </label>
                <input
                  type="text"
                  value={assignedSalesOwner}
                  onChange={(e) => setAssignedSalesOwner(e.target.value)}
                  placeholder="Sales owner"
                  className="w-full p-2.5 text-sm rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.04]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">
                  Customer-Facing Note (Published to Partner)
                </label>
                <input
                  type="text"
                  value={customerNotes}
                  onChange={(e) => setCustomerNotes(e.target.value)}
                  placeholder="Note visible to partner regarding terms..."
                  className="w-full p-2.5 text-sm rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.04]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">
                Internal Administrative Notes (Strictly Admin-Only / Secret)
              </label>
              <textarea
                rows={2}
                value={internalNotes}
                onChange={(e) => setInternalNotes(e.target.value)}
                placeholder="Internal margin analysis, delivery constraints, or special commission conditions..."
                className="w-full p-2.5 text-sm rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.04]"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                disabled={approving || !reviewStatuses.includes(referral.dealStatus)}
                onClick={handleApprove}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-black bg-cyan-400 hover:bg-cyan-300 shadow-sm  transition-colors disabled:opacity-50"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{approving ? "Authorizing Terms..." : "Authorize Official Terms"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* SECTION 2: Deal Status & Pipeline Progression */}
        <div className="rounded-xl surface-panel border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-white/[0.06]">
            <Clock className="w-4 h-4 text-cyan-500" />
            <h2 className="text-sm font-bold font-medium text-slate-900 dark:text-white">
              Deal Progression & Milestone Stage
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <select
              value={newDealStatus}
              onChange={(e) => setNewDealStatus(e.target.value as DealStatus)}
              className="p-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-[#0c101a] font-medium"
            >
              <option value={referral.dealStatus}>Current stage</option>
              {nextDealStatuses(referral.dealStatus).map((status) => (
                <option key={status} value={status}>{status.replaceAll("_", " ")}</option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Add optional milestone transition note..."
              value={statusNote}
              onChange={(e) => setStatusNote(e.target.value)}
              className="flex-1 p-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.04]"
            />

            <button
              type="button"
              disabled={updatingStatus || newDealStatus === referral.dealStatus}
              onClick={handleUpdateDealStatus}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-200 transition-colors shrink-0"
            >
              {updatingStatus ? "Updating..." : "Update Deal Stage"}
            </button>
          </div>
        </div>

        {/* SECTION 3: Customer Payments & Commission Accrual Engine */}
        <div className="rounded-xl surface-panel border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] p-6 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/[0.06]">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Customer Receipts & Automatic Commission Accrual
              </h2>
              <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
                Recording and verifying qualifying customer payments automatically calculates and posts earned commission to the partner ledger.
              </p>
            </div>

            <div className="text-right">
              <span className="text-xs tabular-nums text-slate-400">Total Accrued Commission:</span>
              <div className="text-xl font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
                ₹{totalEarned.toLocaleString("en-IN")}
              </div>
            </div>
          </div>

          {/* Form to Record Payment */}
          <form
            onSubmit={handleRecordPayment}
            className="p-4 rounded-xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200/80 dark:border-white/[0.06] space-y-3"
          >
            <div className="text-xs tabular-nums uppercase font-semibold text-slate-700 dark:text-neutral-300 flex items-center gap-2">
              <PlusCircle className="w-4 h-4 text-cyan-500" />
              <span>Record Client Payment Receipt</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold mb-1">Qualifying Net Receipt (₹)</label>
                <input
                  type="number"
                  min={0.01}
                  step={0.01}
                  required
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value === "" ? "" : Number(e.target.value))}
                  className="w-full p-2 text-xs tabular-nums rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.04]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">
                  Payment Reference / UTR / Cheque #
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. NEFT-HDFC-9912093"
                  value={paymentRef}
                  onChange={(e) => setPaymentRef(e.target.value)}
                  className="w-full p-2 text-xs tabular-nums rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.04]"
                />
              </div>

              <div className="flex items-center gap-3 pt-5">
                <label className="flex items-center gap-2 text-xs cursor-pointer">
                  <input
                    type="checkbox"
                    checked={paymentVerified}
                    onChange={(e) => setPaymentVerified(e.target.checked)}
                    className="w-4 h-4 rounded text-cyan-600"
                  />
                  <span>I verified this net receipt</span>
                </label>

                <button
                  type="submit"
                  disabled={recordingPayment || !paymentVerified || referral.dealStatus !== "won"}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-black bg-cyan-400 hover:bg-cyan-300 ml-auto shrink-0"
                >
                  {recordingPayment ? "Posting..." : "Record & Accrue"}
                </button>
              </div>
            </div>
          </form>

          {/* Payments List Table */}
          {payments.length > 0 && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-white/[0.06] text-slate-500 tabular-nums uppercase text-xs">
                    <th className="py-2.5 px-3">Receipt ID</th>
                    <th className="py-2.5 px-3">Amount Received</th>
                    <th className="py-2.5 px-3">Transaction Reference</th>
                    <th className="py-2.5 px-3">Verification</th>
                    <th className="py-2.5 px-3 text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-white/[0.06]">
                  {payments.map((p) => (
                    <tr key={p.id}>
                      <td className="py-2.5 px-3 tabular-nums font-semibold text-cyan-600 dark:text-cyan-400">
                        {p.id}
                      </td>
                      <td className="py-2.5 px-3 tabular-nums font-bold text-slate-900 dark:text-white">
                        ₹{p.amountReceived.toLocaleString("en-IN")}
                      </td>
                      <td className="py-2.5 px-3 tabular-nums text-slate-600 dark:text-neutral-400">
                        {p.paymentReference}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="inline-flex items-center gap-1 tabular-nums text-xs text-emerald-600 dark:text-emerald-400">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Verified ({p.verifiedBy})</span>
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-right text-slate-500 tabular-nums">
                        {new Date(p.receivedAt).toLocaleDateString("en-IN")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* SECTION 4: Commission Disbursements & Partner Payout */}
        <div className="rounded-xl surface-panel border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] p-6 space-y-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/[0.06]">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Disburse Commission Payout to Partner
              </h2>
              <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
                Record manual bank transfer or UPI disbursement against available earned commission balance.
              </p>
            </div>

            <div className="flex items-center gap-6">
              <div>
                <span className="text-xs tabular-nums text-slate-400">Paid to Date:</span>
                <div className="text-sm font-bold tabular-nums text-slate-900 dark:text-white">
                  ₹{totalPaid.toLocaleString("en-IN")}
                </div>
              </div>

              <div>
                <span className="text-xs tabular-nums text-cyan-600 dark:text-cyan-400 font-semibold">
                  Available to Disburse:
                </span>
                <div className="text-lg font-bold tabular-nums text-slate-900 dark:text-white">
                  ₹{availablePayout.toLocaleString("en-IN")}
                </div>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleRecordPayout}
            className="p-4 rounded-xl bg-cyan-500/[0.03] border border-cyan-500/20 space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold mb-1">
                  Disbursement Amount (₹) (Max ₹{availablePayout.toLocaleString("en-IN")})
                </label>
                <input
                  type="number"
                  min={0.01}
                  step={0.01}
                  max={availablePayout}
                  required
                  value={payoutAmount}
                  onChange={(e) => setPayoutAmount(e.target.value === "" ? "" : Number(e.target.value))}
                  className="w-full p-2 text-xs tabular-nums rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.04]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Payment Method</label>
                <select
                  value={payoutMethod}
                  onChange={(e) => setPayoutMethod(e.target.value as ReferralPayout["paymentMethod"])}
                  className="w-full p-2 text-xs rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-[#0c101a]"
                >
                  <option value="bank_transfer">Bank Transfer (NEFT / RTGS)</option>
                  <option value="upi">UPI Settlement</option>
                  <option value="cheque">Cheque</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Transaction UTR / Ref</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. CMS-NEFT-99120938"
                  value={payoutRef}
                  onChange={(e) => setPayoutRef(e.target.value)}
                  className="w-full p-2 text-xs tabular-nums rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.04]"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <input
                type="text"
                placeholder="Disbursement note (e.g. First instalment settlement to HDFC A/C)..."
                value={payoutNote}
                onChange={(e) => setPayoutNote(e.target.value)}
                className="flex-1 p-2 text-xs rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.04]"
              />

              <button
                type="submit"
                disabled={recordingPayout || availablePayout <= 0}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-black bg-cyan-400 hover:bg-cyan-300 disabled:opacity-40 transition-colors shrink-0"
              >
                <CreditCard className="w-3.5 h-3.5" />
                <span>{recordingPayout ? "Disbursing..." : "Confirm Payout"}</span>
              </button>
            </div>
          </form>
        </div>

        {/* SECTION 5: Activity Log */}
        <div className="rounded-xl surface-panel border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-white/[0.06]">
            <History className="w-4 h-4 text-cyan-500" />
            <h3 className="text-sm font-bold font-medium text-slate-900 dark:text-white">
              Activity & Governance Audit Log
            </h3>
          </div>

          <div className="space-y-4 pt-1">
            {activities.map((act) => (
              <div key={act.id} className="flex items-start gap-3 text-xs">
                <div className="w-2 h-2 rounded-full bg-cyan-500 mt-1.5 shrink-0"></div>
                <div className="flex-1 space-y-0.5">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {act.action}
                    </span>
                    <span className="text-xs tabular-nums text-slate-400">
                      {new Date(act.createdAt).toLocaleString("en-IN")}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500">
                    By <span className="font-medium text-slate-700 dark:text-neutral-300">{act.actorName}</span> ({act.actorRole})
                  </div>
                  {act.note && (
                    <p className="text-slate-600 dark:text-neutral-300 pt-0.5">{act.note}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
