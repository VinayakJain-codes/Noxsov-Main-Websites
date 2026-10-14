import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { CATEGORIES, getCategoryBySlug } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import { StatusBadge, BrandTagBadge } from "@/components/ui/StatusBadge";
import { Shield, Coins, Server, ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  return {
    title: `${category.name} — Sovereign Enterprise Solutions`,
    description: category.description,
  };
}

export default async function CategoryDetailPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = getProductsByCategory(category.id);

  const iconMap: Record<string, typeof Shield> = {
    security: Shield,
    finance: Coins,
    "it-solutions": Server,
  };

  const Icon = iconMap[category.id] || Shield;

  return (
    <main className="flex-1 pt-32 pb-24">
      {/* Category Hero */}
      <section className="relative pb-16 overflow-hidden">
        {/* Glow backdrop */}
        <div
          className={`absolute top-0 right-1/4 w-[500px] h-[350px] bg-gradient-to-tr ${category.gradient} rounded-full blur-[120px] pointer-events-none -z-10`}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-neutral-400 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/categories" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Categories
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-cyan-600 dark:text-cyan-400 font-semibold">{category.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-white/[0.05] border border-slate-200 dark:border-white/[0.1]">
                  <Icon className="w-7 h-7 text-cyan-600 dark:text-cyan-400" />
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                  <span>NOXSOV Vertical Pillar</span>
                </div>
              </div>

              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                {category.name}
              </h1>

              <p className="text-lg sm:text-xl font-medium text-cyan-700 dark:text-cyan-300/90 leading-relaxed">
                {category.tagline}
              </p>

              <p className="text-base text-slate-600 dark:text-neutral-300 leading-relaxed max-w-3xl">
                {category.longDescription}
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  href="#products-list"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold text-black bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-md shadow-cyan-500/20"
                >
                  <span>Explore {category.name} Products</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold text-slate-800 dark:text-white glass-panel hover:bg-slate-200/50 dark:hover:bg-white/[0.08] border border-slate-300 dark:border-white/[0.1] transition-colors"
                >
                  <span>Consult Domain Architect</span>
                </Link>
              </div>
            </div>

            {/* Stats Card */}
            <div className="lg:col-span-4 glass-panel rounded-2xl p-6 border border-slate-200 dark:border-white/[0.08] space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-400 font-semibold border-b border-slate-200 dark:border-white/[0.06] pb-2">
                Domain Metrics
              </div>

              <div className="grid grid-cols-2 gap-3">
                {category.stats.map((s, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/[0.04]">
                    <div className="text-xs text-slate-500 dark:text-neutral-400">{s.label}</div>
                    <div className="text-lg font-bold text-slate-900 dark:text-white font-mono mt-0.5">
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-xs text-slate-500 dark:text-neutral-400 leading-relaxed">
                Upholding zero telemetry egress, sovereign key escrow, and deterministic execution.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Pillars */}
      <section className="py-16 border-t border-slate-200 dark:border-white/[0.08] bg-slate-100/30 dark:bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold mb-2">
              Foundational Principles
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Architectural Standard for {category.name}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {category.keyPillars.map((pillar, i) => (
              <div
                key={i}
                className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-white/[0.08] space-y-3"
              >
                <div className="w-8 h-8 rounded-lg bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 font-mono text-xs font-bold flex items-center justify-center border border-cyan-500/20">
                  0{i + 1}
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-neutral-300 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products List */}
      <section id="products-list" className="py-20 border-t border-slate-200 dark:border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-400 mb-1">
                Portfolio Showcase
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Products in {category.name}
              </h2>
            </div>
            <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400">
              {products.length} {products.length === 1 ? "Product" : "Products"} Registered
            </span>
          </div>

          <div className="space-y-16">
            {products.map((prod) => (
              <div
                key={prod.id}
                className="glass-panel rounded-3xl border border-slate-200 dark:border-white/[0.1] p-6 sm:p-10 relative overflow-hidden shadow-2xl"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-5 space-y-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <StatusBadge status={prod.status} />
                      <BrandTagBadge tag={prod.brandTag} />
                      {prod.formerName && (
                        <span className="text-xs text-slate-500 dark:text-neutral-400 font-mono">
                          (formerly {prod.formerName})
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                        {prod.name}
                      </h3>
                      <p className="text-xs font-mono text-cyan-600 dark:text-cyan-400 mt-1">
                        {prod.tagline}
                      </p>
                    </div>

                    <p className="text-sm text-slate-600 dark:text-neutral-300 leading-relaxed">
                      {prod.fullDescription}
                    </p>

                    <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-white/[0.06]">
                      {prod.keyCapabilities.slice(0, 3).map((cap, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-neutral-300">
                          <CheckCircle2 className="w-4 h-4 text-cyan-600 dark:text-cyan-400 shrink-0 mt-0.5" />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 flex flex-wrap gap-4">
                      <Link
                        href={`/products/${prod.slug}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-black bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-md shadow-cyan-500/20"
                      >
                        <span>
                          {prod.status === "Delivered" ? "Full Product & Pricing" : "View Roadmap & RFC"}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>

                      <Link
                        href={`/contact?product=${prod.slug}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-800 dark:text-white glass-panel hover:bg-slate-200/50 dark:hover:bg-white/[0.08] border border-slate-300 dark:border-white/[0.1] transition-colors"
                      >
                        <span>
                          {prod.status === "Delivered" ? "Request Demo" : "Request Early Access"}
                        </span>
                      </Link>
                    </div>
                  </div>

                  <div className="lg:col-span-7 relative group">
                    <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-white/[0.12] bg-slate-950 dark:bg-[#070b14] shadow-2xl">
                      <div className="relative aspect-[16/9] w-full">
                        <Image
                          src={prod.image}
                          alt={`${prod.name} interface`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 1024px) 100vw, 650px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 dark:from-[#06090e]/80 via-transparent to-transparent pointer-events-none" />
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 glass-panel p-2.5 rounded-xl border border-slate-200/50 dark:border-white/[0.1] flex items-center justify-between text-xs backdrop-blur-md">
                        <span className="text-white font-medium truncate">
                          {prod.name} Interface Telemetry
                        </span>
                        <Link
                          href={`/products/${prod.slug}`}
                          className="text-cyan-400 font-semibold hover:underline"
                        >
                          Explore &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
