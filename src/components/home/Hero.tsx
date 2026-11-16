"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "@/data/products";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ArrowRight } from "lucide-react";

export function Hero() {
  const [selected, setSelected] = useState(PRODUCTS[0].slug);
  const product = PRODUCTS.find((item) => item.slug === selected) ?? PRODUCTS[0];
  return (
    <section className="site-hero">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="hero-intro">
          <div>
            <p className="mb-6 text-sm font-medium text-cyan-700 dark:text-cyan-400">Security. Finance. Enterprise IT.</p>
            <h1 className="hero-heading">Software for the<br className="hidden lg:block" /> way you operate.<br /><span>Built to be yours.</span></h1>
          </div>
          <div className="max-w-md space-y-7">
            <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400">Run your operations with NOXSOV. Explore specialised software for security teams, finance, events, and enterprise IT—with control over your deployment and data.</p>
            <div className="flex flex-wrap gap-3">
              <Link id="hero-store-btn" href="/store" className="primary-action">Explore software <ArrowRight size={17} /></Link>
              <Link id="hero-contact-btn" href="/contact" className="secondary-action">Talk to our team</Link>
            </div>
          </div>
        </div>
        <div className="hero-product">
          <div className="hero-product-menu" aria-label="Featured products">
            {PRODUCTS.map((item) => (
              <button key={item.slug} type="button" aria-pressed={selected === item.slug} aria-controls="featured-product" onClick={() => setSelected(item.slug)}>
                <span>{item.name}</span><ArrowRight size={16} aria-hidden="true" />
              </button>
            ))}
          </div>
          <div className="hero-product-media" id="featured-product">
            <Image src={product.image} alt={`${product.name} product preview`} fill priority sizes="(max-width: 767px) 100vw, 900px" className="object-cover object-top" />

          </div>
        </div>
        <div className="hero-product-footer">
          <div>
            <div className="mb-3"><StatusBadge status={product.status} /></div>
            <p className="mb-1 text-sm font-semibold">{product.name} <span className="ml-2 font-normal text-slate-500">{product.categoryName}</span></p>
            <p className="text-sm text-slate-600 dark:text-slate-400">{product.shortDescription}</p>
          </div>
          <Link href={`/products/${product.slug}`} className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-cyan-700 dark:text-cyan-400">Explore {product.name}<ArrowRight size={16} /></Link>
        </div>
      </div>
    </section>
  );
}
