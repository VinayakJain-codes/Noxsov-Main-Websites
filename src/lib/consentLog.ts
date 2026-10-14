/**
 * NOXSOV Sovereign Consent & Cookie Audit Logging Utility
 * Fully compliant with India's Digital Personal Data Protection Act, 2023 (DPDPA)
 * and DPIIT Data Fiduciary Verifiable Consent Standards.
 */

export interface CookieConsentPreferences {
  necessary: boolean; // Strictly necessary (session, anti-flicker theme, CSRF) - cannot be disabled
  analytics: boolean; // Telemetry & performance metrics - UNCHECKED by default
  preferences: boolean; // Enhanced UI customization - UNCHECKED by default
  marketing: boolean; // Commercial outreach - UNCHECKED by default
}

export interface ConsentAuditRecord {
  consentId: string;
  timestamp: string;
  preferences: CookieConsentPreferences;
  status: "granted" | "rejected" | "customized" | "withdrawn";
  version: string;
  regulatoryFramework: string;
  userAgent?: string;
  supportContact: string;
}

export const DPDPA_POLICY_VERSION = "2026.1-DPDPA-DPIIT";
export const SUPPORT_EMAIL = "support@noxsov.com";
export const STORAGE_KEY_CONSENT = "noxsov-cookie-consent";
export const STORAGE_KEY_RECORD = "noxsov-consent-record";

export const DEFAULT_UNCHECKED_PREFERENCES: CookieConsentPreferences = {
  necessary: true,
  analytics: false,
  preferences: false,
  marketing: false,
};

/**
 * Retrieve active consent audit record from localStorage
 */
export function getStoredConsent(): ConsentAuditRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY_RECORD);
    if (!raw) return null;
    return JSON.parse(raw) as ConsentAuditRecord;
  } catch {
    return null;
  }
}

/**
 * Generate a unique verifiable consent tracking ID (e.g. DPDPA-2026-XXXXX)
 */
export function generateConsentId(): string {
  const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase();
  const timePart = Date.now().toString(36).substring(4).toUpperCase();
  return `DPDPA-${new Date().getFullYear()}-${randomPart}${timePart}`;
}

/**
 * Save user consent choice locally and record into the server audit log
 */
export async function recordConsent(
  preferences: CookieConsentPreferences,
  status: ConsentAuditRecord["status"]
): Promise<ConsentAuditRecord> {
  const existing = getStoredConsent();
  const consentId = existing?.consentId || generateConsentId();
  const timestamp = new Date().toISOString();

  const record: ConsentAuditRecord = {
    consentId,
    timestamp,
    preferences: {
      necessary: true,
      analytics: Boolean(preferences.analytics),
      preferences: Boolean(preferences.preferences),
      marketing: Boolean(preferences.marketing),
    },
    status,
    version: DPDPA_POLICY_VERSION,
    regulatoryFramework: "Digital Personal Data Protection Act, 2023 (DPDPA) & DPIIT Guidelines",
    userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "SSR",
    supportContact: SUPPORT_EMAIL,
  };

  // 1. Store in client localStorage
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY_CONSENT, JSON.stringify(record.preferences));
      localStorage.setItem(STORAGE_KEY_RECORD, JSON.stringify(record));
    } catch (e) {
      console.warn("Could not save consent to localStorage", e);
    }
  }

  // 2. Transmit to server log endpoint for DPDPA Section 6(7) audit compliance
  try {
    await fetch("/api/consent/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(record),
    });
  } catch (err) {
    console.error("Failed to transmit consent audit entry to server:", err);
  }

  return record;
}

/**
 * Revoke/withdraw non-essential consent
 */
export async function withdrawAllConsent(): Promise<ConsentAuditRecord> {
  return recordConsent(
    {
      necessary: true,
      analytics: false,
      preferences: false,
      marketing: false,
    },
    "withdrawn"
  );
}
