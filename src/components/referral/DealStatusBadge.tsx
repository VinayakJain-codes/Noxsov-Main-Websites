import { DealStatus } from "@/types/referral";

interface DealStatusBadgeProps {
  status: DealStatus;
  size?: "sm" | "md" | "lg";
}

export function DealStatusBadge({ status, size = "md" }: DealStatusBadgeProps) {
  const getStyle = (s: DealStatus) => {
    switch (s) {
      case "pending_review":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
      case "changes_requested":
        return "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20";
      case "approved":
        return "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20";
      case "contacted":
      case "qualified":
      case "proposal_sent":
      case "negotiation":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
      case "won":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      case "lost":
      case "rejected":
      case "cancelled":
        return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20";
      case "duplicate":
        return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20";
      case "draft":
      default:
        return "bg-slate-500/10 text-slate-600 dark:text-neutral-400 border-slate-500/20";
    }
  };

  const getLabel = (s: DealStatus) => {
    switch (s) {
      case "pending_review":
        return "Pending Review";
      case "changes_requested":
        return "Changes Requested";
      case "approved":
        return "Terms Approved";
      case "contacted":
        return "Contacted";
      case "qualified":
        return "Qualified";
      case "proposal_sent":
        return "Proposal Sent";
      case "negotiation":
        return "In Negotiation";
      case "won":
        return "Deal Won";
      case "lost":
        return "Deal Lost";
      case "rejected":
        return "Rejected";
      case "duplicate":
        return "Duplicate Lead";
      case "cancelled":
        return "Cancelled";
      case "draft":
      default:
        return "Draft";
    }
  };

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-2.5 py-1 text-xs",
    lg: "px-3 py-1.5 text-sm",
  }[size];

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border tabular-nums tracking-tight ${getStyle(
        status
      )} ${sizeClasses}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
      <span>{getLabel(status)}</span>
    </span>
  );
}
