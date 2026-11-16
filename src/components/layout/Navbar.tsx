"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { CommandPalette } from "@/components/search/CommandPalette";
import { SovereignStatusModal } from "@/components/system/SovereignStatusModal";
import { useCart } from "@/context/CartContext";
import { Activity, Menu, Search, ShoppingCart, X } from "lucide-react";

const links = [
  { href: "/products", label: "Products" },
  { href: "/categories", label: "Solutions" },
  { href: "/store", label: "Store" },
  { href: "/about", label: "Company" },
];

export function Navbar() {
  const pathname = usePathname();
  const { cartCount, setIsCartOpen } = useCart();
  const [openPath, setOpenPath] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const menuOpen = openPath === pathname;

  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen((open) => !open);
      }
      if (event.key === "Escape") setOpenPath(null);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  if (pathname.startsWith("/partner") || pathname.startsWith("/admin")) return null;

  return (
    <>
      <header className="site-nav">
        <div className="site-nav-inner">
          <BrandLogo />
          <nav aria-label="Main navigation" className="site-nav-links">
            {links.map(({ href, label }) => (
              <Link key={href} href={href} aria-current={pathname.startsWith(href) ? "page" : undefined}>{label}</Link>
            ))}
          </nav>
          <div className="site-nav-tools">
            <button className="nav-icon" aria-label="Search website" onClick={() => setSearchOpen(true)}><Search size={18} /></button>
            <button className="nav-icon hidden sm:inline-flex" aria-label={`Open cart, ${cartCount} items`} onClick={() => setIsCartOpen(true)}>
              <ShoppingCart size={18} />{cartCount > 0 && <span className="ml-1 text-xs">{cartCount}</span>}
            </button>
            <ThemeToggle />
            <Link href="/contact" className="primary-action site-nav-contact">Talk to our team</Link>
            <button className="nav-icon mobile-nav-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setOpenPath(menuOpen ? null : pathname)}>
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav id="mobile-navigation" aria-label="Mobile navigation" className="mobile-site-links lg:hidden">
            {[...links, {href:"/contact",label:"Contact"}, {href:"/partner/login",label:"Partner portal"}, {href:"/store/license",label:"Verify a license"}].map(link => (
              <Link key={link.href} href={link.href} onClick={() => setOpenPath(null)}>{link.label}</Link>
            ))}
            <div className="flex gap-4 border-t border-slate-200 pt-3 dark:border-slate-800">
              <button className="secondary-action" onClick={() => {setIsCartOpen(true);setOpenPath(null);}}>Cart ({cartCount})</button>
              <button className="secondary-action" onClick={() => setStatusOpen(true)}><Activity size={16} />System status</button>
            </div>
          </nav>
        )}
      </header>
      <CommandPalette isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      <SovereignStatusModal isOpen={statusOpen} onClose={() => setStatusOpen(false)} />
    </>
  );
}
