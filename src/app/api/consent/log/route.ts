import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const LOGS_FILE_PATH = path.join(process.cwd(), "data", "consent_logs.json");

interface ConsentLogEntry {
  consentId: string;
  timestamp: string;
  preferences: {
    necessary: boolean;
    analytics: boolean;
    preferences: boolean;
    marketing: boolean;
  };
  status: string;
  version: string;
  regulatoryFramework: string;
  ipHash: string;
  userAgent: string;
  supportContact: string;
}

// Ensure data directory and logs file exist
async function ensureLogsFile() {
  const dir = path.dirname(LOGS_FILE_PATH);
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch {}

  try {
    await fs.access(LOGS_FILE_PATH);
  } catch {
    await fs.writeFile(LOGS_FILE_PATH, JSON.stringify([], null, 2), "utf-8");
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body || !body.consentId) {
      return NextResponse.json(
        { success: false, error: "Missing required consentId" },
        { status: 400 }
      );
    }

    // Capture anonymized IP hash for DPDPA privacy-preserving audit proof
    const rawIp =
      req.headers.get("x-forwarded-for") ||
      req.headers.get("x-real-ip") ||
      "127.0.0.1";
    const ipHash = crypto
      .createHash("sha256")
      .update(rawIp)
      .digest("hex")
      .substring(0, 16);

    const logEntry: ConsentLogEntry = {
      consentId: String(body.consentId),
      timestamp: body.timestamp || new Date().toISOString(),
      preferences: {
        necessary: true,
        analytics: Boolean(body.preferences?.analytics),
        preferences: Boolean(body.preferences?.preferences),
        marketing: Boolean(body.preferences?.marketing),
      },
      status: String(body.status || "customized"),
      version: body.version || "2026.1-DPDPA-DPIIT",
      regulatoryFramework:
        "Digital Personal Data Protection Act, 2023 (DPDPA) & DPIIT Guidelines",
      ipHash,
      userAgent: req.headers.get("user-agent") || "Unknown",
      supportContact: "support@noxsov.com",
    };

    await ensureLogsFile();

    let logs: ConsentLogEntry[] = [];
    try {
      const data = await fs.readFile(LOGS_FILE_PATH, "utf-8");
      logs = JSON.parse(data);
      if (!Array.isArray(logs)) logs = [];
    } catch {
      logs = [];
    }

    // Append entry (keep last 500 records for performance)
    logs.push(logEntry);
    if (logs.length > 500) {
      logs = logs.slice(-500);
    }

    await fs.writeFile(LOGS_FILE_PATH, JSON.stringify(logs, null, 2), "utf-8");

    return NextResponse.json({
      success: true,
      message: "Consent record logged successfully under DPDPA / DPIIT compliance guidelines.",
      record: logEntry,
    });
  } catch (error) {
    console.error("Error logging consent:", error);
    return NextResponse.json(
      { success: false, error: "Failed to persist consent audit log" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const filterId = searchParams.get("consentId");

    await ensureLogsFile();
    const data = await fs.readFile(LOGS_FILE_PATH, "utf-8");
    let logs: ConsentLogEntry[] = JSON.parse(data);
    if (!Array.isArray(logs)) logs = [];

    if (filterId) {
      logs = logs.filter((l) => l.consentId === filterId);
    }

    return NextResponse.json({
      success: true,
      totalLogged: logs.length,
      complianceNotice:
        "Verifiable Consent Audit Log maintained pursuant to Section 6 of India's Digital Personal Data Protection Act, 2023 (DPDPA) and DPIIT frameworks.",
      contactEmail: "support@noxsov.com",
      logs: logs.slice(-50).reverse(), // Most recent 50
    });
  } catch (error) {
    console.error("Error retrieving consent logs:", error);
    return NextResponse.json(
      { success: false, error: "Unable to retrieve consent logs" },
      { status: 500 }
    );
  }
}
