import Link from "next/link";
import { CATEGORIES } from "@/data/categories";
import { PRODUCTS } from "@/data/products";
import { ArrowRight } from "lucide-react";

export function CategoryShowcase() {
  return (
    <section id="categories" className="border-y border-slate-200 py-16 dark:border-slate-800 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <h2 className="max-w-xl text-3xl font-medium sm:text-4xl">Built around your operations.</h2>
          <Link href="/categories" className="inline-flex items-center gap-2 text-sm font-medium">Explore all solutions <ArrowRight size={16} /></Link>
        </div>
        <div className="grid gap-8 md:grid-cols-3 md:gap-10">
          {CATEGORIES.map(category => (
            <article key={category.id} className="border-t-2 border-cyan-500 pt-6">
              <h3 className="text-xl font-semibold">{category.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{category.tagline}</p>
              <div className="mt-6 space-y-3">
                {PRODUCTS.filter(product => product.categoryId === category.id).map(product => (
                  <Link key={product.slug} href={`/products/${product.slug}`} className="flex items-center justify-between gap-3 text-sm hover:text-cyan-600 dark:hover:text-cyan-400">
                    {product.name}<ArrowRight size={15} />
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
