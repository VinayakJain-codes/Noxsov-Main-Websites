"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { PartnerProfile, PartnerUser } from "@/types/referral";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import {
  LayoutDashboard,
  FileSpreadsheet,
  Coins,
  User,
  PlusCircle,

  LogOut,
  Building,
} from "lucide-react";

export function PartnerHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<PartnerUser | null>(null);
  const [profile, setProfile] = useState<PartnerProfile | null>(null);
  const [loadingLogout, setLoadingLogout] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/referral/session?view=profile", { signal: controller.signal })
      .then((response) => response.json())
      .then((data) => {
        if (controller.signal.aborted) return;
        if (data.authenticated && data.user?.role === "partner") {
          setCurrentUser(data.user);
          setProfile(data.profile);
        } else if (data.success) {
          router.replace(`/partner/login?redirect=${encodeURIComponent(pathname)}`);
        }
      })
      .catch((error) => {
        if (!controller.signal.aborted) console.error("Failed to load partner session", error);
      });
    return () => controller.abort();
  }, [pathname, router]);

  const handleLogout = async () => {
    setLoadingLogout(true);
    try {
      const response = await fetch("/api/referral/session", { method: "DELETE" });
      if (!response.ok) throw new Error("Logout failed.");
      router.replace("/partner/login");
      router.refresh();
    } catch (e) {
      console.error("Logout failed", e);
    } finally {
      setLoadingLogout(false);
    }
  };

  const navLinks = [
    { href: "/partner/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/partner/referrals/new", label: "Submit Referral", icon: PlusCircle, highlight: true },
    { href: "/partner/referrals", label: "My Referrals", icon: FileSpreadsheet },
    { href: "/partner/commissions", label: "Commissions & Payouts", icon: Coins },
    { href: "/partner/profile", label: "Profile & Bank", icon: User },
  ];

  return (
    <header className="border-b border-slate-200 dark:border-white/[0.08] bg-white/90 dark:bg-[#06090e]/90 backdrop-blur-xl sticky top-0 z-40 transition-colors shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Brand + Portal Label */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link href="/partner/dashboard" className="flex items-center gap-2 group">
              <BrandLogo size="md" showTagline={false} clickable={false} />
            </Link>

            <div className="h-5 w-px bg-slate-200 dark:bg-white/[0.1] hidden sm:block"></div>

            <div className="hidden sm:flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-900 dark:text-white font-medium">
                Partner Portal
              </span>
            </div>
          </div>

          {/* User Badge + Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            {currentUser && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-white/[0.03] text-xs">
                <div className="w-2 h-2 rounded-full bg-emerald-500 "></div>
                <div className="text-left">
                  <div className="font-semibold text-slate-900 dark:text-white line-clamp-1 max-w-[130px] sm:max-w-[200px]">
                    {currentUser.name}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-neutral-400 tabular-nums line-clamp-1 flex items-center gap-1">
                    {profile?.companyName ? (
                      <>
                        <Building className="w-2.5 h-2.5" />
                        <span>{profile.companyName}</span>
                      </>
                    ) : (
                      <span>{currentUser.email}</span>
                    )}
                  </div>
                </div>
              </div>
            )}

            <ThemeToggle />

            <button
              type="button"
              onClick={handleLogout}
              disabled={loadingLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border border-slate-200 dark:border-white/[0.08] hover:border-rose-500/40 text-slate-600 dark:text-neutral-300 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-500/5 transition-colors"
              title="Sign out of Partner Portal"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto mt-2.5 pt-2 border-t border-slate-200/80 dark:border-white/[0.06] no-scrollbar">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (link.href.endsWith("/referrals") && pathname.startsWith(link.href + "/") && !pathname.endsWith("/new"));

            if (link.highlight) {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap shadow-sm ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-black "
                      : "bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                </Link>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                  aria-current={isActive ? "page" : undefined}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors whitespace-nowrap ${
                  isActive
                    ? "bg-slate-200/80 dark:bg-white/[0.1] text-slate-900 dark:text-white font-semibold"
                    : "text-slate-600 dark:text-neutral-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.04]"
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-slate-400 dark:text-neutral-500" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
