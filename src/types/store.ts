import { ProductStatus } from "@/data/products";

export interface PricingTierDetail {
  name: string;
  tagline: string;
  priceMonthly: string;
  priceAnnual: string;
  numericMonthly: number;
  numericAnnual: number;
  popular?: boolean;
  features: string[];
  cta: string;
  maxNodes?: string;
}

export interface StoreProduct {
  id: string;
  slug: string;
  name: string;
  brandTag: string;
  categoryId: "security" | "finance" | "it-solutions";
  categoryName: string;
  status: ProductStatus;
  tagline: string;
  shortDescription: string;
  image: string;
  version: string;
  platforms: string[];
  pricing: PricingTierDetail[];
  startingMonthlyPrice: number;
  startingAnnualPrice: number;
  rating: number;
  reviewsCount: number;
  deliveryType: "Instant Digital License" | "Early Access Deployment" | "Reserved Pilot";
}

export interface CartItem {
  id: string; // unique item id: slug-tier-billing
  productSlug: string;
  productName: string;
  brandTag: string;
  tierName: string;
  billingCycle: "monthly" | "annual";
  pricePerUnit: number;
  priceFormatted: string;
  quantity: number;
  categoryId: string;
  maxNodes?: string;
}

export interface OrderCustomerInfo {
  companyName: string;
  contactName: string;
  email: string;
  deploymentType: "cloud" | "on-premise" | "air-gapped";
  notes?: string;
}

export interface LicenseRecord {
  licenseKey: string;
  productSlug: string;
  productName: string;
  tierName: string;
  organizationName: string;
  adminEmail: string;
  status: "ACTIVE" | "EXPIRED" | "SUSPENDED";
  issuedAt: string;
  expiresAt: string;
  maxNodes: string;
  digitalSignature: string;
  deploymentType: string;
  orderId: string;
}

export interface OrderRecord {
  orderId: string;
  createdAt: string;
  customer: OrderCustomerInfo;
  items: CartItem[];
  subtotal: number;
  discount: number;
  discountCode?: string;
  tax: number;
  total: number;
  currency: string;
  paymentMethod: "enterprise_po" | "corporate_card" | "wire_transfer";
  paymentStatus: "PAID" | "PENDING_INVOICE";
  licenses: LicenseRecord[];
}

export interface ContactTicketRecord {
  ticketId: string;
  createdAt: string;
  name: string;
  email: string;
  company: string;
  role: string;
  product?: string;
  tier?: string;
  inquiryType: string;
  message: string;
  status: "OPEN" | "IN_REVIEW" | "RESOLVED";
}

export interface TelemetryHealthStatus {
  status: "OPERATIONAL" | "DEGRADED" | "MAINTENANCE";
  services: {
    storeApi: boolean;
    licenseVerificationEngine: boolean;
    cryptographicSigningService: boolean;
    enclaveDatabase: boolean;
  };
  telemetryLatencyMs: number;
  activeNodesCount: number;
  serverTimestamp: string;
  version: string;
}
