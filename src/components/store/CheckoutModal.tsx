"use client";

import { useState } from "react";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { useCart } from "@/context/CartContext";
import {
  X,
  ShieldCheck,
  Building,
  Mail,
  User,
  CreditCard,
  FileText,
  Lock,
  Tag,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

export function CheckoutModal() {
  const {
    items,
    subtotal,
    isCheckoutOpen,
    setIsCheckoutOpen,
    clearCart,
    setActiveOrderReceipt,
  } = useCart();

  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    deploymentType: "air-gapped" as "air-gapped" | "cloud" | "on-premise",
    paymentMethod: "corporate_card" as "corporate_card" | "enterprise_po" | "wire_transfer",
    notes: "",
  });

  const [discountCode, setDiscountCode] = useState("SOVEREIGN10");
  const [appliedDiscount, setAppliedDiscount] = useState<string | null>("SOVEREIGN10");
  const [discountPercent, setDiscountPercent] = useState<number>(0.1);
  const [couponMessage, setCouponMessage] = useState<string>("Code SOVEREIGN10 applied: 10% Launch Sovereign Discount!");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  if (!isCheckoutOpen) return null;

  const handleApplyCoupon = () => {
    const code = discountCode.trim().toUpperCase();
    if (code === "SOVEREIGN10") {
      setAppliedDiscount("SOVEREIGN10");
      setDiscountPercent(0.1);
      setCouponMessage("10% Sovereign launch discount applied!");
    } else if (code === "NOXSOV20") {
      setAppliedDiscount("NOXSOV20");
      setDiscountPercent(0.2);
      setCouponMessage("20% Enterprise Partner discount applied!");
    } else if (code === "ENTERPRISE15") {
      setAppliedDiscount("ENTERPRISE15");
      setDiscountPercent(0.15);
      setCouponMessage("15% Volume discount applied!");
    } else {
      setAppliedDiscount(null);
      setDiscountPercent(0);
      setCouponMessage("Invalid discount code. Try SOVEREIGN10 or NOXSOV20");
    }
  };

  const discountAmount = Math.round(subtotal * discountPercent);
  const taxable = Math.max(0, subtotal - discountAmount);
  const tax = Math.round(taxable * 0.18);
  const total = taxable + tax;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.companyName.trim()) {
      setErrorMessage("Please enter your organization or company name.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setErrorMessage("Please provide a valid technical or administrative email.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/store/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            companyName: formData.companyName,
            contactName: formData.contactName || formData.companyName,
            email: formData.email,
            deploymentType: formData.deploymentType,
            notes: formData.notes,
          },
          items,
          discountCode: appliedDiscount || undefined,
          paymentMethod: formData.paymentMethod,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to process sovereign checkout.");
      }

      // Order success!
      clearCart();
      setIsCheckoutOpen(false);
      setActiveOrderReceipt(data.order);
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Network error while completing order"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
        onClick={() => !isSubmitting && setIsCheckoutOpen(false)}
        aria-hidden="true"
      />

      <div className="min-h-full flex items-center justify-center p-4 sm:p-6">
        <div className="relative w-full max-w-2xl bg-white dark:bg-[#080d18] rounded-3xl border border-slate-200 dark:border-white/[0.12] shadow-2xl overflow-hidden text-left">
          {/* Top banner */}
          <div className="p-6 border-b border-slate-200 dark:border-white/[0.08] flex items-center justify-between bg-slate-50/80 dark:bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <BrandLogo size="sm" clickable={false} showText={false} />
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span>Sovereign License Checkout</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-neutral-400">
                  Instant cryptographic license generation & entitlement provisioning
                </p>
              </div>
            </div>

            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => setIsCheckoutOpen(false)}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-neutral-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.05]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {errorMessage && (
              <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Licensee & Organization Details */}
            <div className="space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-400 font-semibold flex items-center gap-2">
                <Building className="w-3.5 h-3.5 text-cyan-500" />
                <span>1. Organization & Entitlement Registry</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-700 dark:text-neutral-300">
                    Organization / Company Name *
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 absolute left-3 top-3 text-slate-400 dark:text-neutral-500" />
                    <input
                      type="text"
                      required
                      placeholder="Apex Systems Ltd."
                      value={formData.companyName}
                      onChange={(e) =>
                        setFormData({ ...formData, companyName: e.target.value })
                      }
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-white/[0.1] bg-slate-50 dark:bg-white/[0.03] text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-700 dark:text-neutral-300">
                    Lead Administrator / Architect Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-3 text-slate-400 dark:text-neutral-500" />
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      value={formData.contactName}
                      onChange={(e) =>
                        setFormData({ ...formData, contactName: e.target.value })
                      }
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-white/[0.1] bg-slate-50 dark:bg-white/[0.03] text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-700 dark:text-neutral-300">
                    Admin Work Email (License Delivery) *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400 dark:text-neutral-500" />
                    <input
                      type="email"
                      required
                      placeholder="secops@company.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-white/[0.1] bg-slate-50 dark:bg-white/[0.03] text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-700 dark:text-neutral-300">
                    Target Deployment Topology
                  </label>
                  <select
                    value={formData.deploymentType}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        deploymentType: e.target.value as any,
                      })
                    }
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-white/[0.1] bg-slate-50 dark:bg-white/[0.03] text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="air-gapped">Air-Gapped Sovereign Data Center</option>
                    <option value="on-premise">On-Premise Private Cluster</option>
                    <option value="cloud">Dedicated Sovereign Cloud Tenant</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment & PO Method */}
            <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-white/[0.06]">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-400 font-semibold flex items-center gap-2">
                <CreditCard className="w-3.5 h-3.5 text-cyan-500" />
                <span>2. Procurement & Payment Method</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: "corporate_card",
                    title: "Corporate Card",
                    desc: "Instant Provisioning",
                    icon: CreditCard,
                  },
                  {
                    id: "enterprise_po",
                    title: "Enterprise PO",
                    desc: "Net-30 Invoice",
                    icon: FileText,
                  },
                  {
                    id: "wire_transfer",
                    title: "Wire / RTGS",
                    desc: "Direct Settlement",
                    icon: Building,
                  },
                ].map((method) => {
                  const isSelected = formData.paymentMethod === method.id;
                  const Icon = method.icon;
                  return (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          paymentMethod: method.id as any,
                        })
                      }
                      className={`p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? "border-cyan-500 bg-cyan-500/10 text-cyan-900 dark:text-white"
                          : "border-slate-200 dark:border-white/[0.08] hover:border-slate-300 dark:hover:border-white/[0.15]"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon className={`w-4 h-4 ${isSelected ? "text-cyan-500" : "text-slate-400"}`} />
                        <span className="text-xs font-semibold">{method.title}</span>
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-neutral-400 mt-1">
                        {method.desc}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Coupon Code Section */}
            <div className="pt-2">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400 dark:text-neutral-500" />
                  <input
                    type="text"
                    placeholder="Promo Code (e.g. SOVEREIGN10)"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 text-xs font-mono uppercase rounded-lg border border-slate-200 dark:border-white/[0.1] bg-slate-50 dark:bg-white/[0.03] text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-200 dark:bg-white/[0.08] hover:bg-slate-300 dark:hover:bg-white/[0.15] text-slate-900 dark:text-white transition-colors"
                >
                  Apply
                </button>
              </div>
              {couponMessage && (
                <div className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1.5 flex items-center gap-1 font-mono">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{couponMessage}</span>
                </div>
              )}
            </div>

            {/* Order Summary Box */}
            <div className="p-4 rounded-2xl bg-slate-100/70 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] space-y-2 text-xs">
              <div className="flex justify-between text-slate-600 dark:text-neutral-400">
                <span>Subtotal ({items.length} items)</span>
                <span className="font-mono">₹{subtotal.toLocaleString("en-IN")}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                  <span>Sovereign Discount ({appliedDiscount})</span>
                  <span className="font-mono">-₹{discountAmount.toLocaleString("en-IN")}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600 dark:text-neutral-400">
                <span>Statutory GST / Sovereign Software Tax (18%)</span>
                <span className="font-mono">₹{tax.toLocaleString("en-IN")}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-white/[0.08]">
                <span>Total Amount</span>
                <span className="font-mono text-cyan-600 dark:text-cyan-400">
                  ₹{total.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl font-bold text-xs text-black bg-gradient-to-r from-cyan-400 via-sky-300 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 shadow-xl shadow-cyan-500/25 active:scale-[0.99] transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Issuing Cryptographic Licenses & Signing Keys...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Authorize Order & Issue Sovereign License Keys</span>
                  </>
                )}
              </button>
              <p className="text-[10px] text-center text-slate-400 dark:text-neutral-500 mt-2">
                By ordering, your organization enters into NOXSOV&apos;s Sovereign Master Software Agreement. 100% offline verifiable.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
