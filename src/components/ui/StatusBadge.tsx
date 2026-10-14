import { ProductStatus } from "@/data/products";

interface StatusBadgeProps {
  status: ProductStatus;
  size?: "sm" | "md";
  className?: string;
}

export function StatusBadge({ status, size = "sm", className = "" }: StatusBadgeProps) {
  const configs: Record<
    ProductStatus,
    { label: string; bg: string; text: string; border: string; dot: string; dotGlow: string }
  > = {
    Delivered: {
      label: "Delivered • Live",
      bg: "bg-emerald-500/10",
      text: "text-emerald-700 dark:text-emerald-400",
      border: "border-emerald-500/30",
      dot: "bg-emerald-500 dark:bg-emerald-400",
      dotGlow: "shadow-[0_0_8px_rgba(16,185,129,0.7)]",
    },
    "In progress": {
      label: "In Progress • Active Beta",
      bg: "bg-amber-500/10",
      text: "text-amber-700 dark:text-amber-400",
      border: "border-amber-500/30",
      dot: "bg-amber-500 dark:bg-amber-400",
      dotGlow: "shadow-[0_0_8px_rgba(245,158,11,0.7)]",
    },
    Concept: {
      label: "Concept • Architectural RFC",
      bg: "bg-cyan-500/10",
      text: "text-cyan-700 dark:text-cyan-400",
      border: "border-cyan-500/30",
      dot: "bg-cyan-500 dark:bg-cyan-400",
      dotGlow: "shadow-[0_0_8px_rgba(6,182,212,0.7)]",
    },
  };

  const config = configs[status] || configs["Concept"];
  const sizeClasses = size === "sm" ? "text-xs px-2.5 py-0.5" : "text-sm px-3.5 py-1";

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium rounded-full border ${config.bg} ${config.text} ${config.border} ${sizeClasses} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot} ${config.dotGlow} animate-pulse`} />
      {config.label}
    </span>
  );
}

export function BrandTagBadge({ tag }: { tag: string }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[11px] font-mono tracking-wide bg-slate-100 dark:bg-white/[0.04] text-slate-700 dark:text-neutral-300 border border-slate-200 dark:border-white/[0.08]">
      <span className="text-cyan-600 dark:text-cyan-400 font-bold">by</span> NOXSOV
    </span>
  );
}
