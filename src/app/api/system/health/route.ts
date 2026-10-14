import { NextResponse } from "next/server";
import { getTelemetryHealth } from "@/lib/store/db";

export async function GET() {
  try {
    const health = getTelemetryHealth();
    return NextResponse.json(health);
  } catch (error) {
    return NextResponse.json(
      {
        status: "DEGRADED",
        error: error instanceof Error ? error.message : "System health probe failure",
        serverTimestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
