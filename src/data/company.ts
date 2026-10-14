export interface Principle {
  number: string;
  title: string;
  description: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  avatarInitials: string;
  badge?: string;
}

export const COMPANY_INFO = {
  name: "NOXSOV",
  fullName: "NOXSOV Pvt. Ltd. (Estb. 2026)",
  legalName: "NOXSOV Pvt. Ltd.",
  establishedYear: "2026",
  tagline: "The Sovereign Enterprise Software Ecosystem",
  mission:
    "Engineering autonomous, mathematically rigorous, and sovereign software systems that empower mission-critical enterprises across security, finance, and operational IT.",
  vision:
    "We reject bloated legacy software suites and fragmented SaaS subscriptions. NOXSOV is building a cohesive, multi-product sovereign ecosystem where every product operates with sub-millisecond precision, local data ownership, and seamless inter-product trust.",
  story:
    "Founded with a clear conviction: enterprise software has become slow, overpriced, and dangerously opaque. Modern enterprises find themselves locked into fragile cloud silos, leaking telemetry to third parties, and forced to pay exorbitant per-seat taxes. NOXSOV began by building autonomous, low-overhead software—starting with Kryptik (formerly Rakshak) for multi-tenant guard management and computer vision AI verification, alongside NOXSOV Events (formerly HI Events) for stadium-scale event ticketing. Today, we are unifying these solutions under one sovereign architectural banner.",
  principles: [
    {
      number: "01",
      title: "Data Sovereignty First",
      description:
        "Your telemetry, logs, and corporate records belong entirely to you. Our software is designed to run in private enclaves and air-gapped data centers with zero external telemetry egress.",
    },
    {
      number: "02",
      title: "Honest & Implemented Software",
      description:
        "Zero vaporware in our delivered products. What we demonstrate is running in production. What is in development or concept is labeled transparently with public roadmaps.",
    },
    {
      number: "03",
      title: "Unified Ecosystem Architecture",
      description:
        "Every solution is built to natively interoperate. As we roll out centralized identity (Phase 2) and unified billing (Phase 3), organizations gain an integrated cockpit across all operational domains.",
    },
    {
      number: "04",
      title: "Extreme Operational Resilience",
      description:
        "From kernel-level eBPF probes to offline turnstile mesh syncing, our software is engineered for deterministic execution under peak load and network disruption.",
    },
  ],
  stats: [
    { label: "Sovereign Products", value: "5 Solutions" },
    { label: "Active Deployments", value: "Production Ready" },
    { label: "Telemetry Privacy", value: "100% Encrypted" },
    { label: "Architectural Availability", value: "99.99%" },
  ],
  leadership: [
    {
      name: "Vinayak & Engineering Council",
      role: "Founder & Lead Architect",
      bio: "Systems engineer and architect focusing on low-latency distributed networks, sovereign kernel telemetry, and enterprise software ecosystems.",
      avatarInitials: "VN",
      badge: "Core Engineering",
    },
    {
      name: "Autonomous Security Team",
      role: "Security & Threat Research",
      bio: "Cybersecurity researchers and kernel systems engineers dedicated to eBPF monitoring, zero-trust topologies, and offensive attack modeling.",
      avatarInitials: "ST",
      badge: "Kryptik Labs",
    },
    {
      name: "Enterprise Platforms Group",
      role: "Enterprise Scalability & IT",
      bio: "Distributed systems specialists building high-concurrency event brokers, database sharding, and real-time offline-first sync engines.",
      avatarInitials: "EP",
      badge: "IT & Platforms",
    },
  ],
  contact: {
    supportEmail: "support@noxsov.com",
    salesEmail: "support@noxsov.com",
    securityEmail: "security@noxsov.com",
    pressEmail: "press@noxsov.com",
    headquarters: "Global Sovereign Operations Hub",
    availability: "24/7 Enterprise Response Network",
  },
};
