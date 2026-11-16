"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PartnerHeader } from "@/components/referral/PartnerHeader";
import { DuplicateWarningBanner } from "@/components/referral/DuplicateWarningBanner";
import { calculateIndicativeCommission } from "@/lib/referral/money";
import { STORE_CATALOG } from "@/lib/store/catalog";
import { CommissionType } from "@/types/referral";
import {
  User,
  Phone,
  Mail,
  Building,
  MapPin,
  Package,
  Layers,
  IndianRupee,
  Percent,
  Calculator,
  ArrowRight,
  AlertCircle,
  Clock,
  Sparkles,
} from "lucide-react";

export default function NewReferralPage() {
  const router = useRouter();

  // Form State
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [city, setCity] = useState("");
  const [customerNotes, setCustomerNotes] = useState("");

  const [referralType, setReferralType] = useState<"catalogue" | "custom">("catalogue");
  const [productId, setProductId] = useState("");
  const [customProjectTitle, setCustomProjectTitle] = useState("");
  const [customProjectDescription, setCustomProjectDescription] = useState("");
  const [expectedTimeline, setExpectedTimeline] = useState("");

  const [proposedQuoteAmount, setProposedQuoteAmount] = useState<number | "">("");
  const [proposedCommissionType, setProposedCommissionType] = useState<CommissionType>("percentage");
  const [proposedCommissionValue, setProposedCommissionValue] = useState<number | "">("");
  const [pricingNotes, setPricingNotes] = useState("");

  // Live duplicate state
  const [duplicate, setDuplicate] = useState(false);

  // Submission state
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Calculated indicative commission
  const quoteNum = typeof proposedQuoteAmount === "number" ? proposedQuoteAmount : 0;
  const commValNum = typeof proposedCommissionValue === "number" ? proposedCommissionValue : 0;

  const calculatedIndicativeCommission = calculateIndicativeCommission(quoteNum, proposedCommissionType, commValNum);

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      setDuplicate(false);
      if (customerPhone.replace(/\D/g, "").length < 10 && !customerEmail.includes("@")) return;
      try {
        const response = await fetch("/api/referral/referrals/check-duplicate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ phone: customerPhone, email: customerEmail }),
          signal: controller.signal,
        });
        const data = await response.json();
        if (!controller.signal.aborted) setDuplicate(response.ok && data.isDuplicate === true);
      } catch {
        // Submission still checks for duplicates on the server.
      }
    }, 400);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [customerPhone, customerEmail]);

  const selectedProduct = STORE_CATALOG.find((p) => p.id === productId || p.slug === productId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!customerName.trim() || !customerPhone.trim() || !customerEmail.trim()) {
      setErrorMessage("Customer contact person, phone number, and email are required.");
      return;
    }

    if (referralType === "custom" && (!customProjectTitle.trim() || !customProjectDescription.trim())) {
      setErrorMessage("Custom project title and scope description are required.");
      return;
    }

    if (!quoteNum || quoteNum <= 0) {
      setErrorMessage("Proposed customer quote must be greater than zero.");
      return;
    }

    if (proposedCommissionType === "percentage" && (commValNum < 0 || commValNum > 100)) {
      setErrorMessage("Commission percentage must be between 0% and 100%.");
      return;
    }

    if (proposedCommissionType === "fixed" && commValNum > quoteNum) {
      setErrorMessage("Fixed commission cannot exceed the customer quote.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/referral/referrals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          customerPhone,
          customerEmail,
          companyName,
          city,
          customerNotes,
          referralType,
          productId: referralType === "catalogue" ? productId : undefined,
          customProjectTitle: referralType === "custom" ? customProjectTitle : undefined,
          customProjectDescription: referralType === "custom" ? customProjectDescription : undefined,
          expectedTimeline,
          proposedQuoteAmount: quoteNum,
          proposedCommissionType,
          proposedCommissionValue: commValNum,
          pricingNotes,
        }),
      });

      const data = await res.json();
      if (!data.success) {
        setErrorMessage(data.error || "Failed to submit referral");
      } else {
        router.push(`/partner/referrals/${data.referral.id}`);
      }
    } catch {
      setErrorMessage("Network error occurred while submitting referral.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#04060a] text-slate-800 dark:text-neutral-200">
      <PartnerHeader />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Header Breadcrumb */}
        <div>
          <div className="flex items-center gap-2 text-xs tabular-nums text-slate-500 dark:text-neutral-400 mb-1">
            <Link href="/partner/dashboard" className="hover:text-cyan-500">
              Partner Portal
            </Link>
            <span>/</span>
            <span className="text-slate-900 dark:text-white font-semibold">Submit Referral Deal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Register Client Opportunity
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-400 mt-1">
            Submit prospective enterprise customer details, project requirements, and proposed commercial terms for agency review.
          </p>
        </div>

        {/* Duplicate Warning Banner */}
        {duplicate && <DuplicateWarningBanner />}

        {/* Error message */}
        {errorMessage && (
          <div className="p-4 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-700 dark:text-rose-400 text-sm flex items-center gap-2">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* SECTION 1: Customer Details */}
          <div className="rounded-xl surface-panel border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] p-6 space-y-5 shadow-sm">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-white/[0.06]">
              <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                <User className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold font-medium text-slate-900 dark:text-white">
                1. Customer & Organization Details
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1.5">
                  Contact Person Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Contact Person Name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-white/[0.1] bg-slate-50/50 dark:bg-white/[0.04] text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1.5">
                  Company / Organization Name
                </label>
                <div className="relative">
                  <Building className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="e.g. Client Enterprise Ltd"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-white/[0.1] bg-slate-50/50 dark:bg-white/[0.04] text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1.5">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="tel"
                    required
                    placeholder="+91 98200 12345"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-white/[0.1] bg-slate-50/50 dark:bg-white/[0.04] text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1.5">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="email"
                    required
                    placeholder="contact@cliententerprise.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-white/[0.1] bg-slate-50/50 dark:bg-white/[0.04] text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1.5">
                  City / Location
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="e.g. Mumbai, Maharashtra"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-white/[0.1] bg-slate-50/50 dark:bg-white/[0.04] text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1.5">
                  Expected Timeline
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <input
                    type="text"
                    placeholder="e.g. Immediate deployment / 2-3 months"
                    value={expectedTimeline}
                    onChange={(e) => setExpectedTimeline(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-sm rounded-xl border border-slate-300 dark:border-white/[0.1] bg-slate-50/50 dark:bg-white/[0.04] text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1.5">
                Client Background / Context Notes
              </label>
              <textarea
                rows={3}
                placeholder="Mention how you connected, existing vendor pain points, or budget expectations..."
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                className="w-full p-3 text-sm rounded-xl border border-slate-300 dark:border-white/[0.1] bg-slate-50/50 dark:bg-white/[0.04] text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all"
              />
            </div>
          </div>

          {/* SECTION 2: Project / Solution Scope */}
          <div className="rounded-xl surface-panel border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] p-6 space-y-5 shadow-sm">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-white/[0.06]">
              <div className="p-1.5 rounded-lg bg-teal-500/10 text-teal-600 dark:text-teal-400">
                <Layers className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold font-medium text-slate-900 dark:text-white">
                2. Solution Type & Project Scope
              </h2>
            </div>

            {/* Referral Type Selector */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setReferralType("catalogue")}
                className={`p-4 rounded-xl border text-left transition-all ${
                  referralType === "catalogue"
                    ? "border-cyan-500 bg-cyan-500/10 text-slate-900 dark:text-white shadow-sm"
                    : "border-slate-200 dark:border-white/[0.08] hover:bg-slate-50 dark:hover:bg-white/[0.02]"
                }`}
              >
                <div className="flex items-center gap-2 font-semibold text-sm">
                  <Package className="w-4 h-4 text-cyan-500" />
                  <span>Catalogue Product / Suite</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1">
                  Existing software product like Kryptik Guard Platform or NOXSOV Events Ticketing
                </p>
              </button>

              <button
                type="button"
                onClick={() => setReferralType("custom")}
                className={`p-4 rounded-xl border text-left transition-all ${
                  referralType === "custom"
                    ? "border-cyan-500 bg-cyan-500/10 text-slate-900 dark:text-white shadow-sm"
                    : "border-slate-200 dark:border-white/[0.08] hover:bg-slate-50 dark:hover:bg-white/[0.02]"
                }`}
              >
                <div className="flex items-center gap-2 font-semibold text-sm">
                  <Sparkles className="w-4 h-4 text-cyan-500" />
                  <span>Custom Enterprise Project</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-neutral-400 mt-1">
                  Bespoke software, tailor-made ERP, custom security algorithms, or cloud migration
                </p>
              </button>
            </div>

            {referralType === "catalogue" ? (
              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1.5">
                    Select NOXSOV Software Suite <span className="text-rose-500">*</span>
                  </label>
                  <select
                    required
                    value={productId}
                    onChange={(e) => setProductId(e.target.value)}
                    className="w-full p-3 text-sm rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-[#0c101a] text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="">Choose a product</option>
                    {STORE_CATALOG.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} — {p.status}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedProduct && (
                  <div className="p-4 rounded-xl bg-slate-100/60 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">
                        {selectedProduct.name}
                      </div>
                      <div className="text-slate-500 dark:text-neutral-400 mt-0.5">
                        {selectedProduct.shortDescription}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1.5">
                    Custom Project Title <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Multi-Facility Cold Chain IoT Monitoring & Automated Compliance"
                    value={customProjectTitle}
                    onChange={(e) => setCustomProjectTitle(e.target.value)}
                    className="w-full p-3 text-sm rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.04] text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1.5">
                    Scope of Work & Deliverables <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe specific modules, architecture requirements, user seats, integrations, and compliance needs discussed with client..."
                    value={customProjectDescription}
                    onChange={(e) => setCustomProjectDescription(e.target.value)}
                    className="w-full p-3 text-sm rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.04] text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
            )}
          </div>

          {/* SECTION 3: Proposed Commercial Terms */}
          <div className="rounded-xl surface-panel border border-slate-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] p-6 space-y-5 shadow-sm">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-200 dark:border-white/[0.06]">
              <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <IndianRupee className="w-4 h-4" />
              </div>
              <h2 className="text-sm font-bold font-medium text-slate-900 dark:text-white">
                3. Proposed Commercial Terms & Commission
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1.5">
                  Proposed Customer Quote (INR ₹) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 tabular-nums text-sm">₹</span>
                  <input
                    type="number"
                    required
                    min={0.01}
                    step={0.01}
                    placeholder="e.g. 350000"
                    value={proposedQuoteAmount}
                    onChange={(e) =>
                      setProposedQuoteAmount(e.target.value === "" ? "" : Number(e.target.value))
                    }
                    className="w-full pl-8 pr-3 py-2 text-sm tabular-nums rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.04] text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Expected contract value discussed with prospective client.
                </p>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1.5">
                  Proposed Commission Structure <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setProposedCommissionType("percentage")}
                    className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-medium border transition-colors ${
                      proposedCommissionType === "percentage"
                        ? "border-cyan-500 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-semibold"
                        : "border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-neutral-400"
                    }`}
                  >
                    <Percent className="w-3.5 h-3.5" />
                    <span>Percentage (%)</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setProposedCommissionType("fixed")}
                    className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-medium border transition-colors ${
                      proposedCommissionType === "fixed"
                        ? "border-cyan-500 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-semibold"
                        : "border-slate-200 dark:border-white/[0.08] text-slate-600 dark:text-neutral-400"
                    }`}
                  >
                    <IndianRupee className="w-3.5 h-3.5" />
                    <span>Fixed Fee (₹)</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1.5">
                  Proposed Commission Value{" "}
                  {proposedCommissionType === "percentage" ? "(%)" : "(₹)"}{" "}
                  <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  min={0}
                  max={proposedCommissionType === "percentage" ? 100 : quoteNum}
                  step={0.01}
                  value={proposedCommissionValue}
                  onChange={(e) =>
                    setProposedCommissionValue(e.target.value === "" ? "" : Number(e.target.value))
                  }
                  className="w-full p-2 text-sm tabular-nums rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.04] text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                />
              </div>

              {/* Indicative Calculation Card */}
              <div className="p-3.5 rounded-xl border border-cyan-500/30 bg-cyan-500/[0.04] dark:bg-cyan-500/[0.02] flex items-center justify-between">
                <div>
                  <div className="text-xs tabular-nums uppercase text-cyan-600 dark:text-cyan-400 font-semibold flex items-center gap-1">
                    <Calculator className="w-3.5 h-3.5" />
                    <span>Indicative Partner Commission</span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
                    {proposedCommissionType === "percentage"
                      ? `${commValNum}% of ₹${quoteNum.toLocaleString("en-IN")}`
                      : `Fixed fee on deal`}
                  </div>
                </div>
                <div className="text-xl font-bold tabular-nums text-cyan-600 dark:text-cyan-400">
                  ₹{calculatedIndicativeCommission.toLocaleString("en-IN")}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-neutral-300 mb-1.5">
                Commercial / Payment Notes
              </label>
              <input
                type="text"
                placeholder="e.g. Customer agreed to 50% advance upon contract signing and 50% on UAT..."
                value={pricingNotes}
                onChange={(e) => setPricingNotes(e.target.value)}
                className="w-full p-3 text-sm rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.04] text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="p-3.5 rounded-xl bg-amber-500/[0.08] border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 space-y-1">
              <div className="font-semibold flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                <span>Notice on Commercial Approval Policy</span>
              </div>
              <p className="text-xs opacity-90 leading-relaxed">
                All submitted prices and proposed commission figures are recorded as proposals until reviewed and approved by NOXSOV agency operations. Commissions are officially accrued upon verified receipt of client payment instalments.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4">
            <Link
              href="/partner/dashboard"
              className="px-5 py-2.5 rounded-xl text-sm font-medium text-slate-600 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-white/[0.04] transition-colors"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-black bg-cyan-400 hover:bg-cyan-300 shadow-sm  transition-colors disabled:opacity-50"
            >
              <span>{submitting ? "Submitting Opportunity..." : "Submit Referral for Review"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
