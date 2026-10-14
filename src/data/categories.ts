export interface CategoryData {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  accentColor: string;
  gradient: string;
  borderColor: string;
  badgeColor: string;
  icon: string;
  stats: { label: string; value: string }[];
  keyPillars: { title: string; description: string }[];
  productSlugs: string[];
}

export const CATEGORIES: CategoryData[] = [
  {
    id: "security",
    slug: "security",
    name: "Security Solutions",
    tagline: "Autonomous Endpoint Defense & Sovereign Threat Intelligence",
    description:
      "Enterprise-grade security infrastructure engineered with zero-trust architecture, sub-millisecond telemetry, and 100% sovereign data control.",
    longDescription:
      "In an era of hyper-connected perimeters and adversarial threats, traditional reactive antivirus is obsolete. NOXSOV Security Solutions delivers mathematically proven zero-trust enforcement, eBPF kernel-level event streaming, and sovereign data retention designed for national critical infrastructure, defense, and high-stakes enterprise networks.",
    accentColor: "emerald",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    borderColor: "border-emerald-500/30",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    icon: "ShieldAlert",
    stats: [
      { label: "Telemetry Latency", value: "<1.2ms" },
      { label: "Data Sovereignty", value: "100% On-Prem" },
      { label: "Breach Containment", value: "Sub-Second" },
      { label: "Active Nodes Guarded", value: "50,000+" },
    ],
    keyPillars: [
      {
        title: "Kernel-Level Visibility",
        description:
          "Zero-overhead telemetry hooks deeply into OS primitives to detect evasive in-memory execution and zero-day privilege escalations.",
      },
      {
        title: "Cryptographic Zero-Trust",
        description:
          "Continuous identity and posture re-verification across every service request, eliminating implicit network trust perimeters.",
      },
      {
        title: "Air-Gapped Sovereign Deployment",
        description:
          "Runs entirely within your dedicated cloud or physical air-gapped data centers with zero external telemetry egress.",
      },
      {
        title: "Automated Incident Containment",
        description:
          "Micro-isolate compromised endpoints and revoke transient sessions within milliseconds without human analyst delay.",
      },
    ],
    productSlugs: ["kryptik"],
  },
  {
    id: "finance",
    slug: "finance",
    name: "Finance",
    tagline: "Automated Tax Intelligence & Multi-Ledger Reconciliation",
    description:
      "Precision financial compliance engines that reconcile enterprise ledgers, automate multi-tier tax filings, and eliminate audit discrepancies.",
    longDescription:
      "Modern tax compliance and corporate treasury reconciliation are bogged down by fragmented spreadsheets and manual audit friction. NOXSOV Finance builds autonomous financial intelligence software that links procurement, invoices, and statutory tax filings into a continuous, real-time verified ledger with automated discrepancy resolution.",
    accentColor: "amber",
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    borderColor: "border-amber-500/30",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    icon: "Coins",
    stats: [
      { label: "Reconciliation Accuracy", value: "99.98%" },
      { label: "Audit Resolution Time", value: "Instantaneous" },
      { label: "Statutory Compliance", value: "GST / TDS / ITR" },
      { label: "Automated Rules", value: "140+ Validators" },
    ],
    keyPillars: [
      {
        title: "Multi-Way Auto Reconciliation",
        description:
          "Continuous 2-way and 3-way matching between purchase registers, vendor filings (GSTR-2B), and bank settlement streams.",
      },
      {
        title: "Predictive Tax Provisioning",
        description:
          "Live forecasting of quarterly corporate tax liabilities, input tax credit optimization, and automated cash reserve alerts.",
      },
      {
        title: "Tamper-Proof Audit Trails",
        description:
          "Cryptographically chained transaction logs ensuring every adjustment, debit note, and credit reconciliation is audit-ready.",
      },
      {
        title: "ERP & Banking Gateway Connectors",
        description:
          "Seamless bi-directional sync with leading ERP ledgers and automated corporate net-banking settlement pipelines.",
      },
    ],
    productSlugs: ["tax-incubator"],
  },
  {
    id: "it-solutions",
    slug: "it-solutions",
    name: "IT Solutions",
    tagline: "Enterprise Operational Backbones & Real-Time Event Infrastructures",
    description:
      "High-throughput enterprise platforms spanning high-concurrency event orchestration, next-generation ERP, and academic campus intelligence.",
    longDescription:
      "Enterprises and institutions require resilient operational backbones that scale effortlessly during peak load. NOXSOV IT Solutions develops high-concurrency software suites designed for mission-critical reliability—from stadium-scale event ticketing with offline access control to modular enterprise resource planning and academic lifecycles.",
    accentColor: "blue",
    gradient: "from-blue-500/20 via-indigo-500/10 to-transparent",
    borderColor: "border-blue-500/30",
    badgeColor: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    icon: "Server",
    stats: [
      { label: "Concurrent Throughput", value: "50k+ req/sec" },
      { label: "Check-in Scan Latency", value: "<400ms" },
      { label: "Platform Availability", value: "99.99%" },
      { label: "Ecosystem Products", value: "3 Solutions" },
    ],
    keyPillars: [
      {
        title: "High-Concurrency Architecture",
        description:
          "Distributed event processing backplanes designed to absorb massive traffic surges without queue drops or database lockouts.",
      },
      {
        title: "Offline-First Edge Capabilities",
        description:
          "Critical operations like venue ticketing and campus attendance sync seamlessly even in completely disconnected network environments.",
      },
      {
        title: "Modular Composable Services",
        description:
          "Deploy individual modules or unified enterprise suites that integrate via clean, documented REST and gRPC interfaces.",
      },
      {
        title: "Comprehensive Role Governance",
        description:
          "Fine-grained hierarchical permissions with SAML/SSO ready connectors for institutions, enterprises, and organizers.",
      },
    ],
    productSlugs: ["noxsov-events", "erp", "college-k12-erp"],
  },
];

export function getCategoryBySlug(slug: string): CategoryData | undefined {
  return CATEGORIES.find((c) => c.slug === slug || c.id === slug);
}
