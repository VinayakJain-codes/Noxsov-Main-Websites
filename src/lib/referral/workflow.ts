import type { DealStatus } from "@/types/referral";

export const reviewStatuses: DealStatus[] = ["pending_review", "changes_requested"];
export const editableStatuses: DealStatus[] = ["draft", ...reviewStatuses];
export const activeStatuses: DealStatus[] = ["approved", "contacted", "qualified", "proposal_sent", "negotiation"];

export function nextDealStatuses(current: DealStatus) {
  const targets: DealStatus[] = activeStatuses.includes(current)
    ? [...activeStatuses, "won", "lost", "cancelled"]
    : reviewStatuses.includes(current) ? ["duplicate", "cancelled"] : [];
  return targets.filter((status) => status !== current);
}
