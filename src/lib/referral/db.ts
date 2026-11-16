import { randomUUID } from "node:crypto";
import { createReferralClient } from "@/lib/supabase";
import { STORE_CATALOG } from "@/lib/store/catalog";
import { PortalError } from "./session";
import { activeStatuses } from "./workflow";
import { calculateIndicativeCommission, PORTAL_CURRENCY, toMinorUnits } from "./money";
import type {
  AdminSummary, CommissionLedgerEntry, PartnerProfile, PartnerSummary,
  PartnerUser, ReferralActivity, ReferralPayment, ReferralPayout, ReferralRecord,
} from "@/types/referral";

type SnakeCase<S extends string> = S extends `${infer First}${infer Rest}`
  ? First extends Lowercase<First> ? `${First}${SnakeCase<Rest>}` : `_${Lowercase<First>}${SnakeCase<Rest>}`
  : S;

type Row<T> = { [K in keyof T as SnakeCase<string & K>]: T[K] };

function mapSupabaseUser(row: Row<PartnerUser>): PartnerUser {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role,
    status: row.status,
    createdAt: row.created_at,
  };
}

function mapSupabaseProfile(row: Row<PartnerProfile>): PartnerProfile {
  return {
    id: row.id,
    userId: row.user_id,
    partnerCode: row.partner_code,
    phone: row.phone || "",
    companyName: row.company_name || "",
    payoutDetails: row.payout_details || { method: "bank_transfer" },
    termsAcceptedAt: row.terms_accepted_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapSupabaseReferral(row: Row<ReferralRecord>): ReferralRecord {
  return {
    id: row.id,
    partnerId: row.partner_id,
    partnerName: row.partner_name,
    partnerEmail: row.partner_email,
    customerName: row.customer_name,
    customerPhone: row.customer_phone,
    customerEmail: row.customer_email,
    companyName: row.company_name || undefined,
    city: row.city || undefined,
    customerNotes: row.customer_notes || undefined,
    referralType: row.referral_type,
    productId: row.product_id || null,
    productNameSnapshot: row.product_name_snapshot || null,
    customProjectTitle: row.custom_project_title || null,
    customProjectDescription: row.custom_project_description || null,
    expectedTimeline: row.expected_timeline || null,
    currency: row.currency || "INR",
    proposedQuoteAmount: Number(row.proposed_quote_amount),
    proposedCommissionType: row.proposed_commission_type,
    proposedCommissionValue: Number(row.proposed_commission_value),
    proposedIndicativeCommission: Number(row.proposed_indicative_commission),
    pricingNotes: row.pricing_notes || undefined,
    approvedQuoteAmount: row.approved_quote_amount != null ? Number(row.approved_quote_amount) : null,
    approvedCommissionType: row.approved_commission_type || null,
    approvedCommissionValue: row.approved_commission_value != null ? Number(row.approved_commission_value) : null,
    approvedIndicativeCommission:
      row.approved_indicative_commission != null ? Number(row.approved_indicative_commission) : null,
    internalAdminNotes: row.internal_admin_notes || null,
    customerFacingNotes: row.customer_facing_notes || null,
    assignedSalesOwner: row.assigned_sales_owner || null,
    dealStatus: row.deal_status,
    commissionStatus: row.commission_status,
    submittedAt: row.submitted_at,
    approvedAt: row.approved_at || null,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapSupabasePayment(row: Row<ReferralPayment>): ReferralPayment {
  return {
    id: row.id,
    referralId: row.referral_id,
    amountReceived: Number(row.amount_received),
    currency: row.currency || "INR",
    receivedAt: row.received_at,
    paymentReference: row.payment_reference,
    verifiedBy: row.verified_by || "",
    verifiedAt: row.verified_at || "",
    status: row.status,
    createdAt: row.created_at,
  };
}

function mapSupabaseLedger(row: Row<CommissionLedgerEntry>): CommissionLedgerEntry {
  return {
    id: row.id,
    referralId: row.referral_id,
    partnerId: row.partner_id,
    partnerName: row.partner_name,
    customerName: row.customer_name,
    entryType: row.entry_type,
    amount: Number(row.amount),
    currency: row.currency || "INR",
    basisAmount: row.basis_amount != null ? Number(row.basis_amount) : null,
    commissionRateOrFixed: row.commission_rate_or_fixed || null,
    referenceId: row.reference_id || undefined,
    note: row.note || undefined,
    createdBy: row.created_by,
    createdAt: row.created_at,
  };
}

function mapSupabasePayout(row: Row<ReferralPayout>): ReferralPayout {
  return {
    id: row.id,
    partnerId: row.partner_id,
    partnerName: row.partner_name,
    amount: Number(row.amount),
    currency: row.currency || "INR",
    paymentMethod: row.payment_method,
    transactionReference: row.transaction_reference,
    paidAt: row.paid_at,
    recordedBy: row.recorded_by,
    note: row.note || undefined,
    createdAt: row.created_at,
  };
}

function mapSupabaseActivity(row: Row<ReferralActivity>): ReferralActivity {
  return {
    id: row.id,
    referralId: row.referral_id,
    actorName: row.actor_name,
    actorRole: row.actor_role,
    action: row.action,
    note: row.note || undefined,
    createdAt: row.created_at,
  };
}

function unwrap<T>({ data, error }: { data: T; error: unknown }): T {
  if (error) {
    const dbError = error as { code?: string; message?: string };
    if (dbError.code === "P0001") throw new PortalError(dbError.message ?? "Invalid operation.", 409);
    if (dbError.code === "23505") throw new PortalError("A record with this reference already exists.", 409);
    throw error;
  }
  return data;
}

async function readAll<T>(page: (from: number, to: number) => PromiseLike<{ data: T[] | null; error: unknown }>) {
  const rows: T[] = [];
  // Offset pagination needs an explicit unique tie-breaker on every query.
  const pageSize = 500;
  for (let offset = 0; ; offset += pageSize) {
    const batch = unwrap(await page(offset, offset + pageSize - 1)) ?? [];
    rows.push(...batch);
    if (batch.length < pageSize) return rows;
  }
}

export async function getPartners() {
  const db = createReferralClient();
  const [users, profiles] = await Promise.all([
    readAll<Row<PartnerUser>>((from, to) => db.from("referral_users").select("id,name,email,role,status,created_at")
      .eq("role", "partner").order("created_at", { ascending: false }).order("id").range(from, to)),
    readAll<Row<PartnerProfile>>((from, to) => db.from("referral_partner_profiles").select("*").order("id").range(from, to)),
  ]);
  const profilesByUser = new Map(profiles.map((row) => [row.user_id, mapSupabaseProfile(row)]));
  return users.map((row) => ({ partner: mapSupabaseUser(row), profile: profilesByUser.get(row.id) ?? null }));
}

export async function getPartnerById(userId: string) {
  const db = createReferralClient();
  const row = unwrap(await db.from("referral_users").select("id,name,email,role,status,created_at")
    .eq("id", userId).eq("role", "partner").maybeSingle());
  if (!row) return null;
  const profile = unwrap(await db.from("referral_partner_profiles").select("*").eq("user_id", userId).maybeSingle());
  return { partner: mapSupabaseUser(row), profile: profile ? mapSupabaseProfile(profile) : null };
}

export async function createPartner(account: { name: string; email: string; phone: string; companyName: string; password?: string }) {
  const db = createReferralClient();
  const existing = unwrap(await db.from("referral_users").select("id").eq("email", account.email).limit(1).maybeSingle());
  if (existing) throw new PortalError("This email already has a portal account.", 409);

  const siteUrl = process.env.REFERRAL_PORTAL_URL;
  if (!account.password && !siteUrl) throw new PortalError("The partner invitation URL is not configured.", 503);

  const { data, error } = account.password
    ? await db.auth.admin.createUser({ email: account.email, password: account.password, email_confirm: true })
    : await db.auth.admin.inviteUserByEmail(account.email, {
        redirectTo: new URL("/partner/activate", siteUrl!).href,
      });
  if (error || !data.user) {
    if (error?.code === "email_exists" || error?.code === "user_already_exists") {
      throw new PortalError("This email already has an account. Contact the portal administrator to link it.", 409);
    }
    throw error ?? new Error("Supabase returned no invited user.");
  }

  try {
    return unwrap(await db.rpc("referral_create_partner", {
      p_auth_id: data.user.id,
      p_name: account.name,
      p_email: account.email,
      p_phone: account.phone,
      p_company: account.companyName,
    }));
  } catch (err) {
    const lookup = await db.from("referral_users").select("id").eq("auth_user_id", data.user.id).maybeSingle();
    if (lookup.data) return;
    if (!lookup.error) {
      const { error: cleanupError } = await db.auth.admin.deleteUser(data.user.id);
      if (cleanupError) console.error("Unable to remove incomplete referral invitation", cleanupError);
    }
    throw err;
  }
}

export async function updatePartnerProfile(userId: string, updates: Pick<PartnerProfile, "companyName" | "phone" | "payoutDetails">) {
  return unwrap(await createReferralClient().rpc("referral_save_profile", {
    p_user_id: userId,
    p_company: updates.companyName,
    p_phone: updates.phone,
    p_payout_details: updates.payoutDetails,
  }));
}

export async function updatePartnerStatus(id: string, status: "active" | "suspended") {
  const row = unwrap(await createReferralClient().from("referral_users").update({ status })
    .eq("id", id).eq("role", "partner").select("id").maybeSingle());
  if (!row) throw new PortalError("Partner not found.", 404);
}

export async function getReferrals(filters?: { partnerId?: string; dealStatus?: string; search?: string }) {
  let query = createReferralClient().from("referral_records").select("*");
  if (filters?.partnerId) query = query.eq("partner_id", filters.partnerId);
  if (filters?.dealStatus && filters.dealStatus !== "all") query = query.eq("deal_status", filters.dealStatus);
  const rows = await readAll<Row<ReferralRecord>>((from, to) => query
    .order("created_at", { ascending: false }).order("id").range(from, to));
  const search = filters?.search?.trim().toLowerCase();
  const referrals = rows.map(mapSupabaseReferral);
  return search ? referrals.filter((r) => [
    r.id, r.customerName, r.companyName, r.customerEmail, r.customerPhone, r.productNameSnapshot, r.customProjectTitle,
  ].some((value) => value?.toLowerCase().includes(search))) : referrals;
}

export async function getReferralById(id: string, partnerId?: string) {
  let query = createReferralClient().from("referral_records").select("*").eq("id", id);
  if (partnerId) query = query.eq("partner_id", partnerId);
  const row = unwrap(await query.maybeSingle());
  return row ? mapSupabaseReferral(row) : null;
}

export function publicReferral(referral: ReferralRecord, actor: PartnerUser) {
  if (actor.role === "admin") return referral;
  const visible = { ...referral };
  delete visible.internalAdminNotes;
  return visible;
}

export async function checkDuplicateCustomer(phone: string, email: string) {
  return unwrap(await createReferralClient().rpc("referral_has_duplicate", {
    p_phone: phone, p_email: email,
  })) as boolean;
}

export async function createReferral(data: {
  customerName: string; customerPhone: string; customerEmail: string;
  companyName?: string; city?: string; customerNotes?: string;
  referralType: ReferralRecord["referralType"]; productId?: string;
  customProjectTitle?: string; customProjectDescription?: string; expectedTimeline?: string;
  proposedQuoteAmount: number; proposedCommissionType: ReferralRecord["proposedCommissionType"];
  proposedCommissionValue: number; pricingNotes?: string;
}, partner: PartnerUser) {
  const product = data.referralType === "catalogue" ? STORE_CATALOG.find((p) => p.id === data.productId) : null;
  if (data.referralType === "catalogue" && !product) throw new PortalError("Select an available catalogue product.");
  const now = new Date().toISOString();
  const id = "REF-" + randomUUID();
  const record = {
    id,
    partner_id: partner.id,
    partner_name: partner.name,
    partner_email: partner.email,
    customer_name: data.customerName,
    customer_phone: data.customerPhone,
    customer_email: data.customerEmail.toLowerCase(),
    company_name: data.companyName,
    city: data.city,
    customer_notes: data.customerNotes,
    referral_type: data.referralType,
    product_id: product?.id ?? null,
    product_name_snapshot: product?.name ?? null,
    custom_project_title: data.referralType === "custom" ? data.customProjectTitle : null,
    custom_project_description: data.referralType === "custom" ? data.customProjectDescription : null,
    expected_timeline: data.expectedTimeline,
    currency: PORTAL_CURRENCY,
    proposed_quote_amount: data.proposedQuoteAmount,
    proposed_commission_type: data.proposedCommissionType,
    proposed_commission_value: data.proposedCommissionValue,
    proposed_indicative_commission: calculateIndicativeCommission(data.proposedQuoteAmount, data.proposedCommissionType, data.proposedCommissionValue),
    pricing_notes: data.pricingNotes,
    deal_status: "pending_review",
    commission_status: "not_eligible",
    submitted_at: now,
    created_at: now,
    updated_at: now,
  };
  const row = unwrap(await createReferralClient().rpc("referral_submit", { p_record: record }));
  return mapSupabaseReferral(row);
}

export async function changeReferral(current: ReferralRecord, updates: Partial<Row<ReferralRecord>>, actor: PartnerUser, action: string, note?: string) {
  const row = unwrap(await createReferralClient().rpc("referral_change", {
    p_id: current.id, p_expected: current.updatedAt, p_updates: updates,
    p_actor_name: actor.name, p_actor_role: actor.role, p_action: action, p_note: note ?? null,
  }));
  return mapSupabaseReferral(row);
}

export async function getPaymentsByReferral(id: string) {
  const db = createReferralClient();
  return (await readAll<Row<ReferralPayment>>((from, to) => db.from("referral_payments").select("*")
    .eq("referral_id", id).order("created_at", { ascending: false }).order("id").range(from, to))).map(mapSupabasePayment);
}

export async function getCommissionLedger(partnerId?: string, referralId?: string) {
  let query = createReferralClient().from("referral_commission_ledger").select("*");
  if (partnerId) query = query.eq("partner_id", partnerId);
  if (referralId) query = query.eq("referral_id", referralId);
  return (await readAll<Row<CommissionLedgerEntry>>((from, to) => query
    .order("created_at", { ascending: false }).order("id").range(from, to))).map(mapSupabaseLedger);
}

export async function getPayouts(partnerId?: string) {
  let query = createReferralClient().from("referral_payouts").select("*");
  if (partnerId) query = query.eq("partner_id", partnerId);
  return (await readAll<Row<ReferralPayout>>((from, to) => query
    .order("paid_at", { ascending: false }).order("id").range(from, to))).map(mapSupabasePayout);
}

export async function getActivities(id: string) {
  const db = createReferralClient();
  return (await readAll<Row<ReferralActivity>>((from, to) => db.from("referral_activities").select("*")
    .eq("referral_id", id).order("created_at", { ascending: false }).order("id").range(from, to))).map(mapSupabaseActivity);
}

export async function recordCustomerPayment(data: {
  referralId: string; amountReceived: number; paymentReference: string;
  receivedAt: string; actorName: string;
}) {
  const result = unwrap(await createReferralClient().rpc("referral_record_payment", {
    p_referral_id: data.referralId, p_amount: data.amountReceived, p_reference: data.paymentReference,
    p_received_at: data.receivedAt, p_actor: data.actorName,
  }));
  return { payment: mapSupabasePayment(result.payment), commissionEarned: Number(result.earned) };
}

export async function recordPartnerPayout(data: {
  partnerId: string; referralId: string | null; amount: number; paymentMethod: ReferralPayout["paymentMethod"];
  transactionReference: string; paidAt: string; actorName: string; note?: string;
}) {
  const row = unwrap(await createReferralClient().rpc("referral_record_payout", {
    p_partner_id: data.partnerId, p_referral_id: data.referralId, p_amount: data.amount,
    p_method: data.paymentMethod, p_reference: data.transactionReference, p_paid_at: data.paidAt,
    p_note: data.note ?? null, p_actor: data.actorName,
  }));
  return mapSupabasePayout(row);
}

function buildSummary(referrals: ReferralRecord[], ledger: CommissionLedgerEntry[]) {
  const earnedByReferral = new Map<string, number>();
  const paidByReferral = new Map<string, number>();
  let paid = 0;
  for (const entry of ledger) {
    const payout = entry.entryType === "payout";
    const amount = payout ? Math.abs(toMinorUnits(entry.amount)) : toMinorUnits(entry.amount);
    const totals = payout ? paidByReferral : earnedByReferral;
    totals.set(entry.referralId, (totals.get(entry.referralId) ?? 0) + amount);
    if (payout) paid += amount;
  }
  const earned = [...earnedByReferral.values()].reduce((total, value) => total + value, 0);
  const active = referrals.filter((r) => activeStatuses.includes(r.dealStatus));
  const won = referrals.filter((r) => r.dealStatus === "won");
  const eligibleBalance = won.reduce((total, referral) => {
    if (!["earned", "partially_paid", "paid"].includes(referral.commissionStatus)) return total;
    const earned = earnedByReferral.get(referral.id) ?? 0;
    const paid = paidByReferral.get(referral.id) ?? 0;
    return total + Math.max(0, earned - paid);
  }, 0);
  return {
    totalReferrals: referrals.length,
    pendingReviewCount: referrals.filter((r) => r.dealStatus === "pending_review").length,
    activeLeadsCount: active.length,
    wonCount: won.length,
    totalApprovedPipeline: active.reduce((total, r) => total + toMinorUnits(r.approvedQuoteAmount ?? 0), 0) / 100,
    commissionPending: won.reduce((total, r) => total + Math.max(0,
      toMinorUnits(r.approvedIndicativeCommission ?? 0) - (earnedByReferral.get(r.id) ?? 0)), 0) / 100,
    commissionEarned: earned / 100,
    commissionPaid: paid / 100,
    commissionAvailable: Math.min(eligibleBalance, Math.max(0, earned - paid)) / 100,
  };
}

export async function getPartnerSummary(partnerId: string): Promise<PartnerSummary> {
  const [partnerData, referrals, ledger] = await Promise.all([
    getPartnerById(partnerId), getReferrals({ partnerId }), getCommissionLedger(partnerId),
  ]);
  if (!partnerData) throw new PortalError("Partner not found.", 404);
  return { ...partnerData, ...buildSummary(referrals, ledger) };
}

function groupByPartner<T extends { partnerId: string }>(rows: T[]) {
  const groups = new Map<string, T[]>();
  for (const row of rows) {
    const existing = groups.get(row.partnerId);
    if (existing) existing.push(row);
    else groups.set(row.partnerId, [row]);
  }
  return groups;
}

export async function getPartnersWithSummaries() {
  const [partners, referrals, ledger] = await Promise.all([getPartners(), getReferrals(), getCommissionLedger()]);
  const referralsByPartner = groupByPartner(referrals);
  const ledgerByPartner = groupByPartner(ledger);
  return partners.map((account) => ({
    ...account,
    ...buildSummary(referralsByPartner.get(account.partner.id) ?? [], ledgerByPartner.get(account.partner.id) ?? []),
  }));
}

export async function getAdminSummary(): Promise<AdminSummary> {
  const summaries = await getPartnersWithSummaries();
  const total = (field: "pendingReviewCount" | "activeLeadsCount" | "wonCount") =>
    summaries.reduce((sum, summary) => sum + summary[field], 0);
  const totalMoney = (field: "totalApprovedPipeline" | "commissionPending" | "commissionEarned" | "commissionPaid" | "commissionAvailable") =>
    summaries.reduce((sum, summary) => sum + toMinorUnits(summary[field]), 0) / 100;
  return {
    totalPartners: summaries.length,
    pendingReviewCount: total("pendingReviewCount"),
    activeLeadsCount: total("activeLeadsCount"),
    wonCount: total("wonCount"),
    totalApprovedValue: totalMoney("totalApprovedPipeline"),
    totalCommissionPending: totalMoney("commissionPending"),
    totalCommissionEarned: totalMoney("commissionEarned"),
    totalCommissionPaid: totalMoney("commissionPaid"),
    totalCommissionAvailable: totalMoney("commissionAvailable"),
  };
}
