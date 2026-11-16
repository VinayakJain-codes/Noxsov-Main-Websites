Referral Partner Program --- Product & Technical Plan
1. Overview
Build a Referral Partner Portal inside the agency website. Approved
partners can submit prospective customers and record the commercial
terms they discussed. The system is not coupon-code based and does
not require fixed public pricing.

Each referral is a deal record containing: - Customer details - Selected
service/product, or a custom project description - Quoted customer
price - Proposed partner commission (fixed amount or percentage) - Deal
status, payment progress, and commission payout status

An administrator reviews and approves the commercial terms before they
become official.
2. Goals
1. Let referral partners submit and track leads without contacting the
   agency for every update.
2. Support both catalogue services and fully custom projects.
3. Support flexible customer quotes and flexible partner commissions.
4. Prevent duplicate leads, unauthorized commission promises, and
   premature payouts.
5. Give administrators a clear approval, sales, payment, and payout
   workflow.
3. User Roles & Permissions
Referral Partner
- Sign in to a private partner dashboard.
- Create a referral/customer record.
- Select an existing catalogue product/service or choose Custom
  Project.
- Enter the proposed customer quote and proposed commission.
- View only their own referrals and their statuses.
- View approved/earned commission and payout history.
- Edit a referral only while it is in Draft or Submitted status,
  subject to admin policy.
- Cannot approve their own quote/commission, change approved terms, or
  mark a commission as paid.
Administrator
- View and manage all partners and referrals.
- Approve, reject, or request changes to submissions.
- Set or amend the final customer quote and commission.
- Assign an internal sales owner.
- Update deal and payment milestones.
- Approve commission eligibility and record payouts.
- Configure products/services, commission rules, and partner access.
- View reports and export records.
Optional Sales/Finance Role
- Sales: manage lead follow-up and deal status, but cannot record
  payouts.
- Finance: verify received payments and record commission payouts.
- Keep this role optional for the first release; admin can perform all
  actions initially.
4. Partner Journey
1. Partner signs in.
2. Opens Submit a Referral.
3. Enters customer name, phone, email, and company (if applicable).
4. Selects a catalogue service/product or Custom Project.
5. Enters the quoted price and proposed commission.
6. Adds notes, scope, expected timeline, and any relevant context.
7. Submits the referral.
8. System checks for possible duplicate customer/leads.
9. Referral enters Pending Review.
10. Admin reviews the lead and commercial terms, then approves, requests
    changes, or rejects it.
11. Once approved, the partner can track progress.
12. When the customer deal is won and the agency receives the qualifying
    payment, commission becomes earned according to the agreed policy.
13. Finance/admin records the payout and the partner sees it in their
    dashboard.
5. Referral Submission Form
Customer Details
- Customer / contact person name --- required
- Phone number --- required
- Email --- recommended; required if available as a business rule
- Company / business name --- optional
- City / location --- optional
- Customer notes --- optional
Project / Product Details
- Referral type: Catalogue Product or Custom Project
- Catalogue product/service --- required when Catalogue Product is
  selected
- Custom project title --- required when Custom Project is selected
- Custom project description / scope --- required for Custom Project
- Expected delivery timeline --- optional
- Additional requirements / notes --- optional
- Attachment / brief upload --- optional, if file uploads are
  supported
Commercial Terms
- Currency --- default INR (₹), configurable
- Proposed customer quote --- required; positive monetary amount
- Commission type --- Fixed Amount or Percentage
- Proposed commission value --- required; positive amount or
  percentage
- Calculated indicative commission --- display automatically
- Pricing/commission notes --- optional
Important: Label these values as proposed until approved. A
partner-submitted figure is not a binding quote or an authorized
commission promise. The approved values and terms must be visible after
admin approval.
Validation
- Price must be greater than zero.
- Fixed commission must be greater than or equal to zero and should
  not exceed the approved customer price.
- Percentage must be within a configurable range (for example,
  0--100%); the admin can impose a stricter cap.
- Use decimal-safe monetary storage, not floating-point arithmetic.
- Require a clear commission basis: percentage of the approved project
  value, or percentage of qualifying money actually received. The
  recommended default is percentage of qualifying net amount actually
  received, excluding taxes, refunds, chargebacks, and pass-through
  expenses.
- Show a warning when a customer or phone/email appears in an existing
  referral.
- Do not silently merge duplicate submissions. Flag them for admin
  review.
6. Product Catalogue & Custom Projects
The form should load active products/services from the website's
existing catalogue.

Each catalogue item should have: - Name - Internal product/service ID -
Short description - Active/inactive status - Optional default commission
guidance (admin-only) - Optional indicative price range (admin-only or
partner-visible, configurable)

Selecting a catalogue item should save a snapshot of its name and ID on
the referral. This preserves the original referral record if the
catalogue item is later renamed or deactivated.

For Custom Project, allow a free-text title and detailed scope. Do
not force the partner to select a fixed price from the catalogue.
7. Commission & Pricing Rules
The system should support: - Fixed commission: e.g. ₹5,000 - Percentage
commission: e.g. 10% - Admin-approved override of either value -
Commission calculation preview - Partial-payment commission accrual, if
enabled - Refund/chargeback adjustment - Manual payout recording

Recommended calculation: - Fixed commission: the approved fixed amount,
subject to the agreement's earning conditions. - Percentage commission:
approved percentage × qualifying amount actually received. - If the
customer pays in instalments, calculate commission proportionally on
each qualifying payment. - If a payment is refunded, reverse or adjust
the corresponding unearned/unpaid commission according to the partner
agreement.

Do not calculate a final payable commission from the partner's proposed
quote. Use the admin-approved commercial terms and verified payment
records.

Store both proposed and approved values, with who changed them and when.
Never overwrite the proposal without retaining its history.
8. Referral Status Workflow
Suggested lead/deal statuses:

  Status              Meaning
  Draft               Partner has not submitted the referral
Pending Review      Submitted and awaiting admin review
Changes Requested   Admin needs clarification or revised terms
Approved            Referral and proposed commercial terms accepted
Contacted           Agency has contacted the customer
Qualified           Lead meets the agency's qualification criteria
Proposal Sent       Formal proposal/quotation sent to customer
Negotiation         Commercial discussion is active
Won                 Customer accepted the deal
Lost                Deal did not proceed
Rejected            Referral was rejected by admin
Duplicate           Admin confirmed it is an existing/duplicate lead
Cancelled           Referral was cancelled

Keep deal status separate from commission status.

Commission statuses: - Not Eligible - Pending (deal won, but earning
condition not met) - Earned (qualifying payment received) - Partially
Paid - Paid - On Hold - Reversed / Adjusted

A status change should record actor, timestamp, previous status, new
status, and optional reason.
9. Admin Dashboard
Overview cards
- Total partners
- New referrals awaiting review
- Active leads
- Won deals
- Total approved referral value
- Commission pending
- Commission earned
- Commission paid
Referral management table
Suggested columns: - Referral ID - Customer - Partner - Product /
project - Proposed quote - Approved quote - Proposed commission -
Approved commission - Deal status - Commission status - Submitted date -
Assigned sales owner
Referral detail page
- Customer and project details
- Partner-submitted proposal
- Admin-approved terms
- Internal notes (never visible to partner)
- Customer-facing notes (visible to partner only when explicitly
  published)
- Status timeline / activity log
- Payment records
- Commission ledger
- Actions: approve, request changes, reject, assign, update status,
  record payment, hold/release commission, record payout
10. Partner Dashboard
Summary
- Total referrals
- Pending review
- Active leads
- Won referrals
- Total commission earned
- Commission pending
- Commission paid
My Referrals
A partner sees only their own referrals and only fields permitted by the
agency.
Commission History
Show each commission line with: - Referral - Approved commission terms -
Qualifying payment basis - Earned amount - Paid amount - Remaining
amount - Payout date and reference, where applicable

Do not expose internal sales notes, other partners' data, customer
information beyond the partner's own referral, or internal
profitability/margin.
11. Payout Management
For the first version, use manual payout recording; do not integrate
automatic bank transfers unless there is a separate requirement.

Admin/finance should be able to: 1. Select an eligible commission
balance. 2. Enter payout amount, date, payment method, and
transaction/reference ID. 3. Add an optional note. 4. Confirm payout. 5.
Generate a payout record and update the remaining balance.

Support partial payouts. Prevent payouts greater than the available
earned balance. Keep a ledger rather than simply editing a single "paid"
number.

Partner payout details (bank/UPI) should be collected only if needed,
stored securely, and visible only to authorized finance/admin users.
12. Suggested Data Model
Names are illustrative; adapt to the current website's database and
conventions.
users
- id
- name
- email (unique)
- password_hash / authentication provider reference
- role (admin, partner, optional sales, finance)
- status (active, suspended, invited)
- created_at, updated_at
partner_profiles
- id
- user_id (FK users)
- partner_code (optional internal identifier; not required for
  attribution)
- phone
- company_name
- payout_details_reference (secure reference, not raw public data)
- terms_accepted_at
- created_at, updated_at
products
- id
- name
- description
- is_active
- created_at, updated_at
referrals
- id
- partner_id (FK users)
- customer_name
- customer_phone
- customer_email
- company_name
- city
- referral_type (product, custom)
- product_id (nullable FK products)
- product_name_snapshot
- custom_project_title
- custom_project_description
- proposed_quote_amount
- proposed_commission_type (fixed, percentage)
- proposed_commission_value
- approved_quote_amount (nullable until approved)
- approved_commission_type (nullable until approved)
- approved_commission_value (nullable until approved)
- currency
- deal_status
- commission_status
- assigned_to (nullable FK users)
- submitted_at
- approved_at
- created_at, updated_at
referral_payments
- id
- referral_id (FK referrals)
- amount_received
- currency
- received_at
- payment_reference
- verified_by (FK users)
- verified_at
- status (pending_verification, verified, refunded,
  reversed)
- created_at
commission_ledger
- id
- referral_id (FK referrals)
- partner_id (FK users)
- entry_type (earned, adjustment, reversal, payout)
- amount (signed decimal)
- currency
- basis_amount (nullable)
- commission_rate_or_fixed_value (nullable)
- reference_id (payment or payout reference)
- note
- created_by
- created_at
referral_payouts
- id
- partner_id (FK users)
- amount
- currency
- payment_method
- transaction_reference
- paid_at
- recorded_by
- note
- created_at
referral_activity
- id
- referral_id (FK referrals)
- actor_user_id
- action
- old_value / new_value (or structured JSON)
- note
- created_at
Use database transactions when approving a referral, recording a
verified payment, calculating commission, or recording a payout.
13. Core Business Rules
1. A referral belongs to exactly one partner.
2. Partners can never read or modify another partner's referrals.
3. A referral is not approved merely because it was submitted.
4. Proposed price and commission are not binding until admin approval.
5. Approved commercial terms require an audit trail for every change.
6. Commission is earned only under the written partner agreement's
   earning conditions.
7. Recommended earning condition: customer payment has been received
   and verified by the agency.
8. Commission is based on approved terms and qualifying receipts, not
   unverified promises.
9. Taxes, refunds, chargebacks, discounts, and pass-through costs must
   have an explicit commission treatment in the partner agreement.
10. Payouts cannot exceed earned, unpaid commission.
11. Duplicate referrals must be reviewed against existing
    customers/leads. Define attribution rules for existing customers and
    competing referrals before launch.
12. Admin actions and money-related changes must be auditable.
14. Security & Privacy
- Enforce role-based authorization on the server/API, not just by
  hiding dashboard buttons.
- Validate ownership for every partner referral read/write request.
- Hash passwords using a modern password hashing method if local
  authentication is used.
- Use secure sessions, CSRF protection where applicable, rate limits,
  and input validation.
- Sanitize user-provided text and validate uploaded files.
- Keep internal notes and payout details private.
- Log admin approvals, term changes, payment verification, and
  payouts.
- Back up the database and restrict production access.
- Collect only customer information needed to follow up on the
  referral; disclose the purpose and handle it under the site's
  privacy policy and applicable Indian data-protection requirements.
15. Notifications
Initial notifications: - Partner: referral submitted. - Admin: new
referral received. - Partner: approved, rejected, or changes
requested. - Partner: deal status updated (for partner-visible
statuses). - Partner: commission earned or adjusted. - Partner: payout
recorded.

Use email initially; WhatsApp notifications can be a later integration.
Never send internal notes or sensitive payout details in notifications.
16. Suggested Pages / Routes
Adapt names to the existing site's routing framework.
Partner
- /partner/login
- /partner/dashboard
- /partner/referrals
- /partner/referrals/new
- /partner/referrals/:id
- /partner/commissions
- /partner/profile
Admin
- /admin/referrals
- /admin/referrals/:id
- /admin/partners
- /admin/partners/:id
- /admin/commissions
- /admin/payouts
- /admin/products
- /admin/referral-settings
Protect every route and API endpoint by role and ownership.
17. MVP Scope & Build Phases
Phase 1 --- MVP
- Partner accounts (admin-created or invite-based)
- Partner dashboard
- Referral submission form
- Catalogue selection and Custom Project option
- Proposed quote and proposed commission
- Admin review and approval workflow
- Referral status tracking
- Basic partner/admin dashboards
- Activity log and duplicate warning
- Manual commission calculation and payout recording
Phase 2 --- Finance & Operations
- Verified customer payment records
- Automatic commission accrual from verified receipts
- Partial payment and partial payout support
- Refund/reversal adjustments
- Finance role and payout reports
- Email notifications and CSV export
Phase 3 --- Enhancements
- Partner application and onboarding
- Partner-specific commission agreements
- E-sign acceptance of partner terms
- WhatsApp notifications
- Customer proposal/quotation integration
- CRM integration and advanced analytics
- Optional referral links/codes if attribution automation is later
  desired
18. Acceptance Criteria
The MVP is ready when: - An admin can create/invite, suspend, and
reactivate partners. - A partner can sign in and submit a referral. -
The partner can select an existing product or enter a custom project. -
The partner can enter a proposed quote and fixed/percentage
commission. - The system clearly marks submitted terms as pending
approval. - An admin can approve, reject, or request changes. - The
admin can set final approved quote and commission without losing the
proposal history. - Partners can view only their own referrals and
permitted status/commission details. - Admins can update deal status and
see a full activity history. - The system can record verified payments
and calculate eligible commission according to the configured policy
(Phase 2 if not in MVP). - Admin/finance can record full or partial
payouts without exceeding earned unpaid commission. - Every
money-related action is auditable. - Duplicate referrals are flagged for
review. - Server-side permission tests prevent cross-partner data
access.
19. Decisions Required Before Development
Confirm these business decisions before implementation: 1. Who can
become a partner? Admin invitation only, or public application with
approval? 2. When is commission earned? On deal closure, on customer
advance, or only as customer payments are received? Recommended:
proportionally as verified payments are received. 3. What is the
commission base? Gross quote, discounted project value, amount
excluding GST, or net amount after refunds/pass-through costs? Define
this in the agreement. 4. Can partners negotiate freely?
Recommended: partners can propose terms, but only admin-approved terms
are valid. 5. Who owns an existing customer? Define rules for
existing customers, duplicate leads, and multiple partners referring the
same customer. 6. When are payouts made? On demand, at a minimum
threshold, or on a fixed payout cycle? 7. Can commission terms change
after approval? Recommended: only by admin, with a recorded reason and
partner-visible updated terms. 8. What happens if a customer cancels
or receives a refund? Define reversals and already-paid commission
treatment in the partner agreement.
20. Recommended Product Decision
Build this as a deal registration and commission tracking system.

Do not start with referral codes, automatic discounts, or a public fixed
commission table. Your core business model is relationship-based
referrals with negotiated project pricing. A partner-submitted deal plus
admin approval, an auditable commission ledger, and payment-based payout
rules will fit that model better and reduce disputes.

Before coding, inspect the existing website's framework, authentication,
user/role model, product catalogue, database, and admin dashboard.
Extend those foundations instead of building a disconnected second
system.