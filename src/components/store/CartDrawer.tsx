"use client";

import { useCart } from "@/context/CartContext";
import { BrandLogo } from "@/components/ui/BrandLogo";
import {
  X,
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ShieldCheck,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export function CartDrawer() {
  const {
    items,
    removeItem,
    updateQuantity,
    cartCount,
    subtotal,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    clearCart,
  } = useCart();

  if (!isCartOpen) return null;

  const handleCheckoutClick = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-[#080d17] border-l border-slate-200 dark:border-white/[0.1] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-slate-200 dark:border-white/[0.08] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <BrandLogo size="sm" showText={false} clickable={false} />
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                  Software Store Cart
                </h2>
                <p className="text-xs text-slate-500 dark:text-neutral-400">
                  {cartCount} {cartCount === 1 ? "license selected" : "licenses selected"}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-neutral-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.05] transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-16">
                <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] flex items-center justify-center text-slate-400 dark:text-neutral-500">
                  <ShoppingCart className="w-8 h-8 stroke-[1.5]" />
                </div>
                <div className="space-y-1">
                  <p className="text-base font-semibold text-slate-800 dark:text-white">
                    Your Software Cart is Empty
                  </p>
                  <p className="text-xs text-slate-500 dark:text-neutral-400 max-w-xs">
                    Browse our sovereign store catalog for enterprise cybersecurity, finance, and IT systems.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-500 text-black hover:bg-cyan-400 transition-colors"
                >
                  Explore Store Catalog
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06] space-y-3 transition-colors hover:border-cyan-500/30"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {item.productName}
                      </h4>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[11px] font-medium text-cyan-600 dark:text-cyan-400">
                          {item.tierName}
                        </span>
                        <span className="text-slate-300 dark:text-neutral-600">•</span>
                        <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-slate-200/70 dark:bg-white/[0.06] text-slate-700 dark:text-neutral-300">
                          {item.billingCycle === "annual" ? "Annual License" : "Monthly"}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="p-1.5 text-slate-400 hover:text-red-500 dark:hover:text-red-400 rounded-lg hover:bg-red-500/10 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {item.maxNodes && (
                    <div className="text-[11px] text-slate-500 dark:text-neutral-400 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{item.maxNodes}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-white/[0.04]">
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 border border-slate-200 dark:border-white/[0.1] rounded-lg bg-white dark:bg-black/30 p-0.5">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-slate-500 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white rounded"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs font-mono font-bold px-1.5 text-slate-800 dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-slate-500 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white rounded"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <div className="text-sm font-bold font-mono text-slate-900 dark:text-white">
                        ₹{(item.pricePerUnit * item.quantity).toLocaleString("en-IN")}
                      </div>
                      <div className="text-[10px] text-slate-400 dark:text-neutral-500">
                        ₹{item.pricePerUnit.toLocaleString("en-IN")} / license
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-5 border-t border-slate-200 dark:border-white/[0.08] bg-slate-50/70 dark:bg-black/40 space-y-4">
              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-neutral-400">
                <span>Subtotal</span>
                <span className="text-base font-bold font-mono text-slate-900 dark:text-white">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-[11px] text-cyan-800 dark:text-cyan-300 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-500 shrink-0" />
                <span>Instant cryptographically signed license keys issued upon checkout.</span>
              </div>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={handleCheckoutClick}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-xs text-black bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 shadow-lg shadow-cyan-500/25 active:scale-[0.99] transition-all"
                >
                  <span>Proceed to Sovereign Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={clearCart}
                  className="w-full py-2 text-[11px] text-slate-500 dark:text-neutral-400 hover:text-slate-800 dark:hover:text-white transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
