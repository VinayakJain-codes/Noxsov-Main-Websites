import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS, getProductBySlug } from "@/data/products";
import { StatusBadge, BrandTagBadge } from "@/components/ui/StatusBadge";
import { PricingSection } from "@/components/products/PricingSection";
import { RoadmapTimeline } from "@/components/products/RoadmapTimeline";
import { InteractiveTelemetrySimulator } from "@/components/products/InteractiveTelemetrySimulator";
import {
  ArrowRight,
  ChevronRight,
  HelpCircle,
  Cpu,
} from "lucide-react";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return PRODUCTS.map((prod) => ({
    slug: prod.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }

  return {
    title: `${product.brandTag} — ${product.tagline}`,
    description: product.shortDescription,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const isLive = product.status === "Delivered";

  return (
    <main className="flex-1 pt-32 pb-24">
      {/* Product Hero */}
      <section className="relative pb-16 overflow-hidden">
        {/* Ambient lighting glow */}
        <div
          className={`absolute top-0 right-1/4 w-[500px] h-[350px] bg-gradient-to-tr ${product.gradient} rounded-full blur-[130px] pointer-events-none -z-10`}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-neutral-400 mb-8" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/products" className="hover:text-slate-900 dark:hover:text-white transition-colors">
              Products
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link
              href={`/categories/${product.categoryId}`}
              className="hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              {product.categoryName}
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-cyan-600 dark:text-cyan-400 font-semibold">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Info Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex flex-wrap items-center gap-2.5">
                <StatusBadge status={product.status} size="md" />
                <BrandTagBadge tag={product.brandTag} />
                {product.formerName && (
                  <span className="text-xs font-mono text-slate-500 dark:text-neutral-400 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08]">
                    formerly {product.formerName}
                  </span>
                )}
              </div>

              <div>
                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                  {product.name}
                </h1>
                <p className="text-sm font-mono text-cyan-600 dark:text-cyan-400 mt-1">
                  {product.brandTag}
                </p>
              </div>

              <p className="text-lg sm:text-xl font-medium text-slate-800 dark:text-neutral-200 leading-relaxed">
                {product.tagline}
              </p>

              <p className="text-sm sm:text-base text-slate-600 dark:text-neutral-300 leading-relaxed">
                {product.fullDescription}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  id="product-primary-cta"
                  href={product.cta.primaryHref}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-semibold text-black bg-cyan-400 hover:bg-cyan-300 shadow-lg shadow-cyan-500/25 transition-all active:scale-[0.98]"
                >
                  <span>{product.cta.primaryText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  id="product-secondary-cta"
                  href={product.cta.secondaryHref}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs font-semibold text-slate-800 dark:text-white glass-panel hover:bg-slate-200/50 dark:hover:bg-white/[0.08] border border-slate-300 dark:border-white/[0.12] transition-colors"
                >
                  <span>{product.cta.secondaryText}</span>
                </Link>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-200 dark:border-white/[0.06]">
                {product.stats.map((s, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-100 dark:bg-white/[0.02] border border-slate-200 dark:border-white/[0.06]">
                    <div className="text-[11px] text-slate-500 dark:text-neutral-400">{s.label}</div>
                    <div className="text-sm sm:text-base font-bold text-slate-900 dark:text-white font-mono mt-0.5">
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Screenshot Showcase Column */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 dark:border-white/[0.12] bg-slate-950 dark:bg-[#070b14] shadow-2xl group">
                <div className="relative aspect-[16/9] w-full">
                  <Image
                    src={product.image}
                    alt={`${product.name} dashboard`}
                    fill
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    sizes="(max-width: 1024px) 100vw, 650px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 dark:from-[#04070e]/80 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="absolute bottom-3 left-3 right-3 glass-panel p-3 rounded-xl border border-slate-200/50 dark:border-white/[0.1] flex items-center justify-between text-xs backdrop-blur-md">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-white font-medium">
                      {product.brandTag} Interface
                    </span>
                  </div>
                  <span className="text-slate-300 dark:text-neutral-400 font-mono text-[11px]">
                    Verified Architecture
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Simulator Section */}
      <section className="py-12 border-t border-slate-200 dark:border-white/[0.08] bg-slate-100/60 dark:bg-black/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <span className="text-xs font-mono text-cyan-600 dark:text-cyan-400 uppercase tracking-wider font-semibold">
              Interactive Telemetry & Control Demo
            </span>
          </div>
          <InteractiveTelemetrySimulator productId={product.id} />
        </div>
      </section>

      {/* Deep-Dive Features Grid */}
      <section id="features" className="py-20 border-t border-slate-200 dark:border-white/[0.08]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16 space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-cyan-600 dark:text-cyan-400 font-semibold">
              Core Technical Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Engineered Without Compromise
            </h2>
            <p className="text-sm text-slate-600 dark:text-neutral-300 leading-relaxed">
              Every feature is built for deterministic reliability, zero telemetry leaks, and mathematically proven efficiency.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {product.features.map((feat, idx) => (
              <div
                key={idx}
                className="glass-panel p-6 sm:p-7 rounded-2xl border border-slate-200 dark:border-white/[0.08] glass-panel-hover flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    {feat.badge && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-500/20">
                        {feat.badge}
                      </span>
                    )}
                    {feat.metric && (
                      <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        {feat.metric}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                    {feat.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-300 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Architecture & Specifications */}
      <section className="py-20 border-t border-slate-200 dark:border-white/[0.08] bg-slate-100/30 dark:bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
                <Cpu className="w-3.5 h-3.5" />
                <span>Architecture Overview</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                Under the Hood
              </h2>

              <p className="text-sm text-slate-600 dark:text-neutral-300 leading-relaxed">
                {product.architectureOverview}
              </p>

              <div className="p-4 rounded-xl glass-panel border border-slate-200 dark:border-white/[0.08] text-xs text-slate-600 dark:text-neutral-400 space-y-2">
                <div className="text-cyan-600 dark:text-cyan-400 font-mono font-semibold uppercase">
                  Central Account & Billing Readiness:
                </div>
                <p>
                  Architected with modular token authentication, ready to bind into NOXSOV Central Accounts (Phase 2) and Unified Entitlement APIs (Phase 3).
                </p>
              </div>
            </div>

            {/* Specs Table */}
            <div className="lg:col-span-7 glass-panel rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-white/[0.08] space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-neutral-400 font-semibold border-b border-slate-200 dark:border-white/[0.06] pb-3">
                Technical Specifications & Operational Benchmarks
              </div>

              <dl className="divide-y divide-slate-200 dark:divide-white/[0.06]">
                {product.specs.map((item, idx) => (
                  <div key={idx} className="py-3.5 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    <dt className="font-mono text-slate-500 dark:text-neutral-400">{item.label}</dt>
                    <dd className="sm:col-span-2 text-slate-900 dark:text-white font-medium">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section for Live products OR Roadmap for In-Progress/Concept */}
      {isLive && product.pricing ? (
        <PricingSection
          productName={product.name}
          productSlug={product.slug}
          pricing={product.pricing}
        />
      ) : null}

      {!isLive && product.roadmap ? (
        <RoadmapTimeline
          milestones={product.roadmap}
          productName={product.name}
        />
      ) : null}

      {/* Frequently Asked Questions */}
      <section className="py-20 border-t border-slate-200 dark:border-white/[0.08]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Questions & Answers</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {product.faqs.map((faq, idx) => (
              <div
                key={idx}
                className="glass-panel p-6 rounded-2xl border border-slate-200 dark:border-white/[0.08] space-y-2"
              >
                <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-neutral-300 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 border-t border-slate-200 dark:border-white/[0.08]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-8 sm:p-12 border border-cyan-500/30 text-center space-y-6 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 text-white shadow-2xl">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Deploy {product.brandTag}
            </h2>
            <p className="text-sm text-neutral-300 max-w-xl mx-auto leading-relaxed">
              {isLive
                ? "Talk with our solutions engineering team to evaluate deployment models, schedule a live sandbox test, or transition from legacy point tools."
                : "Join the technical design council and evaluate early pre-release builds in private sandboxes."}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={`/contact?product=${product.slug}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-xs text-black bg-cyan-400 hover:bg-cyan-300 shadow-lg shadow-cyan-500/25 transition-all"
              >
                <span>{isLive ? "Request Technical Briefing" : "Apply for Pilot Access"}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
