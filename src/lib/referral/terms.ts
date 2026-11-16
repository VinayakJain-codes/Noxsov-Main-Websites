import type { CommissionType } from "@/types/referral";
import { PortalError } from "./session";

export function readAmount(value: unknown, label: string, allowZero = false) {
  if ((typeof value !== "number" && typeof value !== "string") ||
      !/^\d{1,10}(\.\d{1,2})?$/.test(String(value).trim())) {
    throw new PortalError(`${label} must be a number with up to two decimal places.`);
  }
  const amount = Number(value);
  if (!allowZero && amount <= 0) throw new PortalError(`${label} must be greater than zero.`);
  return amount;
}

export function readCommercialTerms(quote: unknown, type: unknown, value: unknown): { amount: number; type: CommissionType; commission: number } {
  const amount = readAmount(quote, "Quote");
  const commission = readAmount(value, "Commission", true);
  if (type !== "fixed" && type !== "percentage") throw new PortalError("Select a valid commission type.");
  if (type === "percentage" && commission > 100) throw new PortalError("Commission cannot exceed 100%.");
  if (type === "fixed" && commission > amount) throw new PortalError("Fixed commission cannot exceed the quote.");
  return { amount, type, commission };
}


