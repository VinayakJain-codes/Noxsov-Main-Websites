import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="px-5 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 rounded-xl border border-slate-800 bg-[#0c1322] p-8 text-white sm:p-12 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-medium sm:text-4xl">Let’s find the right fit.</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400">Tell us about your team, your operations, and what you need from your software.</p>
        </div>
        <Link id="cta-sales-btn" href="/contact" className="primary-action self-start lg:self-center">Talk to our team <ArrowRight size={18} /></Link>
      </div>
    </section>
  );
}
