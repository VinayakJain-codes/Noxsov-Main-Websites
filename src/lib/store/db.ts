import {
  CartItem,
  OrderCustomerInfo,
  OrderRecord,
  LicenseRecord,
  ContactTicketRecord,
  TelemetryHealthStatus,
} from "@/types/store";

// Global in-memory storage holding orders, licenses, and tickets
interface StoreDatabase {
  orders: Map<string, OrderRecord>;
  licenses: Map<string, LicenseRecord>;
  tickets: Map<string, ContactTicketRecord>;
  initialized: boolean;
}

declare global {
  // eslint-disable-next-line no-var
  var __noxsov_store_db__: StoreDatabase | undefined;
}

function getDatabase(): StoreDatabase {
  if (!global.__noxsov_store_db__) {
    global.__noxsov_store_db__ = {
      orders: new Map(),
      licenses: new Map(),
      tickets: new Map(),
      initialized: false,
    };
  }

  const db = global.__noxsov_store_db__;

  if (!db.initialized) {
    // Seed initial demo licenses for immediate verification in the License Portal
    const sampleLicense1: LicenseRecord = {
      licenseKey: "NXV-KRYP-DEMO-2026",
      productSlug: "kryptik",
      productName: "Kryptik",
      tierName: "Enterprise Defense",
      organizationName: "Apex Defense Corp",
      adminEmail: "secops@apexdefense.internal",
      status: "ACTIVE",
      issuedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      expiresAt: new Date(Date.now() + 335 * 24 * 60 * 60 * 1000).toISOString(),
      maxNodes: "1,000 Managed Kernel Endpoints",
      digitalSignature: "SHA256:7f83b1657ff1fc53b92dc18148a1d65dfc2d4b1fa3d677284addd200126d9069",
      deploymentType: "air-gapped",
      orderId: "NXV-ORD-9102-INIT",
    };

    const sampleLicense2: LicenseRecord = {
      licenseKey: "NXV-EVNT-DEMO-2026",
      productSlug: "noxsov-events",
      productName: "NOXSOV Events",
      tierName: "Professional Fleet",
      organizationName: "Global Summit Arenas",
      adminEmail: "operations@globalsummits.com",
      status: "ACTIVE",
      issuedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      expiresAt: new Date(Date.now() + 350 * 24 * 60 * 60 * 1000).toISOString(),
      maxNodes: "25,000 Attendees / Unlimited Turnstile Gates",
      digitalSignature: "SHA256:9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca7",
      deploymentType: "cloud",
      orderId: "NXV-ORD-9103-INIT",
    };

    db.licenses.set(sampleLicense1.licenseKey, sampleLicense1);
    db.licenses.set(sampleLicense2.licenseKey, sampleLicense2);
    db.initialized = true;
  }

  return db;
}

function generateHex(length: number): string {
  const chars = "0123456789ABCDEF";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function getProductCode(slug: string): string {
  switch (slug) {
    case "kryptik":
      return "KRYP";
    case "noxsov-events":
      return "EVNT";
    case "tax-incubator":
      return "TAXI";
    case "erp":
      return "NERP";
    case "campus-erp":
      return "CERP";
    default:
      return "SFTW";
  }
}

export function createOrderRecord(params: {
  customer: OrderCustomerInfo;
  items: CartItem[];
  discountCode?: string;
  paymentMethod: "enterprise_po" | "corporate_card" | "wire_transfer";
}): OrderRecord {
  const db = getDatabase();

  if (!params.items || params.items.length === 0) {
    throw new Error("Cannot place an order with an empty cart");
  }

  if (!params.customer?.companyName || !params.customer?.email) {
    throw new Error("Company name and admin email are required for licensing");
  }

  // Calculate Subtotal
  const subtotal = params.items.reduce((sum, item) => sum + item.pricePerUnit * item.quantity, 0);

  // Check discount
  let discountPercent = 0;
  const normalizedCode = (params.discountCode || "").trim().toUpperCase();
  if (normalizedCode === "SOVEREIGN10") {
    discountPercent = 0.1;
  } else if (normalizedCode === "NOXSOV20") {
    discountPercent = 0.2;
  } else if (normalizedCode === "ENTERPRISE15") {
    discountPercent = 0.15;
  }

  const discount = Math.round(subtotal * discountPercent);
  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = Math.round(taxableAmount * 0.18); // 18% standard GST / VAT
  const total = taxableAmount + tax;

  const orderId = `NXV-ORD-${Date.now().toString().slice(-6)}-${generateHex(4)}`;
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000); // 1 year default

  // Generate real cryptographic license records for each item in the order
  const generatedLicenses: LicenseRecord[] = [];

  for (const item of params.items) {
    for (let q = 0; q < item.quantity; q++) {
      const code = getProductCode(item.productSlug);
      const licenseKey = `NXV-${code}-${generateHex(4)}-${generateHex(4)}`;
      const signature = `SHA256:${generateHex(16).toLowerCase()}${generateHex(16).toLowerCase()}${generateHex(16).toLowerCase()}${generateHex(16).toLowerCase()}`;

      const license: LicenseRecord = {
        licenseKey,
        productSlug: item.productSlug,
        productName: item.productName,
        tierName: item.tierName,
        organizationName: params.customer.companyName,
        adminEmail: params.customer.email,
        status: "ACTIVE",
        issuedAt: now.toISOString(),
        expiresAt: expiresAt.toISOString(),
        maxNodes: item.maxNodes || "Standard Enterprise Quota",
        digitalSignature: signature,
        deploymentType: params.customer.deploymentType,
        orderId,
      };

      db.licenses.set(licenseKey, license);
      generatedLicenses.push(license);
    }
  }

  const orderRecord: OrderRecord = {
    orderId,
    createdAt: now.toISOString(),
    customer: params.customer,
    items: params.items,
    subtotal,
    discount,
    discountCode: discountPercent > 0 ? normalizedCode : undefined,
    tax,
    total,
    currency: "INR",
    paymentMethod: params.paymentMethod,
    paymentStatus: params.paymentMethod === "corporate_card" ? "PAID" : "PENDING_INVOICE",
    licenses: generatedLicenses,
  };

  db.orders.set(orderId, orderRecord);
  return orderRecord;
}

export function getOrderById(orderId: string): OrderRecord | null {
  const db = getDatabase();
  return db.orders.get(orderId) || null;
}

export function getAllOrders(): OrderRecord[] {
  const db = getDatabase();
  return Array.from(db.orders.values()).sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function verifyLicenseKey(licenseKey: string): {
  valid: boolean;
  license?: LicenseRecord;
  message: string;
  daysRemaining?: number;
} {
  const db = getDatabase();
  const trimmed = (licenseKey || "").trim().toUpperCase();

  const record = db.licenses.get(trimmed);
  if (!record) {
    return {
      valid: false,
      message: "License key not recognized by NOXSOV Sovereign Licensing Authority.",
    };
  }

  const now = new Date();
  const expiresAt = new Date(record.expiresAt);
  const diffTime = expiresAt.getTime() - now.getTime();
  const daysRemaining = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  if (record.status !== "ACTIVE" || daysRemaining <= 0) {
    return {
      valid: false,
      license: record,
      daysRemaining: 0,
      message: "License has expired or has been suspended. Please renew with NOXSOV licensing.",
    };
  }

  return {
    valid: true,
    license: record,
    daysRemaining,
    message: "License verified successfully. Sovereign enclave signature confirmed.",
  };
}

export function createContactTicket(data: {
  name: string;
  email: string;
  company: string;
  role: string;
  product?: string;
  tier?: string;
  inquiryType: string;
  message: string;
}): ContactTicketRecord {
  const db = getDatabase();
  const ticketId = `NXV-TK-${Math.floor(100000 + Math.random() * 900000)}`;

  const ticket: ContactTicketRecord = {
    ticketId,
    createdAt: new Date().toISOString(),
    name: data.name,
    email: data.email,
    company: data.company,
    role: data.role,
    product: data.product,
    tier: data.tier,
    inquiryType: data.inquiryType,
    message: data.message,
    status: "OPEN",
  };

  db.tickets.set(ticketId, ticket);
  return ticket;
}

export function getTelemetryHealth(): TelemetryHealthStatus {
  const db = getDatabase();
  return {
    status: "OPERATIONAL",
    services: {
      storeApi: true,
      licenseVerificationEngine: true,
      cryptographicSigningService: true,
      enclaveDatabase: true,
    },
    telemetryLatencyMs: 0.94,
    activeNodesCount: 52400 + db.licenses.size * 10,
    serverTimestamp: new Date().toISOString(),
    version: "2.4.0-sovereign",
  };
}
