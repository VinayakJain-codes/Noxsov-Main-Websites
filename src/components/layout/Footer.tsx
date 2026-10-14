import Link from "next/link";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { ShieldCheck, Activity } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="global-footer"
      className="border-t border-slate-200 dark:border-white/[0.08] bg-slate-100 dark:bg-[#04060a] text-slate-600 dark:text-neutral-400 transition-colors"
    >
      {/* Top Banner / Operational Status */}
      <div className="border-b border-slate-200 dark:border-white/[0.06] bg-slate-200/50 dark:bg-black/40 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-800 dark:text-neutral-300 font-mono">
              All Systems Operational & Sovereign
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-500 dark:text-neutral-400 font-mono text-[11px]">
            <span>Phase 1 • Enterprise Discovery Portal</span>
            <span>•</span>
            <span className="text-cyan-600 dark:text-cyan-400 font-medium">SOC 2 Type II Sovereign Aligned</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <BrandLogo size="lg" showTagline={true} />
            <p className="text-sm text-slate-600 dark:text-neutral-400 max-w-sm leading-relaxed">
              NOXSOV is the sovereign enterprise software platform and digital store engineering mission-critical systems across cybersecurity, automated corporate finance, and high-concurrency IT operations.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-neutral-300 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                <span>Zero Telemetry Egress</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-white dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] text-slate-700 dark:text-neutral-300 shadow-sm">
                <Activity className="w-3.5 h-3.5 text-cyan-500 dark:text-cyan-400" />
                <span>Air-Gapped Ready</span>
              </div>
            </div>
          </div>

          {/* Products Column */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-900 dark:text-white font-semibold mb-4">
              Products
            </div>
            <ul className="space-y-2.5 text-sm">
              {PRODUCTS.map((prod) => (
                <li key={prod.id}>
                  <Link
                    href={`/products/${prod.slug}`}
                    className="group inline-flex items-center gap-2 text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    <span>{prod.name}</span>
                    <span className="text-[10px] font-mono text-slate-400 dark:text-neutral-500 group-hover:text-cyan-500 dark:group-hover:text-cyan-400">
                      by NOXSOV
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories Column */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-900 dark:text-white font-semibold mb-4">
              Domain Verticals
            </div>
            <ul className="space-y-2.5 text-sm">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/categories/${cat.slug}`}
                    className="text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/categories"
                  className="text-xs text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 transition-colors inline-flex items-center gap-1 font-medium"
                >
                  All Categories Overview &rarr;
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Support Column */}
          <div>
            <div className="text-xs font-mono uppercase tracking-wider text-slate-900 dark:text-white font-semibold mb-4">
              Company
            </div>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/store"
                  className="text-cyan-600 dark:text-cyan-400 font-semibold hover:underline transition-colors flex items-center gap-1.5"
                >
                  <span>Software Catalog & Solutions</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  About NOXSOV
                </Link>
              </li>
              <li>
                <Link
                  href="/about#principles"
                  className="text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Architectural Principles
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Enterprise Sales
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  Security Operations (SOC)
                </Link>
              </li>
              <li className="pt-2 text-xs text-slate-500 dark:text-neutral-500">
                Direct: <a href="mailto:support@noxsov.com" className="text-slate-800 dark:text-neutral-300 font-medium hover:underline">support@noxsov.com</a>
              </li>
              <li className="pt-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 dark:text-neutral-400">Theme:</span>
                  <ThemeToggle showDropdown={true} />
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-neutral-500">
          <div>
            &copy; {currentYear} NOXSOV Technologies. All rights reserved. Every product tagged &ldquo;[Product] by NOXSOV&rdquo;.
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/privacy" className="hover:text-slate-800 dark:hover:text-neutral-300 transition-colors">
              Privacy Policy (DPDPA)
            </Link>
            <Link href="/cookies" className="hover:text-slate-800 dark:hover:text-neutral-300 transition-colors">
              Cookie Policy & Log
            </Link>
            <Link href="/terms" className="hover:text-slate-800 dark:hover:text-neutral-300 transition-colors">
              Terms of Service
            </Link>
            <Link href="/contact" className="hover:text-slate-800 dark:hover:text-neutral-300 transition-colors">
              Security Disclosures
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
