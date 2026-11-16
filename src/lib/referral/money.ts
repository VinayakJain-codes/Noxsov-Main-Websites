import type { CommissionType } from "@/types/referral";

export const PORTAL_CURRENCY = "INR";

export function toMinorUnits(value: number) {
  return Math.round(value * 100);
}

export function calculateIndicativeCommission(quote: number, type: CommissionType, value: number) {
  if (type === "fixed") return Math.min(quote, value);
  const scaled = BigInt(toMinorUnits(quote)) * BigInt(toMinorUnits(value));
  return Number((scaled + BigInt(5000)) / BigInt(10000)) / 100;
}

