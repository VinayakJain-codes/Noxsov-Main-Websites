export type UserRole = "admin" | "partner" | "sales" | "finance";
export type UserStatus = "active" | "suspended" | "invited";

export interface PartnerUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
}

export interface PartnerPayoutDetails {
  method: "bank_transfer" | "upi";
  bankAccountName?: string;
  bankAccountNumber?: string;
  bankName?: string;
  bankIfsc?: string;
  upiId?: string;
}

export interface PartnerProfile {
  id: string;
  userId: string;
  partnerCode: string; // e.g. "NXV-PTR-7041"
  phone: string;
  companyName: string;
  payoutDetails: PartnerPayoutDetails;
  termsAcceptedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export type ReferralType = "catalogue" | "custom";

export type DealStatus =
  | "draft"
  | "pending_review"
  | "changes_requested"
  | "approved"
  | "contacted"
  | "qualified"
  | "proposal_sent"
  | "negotiation"
  | "won"
  | "lost"
  | "rejected"
  | "duplicate"
  | "cancelled";

export type CommissionStatus =
  | "not_eligible"
  | "pending"
  | "earned"
  | "partially_paid"
  | "paid"
  | "on_hold"
  | "reversed";

export type CommissionType = "fixed" | "percentage";

export interface ReferralRecord {
  id: string; // e.g. "REF-2026-0842"
  partnerId: string;
  partnerName: string;
  partnerEmail: string;

  // Customer Details
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  companyName?: string;
  city?: string;
  customerNotes?: string;

  // Project / Product Details
  referralType: ReferralType;
  productId?: string | null;
  productNameSnapshot?: string | null;
  customProjectTitle?: string | null;
  customProjectDescription?: string | null;
  expectedTimeline?: string | null;
  additionalNotes?: string | null;

  // Commercial Terms (Proposed)
  currency: string; // Default: "INR"
  proposedQuoteAmount: number;
  proposedCommissionType: CommissionType;
  proposedCommissionValue: number;
  proposedIndicativeCommission: number;
  pricingNotes?: string;

  // Commercial Terms (Admin Approved)
  approvedQuoteAmount?: number | null;
  approvedCommissionType?: CommissionType | null;
  approvedCommissionValue?: number | null;
  approvedIndicativeCommission?: number | null;

  // Administration & Notes
  internalAdminNotes?: string | null;
  customerFacingNotes?: string | null; // published notes visible to partner
  assignedSalesOwner?: string | null;

  // Workflow Statuses
  dealStatus: DealStatus;
  commissionStatus: CommissionStatus;

  // Timestamps
  submittedAt: string;
  approvedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ReferralPayment {
  id: string;
  referralId: string;
  amountReceived: number;
  currency: string;
  receivedAt: string;
  paymentReference: string;
  verifiedBy: string;
  verifiedAt: string;
  status: "pending_verification" | "verified" | "refunded" | "reversed";
  createdAt: string;
}

export interface CommissionLedgerEntry {
  id: string;
  referralId: string;
  partnerId: string;
  partnerName: string;
  customerName: string;
  entryType: "earned" | "adjustment" | "reversal" | "payout";
  amount: number; // positive for earned, negative for payout
  currency: string;
  basisAmount?: number | null; // qualifying customer payment received
  commissionRateOrFixed?: string | null;
  referenceId?: string; // payment id or payout transaction id
  note?: string;
  createdBy: string;
  createdAt: string;
}

export interface ReferralPayout {
  id: string;
  partnerId: string;
  partnerName: string;
  amount: number;
  currency: string;
  paymentMethod: "bank_transfer" | "upi" | "cheque";
  transactionReference: string;
  paidAt: string;
  recordedBy: string;
  note?: string;
  createdAt: string;
}

export interface ReferralActivity {
  id: string;
  referralId: string;
  actorName: string;
  actorRole: UserRole;
  action: string;
  note?: string;
  createdAt: string;
}

export interface PartnerSummary {
  partner: PartnerUser;
  profile: PartnerProfile | null;
  totalReferrals: number;
  pendingReviewCount: number;
  activeLeadsCount: number;
  wonCount: number;
  totalApprovedPipeline: number;
  commissionPending: number;
  commissionEarned: number;
  commissionPaid: number;
  commissionAvailable: number;
}

export interface AdminSummary {
  totalPartners: number;
  pendingReviewCount: number;
  activeLeadsCount: number;
  wonCount: number;
  totalApprovedValue: number;
  totalCommissionPending: number;
  totalCommissionEarned: number;
  totalCommissionPaid: number;
  totalCommissionAvailable: number;
}

