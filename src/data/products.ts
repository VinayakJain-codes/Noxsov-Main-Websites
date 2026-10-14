export type ProductStatus = "Delivered" | "In progress" | "Concept";

export interface FeatureItem {
  title: string;
  description: string;
  metric?: string;
  badge?: string;
}

export interface PricingTier {
  name: string;
  tagline: string;
  priceMonthly: string;
  priceAnnual: string;
  popular?: boolean;
  features: string[];
  cta: string;
}

export interface RoadmapMilestone {
  quarter: string;
  title: string;
  status: "Completed" | "In Progress" | "Planned";
  details: string;
}

export interface ProductData {
  id: string;
  slug: string;
  name: string;
  formerName?: string;
  brandTag: string; // e.g. "Kryptik by NOXSOV"
  categoryId: "security" | "finance" | "it-solutions";
  categoryName: string;
  status: ProductStatus;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  accentColor: string;
  gradient: string;
  stats: { label: string; value: string }[];
  keyCapabilities: string[];
  features: FeatureItem[];
  architectureOverview: string;
  specs: { label: string; value: string }[];
  pricing?: PricingTier[];
  roadmap?: RoadmapMilestone[];
  faqs: { question: string; answer: string }[];
  cta: {
    primaryText: string;
    primaryHref: string;
    secondaryText: string;
    secondaryHref: string;
  };
}

export const PRODUCTS: ProductData[] = [
  {
    id: "kryptik",
    slug: "kryptik",
    name: "Kryptik",
    formerName: "Rakshak",
    brandTag: "Kryptik by NOXSOV",
    categoryId: "security",
    categoryName: "Security Solutions",
    status: "Delivered",
    tagline: "Multi-Tenant Guard Management & Computer Vision AI Verification Platform",
    shortDescription:
      "Isolated multi-tenant workspaces, 4 dedicated operational portals, and a Python/Flask OpenCV microservice engineered for security agencies and physical client sites.",
    fullDescription:
      "Kryptik (formerly Rakshak) by NOXSOV is the comprehensive multi-tenant guard management platform built for modern physical security agencies and the enterprise client sites they protect. Architected with isolated multi-tenant workspaces in Supabase and four purpose-built portals (Agency Admin, Field Guard Mobile/PWA, Client Facility Portal, and Patrol Supervisor Portal), Kryptik combines robust operational logistics with a Python/Flask OpenCV microservice for automated biometric guard presence and uniform verification. Dual-pass security audit hardened with zero telemetry leakage.",
    image: "/images/products/kryptik.jpg",
    accentColor: "emerald",
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    stats: [
      { label: "Operational Portals", value: "4 Dedicated" },
      { label: "AI Vision Verification", value: "Sub-800ms OpenCV" },
      { label: "Multi-Tenancy", value: "100% Isolated Workspaces" },
      { label: "Security Audit", value: "Dual-Pass Hardened" },
    ],
    keyCapabilities: [
      "Isolated multi-tenant workspaces with hardened Supabase Row Level Security (RLS)",
      "Four dedicated role-based portals: Agency Admin, Guard Mobile PWA, Client Site & Patrol Supervisor",
      "Python / Flask & OpenCV computer vision microservice for automated guard verification",
      "Geofenced patrol checkpoints, live shift rosters, and bilingual English/Hindi interface",
    ],
    features: [
      {
        title: "Multi-Tenant Agency & Site Isolation",
        description:
          "Each security agency and client organization gets its own hermetically sealed workspace. Hardened Supabase RLS policies guarantee data isolation across agency clients, facilities, and guard rosters.",
        metric: "100% Data Isolation",
        badge: "Multi-Tenant",
      },
      {
        title: "Four Role-Based Operational Portals",
        description:
          "Distinct interfaces tailored to each stakeholder: Agency Operations (roster & billing), Guard PWA (patrol check-ins), Client Facility Portal (live attendance transparency), and Supervisor Inspector Portal.",
        metric: "4 Dedicated Portals",
        badge: "Role-Based",
      },
      {
        title: "Computer Vision AI Guard Verification",
        description:
          "Powered by a dedicated Python/Flask microservice with OpenCV. Analyzes live guard check-in captures for facial presence, uniform compliance, and post vigilance with sub-second response times.",
        metric: "<800ms Verification",
        badge: "Python/OpenCV AI",
      },
      {
        title: "High-Precision Geofenced Patrol Tracking",
        description:
          "GPS geofencing and dynamic QR checkpoint scanning ensure guards are physically present on-site. Eliminates proxy attendance and provides clients with verified timestamped patrol trails.",
        metric: "<5m GPS Geofence",
        badge: "Patrol Mesh",
      },
      {
        title: "Bilingual English & Hindi Interface",
        description:
          "Engineered for real-world operations on the ground. Intuitive bilingual English and Hindi mobile workflows for field security guards paired with executive dashboards for corporate site clients.",
        metric: "Dual Language",
        badge: "Bilingual EN/HI",
      },
      {
        title: "Dual-Pass Hardened Security Architecture",
        description:
          "Two rigorous security audit passes eliminated self-editable user_metadata roles, removed hardcoded credentials, and enforced server-side gating on all AI verification endpoints.",
        metric: "Audit Certified",
        badge: "SOC Hardened",
      },
    ],
    architectureOverview:
      "Kryptik is engineered on a modern full-stack sovereign architecture: a Next.js (TypeScript, Tailwind CSS, Framer Motion) frontend delivering four dedicated role portals, a Supabase PostgreSQL backend enforcing multi-tenant Row Level Security (RLS) and real-time state streaming, and a decoupled Python/Flask microservice with OpenCV for high-accuracy computer vision verification. The platform includes full pitch decks, teleprompter scripts, and client onboarding documentation.",
    specs: [
      { label: "Frontend Stack", value: "Next.js (App Router), TypeScript, Tailwind CSS, Framer Motion" },
      { label: "Database & Auth", value: "Supabase (PostgreSQL, Multi-Tenant Row Level Security, Realtime)" },
      { label: "AI Verification Service", value: "Python / Flask microservice with OpenCV Computer Vision" },
      { label: "Multi-Tenancy Model", value: "Isolated organizational workspaces per agency & client site" },
      { label: "Portals Included", value: "Agency Admin, Guard PWA, Client Facility Portal, Supervisor Portal" },
      { label: "Language Support", value: "Bilingual English / Hindi (including Hinglish outreach collateral)" },
    ],
    pricing: [
      {
        name: "Agency Starter",
        tagline: "Essential multi-tenant guard management for growing security agencies.",
        priceMonthly: "$38",
        priceAnnual: "$32",
        features: [
          "Up to 30 active guards & 5 client sites",
          "Agency Admin & Guard Mobile PWA portals",
          "Supabase multi-tenant workspace isolation",
          "GPS geofenced attendance & QR patrol tracking",
          "Basic AI presence verification",
          "Bilingual English/Hindi mobile interface",
        ],
        cta: "Request Agency Demo",
      },
      {
        name: "Enterprise Agency",
        tagline: "Full 4-portal system with realtime OpenCV AI verification for large security firms.",
        priceMonthly: "$75",
        priceAnnual: "$64",
        popular: true,
        features: [
          "Up to 200 active guards & 25 client sites",
          "All 4 Portals: Admin, Guard, Client & Supervisor",
          "Full Python/Flask OpenCV AI guard verification",
          "Real-time client facility transparency portal",
          "Dual-pass hardened RLS security & audit logs",
          "Incident dispatch webhooks & automated SLA reports",
          "24/7 dedicated engineering support",
        ],
        cta: "Deploy Enterprise Agency",
      },
      {
        name: "Sovereign Fleet",
        tagline: "Dedicated deployment with custom OpenCV models for critical infrastructure & campuses.",
        priceMonthly: "Custom",
        priceAnnual: "Custom",
        features: [
          "Unlimited guards, sites & supervisor networks",
          "Dedicated Supabase instance with bespoke RLS schemas",
          "Custom-trained OpenCV uniform & biometric models",
          "Full source access & audit documentation",
          "Bespoke onboarding scripts & client pitch collateral",
          "Air-gapped on-premises or private cloud deployment",
          "Dedicated solution architect & 15-min SLA",
        ],
        cta: "Contact Solutions Architect",
      },
    ],
    faqs: [
      {
        question: "What is Kryptik and what was its original name?",
        answer:
          "Kryptik was originally developed under the name 'Rakshak Security' as a modern guard management platform for security agencies and physical client sites. Within the NOXSOV sovereign software ecosystem, it is unified under the Security Solutions category as Kryptik by NOXSOV.",
      },
      {
        question: "How do the four role-based portals operate?",
        answer:
          "Kryptik partitions access into four dedicated interfaces: Agency Admin (operations, rosters, billing, contracts), Field Guard PWA (attendance, QR patrol checkpoints, bilingual UI), Client Facility Portal (real-time attendance visibility and SLA compliance for facility managers), and Patrol Supervisor Portal (field inspections and guard audits).",
      },
      {
        question: "How does the Python/Flask OpenCV microservice work?",
        answer:
          "Guard verification is handled by a specialized Python/Flask microservice running OpenCV. When guards check in at patrol checkpoints, the model analyzes the camera capture to verify facial presence, authentic security uniform compliance, and timestamped geofence coordinates in sub-800ms.",
      },
      {
        question: "What security audits and hardening have been completed?",
        answer:
          "Kryptik has undergone two comprehensive security audit passes. Critical vulnerabilities—such as user_metadata role tampering, hardcoded credentials, and ungated AI endpoints—were completely resolved using hardened Supabase custom claims, strict Row Level Security (RLS), and server-side authentication gating.",
      },
    ],
    cta: {
      primaryText: "Request Technical Briefing",
      primaryHref: "/contact?product=kryptik",
      secondaryText: "Explore 4 Portals",
      secondaryHref: "#features",
    },
  },
  {
    id: "noxsov-events",
    slug: "noxsov-events",
    name: "NOXSOV Events",
    formerName: "HI Events",
    brandTag: "NOXSOV Events by NOXSOV",
    categoryId: "it-solutions",
    categoryName: "IT Solutions",
    status: "Delivered",
    tagline: "High-Concurrency Event Orchestration, Ticketing & Live Access Control",
    shortDescription:
      "Enterprise event platform handling tens of thousands of concurrent ticket buyers, interactive stage seating, and sub-second offline QR turnstile verification.",
    fullDescription:
      "NOXSOV Events (formerly HI Events) is engineered for zero-downtime event experiences. From stadium-scale concerts and multi-track enterprise tech summits to international exhibitions, NOXSOV Events couples high-throughput ticketing queues with interactive seat allocation and ultra-resilient edge scanning stations that function even during catastrophic venue WiFi outages.",
    image: "/images/products/noxsov-events.jpg",
    accentColor: "blue",
    gradient: "from-blue-500/20 via-indigo-500/10 to-transparent",
    stats: [
      { label: "Peak Ticketing Surge", value: "25k tps" },
      { label: "Turnstile Scan Latency", value: "<350ms" },
      { label: "Offline Resilience", value: "100% Peer-Sync" },
      { label: "Event Availability", value: "99.999%" },
    ],
    keyCapabilities: [
      "Surge-resistant ticketing engine with anti-scalping queue protection",
      "Interactive 2D/3D venue stage & seat allocation matrix",
      "Sub-second encrypted QR gate scanning with offline turnstile failover",
      "Real-time cohort telemetry, revenue streams, and automated GST invoices",
    ],
    features: [
      {
        title: "Surge-Resilient Ticketing Engine",
        description:
          "Scales dynamically to absorb massive ticket release drops without dropping carts, double-booking seats, or suffering database contention.",
        metric: "Zero Cart Collisions",
        badge: "High Throughput",
      },
      {
        title: "Interactive Stage & Seating Allocation",
        description:
          "Visual, zoomable venue seat map builder with tiered VIP pricing zones, handicap accessibility flags, and live seat lock timers.",
        metric: "Dynamic Heatmap",
        badge: "Visual Builder",
      },
      {
        title: "Offline-First Turnstile & Scanner Sync",
        description:
          "Edge gate scanner apps run cryptographically signed local databases, allowing continuous sub-second check-in even when venue connectivity drops completely.",
        metric: "<350ms per attendee",
        badge: "Edge Reliability",
      },
      {
        title: "Real-time Analytics & Executive Dashboards",
        description:
          "Instant visibility into tickets sold, revenue, check-in velocity, gate bottlenecks, and demographic distribution as the event unfolds.",
        metric: "Live Telemetry",
        badge: "Real-time",
      },
      {
        title: "Automated Invoicing & Tax Compliance",
        description:
          "Integrated GST/sales tax calculation, automated PDF invoice generation, multi-currency settlement, and compliance exports for finance teams.",
        metric: "Instant Generation",
        badge: "Finance Ready",
      },
      {
        title: "Role-Based Staff & Security Badging",
        description:
          "Create crew, speaker, VIP, and general attendee credentials with granular door access privileges and biometric/photo verification options.",
        metric: "Fine-Grained ACL",
        badge: "Access Control",
      },
    ],
    architectureOverview:
      "NOXSOV Events is built on an event-driven microservices architecture using Go and Redis for ultra-low latency reservation locking. Turnstile edge nodes utilize SQLite replication over local mesh Wi-Fi with cryptographic HMAC QR verification, ensuring 100% gate throughput regardless of external WAN connectivity.",
    specs: [
      { label: "Scanner Compatibility", value: "iOS, Android, Zebra & Honeywell industrial barcode terminals" },
      { label: "Ticket Formats", value: "Dynamic rolling QR, Apple Wallet, Google Wallet, RFID/NFC wristbands" },
      { label: "Concurrent Check-In", value: "Up to 100,000 attendees across 150 simultaneous gates" },
      { label: "Payment Gateways", value: "Razorpay, Stripe, Adyen, direct wire transfer" },
      { label: "Data Export", value: "Real-time CSV, JSON webhook feeds, REST APIs, HubSpot & Salesforce sync" },
      { label: "Uptime Record", value: "99.999% during major live festivals and international conferences" },
    ],
    pricing: [
      {
        name: "Organizer Essential",
        tagline: "Perfect for single conferences, workshops, and boutique exhibitions.",
        priceMonthly: "2.5% + $0.80",
        priceAnnual: "per ticket",
        features: [
          "Up to 2,500 attendees per event",
          "Interactive seat map configuration",
          "iOS & Android scanner apps",
          "Basic ticket tiering & promo codes",
          "Automated PDF ticket & receipt generation",
          "Standard email support",
        ],
        cta: "Create Event",
      },
      {
        name: "Professional Fleet",
        tagline: "For conference organizers, festivals, and multi-venue tours.",
        priceMonthly: "1.9% + $0.60",
        priceAnnual: "per ticket",
        popular: true,
        features: [
          "Unlimited events & up to 25,000 attendees",
          "Full offline gate sync & mesh failover",
          "Dynamic VIP seating & reserved sections",
          "Multi-track badging & RFID wristband support",
          "White-label branded ticket portals",
          "24/7 dedicated on-call deployment support",
        ],
        cta: "Get Started",
      },
      {
        name: "Stadium & Enterprise",
        tagline: "High-capacity arenas, global summits, and enterprise multi-city circuits.",
        priceMonthly: "Custom",
        priceAnnual: "Volume Tiered",
        features: [
          "50,000+ attendee stadium concurrency",
          "Turnstile hardware integration & API controls",
          "Dedicated on-site engineering team on event day",
          "Custom payment gateway routing & currency splits",
          "Anti-bot & anti-scalper queue defense algorithms",
          "Enterprise SLA and custom security audits",
        ],
        cta: "Contact Event Solutions",
      },
    ],
    faqs: [
      {
        question: "How does NOXSOV Events differ from legacy ticketing portals?",
        answer:
          "Unlike legacy portals that suffer under huge ticket release spikes, NOXSOV Events is built with an in-memory queue broker and resilient edge scanning that works offline, ensuring your gates never stop moving.",
      },
      {
        question: "What happens if the venue loses internet connection?",
        answer:
          "NOXSOV Events scanning hardware uses local mesh peer synchronization with signed cryptographic tokens. Attendees can be checked in with zero disruption, and records sync automatically once internet connectivity is restored.",
      },
    ],
    cta: {
      primaryText: "Schedule Event Demo",
      primaryHref: "/contact?product=noxsov-events",
      secondaryText: "Explore Features",
      secondaryHref: "#features",
    },
  },
  {
    id: "tax-incubator",
    slug: "tax-incubator",
    name: "Tax Incubator",
    brandTag: "Tax Incubator by NOXSOV",
    categoryId: "finance",
    categoryName: "Finance",
    status: "In progress",
    tagline: "Autonomous Tax Reconciliation & Corporate Compliance Engine",
    shortDescription:
      "Next-generation corporate tax automation engine that reconciles GSTR-2B against ERP purchase registers, tracks TDS compliance, and optimizes Input Tax Credit.",
    fullDescription:
      "Tax Incubator by NOXSOV is currently in active development, engineered to solve the most painful enterprise finance bottlenecks: manual ledger reconciliation, missed Input Tax Credit (ITC), and audit exposure. By applying automated reconciliation algorithms across ERP purchase registers, bank feeds, and government tax portals, Tax Incubator eliminates filing errors and maximizes cash efficiency.",
    image: "/images/products/tax-incubator.jpg",
    accentColor: "amber",
    gradient: "from-amber-500/20 via-yellow-500/10 to-transparent",
    stats: [
      { label: "Status", value: "Active Beta" },
      { label: "Reconciliation", value: "Automated 3-Way" },
      { label: "ITC Recovery", value: "Up to 8% Boost" },
      { label: "Target Launch", value: "Q4 2026" },
    ],
    keyCapabilities: [
      "Automated corporate tax provision forecasting and cash reserve optimization",
      "GSTR-2B vs ERP purchase register 2-way and 3-way automated matching",
      "TDS compliance tracker with Form 26AS discrepancy resolution",
      "Pre-audit verification rules engine detecting mismatched invoices instantly",
    ],
    features: [
      {
        title: "Automated Corporate Tax Compliance",
        description:
          "Real-time tax liability forecasting comparing current quarter revenues against allowable deductions and statutory payments.",
        badge: "Predictive",
      },
      {
        title: "GSTR-2B vs Purchase Register Ledger",
        description:
          "High-speed matching algorithm reconciling hundreds of thousands of line items in seconds, categorizing matched, mismatched, and missing invoices.",
        badge: "Auto-Reconcile",
      },
      {
        title: "TDS Compliance & Form 26AS Verification",
        description:
          "Automatic verification of tax deducted at source against government deposit receipts, preventing penalty notices before quarterly deadlines.",
        badge: "Continuous Audit",
      },
      {
        title: "Automated Cross-Audit Validation Rules",
        description:
          "Over 140 built-in statutory rules verifying GSTIN validity, HSN/SAC codes, reverse charge applicability, and tax rate classifications.",
        badge: "140+ Rules",
      },
    ],
    architectureOverview:
      "Tax Incubator connects directly to ERP ledgers via secure read-only connectors, normalizing invoice formats into a unified transaction graph. A rules engine executes deterministic reconciliation routines, generating actionable exception reports for finance teams.",
    specs: [
      { label: "ERP Connectors", value: "SAP, Oracle NetSuite, Tally Prime, Zoho Books, Microsoft Dynamics 365" },
      { label: "Statutory Coverage", value: "GST (GSTR-1, 2B, 3B, 9), TDS (24Q, 26Q), Advance Corporate Tax" },
      { label: "Security & Encryption", value: "AES-256 at rest, TLS 1.3 in transit, role-based ledger access" },
      { label: "Data Sovereignty", value: "Local cloud hosting compliant with national financial data sovereignty laws" },
    ],
    roadmap: [
      {
        quarter: "Q1 2026",
        title: "Core Ledger Ingestion Engine",
        status: "Completed",
        details: "Built high-throughput connector pipeline for Tally, SAP, and CSV ledger streams.",
      },
      {
        quarter: "Q2 2026",
        title: "GSTR-2B Autonomous Matching",
        status: "Completed",
        details: "Implemented fuzzy matching algorithms for vendor name, invoice date, and fractional tax rounding.",
      },
      {
        quarter: "Q3 2026",
        title: "TDS Tracker & Compliance Sandbox",
        status: "In Progress",
        details: "Undergoing stress-testing with initial enterprise design partners handling 1M+ monthly line items.",
      },
      {
        quarter: "Q4 2026",
        title: "General Availability & Unified Account Sync",
        status: "Planned",
        details: "Full commercial release with integration into NOXSOV central account and billing ecosystem.",
      },
    ],
    faqs: [
      {
        question: "When will Tax Incubator be commercially available?",
        answer:
          "Tax Incubator is currently in early-access pilot with select enterprise partners. General availability is scheduled for Q4 2026.",
      },
      {
        question: "Can we join the early access pilot program?",
        answer:
          "Yes. Finance teams and enterprise CFOs can apply for early access to test our automated reconciliation engine with historical ledgers.",
      },
    ],
    cta: {
      primaryText: "Request Early Access Pilot",
      primaryHref: "/contact?product=tax-incubator",
      secondaryText: "Review Development Roadmap",
      secondaryHref: "#roadmap",
    },
  },
  {
    id: "erp",
    slug: "erp",
    name: "NOXSOV ERP",
    brandTag: "NOXSOV ERP by NOXSOV",
    categoryId: "it-solutions",
    categoryName: "IT Solutions",
    status: "Concept",
    tagline: "Modular Enterprise Resource Planning for Agile Organizations",
    shortDescription:
      "A modern, unbloated ERP system designed for rapid deployment, multi-warehouse logistics, procurement governance, and real-time ledger synchronization.",
    fullDescription:
      "NOXSOV ERP reimagines enterprise resource planning from first principles. Legacy ERP systems take years to deploy, cost millions in consulting fees, and suffocate under technical debt. NOXSOV ERP is designed as a modular, API-first suite connecting supply chain logistics, inventory optimization, automated procurement, and financial ledgers into an intuitive, responsive command center.",
    image: "/images/products/erp.jpg",
    accentColor: "blue",
    gradient: "from-blue-500/20 via-sky-500/10 to-transparent",
    stats: [
      { label: "Architecture", value: "Modular API-First" },
      { label: "Deployment Time", value: "<30 Days Target" },
      { label: "Status", value: "In Architectural Design" },
      { label: "Target Availability", value: "2027" },
    ],
    keyCapabilities: [
      "Global supply chain pipeline tracking with real-time transit telemetry",
      "Multi-warehouse inventory optimization with automated low-stock reorder triggers",
      "End-to-end procurement lifecycle workflows with hierarchical digital approvals",
      "Bi-directional financial ledger synchronization with zero latency",
    ],
    features: [
      {
        title: "Global Supply Chain Logistics Pipeline",
        description:
          "Unified tracking across multi-modal freight, customs clearance, and transit hubs with predictive delivery delay warnings.",
        badge: "Logistics",
      },
      {
        title: "Multi-Warehouse Inventory & SKU Optimization",
        description:
          "Real-time visibility across regional distribution centers with algorithmic reorder point calculations and turnover analytics.",
        badge: "Inventory",
      },
      {
        title: "Procurement Lifecycle & Purchase Order Governance",
        description:
          "Automate requisition-to-check workflows, vendor performance scorecards, and multi-tier approval hierarchies.",
        badge: "Procurement",
      },
      {
        title: "Real-Time Financial Ledger Synchronization",
        description:
          "Eliminates end-of-month batch reconciliations by journaling transactions at the instant goods change custody.",
        badge: "Real-Time Ledger",
      },
    ],
    architectureOverview:
      "Designed as micro-services running on lightweight distributed nodes. Each business module (Inventory, Procurement, Logistics, Ledger) communicates over authenticated gRPC streams with event sourcing, ensuring complete historical replayability and modular independence.",
    specs: [
      { label: "Target Deployment", value: "Cloud native, hybrid sovereign on-premises, or air-gapped" },
      { label: "Database Core", value: "PostgreSQL distributed shards with immutable transaction append logs" },
      { label: "API Standards", value: "OpenAPI 3.1 REST, gRPC streaming, GraphQL data mesh" },
      { label: "Security", value: "Role-based access control, cryptographic field-level audit trails" },
    ],
    roadmap: [
      {
        quarter: "Phase 1",
        title: "Architectural RFC & Core Domain Modeling",
        status: "In Progress",
        details: "Finalizing data schemas for multi-currency double-entry ledger and supply chain graph.",
      },
      {
        quarter: "Phase 2",
        title: "Procurement & Inventory Engine Prototype",
        status: "Planned",
        details: "Building the warehouse SKU tracking and multi-stage PO approval pipeline.",
      },
      {
        quarter: "Phase 3",
        title: "Logistics Telemetry & Financial Ledger Sync",
        status: "Planned",
        details: "Connecting freight carrier APIs and real-time ledger posting engine.",
      },
    ],
    faqs: [
      {
        question: "How will NOXSOV ERP compare to legacy solutions like SAP or Oracle?",
        answer:
          "NOXSOV ERP eliminates multi-year implementation cycles by focusing on modular architecture, clean modern interfaces, and zero vendor lock-in.",
      },
      {
        question: "Can organizations participate in the advisory council?",
        answer:
          "Yes. Forward-thinking enterprise supply chain and IT leaders can join our Product Advisory Council to influence early architectural requirements.",
      },
    ],
    cta: {
      primaryText: "Join Product Advisory Council",
      primaryHref: "/contact?product=erp",
      secondaryText: "Review Architectural Vision",
      secondaryHref: "#features",
    },
  },
  {
    id: "college-k12-erp",
    slug: "college-k12-erp",
    name: "College & K–12 ERP",
    brandTag: "College & K–12 ERP by NOXSOV",
    categoryId: "it-solutions",
    categoryName: "IT Solutions",
    status: "Concept",
    tagline: "Unified Institutional Campus Management & Academic Intelligence",
    shortDescription:
      "Next-generation campus operations platform uniting student lifecycle funnels, fee collection, gradebooks, faculty scheduling, and parent communication.",
    fullDescription:
      "Colleges and K–12 school districts are currently plagued by fragmented point solutions—one for student attendance, another for fee collection, and yet another for transcripts. NOXSOV College & K–12 ERP provides a single, sovereign campus intelligence platform engineered to streamline admissions, automate fee collection matrices, and empower educators with real-time academic analytics.",
    image: "/images/products/college-k12-erp.jpg",
    accentColor: "blue",
    gradient: "from-blue-500/20 via-teal-500/10 to-transparent",
    stats: [
      { label: "Target Sectors", value: "Colleges & K-12" },
      { label: "Campus Efficiency", value: "+40% Target" },
      { label: "Status", value: "Concept & Research" },
      { label: "Target Availability", value: "2027" },
    ],
    keyCapabilities: [
      "End-to-end student admissions funnel and digital enrollment verification",
      "Dynamic fee collection matrix with automated reminders and partial payment plans",
      "Comprehensive academic grading distribution, GPA metrics, and digital transcripts",
      "Faculty attendance tracking, timetable allocation, and parent notification portals",
    ],
    features: [
      {
        title: "Student Enrollment Telemetry & Funnel",
        description:
          "Track prospective students from application to admit and final matriculation with automated document verification and merit ranking.",
        badge: "Admissions",
      },
      {
        title: "Automated Fee Collection Matrix",
        description:
          "Dynamic student ledger supporting split payments, scholarship subsidies, installment plans, and instant payment reconciliation.",
        badge: "Fee Engine",
      },
      {
        title: "Academic Grading & Transcript Distribution",
        description:
          "Digital gradebook calculating weighted GPAs, cumulative distribution graphs, and cryptographically verifiable digital degrees/transcripts.",
        badge: "Academics",
      },
      {
        title: "Faculty Schedule & Attendance Matrix",
        description:
          "Algorithmic conflict-free timetable generation, substitute faculty routing, and automated SMS/WhatsApp alerts for parents and students.",
        badge: "Campus Ops",
      },
    ],
    architectureOverview:
      "Engineered with strict student data privacy safeguards compliant with FERPA and national student data sovereignty regulations. Designed for high availability with offline sync capabilities for remote campuses.",
    specs: [
      { label: "Target Environments", value: "Universities, Autonomous Colleges, K-12 School Groups" },
      { label: "Data Privacy", value: "FERPA compliant, localized student data storage, zero advertising tracking" },
      { label: "Interfaces", value: "Web administration portal, dedicated student mobile app, parent portal" },
      { label: "LMS Integrations", value: "Moodle, Canvas, Google Classroom connectors" },
    ],
    roadmap: [
      {
        quarter: "Phase 1",
        title: "Institutional Research & User Journey Mapping",
        status: "In Progress",
        details: "Conducting user studies with academic registrars, finance heads, and deans.",
      },
      {
        quarter: "Phase 2",
        title: "Admissions & Fee Engine Core",
        status: "Planned",
        details: "Building the high-volume student intake and payment gateway reconciliation layer.",
      },
      {
        quarter: "Phase 3",
        title: "Pilot Campus Deployment",
        status: "Planned",
        details: "Deploying alpha build to selected charter school groups and autonomous colleges.",
      },
    ],
    faqs: [
      {
        question: "Can schools transition from existing legacy software?",
        answer:
          "Yes. Our roadmap includes automated data migration tools to import existing student records, fee histories, and grade catalogs seamlessly.",
      },
      {
        question: "How can our educational institution register interest?",
        answer:
          "Academic leadership can submit an expression of interest to join our early pilot evaluation group.",
      },
    ],
    cta: {
      primaryText: "Register Institutional Interest",
      primaryHref: "/contact?product=college-k12-erp",
      secondaryText: "Learn More",
      secondaryHref: "#features",
    },
  },
];

export function getProductBySlug(slug: string): ProductData | undefined {
  return PRODUCTS.find((p) => p.slug === slug || p.id === slug);
}

export function getProductsByCategory(categoryId: string): ProductData[] {
  return PRODUCTS.filter((p) => p.categoryId === categoryId);
}
