import { NextRequest, NextResponse } from "next/server";
import { verifyLicenseKey } from "@/lib/store/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");

    if (!key) {
      return NextResponse.json(
        { success: false, error: "License key parameter 'key' is required" },
        { status: 400 }
      );
    }

    const result = verifyLicenseKey(key);
    return NextResponse.json({
      success: result.valid,
      ...result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to verify license key",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const key = body.key || body.licenseKey;

    if (!key) {
      return NextResponse.json(
        { success: false, error: "License key is required in request payload" },
        { status: 400 }
      );
    }

    const result = verifyLicenseKey(key);
    return NextResponse.json({
      success: result.valid,
      ...result,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to verify license key",
      },
      { status: 500 }
    );
  }
}
