import { NextRequest, NextResponse } from "next/server";
import { createContactTicket } from "@/lib/store/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, role, product, tier, inquiryType, message } = body;

    if (!name || !email || !company) {
      return NextResponse.json(
        { success: false, error: "Name, email, and company are required fields." },
        { status: 400 }
      );
    }

    const ticket = createContactTicket({
      name,
      email,
      company,
      role: role || "Engineering Lead",
      product,
      tier,
      inquiryType: inquiryType || "enterprise-briefing",
      message: message || "General architecture inquiry",
    });

    // Optional server-side EmailJS REST API dispatch if environment credentials are present
    const serviceId = process.env.EMAILJS_SERVICE_ID || process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID || process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY || process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    const privateKey = process.env.EMAILJS_PRIVATE_KEY;

    let serverEmailDispatched = false;
    if (
      serviceId &&
      templateId &&
      publicKey &&
      !serviceId.includes("your_") &&
      !publicKey.includes("your_")
    ) {
      try {
        const payload: Record<string, unknown> = {
          service_id: serviceId,
          template_id: templateId,
          user_id: publicKey,
          template_params: {
            from_name: name,
            from_email: email,
            reply_to: email,
            company,
            role: role || "Not specified",
            product: product || "General NOXSOV Architecture",
            tier: tier || "Standard Inquiry",
            inquiry_type: inquiryType,
            message: message || "General architecture inquiry",
            ticket_id: ticket.ticketId,
            timestamp: new Date().toISOString(),
          },
        };
        if (privateKey) {
          payload.accessToken = privateKey;
        }

        const emailRes = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (emailRes.ok) {
          serverEmailDispatched = true;
        }
      } catch (err) {
        console.warn("[Server EmailJS] REST API dispatch error:", err);
      }
    }

    return NextResponse.json({
      success: true,
      message: "Briefing request recorded with NOXSOV Solutions Engineering.",
      ticketId: ticket.ticketId,
      serverEmailDispatched,
      ticket,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to process inquiry dispatch",
      },
      { status: 500 }
    );
  }
}
