"use client";

import { useState, useMemo } from "react";
import { STORE_CATALOG } from "@/lib/store/catalog";
import { StoreProductCard } from "@/components/store/StoreProductCard";
import {
  Search,
  SlidersHorizontal,
  Shield,
  Coins,
  Server,
  Sparkles,
  ShoppingBag,
} from "lucide-react";

export function StoreCatalogView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [sortBy, setSortBy] = useState<"featured" | "rating" | "alphabetical">("featured");

  const filteredProducts = useMemo(() => {
    let list = [...STORE_CATALOG];

    if (selectedCategory !== "all") {
      list = list.filter((p) => p.categoryId === selectedCategory);
    }

    if (selectedStatus !== "all") {
      list = list.filter((p) => p.status === selectedStatus);
    }

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.platforms.some((pl) => pl.toLowerCase().includes(q))
      );
    }

    if (sortBy === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "alphabetical") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    }

    return list;
  }, [searchTerm, selectedCategory, selectedStatus, sortBy]);

  const categoryPills = [
    { id: "all", label: "All Software", icon: ShoppingBag },
    { id: "security", label: "Cybersecurity", icon: Shield },
    { id: "finance", label: "Financial Systems", icon: Coins },
    { id: "it-solutions", label: "IT & Operations", icon: Server },
  ];

  return (
    <div className="space-y-8">
      {/* Search & Filter Bar */}
      <div className="glass-panel p-4 sm:p-6 rounded-3xl border border-slate-200 dark:border-white/[0.08] shadow-lg space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          {/* Search Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400 dark:text-neutral-500" />
            <input
              type="text"
              placeholder="Search software products, eBPF telemetry, ledgers, turnstiles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.03] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-neutral-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
          </div>

          {/* Status Dropdown */}
          <div className="md:col-span-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.03] text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="all">All Release States</option>
              <option value="Delivered">Delivered (Active Production)</option>
              <option value="In progress">In Progress (Early Access)</option>
              <option value="Concept">Concept (Pilot Reservation)</option>
            </select>
          </div>

          {/* Sort Dropdown */}
          <div className="md:col-span-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-white/[0.1] bg-white dark:bg-white/[0.03] text-slate-900 dark:text-white focus:outline-none focus:border-cyan-500"
            >
              <option value="featured">Sort by: Featured</option>
              <option value="rating">Highest Rated</option>
              <option value="alphabetical">Alphabetical (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-200 dark:border-white/[0.06]">
          {categoryPills.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? "bg-cyan-500 text-black shadow-md shadow-cyan-500/25"
                    : "bg-slate-100 hover:bg-slate-200 dark:bg-white/[0.03] dark:hover:bg-white/[0.08] text-slate-700 dark:text-neutral-300 border border-slate-200 dark:border-white/[0.06]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Catalog Metadata Header */}
      <div className="flex items-center justify-between px-2 text-xs text-slate-500 dark:text-neutral-400 font-mono">
        <div className="flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-cyan-500" />
          <span>Showing {filteredProducts.length} sovereign software systems</span>
        </div>
        <span>100% Air-Gapped & Enclave Compatible</span>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="glass-panel p-16 rounded-3xl border border-slate-200 dark:border-white/[0.08] text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-white/[0.03] mx-auto flex items-center justify-center text-slate-400">
            <SlidersHorizontal className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              No matching software products
            </h3>
            <p className="text-xs text-slate-500 dark:text-neutral-400 max-w-sm mx-auto">
              We couldn&apos;t find software matching your filters. Try clearing your search term or switching categories.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("all");
              setSelectedStatus("all");
            }}
            className="px-4 py-2 rounded-xl text-xs font-semibold bg-cyan-500 text-black hover:bg-cyan-400 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <StoreProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
