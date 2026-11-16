import { AlertTriangle } from "lucide-react";

export function DuplicateWarningBanner() {
  return (
    <div role="status" className="flex gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-amber-800 dark:text-amber-200">
      <AlertTriangle className="h-5 w-5 shrink-0" aria-hidden="true" />
      <div>
        <p className="text-sm font-semibold">Possible duplicate contact</p>
        <p className="mt-1 text-xs">You can still submit this referral. An administrator will review the match.</p>
      </div>
    </div>
  );
}
