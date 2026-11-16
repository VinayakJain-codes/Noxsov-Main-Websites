"use client";

import { useState, useEffect, useCallback } from "react";
import { editableStatuses } from "@/lib/referral/workflow";
import { useParams } from "next/navigation";
import Link from "next/link";
import { PartnerHeader } from "@/components/referral/PartnerHeader";
import { DealStatusBadge } from "@/components/referral/DealStatusBadge";
import { CommissionStatusBadge } from "@/components/referral/CommissionStatusBadge";
import { CommercialTermsComparison } from "@/components/referral/CommercialTermsComparison";
import {
  ReferralRecord,
  ReferralPayment,
  ReferralActivity,
} from "@/types/referral";
import {
  ArrowLeft,
  Building2,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
  AlertTriangle,
  History,
  Edit,
  Save,
  X,
} from "lucide-react";

export default function PartnerReferralDetailPage() {
  const params = useParams();
  const id = params?.id as string;

  const [referral, setReferral] = useState<ReferralRecord | null>(null);
  const [payments, setPayments] = useState<ReferralPayment[]>([]);
  const [activities, setActivities] = useState<ReferralActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Edit Mode state (allowed only if pending_review or changes_requested)
  const [isEditing, setIsEditing] = useState(false);
  const [editQuote, setEditQuote] = useState<number>(0);
  const [editCommVal, setEditCommVal] = useState<number>(0);
  const [editNotes, setEditNotes] = useState("");
  const [savingEdit, setSavingEdit] = useState(false);

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
        setActivities(data.activities || []);
        setEditQuote(data.referral.proposedQuoteAmount);
        setEditCommVal(data.referral.proposedCommissionValue);
        setEditNotes(data.referral.pricingNotes || "");
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

  const canEdit =
    referral &&
    editableStatuses.includes(referral.dealStatus);

  const handleSaveEdit = async () => {
    if (!referral) return;
    setSavingEdit(true);
    try {
      const res = await fetch(`/api/referral/referrals/${referral.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update_details",
          updates: {
            proposedQuoteAmount: editQuote,
            proposedCommissionValue: editCommVal,
            pricingNotes: editNotes,
          },
        }),
      });
      const data = await res.json();
      if (data.success) {
        setReferral(data.referral);
        setIsEditing(false);
        fetchReferral();
      } else {
        alert(data.error || "Failed to update");
      }
    } catch {
      alert("Error updating referral");
    } finally {
      setSavingEdit(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#04060a]">
        <PartnerHeader />
        <div className="max-w-5xl mx-auto px-4 py-20 text-center text-sm text-slate-500">
          Loading referral opportunity...
        </div>
      </div>
    );
  }

  if (error || !referral) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-[#04060a]">
        <PartnerHeader />
        <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
          <div className="p-4 rounded-xl bg-rose-500/10 text-rose-600 text-sm font-semibold">
            {error || "Referral record does not exist"}
          </div>
          <Link
            href="/partner/referrals"
            className="inline-flex items-center gap-2 text-sm text-cyan-600 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#04060a] text-slate-800 dark:text-neutral-200">
      <PartnerHeader />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Top Navigation & Status Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-200 dark:border-white/[0.08]">
          <div className="flex items-center gap-3">
            <Link
              href="/partner/referrals"
              className="p-2 rounded-xl border border-slate-200 dark:border-white/[0.08] hover:bg-slate-100 dark:hover:bg-white/[0.04] transition-colors"
              title="Back to portfolio"
            >
              <ArrowLeft className="w-4 h-4 text-slate-600 dark:text-neutral-400" />
            </Link>

            <div>
              <div className="flex items-center gap-2">
                <span className="tabular-nums text-xs uppercase tracking-wider text-slate-500">
                  Referral Record
                </span>
                <span className="tabular-nums text-sm font-bold text-cyan-600 dark:text-cyan-400">
                  {referral.id}
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

          <div className="flex items-center gap-2.5">
            <CommissionStatusBadge status={referral.commissionStatus} />
            <DealStatusBadge status={referral.dealStatus} />
            {canEdit && !isEditing && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.04] hover:border-cyan-500/40 text-slate-700 dark:text-neutral-300"
              >
                <Edit className="w-3.5 h-3.5 text-cyan-500" />
                <span>Edit Terms</span>
              </button>
            )}
          </div>
        </div>

        {/* Changes Requested Notice */}
        {referral.dealStatus === "changes_requested" && (
          <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-800 dark:text-orange-200 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <div className="text-sm font-semibold">Changes Requested by Agency Operations</div>
              <p className="text-xs text-orange-700 dark:text-orange-300/90 leading-relaxed">
                {referral.customerFacingNotes ||
                  "The agency has requested revisions or clarifications regarding the proposed commercial terms."}
              </p>
              {!isEditing && (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="mt-2 text-xs font-semibold underline text-orange-700 dark:text-orange-300 hover:opacity-80"
                >
                  Click here to adjust quote or commission
                </button>
              )}
            </div>
          </div>
        )}

        {/* Edit Modal / Inline Panel */}
        {isEditing && (
          <div className="p-5 rounded-xl border border-cyan-500/30 bg-cyan-500/[0.03] space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-cyan-500/20">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Edit className="w-4 h-4 text-cyan-500" />
                <span>Adjust Proposed Terms</span>
              </h3>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="p-1 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold mb-1">Proposed Quote (₹)</label>
                <input
                  type="number"
                  step={0.01}
                  value={editQuote}
                  onChange={(e) => setEditQuote(Number(e.target.value))}
                  className="w-full p-2 text-sm rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.04]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">
                  Commission Value ({referral.proposedCommissionType === "percentage" ? "%" : "₹"})
                </label>
                <input
                  type="number"
                  value={editCommVal}
                  onChange={(e) => setEditCommVal(Number(e.target.value))}
                  className="w-full p-2 text-sm rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.04]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Adjustment Note / Explanation</label>
              <input
                type="text"
                value={editNotes}
                onChange={(e) => setEditNotes(e.target.value)}
                placeholder="Clarification for agency reviewer..."
                className="w-full p-2 text-sm rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.04]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-3 py-1.5 text-xs text-slate-500 hover:text-slate-700"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={savingEdit}
                onClick={handleSaveEdit}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-semibold text-black bg-cyan-400 hover:bg-cyan-300"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{savingEdit ? "Saving..." : "Save Proposal"}</span>
              </button>
            </div>
          </div>
        )}

        {/* Commercial Terms Comparison */}
        <div className="space-y-3">
          <h2 className="text-sm font-medium font-bold text-slate-900 dark:text-white">
            Commercial Terms & Approval
          </h2>
          <CommercialTermsComparison referral={referral} />
        </div>

        {/* Lead & Project Specification Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Customer Card */}
          <div className="p-5 rounded-xl surface-panel border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] space-y-4">
            <h3 className="text-xs font-medium font-semibold text-slate-500 dark:text-neutral-400 border-b border-slate-200 dark:border-white/[0.06] pb-2">
              Customer Information
            </h3>

            <div className="space-y-2.5 text-sm">
              <div className="flex items-center gap-2.5 text-slate-700 dark:text-neutral-300">
                <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{referral.companyName || "Direct / Independent Client"}</span>
              </div>

              <div className="flex items-center gap-2.5 text-slate-700 dark:text-neutral-300">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="tabular-nums">{referral.customerPhone}</span>
              </div>

              <div className="flex items-center gap-2.5 text-slate-700 dark:text-neutral-300">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{referral.customerEmail}</span>
              </div>

              {referral.city && (
                <div className="flex items-center gap-2.5 text-slate-700 dark:text-neutral-300">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{referral.city}</span>
                </div>
              )}
            </div>

            {referral.customerNotes && (
              <div className="pt-2 border-t border-slate-200/60 dark:border-white/[0.04]">
                <div className="text-xs tabular-nums text-slate-400 mb-1">Referral Context</div>
                <p className="text-xs text-slate-600 dark:text-neutral-300 leading-relaxed">
                  {referral.customerNotes}
                </p>
              </div>
            )}
          </div>

          {/* Project Scope Card */}
          <div className="p-5 rounded-xl surface-panel border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] space-y-4">
            <h3 className="text-xs font-medium font-semibold text-slate-500 dark:text-neutral-400 border-b border-slate-200 dark:border-white/[0.06] pb-2">
              Solution & Scope Details
            </h3>

            <div className="space-y-2.5 text-sm">
              <div>
                <span className="text-xs text-slate-500 dark:text-neutral-400">Referral Type:</span>
                <div className="font-semibold capitalize text-slate-900 dark:text-white mt-0.5">
                  {referral.referralType === "catalogue"
                    ? "Catalogue Product Suite"
                    : "Custom Enterprise Project"}
                </div>
              </div>

              {referral.referralType === "catalogue" ? (
                <div>
                  <span className="text-xs text-slate-500 dark:text-neutral-400">Software Product:</span>
                  <div className="font-semibold text-cyan-600 dark:text-cyan-400 mt-0.5">
                    {referral.productNameSnapshot || referral.productId}
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div>
                    <span className="text-xs text-slate-500 dark:text-neutral-400">Project Title:</span>
                    <div className="font-semibold text-slate-900 dark:text-white mt-0.5">
                      {referral.customProjectTitle}
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-slate-500 dark:text-neutral-400">Scope Description:</span>
                    <p className="text-xs text-slate-600 dark:text-neutral-300 mt-0.5 leading-relaxed bg-slate-50 dark:bg-white/[0.02] p-2 rounded-xl">
                      {referral.customProjectDescription}
                    </p>
                  </div>
                </div>
              )}

              {referral.expectedTimeline && (
                <div className="flex items-center gap-2 pt-1 text-xs text-slate-500">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Timeline: {referral.expectedTimeline}</span>
                </div>
              )}

              {referral.assignedSalesOwner && (
                <div className="pt-2 border-t border-slate-200/60 dark:border-white/[0.04]">
                  <span className="text-xs text-slate-500 dark:text-neutral-400">
                    Internal Sales Lead:
                  </span>
                  <div className="font-semibold text-slate-900 dark:text-white mt-0.5">
                    {referral.assignedSalesOwner}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Customer Payments & Accrual Progress */}
        <div className="rounded-xl surface-panel border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/[0.06]">
            <div>
              <h3 className="text-sm font-bold font-medium text-slate-900 dark:text-white">
                Customer Receipts & Accrued Commission
              </h3>
              <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
                Commissions accrue proportionally when qualifying client payments are received and verified.
              </p>
            </div>
            <span className="text-xs tabular-nums font-semibold text-cyan-600 dark:text-cyan-400">
              {payments.length} Receipt{payments.length === 1 ? "" : "s"} Recorded
            </span>
          </div>

          {payments.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500 dark:text-neutral-400">
              No payments recorded for this deal yet. Commission accrual occurs once the deal is won and the customer pays the agreed project fee.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-white/[0.06] text-slate-500 tabular-nums uppercase text-xs">
                    <th className="py-2.5 px-3">Receipt ID</th>
                    <th className="py-2.5 px-3">Amount Received</th>
                    <th className="py-2.5 px-3">Payment Reference</th>
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

        {/* Activity Audit Timeline */}
        <div className="rounded-xl surface-panel border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-white/[0.06]">
            <History className="w-4 h-4 text-cyan-500" />
            <h3 className="text-sm font-bold font-medium text-slate-900 dark:text-white">
              Activity & Governance Audit Trail
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
                  <div className="text-xs text-slate-500 dark:text-neutral-400">
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
