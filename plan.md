# NOXSOV Website — Initial Build Plan (Phase 1)

## Goal
Launch a credible, product-first marketing and discovery site for NOXSOV. No auth or payments yet — that comes in later phases.

## Brand Structure
- **NOXSOV** — parent brand
- Categories: **Security Solutions**, **Finance**, **IT Solutions**
- Products always tagged "[Product] by NOXSOV"

## Products at Launch

| Category | Product | Status |
|---|---|---|
| Security Solutions | Kryptik (formerly Rakshak) | Delivered |
| Finance | Tax Incubator | In progress |
| IT Solutions | NOXSOV Events (formerly HI Events) | Delivered |
| IT Solutions | ERP | Concept |
| IT Solutions | College & K–12 ERP | Concept |

## Pages

1. **Homepage**
   - NOXSOV brand intro / hero
   - Category overview: Security / Finance / IT Solutions
   - Featured products with real product screenshots
2. **Category pages (3)**
   - Security Solutions
   - Finance
   - IT Solutions
   - Each lists the products under it
3. **Product pages — live (2)**
   - Kryptik: features, screenshots, pricing, CTA
   - NOXSOV Events: features, screenshots, pricing, CTA
4. **Product pages — concept (3)**
   - Tax Incubator ("in progress" treatment)
   - ERP ("coming soon")
   - College & K–12 ERP ("coming soon")
5. **About / Company**
   - Who's building NOXSOV, mission
6. **Contact / Sales**
   - Form or email capture

## Design Direction
- Premium minimalist SaaS aesthetic
- Influences: Apple (typography, hierarchy), Zoho (multi-product ecosystem), Stripe (technical credibility), Linear (restrained motion) — original synthesis, not a copy
- Real product interfaces as primary visual content, not stock imagery
- Honest, implemented-only feature claims
- Clear funnel: discover → understand → pricing → subscribe/contact sales

## Tech Stack
- Next.js + TypeScript + Tailwind CSS
- shadcn/ui or custom components
- Lucide icons, Framer Motion for restrained animation
- Hosted on Vercel
- Static/CMS-driven content; no backend logic beyond the contact form

## Deliverable
A polished, product-first site establishing NOXSOV as the Sovereign Software Platform & Enterprise Store — featuring instant cryptographic licensing, real backend APIs, persistent cart and checkout, and license verification.

---

## Later Phases (not in scope for v1)

**Phase 2 — Central Account System**
- One NOXSOV account (signup/login) shared across products
- Account dashboard: subscriptions, profile, billing history
- Auth via Supabase Auth

**Phase 3 — Unified Billing**
- Razorpay integration at the NOXSOV level
- Entitlement API for per-product access checks
- Webhooks to provision/revoke access on payment events

**Phase 4 — Product Integration**
- Retrofit Kryptik and NOXSOV Events to authenticate against the central account and check entitlements centrally