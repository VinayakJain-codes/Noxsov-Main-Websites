import { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { EcosystemPrinciples } from "@/components/home/EcosystemPrinciples";
import { RoiCalculator } from "@/components/home/RoiCalculator";
import { CtaBanner } from "@/components/home/CtaBanner";

export const metadata: Metadata = {
  title: "NOXSOV — The Sovereign Enterprise Software Ecosystem",
  description:
    "Engineering autonomous, mathematically rigorous, and sovereign software ecosystems across Security Solutions, Finance, and IT Solutions. Built for mission-critical operations.",
  keywords: [
    "NOXSOV",
    "Kryptik",
    "Rakshak",
    "NOXSOV Events",
    "HI Events",
    "Tax Incubator",
    "Sovereign Cybersecurity",
    "Enterprise ERP",
    "Campus ERP",
  ],
};

export default function HomePage() {
  return (
    <main className="flex-1">
      <Hero />
      <CategoryShowcase />
      <FeaturedProducts />
      <EcosystemPrinciples />
      <RoiCalculator />
      <CtaBanner />
    </main>
  );
}
