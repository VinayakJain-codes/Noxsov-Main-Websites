"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { PartnerUser } from "@/types/referral";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import {

  FileText,
  Users,
  Coins,
  CreditCard,
  Download,
  LogOut,

} from "lucide-react";

export function AdminHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<PartnerUser | null>(null);
  const [loadingLogout, setLoadingLogout] = useState(false);

  useEffect(() => {
    fetch("/api/referral/session")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.authenticated && data.user?.role === "admin") {
          setCurrentUser(data.user);
        } else if (data.success) {
          if (pathname !== "/admin/login") {
            router.push(`/admin/login?redirect=${encodeURIComponent(pathname)}`);
          }
        }
      })
      .catch((e) => console.error("Admin session error:", e));
  }, [pathname, router]);

  const handleLogout = async () => {
    setLoadingLogout(true);
    try {
      const response = await fetch("/api/referral/session", { method: "DELETE" });
      if (!response.ok) throw new Error("Logout failed.");
      router.replace("/admin/login");
      router.refresh();
    } catch (e) {
      console.error("Logout failed", e);
    } finally {
      setLoadingLogout(false);
    }
  };

  const navLinks = [
    { href: "/admin/referrals", label: "Referrals Console", icon: FileText },
    { href: "/admin/partners", label: "Partners Directory", icon: Users },
    { href: "/admin/commissions", label: "Commission Ledger", icon: Coins },
    { href: "/admin/payouts", label: "Disbursements & Payouts", icon: CreditCard },
  ];

  const handleExportCsv = () => {
    window.open("/api/referral/export", "_blank");
  };

  return (
    <header className="border-b border-indigo-500/20 bg-slate-900/95 text-white backdrop-blur-xl sticky top-0 z-40 transition-colors shadow-sm shadow-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Brand + Cockpit Title */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link href="/admin/referrals" className="flex items-center gap-2 group">
              <BrandLogo size="md" showTagline={false} clickable={false} />
            </Link>

            <div className="h-5 w-px bg-white/10 hidden sm:block"></div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-white tracking-wider tabular-nums">
                Admin Console
              </span>
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={handleExportCsv}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border border-white/10 bg-white/5 hover:bg-white/10 text-neutral-200 hover:text-white transition-colors"
              title="Download CSV report of all referrals"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Export CSV</span>
            </button>

            <ThemeToggle />

            {currentUser && (
              <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/10 bg-white/5 text-xs">
                <div className="w-2 h-2 rounded-full bg-indigo-400 "></div>
                <div className="text-left tabular-nums">
                  <span className="font-semibold text-white">{currentUser.name}</span>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={handleLogout}
              disabled={loadingLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border border-rose-500/30 bg-rose-500/10 text-rose-300 hover:bg-rose-500/20 transition-colors"
              title="Sign out of Administrator Console"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto mt-2.5 pt-2 border-t border-white/[0.08] no-scrollbar">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive =
              pathname === link.href ||
              (link.href !== "/admin/referrals" && pathname.startsWith(link.href));

            return (
              <Link
                key={link.href}
                href={link.href}
                  aria-current={isActive ? "page" : undefined}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                  isActive
                    ? "bg-indigo-600 text-white font-semibold shadow-sm "
                    : "text-neutral-400 hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
