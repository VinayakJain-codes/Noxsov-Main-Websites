import emailjs from "@emailjs/browser";

export interface ContactEmailPayload {
  name: string;
  email: string;
  company: string;
  role?: string;
  product?: string;
  tier?: string;
  inquiryType: string;
  message: string;
  ticketId?: string;
}

export interface EmailSendResult {
  success: boolean;
  status: "sent" | "unconfigured" | "failed";
  error?: string;
}

/**
 * Dispatches an enterprise contact inquiry email via EmailJS (@emailjs/browser).
 * Requires NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, and NEXT_PUBLIC_EMAILJS_PUBLIC_KEY.
 */
export async function sendContactEmail(payload: ContactEmailPayload): Promise<EmailSendResult> {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID?.trim();
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID?.trim();
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY?.trim();

  // If not configured or still placeholder, log helpful guidance without blocking form
  if (
    !serviceId ||
    !templateId ||
    !publicKey ||
    serviceId.includes("your_") ||
    templateId.includes("your_") ||
    publicKey.includes("your_")
  ) {
    console.info(
      "[NOXSOV EmailJS] Credentials not configured yet in .env.local (NEXT_PUBLIC_EMAILJS_SERVICE_ID, NEXT_PUBLIC_EMAILJS_TEMPLATE_ID, NEXT_PUBLIC_EMAILJS_PUBLIC_KEY). Ticket recorded in local store."
    );
    return {
      success: true,
      status: "unconfigured",
    };
  }

  try {
    const templateParams: Record<string, unknown> = {
      from_name: payload.name,
      from_email: payload.email,
      reply_to: payload.email,
      company: payload.company,
      role: payload.role || "Not specified",
      product: payload.product || "General NOXSOV Architecture",
      tier: payload.tier || "Standard Inquiry",
      inquiry_type: payload.inquiryType,
      message: payload.message,
      ticket_id: payload.ticketId || "N/A",
      timestamp: new Date().toISOString(),
      to_email: process.env.NEXT_PUBLIC_CONTACT_TO_EMAIL || "sales@noxsov.com",
    };

    const res = await emailjs.send(serviceId, templateId, templateParams, {
      publicKey,
    });

    console.info("[NOXSOV EmailJS] Email sent successfully:", res.status, res.text);
    return {
      success: true,
      status: "sent",
    };
  } catch (err: unknown) {
    console.error("[NOXSOV EmailJS] Failed to send email:", err);
    return {
      success: false,
      status: "failed",
      error: err instanceof Error ? err.message : "EmailJS transmission error",
    };
  }
}
