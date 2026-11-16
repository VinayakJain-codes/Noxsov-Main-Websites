import { NextRequest, NextResponse } from "next/server";
import { getReferrals } from "@/lib/referral/db";

import { requireSession, portalErrorResponse } from "@/lib/referral/session";

export async function GET(req: NextRequest) {
  try {
    await requireSession("admin");
    const { searchParams } = new URL(req.url);
    const partnerId = searchParams.get("partnerId") || undefined;
    const referrals = await getReferrals({ partnerId });

    const headers = [
      "Referral ID",
      "Submitted Date",
      "Partner Name",
      "Partner Email",
      "Customer Name",
      "Customer Phone",
      "Customer Email",
      "Company",
      "City",
      "Type",
      "Product / Custom Project",
      "Proposed Quote (INR)",
      "Proposed Commission Type",
      "Proposed Commission Value",
      "Proposed Commission (INR)",
      "Approved Quote (INR)",
      "Approved Commission Type",
      "Approved Commission Value",
      "Approved Commission (INR)",
      "Deal Status",
      "Commission Status",
      "Assigned Sales Owner",
    ];

    const escapeCsv = (val: string | number | null | undefined) => {
      if (val === null || val === undefined) return '""';
      const safe = typeof val === "string" && /^[\s]*[=+@-]|^[\t\r\n]/.test(val) ? "'" + val : val;
      const str = String(safe).replace(/"/g, '""');
      return `"${str}"`;
    };

    const rows = referrals.map((r) => [
      r.id,
      new Date(r.submittedAt).toLocaleDateString("en-IN"),
      r.partnerName,
      r.partnerEmail,
      r.customerName,
      r.customerPhone,
      r.customerEmail,
      r.companyName || "N/A",
      r.city || "N/A",
      r.referralType,
      r.referralType === "catalogue" ? r.productNameSnapshot || r.productId : r.customProjectTitle,
      r.proposedQuoteAmount,
      r.proposedCommissionType,
      r.proposedCommissionValue,
      r.proposedIndicativeCommission,
      r.approvedQuoteAmount ?? "",
      r.approvedCommissionType ?? "",
      r.approvedCommissionValue ?? "",
      r.approvedIndicativeCommission ?? "",
      r.dealStatus,
      r.commissionStatus,
      r.assignedSalesOwner || "Unassigned",
    ]);

    const csvContent = [headers.map(escapeCsv).join(","), ...rows.map((row) => row.map(escapeCsv).join(","))].join(
      "\n"
    );

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="noxsov-referrals-${Date.now()}.csv"`,
      },
    });
  } catch (error) {
    return portalErrorResponse(error);
  }
}
