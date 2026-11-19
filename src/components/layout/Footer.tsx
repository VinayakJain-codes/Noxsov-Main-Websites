"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "@/components/ui/BrandLogo";
import { PRODUCTS } from "@/data/products";
import { CATEGORIES } from "@/data/categories";

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith("/partner") || pathname.startsWith("/admin")) return null;
  const columns = [
    { title: "Products", links: PRODUCTS.map(p => ({href: `/products/${p.slug}`, label:p.name})) },
    { title: "Solutions", links: CATEGORIES.map(c => ({href: `/categories/${c.slug}`, label:c.name})) },
    { title: "Company", links: [
      {href:"/about",label:"About NOXSOV"}, {href:"/contact",label:"Contact"},
      {href:"/store",label:"Software store"}, {href:"/partner/login",label:"Partner portal"},
      {href:"/store/license",label:"Verify a license"}, {href:"/admin/login",label:"Admin sign-in"},
    ]},
  ];
  return (
    <footer id="global-footer" className="border-t border-slate-200 bg-white py-14 dark:border-slate-800 dark:bg-[#080e17]">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-5">
          <div className="col-span-2">
            <BrandLogo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-600 dark:text-slate-400">Software for security, finance, and enterprise operations. Built around your team and your data.</p>
            <a href="mailto:support@noxsov.com" className="mt-5 inline-block text-sm hover:text-cyan-600">support@noxsov.com</a>
          </div>
          {columns.map(column => (
            <div key={column.title}>
              <h2 className="mb-5 text-sm font-semibold">{column.title}</h2>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400">
                {column.links.map(link => <li key={link.href}><Link href={link.href} className="hover:text-cyan-700 dark:hover:text-cyan-400">{link.label}</Link></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 flex flex-col justify-between gap-5 border-t border-slate-200 pt-6 text-xs text-slate-500 dark:border-slate-800 sm:flex-row">
          <p>© {new Date().getFullYear()} NOXSOV Pvt. Ltd.</p>
          <div className="flex flex-wrap gap-6">
            <Link href="/privacy">Privacy</Link><Link href="/cookies">Cookie preferences</Link><Link href="/terms">Terms</Link><Link href="/refund">Refund policy</Link><Link href="/contact">Security disclosures</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
