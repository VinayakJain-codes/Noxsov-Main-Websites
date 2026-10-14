"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import { sendContactEmail } from "@/lib/email";
import { Send, CheckCircle2, ShieldCheck, Clock, Mail } from "lucide-react";

export function ContactForm() {
  const searchParams = useSearchParams();
  const preselectedProduct = searchParams.get("product") || "";
  const preselectedTier = searchParams.get("tier") || "";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "",
    product: preselectedProduct,
    tier: preselectedTier,
    inquiryType: "enterprise-briefing",
    message: "",
  });

  useEffect(() => {
    if (preselectedProduct) {
      setFormData((prev) => ({
        ...prev,
        product: preselectedProduct,
        tier: preselectedTier || prev.tier,
      }));
    }
  }, [preselectedProduct, preselectedTier]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");
  const [emailStatus, setEmailStatus] = useState<"sent" | "unconfigured" | "failed" | null>(null);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      // 1. Record inquiry in backend store
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to submit enterprise inquiry");
      }

      const generatedTicketId = data.ticketId;
      setTicketId(generatedTicketId);

      // 2. Dispatch live email via EmailJS (@emailjs/browser)
      const targetProductName = PRODUCTS.find((p) => p.slug === formData.product)?.name;
      const emailRes = await sendContactEmail({
        ...formData,
        product: targetProductName || "General NOXSOV Solutions",
        ticketId: generatedTicketId,
      });

      if (emailRes.status === "sent" || data.serverEmailDispatched) {
        setEmailStatus("sent");
      } else if (emailRes.status === "unconfigured") {
        setEmailStatus("unconfigured");
      } else {
        setEmailStatus("failed");
      }

      setIsSubmitted(true);
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Error connecting to NOXSOV Solutions Engineering"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div
        id="contact-success-panel"
        className="glass-panel rounded-3xl p-8 sm:p-12 border border-emerald-500/40 bg-emerald-500/[0.06] text-center space-y-6 shadow-2xl"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
            <span>Transmission Logged • Sovereign Encryption</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Enterprise Request Received
          </h3>
          <p className="text-sm text-slate-600 dark:text-neutral-300 max-w-md mx-auto leading-relaxed">
            Thank you, <span className="text-slate-900 dark:text-white font-semibold">{formData.name}</span>. Your inquiry regarding{" "}
            <span className="text-cyan-600 dark:text-cyan-400 font-semibold">
              {PRODUCTS.find((p) => p.slug === formData.product)?.name || "NOXSOV Solutions"}
            </span>{" "}
            has been dispatched directly to our systems engineering team.
          </p>
        </div>

        {/* Real-time EmailJS notification badge */}
        {emailStatus === "sent" && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30">
            <Mail className="w-3.5 h-3.5 text-cyan-500" />
            <span>Instant notification dispatched to engineering team via EmailJS</span>
          </div>
        )}
        {emailStatus === "unconfigured" && (
          <div className="max-w-md mx-auto p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-[11px] font-mono text-cyan-800 dark:text-cyan-300">
            <span className="flex items-center justify-center gap-1.5 mb-1 font-semibold">
              <Mail className="w-3.5 h-3.5" />
              <span>EmailJS Ready</span>
            </span>
            <span>Inquiry saved. Add your <code>NEXT_PUBLIC_EMAILJS_SERVICE_ID</code> in <code>.env.local</code> to trigger real-time email delivery.</span>
          </div>
        )}

        <div className="max-w-xs mx-auto p-3.5 rounded-xl bg-slate-100 dark:bg-black/50 border border-slate-200 dark:border-white/[0.08] text-xs font-mono text-slate-700 dark:text-neutral-300 space-y-1">
          <div className="flex justify-between">
            <span className="text-slate-500 dark:text-neutral-500">Inquiry Reference:</span>
            <span className="text-cyan-600 dark:text-cyan-400 font-bold">{ticketId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 dark:text-neutral-500">Target SLA:</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">&lt; 4 Business Hours</span>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={() => {
              setIsSubmitted(false);
              setEmailStatus(null);
              setFormData({
                name: "",
                email: "",
                company: "",
                role: "",
                product: "",
                tier: "",
                inquiryType: "enterprise-briefing",
                message: "",
              });
            }}
            className="text-xs font-mono text-slate-500 hover:text-slate-800 dark:text-neutral-400 dark:hover:text-white underline transition-colors"
          >
            Submit another enterprise inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      id="enterprise-contact-form"
      onSubmit={handleSubmit}
      className="glass-panel rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-white/[0.1] shadow-2xl space-y-6"
    >
      <div className="border-b border-slate-200 dark:border-white/[0.08] pb-4 space-y-1">
        <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
          Request Technical Briefing or Deployment
        </h3>
        <p className="text-xs text-slate-500 dark:text-neutral-400">
          Direct communication with our engineering council. Zero sales spam.
        </p>
      </div>

      {submitError && (
        <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-xs text-red-600 dark:text-red-400 font-mono">
          {submitError}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div className="space-y-1.5">
          <label htmlFor="contact-name-input" className="block text-xs font-mono text-slate-700 dark:text-neutral-300">
            Full Name <span className="text-cyan-600 dark:text-cyan-400">*</span>
          </label>
          <input
            id="contact-name-input"
            type="text"
            required
            placeholder="Dr. Alisha Chen"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-300 dark:border-white/[0.1] text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
          />
        </div>

        {/* Work Email */}
        <div className="space-y-1.5">
          <label htmlFor="contact-email-input" className="block text-xs font-mono text-slate-700 dark:text-neutral-300">
            Work Email <span className="text-cyan-600 dark:text-cyan-400">*</span>
          </label>
          <input
            id="contact-email-input"
            type="email"
            required
            placeholder="alisha@enterprise.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-300 dark:border-white/[0.1] text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
          />
        </div>

        {/* Company */}
        <div className="space-y-1.5">
          <label htmlFor="contact-company-input" className="block text-xs font-mono text-slate-700 dark:text-neutral-300">
            Organization / Company <span className="text-cyan-600 dark:text-cyan-400">*</span>
          </label>
          <input
            id="contact-company-input"
            type="text"
            required
            placeholder="Acme Global Defense Corp"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-300 dark:border-white/[0.1] text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
          />
        </div>

        {/* Role */}
        <div className="space-y-1.5">
          <label htmlFor="contact-role-input" className="block text-xs font-mono text-slate-700 dark:text-neutral-300">
            Role / Department
          </label>
          <input
            id="contact-role-input"
            type="text"
            placeholder="CISO / VP Infrastructure / CFO"
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-300 dark:border-white/[0.1] text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Product Selector */}
        <div className="space-y-1.5">
          <label htmlFor="contact-product-select" className="block text-xs font-mono text-slate-700 dark:text-neutral-300">
            Product Area of Interest <span className="text-cyan-600 dark:text-cyan-400">*</span>
          </label>
          <select
            id="contact-product-select"
            value={formData.product}
            onChange={(e) => setFormData({ ...formData, product: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#090e17] border border-slate-300 dark:border-white/[0.1] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
          >
            <option value="">General NOXSOV Architecture Inquiry</option>
            {PRODUCTS.map((p) => (
              <option key={p.id} value={p.slug}>
                {p.brandTag} ({p.status})
              </option>
            ))}
          </select>
        </div>

        {/* Inquiry Type */}
        <div className="space-y-1.5">
          <label htmlFor="contact-inquiry-type" className="block text-xs font-mono text-slate-700 dark:text-neutral-300">
            Inquiry Objective
          </label>
          <select
            id="contact-inquiry-type"
            value={formData.inquiryType}
            onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-[#090e17] border border-slate-300 dark:border-white/[0.1] text-sm text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
          >
            <option value="enterprise-briefing">Schedule Technical Architecture Briefing</option>
            <option value="air-gapped-quote">Air-Gapped Sovereign Deployment Assessment</option>
            <option value="pilot-program">Early Access Pilot / Design Partner Application</option>
            <option value="security-audit">Request Cryptographic Audit Documentation</option>
            <option value="pricing-custom">Custom Fleet Pricing & SLA Consultation</option>
          </select>
        </div>
      </div>

      {formData.tier && (
        <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-700 dark:text-cyan-300 flex items-center justify-between">
          <span>Target Deployment Tier Selected:</span>
          <span className="font-bold text-slate-900 dark:text-white">{formData.tier}</span>
        </div>
      )}

      {/* Message */}
      <div className="space-y-1.5">
        <label htmlFor="contact-message-input" className="block text-xs font-mono text-slate-700 dark:text-neutral-300">
          Deployment Scope & Requirements <span className="text-cyan-600 dark:text-cyan-400">*</span>
        </label>
        <textarea
          id="contact-message-input"
          required
          rows={4}
          placeholder="Please describe your fleet scale, environment requirements (e.g. cloud vs air-gapped on-prem), and timeline..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-white/[0.03] border border-slate-300 dark:border-white/[0.1] text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-neutral-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-colors"
        />
      </div>

      {/* Security note & submit button */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-neutral-400">
          <ShieldCheck className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
          <span>Encrypted transmission • Direct engineering routing via EmailJS</span>
        </div>

        <button
          id="contact-submit-btn"
          type="submit"
          disabled={isSubmitting}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-xs text-black bg-cyan-400 hover:bg-cyan-300 transition-all shadow-lg shadow-cyan-500/25 active:scale-[0.98] disabled:opacity-50"
        >
          {isSubmitting ? (
            <>
              <Clock className="w-4 h-4 animate-spin" />
              <span>Transmitting Securely...</span>
            </>
          ) : (
            <>
              <span>Transmit Inquiry</span>
              <Send className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
