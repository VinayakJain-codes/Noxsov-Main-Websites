"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { CommandPalette } from "@/components/search/CommandPalette";
import { SovereignStatusModal } from "@/components/system/SovereignStatusModal";
import { useCart } from "@/context/CartContext";
import {
  ChevronDown,
  Menu,
  X,
  Shield,
  Coins,
  Server,
  ArrowRight,
  Search,
  Activity,
  ShoppingCart,
  ShoppingBag,
  KeyRound,
} from "lucide-react";

export function Navbar() {
  const { cartCount, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setProductsOpen(false);
    setCategoriesOpen(false);
  }, [pathname]);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const categoryIcons: Record<string, typeof Shield> = {
    security: Shield,
    finance: Coins,
    "it-solutions": Server,
  };

  return (
    <>
      <header
        id="main-navigation"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 dark:bg-[#06090e]/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/[0.08] shadow-lg shadow-slate-900/5 dark:shadow-black/40 py-3"
            : "bg-transparent border-b border-slate-200/40 dark:border-white/[0.04] py-4 sm:py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo & Navigation */}
            <div className="flex items-center gap-6 lg:gap-8">
              <BrandLogo size="md" showTagline={false} />

              {/* Desktop Navigation Links */}
              <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
                {/* Products Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => setProductsOpen(true)}
                  onMouseLeave={() => setProductsOpen(false)}
                >
                  <button
                    id="nav-products-dropdown"
                    type="button"
                    className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      pathname.startsWith("/products")
                        ? "text-cyan-600 dark:text-cyan-400 bg-slate-100 dark:bg-white/[0.05]"
                        : "text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.03]"
                    }`}
                    aria-expanded={productsOpen}
                  >
                    Products
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        productsOpen ? "rotate-180 text-cyan-500" : "text-slate-400 dark:text-neutral-500"
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {productsOpen && (
                    <div className="absolute top-full left-0 w-[420px] pt-2">
                      <div className="rounded-2xl glass-panel p-3 shadow-2xl border border-slate-200 dark:border-white/[0.1] bg-white/95 dark:bg-[#090d16]/95 backdrop-blur-2xl">
                        <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-400 px-3 py-1 font-semibold border-b border-slate-200 dark:border-white/[0.06] mb-1.5 flex items-center justify-between">
                          <span>NOXSOV Product Ecosystem</span>
                          <Link
                            href="/products"
                            className="text-cyan-600 dark:text-cyan-400 hover:underline flex items-center gap-1 lowercase"
                          >
                            all products <ArrowRight className="w-3 h-3" />
                          </Link>
                        </div>

                        <div className="space-y-1">
                          {PRODUCTS.map((prod) => (
                            <Link
                              key={prod.id}
                              href={`/products/${prod.slug}`}
                              className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/[0.05] transition-colors"
                            >
                              <div className="p-2 rounded-lg bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] group-hover:border-cyan-500/40 group-hover:bg-cyan-500/10 transition-colors">
                                {prod.categoryId === "security" && (
                                  <Shield className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                                )}
                                {prod.categoryId === "finance" && (
                                  <Coins className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                                )}
                                {prod.categoryId === "it-solutions" && (
                                  <Server className="w-4 h-4 text-blue-500 dark:text-blue-400" />
                                )}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                                    {prod.name}
                                  </span>
                                  {prod.status === "Delivered" && (
                                    <span className="text-[10px] font-medium px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30">
                                      Live
                                    </span>
                                  )}
                                  {prod.status === "In progress" && (
                                    <span className="text-[10px] font-medium px-1.5 py-0.2 rounded bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30">
                                      In Progress
                                    </span>
                                  )}
                                  {prod.status === "Concept" && (
                                    <span className="text-[10px] font-medium px-1.5 py-0.2 rounded bg-cyan-500/15 text-cyan-700 dark:text-cyan-400 border border-cyan-500/30">
                                      Concept
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs text-slate-500 dark:text-neutral-400 truncate mt-0.5">
                                  {prod.tagline}
                                </p>
                                {prod.formerName && (
                                  <span className="text-[10px] text-slate-400 dark:text-neutral-500 block">
                                    formerly {prod.formerName}
                                  </span>
                                )}
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Categories Dropdown */}
                <div
                  className="relative"
                  onMouseEnter={() => setCategoriesOpen(true)}
                  onMouseLeave={() => setCategoriesOpen(false)}
                >
                  <button
                    id="nav-categories-dropdown"
                    type="button"
                    className={`flex items-center gap-1.5 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      pathname.startsWith("/categories")
                        ? "text-cyan-600 dark:text-cyan-400 bg-slate-100 dark:bg-white/[0.05]"
                        : "text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.03]"
                    }`}
                    aria-expanded={categoriesOpen}
                  >
                    Categories
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        categoriesOpen ? "rotate-180 text-cyan-500" : "text-slate-400 dark:text-neutral-500"
                      }`}
                    />
                  </button>

                  {categoriesOpen && (
                    <div className="absolute top-full left-0 w-[360px] pt-2">
                      <div className="rounded-2xl glass-panel p-3 shadow-2xl border border-slate-200 dark:border-white/[0.1] bg-white/95 dark:bg-[#090d16]/95 backdrop-blur-2xl">
                        <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-400 px-3 py-1 font-semibold border-b border-slate-200 dark:border-white/[0.06] mb-1.5">
                          Domain Verticals
                        </div>
                        <div className="space-y-1">
                          {CATEGORIES.map((cat) => {
                            const IconComp = categoryIcons[cat.id] || Shield;
                            return (
                              <Link
                                key={cat.id}
                                href={`/categories/${cat.slug}`}
                                className="group flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/[0.05] transition-colors"
                              >
                                <div className="p-2 rounded-lg bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.06] group-hover:border-cyan-500/40 transition-colors">
                                  <IconComp className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-semibold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                                    {cat.name}
                                  </div>
                                  <p className="text-xs text-slate-500 dark:text-neutral-400 line-clamp-1 mt-0.5">
                                    {cat.tagline}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Software Store Link */}
                <Link
                  id="nav-store-link"
                  href="/store"
                  className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                    pathname === "/store"
                      ? "text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 border border-cyan-500/30"
                      : "text-slate-700 dark:text-neutral-300 hover:text-cyan-600 dark:hover:text-cyan-300 hover:bg-slate-100 dark:hover:bg-white/[0.03]"
                  }`}
                >
                  <ShoppingBag className="w-4 h-4 text-cyan-500" />
                  <span>Store</span>
                  <span className="text-[10px] uppercase font-mono px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 font-bold ml-0.5">
                    Live
                  </span>
                </Link>



                {/* About Link */}
                <Link
                  id="nav-about-link"
                  href="/about"
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    pathname === "/about"
                      ? "text-cyan-600 dark:text-cyan-400 bg-slate-100 dark:bg-white/[0.05]"
                      : "text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.03]"
                  }`}
                >
                  About
                </Link>

                {/* Contact Link */}
                <Link
                  id="nav-contact-link"
                  href="/contact"
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    pathname === "/contact"
                      ? "text-cyan-600 dark:text-cyan-400 bg-slate-100 dark:bg-white/[0.05]"
                      : "text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.03]"
                  }`}
                >
                  Contact
                </Link>
              </nav>
            </div>

            {/* Right Action Tools: Search, Sovereign Status, Theme Toggle, Contact CTA */}
            <div className="flex items-center gap-2 sm:gap-3">


              {/* Quick Search / Command Palette trigger */}
              <button
                id="nav-command-search-btn"
                type="button"
                onClick={() => setCommandPaletteOpen(true)}
                className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono
                  bg-slate-100 hover:bg-slate-200/80 text-slate-600 hover:text-slate-900 border border-slate-200
                  dark:bg-white/[0.04] dark:hover:bg-white/[0.08] dark:text-neutral-300 dark:hover:text-white dark:border-white/[0.08] transition-colors"
                title="Search ecosystem (Ctrl+K or ⌘K)"
              >
                <Search className="w-3.5 h-3.5 text-cyan-500" />
                <span>Search...</span>
                <kbd className="px-1.5 py-0.5 text-[10px] bg-white dark:bg-white/[0.08] border border-slate-300 dark:border-white/[0.1] rounded text-slate-500 dark:text-neutral-400">
                  ⌘K
                </kbd>
              </button>

              {/* Theme Toggle Button */}
              <ThemeToggle showDropdown={false} />

              {/* Contact Sales CTA */}
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  id="nav-contact-sales-btn"
                  href="/contact"
                  className="relative inline-flex items-center justify-center px-4 py-2 text-xs font-semibold tracking-wide text-black bg-gradient-to-r from-cyan-400 to-cyan-300 hover:from-cyan-300 hover:to-cyan-200 rounded-lg shadow-sm shadow-cyan-500/20 hover:shadow-cyan-500/40 transition-all active:scale-[0.98]"
                >
                  Contact Sales
                </Link>
              </div>

              {/* Mobile Search Button */}
              <button
                type="button"
                onClick={() => setCommandPaletteOpen(true)}
                className="p-2 md:hidden rounded-lg text-slate-700 dark:text-neutral-300 hover:bg-slate-100 dark:hover:bg-white/[0.05]"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Mobile Menu Hamburger */}
              <div className="flex md:hidden items-center">
                <button
                  id="mobile-menu-toggle-btn"
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="p-2 rounded-lg text-slate-700 dark:text-neutral-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.05] focus:outline-none"
                  aria-label="Toggle navigation menu"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-panel border-b border-slate-200 dark:border-white/[0.1] bg-white/98 dark:bg-[#070b14]/98 px-4 pt-3 pb-6 space-y-4">
            <div className="pb-3 border-b border-slate-200 dark:border-white/[0.06] flex items-center justify-between">
              <BrandLogo size="sm" showTagline={true} />
              <div className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 font-semibold">
                Sovereign Core
              </div>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-mono uppercase text-slate-500 dark:text-neutral-400 px-3 py-1 font-semibold">
                Products
              </div>
              {PRODUCTS.map((prod) => (
                <Link
                  key={prod.id}
                  href={`/products/${prod.slug}`}
                  className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-slate-800 dark:text-neutral-200 hover:bg-slate-100 dark:hover:bg-white/[0.05]"
                >
                  <span>{prod.name}</span>
                  <span className="text-xs text-slate-500 dark:text-neutral-400 font-mono">{prod.status}</span>
                </Link>
              ))}
            </div>

            <div className="space-y-1 border-t border-slate-200 dark:border-white/[0.06] pt-3">
              <div className="text-xs font-mono uppercase text-slate-500 dark:text-neutral-400 px-3 py-1 font-semibold">
                Categories
              </div>
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/categories/${cat.slug}`}
                  className="block px-3 py-2 rounded-lg text-sm text-slate-800 dark:text-neutral-200 hover:bg-slate-100 dark:hover:bg-white/[0.05]"
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            <div className="space-y-1 border-t border-slate-200 dark:border-white/[0.06] pt-3">
              <div className="text-xs font-mono uppercase text-cyan-600 dark:text-cyan-400 px-3 py-1 font-semibold flex items-center justify-between">
                <span>Software Store & Licensing</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 font-bold">
                  Instant Access
                </span>
              </div>
              <Link
                href="/store"
                className="flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-white/[0.05]"
              >
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-cyan-500" />
                  <span>Browse Software Catalog</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </Link>

            </div>

            <div className="space-y-1 border-t border-slate-200 dark:border-white/[0.06] pt-3">
              <Link
                href="/about"
                className="block px-3 py-2 rounded-lg text-sm text-slate-800 dark:text-neutral-200 hover:bg-slate-100 dark:hover:bg-white/[0.05]"
              >
                About NOXSOV
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 rounded-lg text-sm text-slate-800 dark:text-neutral-200 hover:bg-slate-100 dark:hover:bg-white/[0.05]"
              >
                Contact & Sales
              </Link>
            </div>

            {/* Mobile Status button */}
            <div className="border-t border-slate-200 dark:border-white/[0.06] pt-3">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setStatusModalOpen(true);
                }}
                className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20"
              >
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4" />
                  <span>Inspect Sovereign Telemetry</span>
                </div>
                <span>● Operational</span>
              </button>
            </div>

            <div className="pt-2">
              <Link
                href="/contact"
                className="w-full inline-flex items-center justify-center px-4 py-2.5 text-xs font-semibold text-black bg-cyan-400 rounded-lg hover:bg-cyan-300"
              >
                Contact Enterprise Sales
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Global Modals */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />

      <SovereignStatusModal
        isOpen={statusModalOpen}
        onClose={() => setStatusModalOpen(false)}
      />
    </>
  );
}
