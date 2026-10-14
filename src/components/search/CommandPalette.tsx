"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { useTheme } from "@/components/theme/ThemeProvider";
import {
  Search,
  X,
  Shield,
  Coins,
  Server,
  ArrowRight,
  Sun,
  Moon,
  Laptop,
  Building,
  Mail,
  Zap,
} from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { setTheme, resolvedTheme } = useTheme();

  // Listen for ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const navigateTo = useCallback(
    (url: string) => {
      onClose();
      router.push(url);
    },
    [onClose, router]
  );

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredProducts = PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.categoryName.toLowerCase().includes(q) ||
      (p.formerName && p.formerName.toLowerCase().includes(q))
  );

  const filteredCategories = CATEGORIES.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.tagline.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q)
  );

  const staticActions = [
    {
      id: "action-briefing",
      title: "Schedule Architecture Briefing",
      category: "Quick Actions",
      icon: Mail,
      action: () => navigateTo("/contact"),
    },
    {
      id: "action-about",
      title: "About NOXSOV & Sovereign Principles",
      category: "Company",
      icon: Building,
      action: () => navigateTo("/about"),
    },
    {
      id: "action-theme-toggle",
      title: `Switch to ${resolvedTheme === "dark" ? "Light" : "Dark"} Mode`,
      category: "Preferences",
      icon: resolvedTheme === "dark" ? Sun : Moon,
      action: () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
        onClose();
      },
    },
  ].filter((a) => a.title.toLowerCase().includes(q) || a.category.toLowerCase().includes(q));

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Palette Modal */}
      <div className="relative w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden
        bg-white border border-slate-200 text-slate-900
        dark:bg-[#0c121e] dark:border-white/[0.12] dark:text-neutral-100 z-10 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-white/[0.08]">
          <Search className="w-5 h-5 text-cyan-500 mr-3 flex-shrink-0" />
          <input
            id="command-palette-input"
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search products, verticals, actions..."
            className="w-full bg-transparent text-sm focus:outline-none placeholder-slate-400 dark:placeholder-neutral-500 text-slate-900 dark:text-white"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="p-1 rounded-md text-slate-400 hover:text-slate-600 dark:text-neutral-500 dark:hover:text-neutral-300"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono text-slate-400 dark:text-neutral-500 bg-slate-100 dark:bg-white/[0.06] rounded border border-slate-200 dark:border-white/[0.08]">
              ESC
            </kbd>
          )}
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto p-2 space-y-4">
          {/* Products Group */}
          {filteredProducts.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 dark:text-neutral-500">
                Products by NOXSOV
              </div>
              <div className="space-y-1 mt-1">
                {filteredProducts.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => navigateTo(`/products/${p.slug}`)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-colors
                      hover:bg-slate-100 dark:hover:bg-white/[0.05] group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2 rounded-lg bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08] text-cyan-500">
                        {p.categoryId === "security" && <Shield className="w-4 h-4 text-emerald-500" />}
                        {p.categoryId === "finance" && <Coins className="w-4 h-4 text-amber-500" />}
                        {p.categoryId === "it-solutions" && <Server className="w-4 h-4 text-blue-500" />}
                      </div>
                      <div className="truncate">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors">
                            {p.name}
                          </span>
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-200 dark:bg-white/[0.08] text-slate-600 dark:text-neutral-400">
                            {p.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-neutral-400 truncate">
                          {p.tagline}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 dark:text-neutral-500 group-hover:translate-x-1 group-hover:text-cyan-500 transition-all flex-shrink-0 ml-2" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Categories Group */}
          {filteredCategories.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 dark:text-neutral-500">
                Domain Verticals
              </div>
              <div className="space-y-1 mt-1">
                {filteredCategories.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => navigateTo(`/categories/${c.slug}`)}
                    className="w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-colors
                      hover:bg-slate-100 dark:hover:bg-white/[0.05] group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08]">
                        <Zap className="w-4 h-4 text-cyan-500" />
                      </div>
                      <div>
                        <span className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors">
                          {c.name}
                        </span>
                        <p className="text-xs text-slate-500 dark:text-neutral-400">
                          {c.tagline}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-400 dark:text-neutral-500 group-hover:translate-x-1 group-hover:text-cyan-500 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Actions Group */}
          {staticActions.length > 0 && (
            <div>
              <div className="px-3 py-1 text-[11px] font-mono font-semibold uppercase tracking-wider text-slate-400 dark:text-neutral-500">
                Actions & Navigation
              </div>
              <div className="space-y-1 mt-1">
                {staticActions.map((a) => {
                  const Icon = a.icon;
                  return (
                    <button
                      key={a.id}
                      type="button"
                      onClick={a.action}
                      className="w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-colors
                        hover:bg-slate-100 dark:hover:bg-white/[0.05] group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.08]">
                          <Icon className="w-4 h-4 text-cyan-500" />
                        </div>
                        <span className="text-sm font-medium text-slate-800 dark:text-neutral-200 group-hover:text-cyan-500">
                          {a.title}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 dark:text-neutral-500 group-hover:translate-x-1 group-hover:text-cyan-500 transition-all" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* No results */}
          {filteredProducts.length === 0 &&
            filteredCategories.length === 0 &&
            staticActions.length === 0 && (
              <div className="py-12 text-center text-slate-500 dark:text-neutral-400">
                <Search className="w-8 h-8 mx-auto text-slate-300 dark:text-neutral-600 mb-2" />
                <p className="text-sm">No matching solutions or actions found for &ldquo;{query}&rdquo;</p>
                <p className="text-xs text-slate-400 dark:text-neutral-500 mt-1">
                  Try searching for Kryptik, Events, Tax, Security, or Sales.
                </p>
              </div>
            )}
        </div>

        {/* Footer info bar */}
        <div className="px-4 py-2.5 bg-slate-50 dark:bg-black/40 border-t border-slate-200 dark:border-white/[0.06] flex items-center justify-between text-[11px] text-slate-500 dark:text-neutral-400 font-mono">
          <div className="flex items-center gap-3">
            <span>↑↓ to navigate</span>
            <span>↵ to select</span>
            <span>ESC to close</span>
          </div>
          <span className="text-cyan-600 dark:text-cyan-400">NOXSOV Ecosystem Quick Jump</span>
        </div>
      </div>
    </div>
  );
}
