import { CommissionStatus } from "@/types/referral";

interface CommissionStatusBadgeProps {
  status: CommissionStatus;
  size?: "sm" | "md";
}

export function CommissionStatusBadge({ status, size = "md" }: CommissionStatusBadgeProps) {
  const getStyle = (s: CommissionStatus) => {
    switch (s) {
      case "not_eligible":
        return "bg-slate-500/10 text-slate-500 dark:text-neutral-400 border-slate-500/20";
      case "pending":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20";
      case "earned":
        return "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20";
      case "partially_paid":
        return "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20";
      case "paid":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
      case "on_hold":
        return "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20";
      case "reversed":
        return "bg-neutral-500/10 text-neutral-500 dark:text-neutral-400 border-neutral-500/20";
      default:
        return "bg-slate-500/10 text-slate-500 dark:text-neutral-400 border-slate-500/20";
    }
  };

  const getLabel = (s: CommissionStatus) => {
    switch (s) {
      case "not_eligible":
        return "Not Eligible";
      case "pending":
        return "Pending Deal Win";
      case "earned":
        return "Earned (Unpaid)";
      case "partially_paid":
        return "Partially Disbursed";
      case "paid":
        return "Fully Paid";
      case "on_hold":
        return "On Hold";
      case "reversed":
        return "Reversed";
      default:
        return s;
    }
  };

  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-xs" : "px-2.5 py-1 text-xs";

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border tabular-nums tracking-tight ${getStyle(
        status
      )} ${sizeClasses}`}
    >
      <span>{getLabel(status)}</span>
    </span>
  );
}
