import { ReferralRecord } from "@/types/referral";
import { CheckCircle2, Clock, AlertCircle } from "lucide-react";

interface CommercialTermsComparisonProps {
  referral: ReferralRecord;
  showAdminBadge?: boolean;
}

export function CommercialTermsComparison({
  referral,
  showAdminBadge = true,
}: CommercialTermsComparisonProps) {
  const isApproved = Boolean(referral.approvedQuoteAmount);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Proposed Terms (Partner Submitted) */}
      <div className="rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50/50 dark:bg-white/[0.02] p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/[0.06]">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-500" />
            <h4 className="text-xs font-medium font-semibold text-slate-700 dark:text-neutral-300">
              Partner Proposed Terms
            </h4>
          </div>
          <span className="text-xs tabular-nums px-2 py-0.5 rounded-full bg-slate-200 dark:bg-white/[0.06] text-slate-600 dark:text-neutral-400 font-semibold">
            Submitted Proposal
          </span>
        </div>

        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-neutral-400">Proposed Customer Quote:</span>
            <span className="font-semibold tabular-nums text-slate-900 dark:text-white">
              ₹{referral.proposedQuoteAmount.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-500 dark:text-neutral-400">Proposed Commission:</span>
            <span className="font-semibold tabular-nums text-cyan-600 dark:text-cyan-400">
              {referral.proposedCommissionType === "percentage"
                ? `${referral.proposedCommissionValue}% (${referral.currency})`
                : `₹${referral.proposedCommissionValue.toLocaleString("en-IN")} Fixed`}
            </span>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-white/[0.04]">
            <span className="text-xs font-medium text-slate-700 dark:text-neutral-300">
              Indicative Commission:
            </span>
            <span className="font-bold tabular-nums text-slate-900 dark:text-white">
              ₹{referral.proposedIndicativeCommission.toLocaleString("en-IN")}
            </span>
          </div>

          {referral.pricingNotes && (
            <div className="pt-2 text-xs text-slate-500 dark:text-neutral-400 bg-slate-100/60 dark:bg-white/[0.02] p-2.5 rounded-xl border border-slate-200/40 dark:border-white/[0.04]">
              <span className="font-semibold text-slate-700 dark:text-neutral-300">Partner Notes: </span>
              {referral.pricingNotes}
            </div>
          )}
        </div>

        <p className="text-xs text-slate-400 dark:text-neutral-500 italic">
          *Partner-submitted figures are proposals and subject to verification before becoming binding.
        </p>
      </div>

      {/* Admin Approved Terms */}
      <div
        className={`rounded-xl border p-5 space-y-4 transition-all ${
          isApproved
            ? "border-emerald-500/30 bg-emerald-500/[0.03] dark:bg-emerald-500/[0.02]"
            : "border-slate-200 dark:border-white/[0.08] bg-slate-50/20 dark:bg-white/[0.01]"
        }`}
      >
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-white/[0.06]">
          <div className="flex items-center gap-2">
            {isApproved ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            ) : (
              <AlertCircle className="w-4 h-4 text-slate-400" />
            )}
            <h4 className="text-xs font-medium font-semibold text-slate-700 dark:text-neutral-300">
              Agency Approved Terms
            </h4>
          </div>

          {showAdminBadge && (
            <span
              className={`text-xs tabular-nums px-2 py-0.5 rounded-full font-semibold ${
                isApproved
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                  : "bg-slate-200 dark:bg-white/[0.06] text-slate-500 dark:text-neutral-400"
              }`}
            >
              {isApproved ? "Approved Terms" : "Awaiting Review"}
            </span>
          )}
        </div>

        {isApproved ? (
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-neutral-400">Approved Customer Quote:</span>
              <span className="font-semibold tabular-nums text-slate-900 dark:text-white">
                ₹{(referral.approvedQuoteAmount || 0).toLocaleString("en-IN")}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-neutral-400">Approved Commission:</span>
              <span className="font-semibold tabular-nums text-emerald-600 dark:text-emerald-400">
                {referral.approvedCommissionType === "percentage"
                  ? `${referral.approvedCommissionValue}% of Net Receipts`
                  : `₹${(referral.approvedCommissionValue || 0).toLocaleString("en-IN")} Fixed`}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-white/[0.04]">
              <span className="text-xs font-medium text-slate-700 dark:text-neutral-300">
                Approved Indicative Total:
              </span>
              <span className="font-bold tabular-nums text-emerald-600 dark:text-emerald-400 text-base">
                ₹{(referral.approvedIndicativeCommission || 0).toLocaleString("en-IN")}
              </span>
            </div>

            {referral.approvedAt && (
              <div className="text-xs tabular-nums text-slate-400 dark:text-neutral-500">
                Approved on {new Date(referral.approvedAt).toLocaleDateString("en-IN")}
              </div>
            )}
          </div>
        ) : (
          <div className="py-6 text-center space-y-2">
            <p className="text-xs text-slate-500 dark:text-neutral-400">
              Commercial review pending by NOXSOV agency operations. Official quote and commission will appear here upon authorization.
            </p>
            <span className="inline-block text-xs tabular-nums text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg">
              Pending Admin Action
            </span>
          </div>
        )}

        {referral.customerFacingNotes && (
          <div className="pt-2 text-xs text-slate-600 dark:text-neutral-300 bg-cyan-500/[0.06] p-2.5 rounded-xl border border-cyan-500/20">
            <span className="font-semibold text-cyan-700 dark:text-cyan-300">Agency Note to Partner: </span>
            {referral.customerFacingNotes}
          </div>
        )}
      </div>
    </div>
  );
}
