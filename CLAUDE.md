# Green Mountain Tableworx — CLAUDE.md

> **Project Reference Document** — Read this file at the start of every Claude Code session.

---

## Project Overview

**Client:** Green Mountain Tableworx (GMT)
**Type:** Premium marketing website with SEO-first architecture and interactive online estimator
**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Vercel Pro
**Agency:** Inbound NH (white-label)

GMT specializes in custom live edge furniture — dining tables, river tables, ocean tables, conference tables, coffee tables, benches, console tables, countertops, bar tops, floating shelves, and wall art. They operate two New England showrooms and offer in-room delivery across New England.

---

## Business Information

### Showrooms
| Location | Address | Phone |
|---|---|---|
| Smithfield, RI | 2 Esmond St, Smithfield, RI 02917 | (401) 354-9600 |
| Concord, NH | 84 N Main St, Concord, NH 03301 | (603) 565-5483 |

### Service Area
In-room delivery available anywhere in New England.

### Business Model
- Primary revenue: Custom orders (most orders)
- Secondary: Showroom inventory (browseable in-person + online for inspiration)
- Bread & butter categories: Live Edge Tables, River Tables, Ocean Tables
- Note: Most product types can be configured as live edge, river, or ocean style

### Starting Price Points
| Product | Starting Price |
|---|---|
| Dining Tables | $1,500 |
| Conference Tables | $2,500 |
| Coffee Tables | $500 |
| Benches | $500 |
| Console Tables | $750 |
| Countertops & Island Tops | Inquire Within |
| Standalone Bars & Bar Tops | Inquire Within |
| Floating Shelves & Mantels | Inquire Within |
| Wall Art & Signage | Inquire Within |

---

## Design System

### Brand Identity
- **Primary Color:** #009440 (GMT Green)
- **Palette Philosophy:** Green-forward; light sections use near-white greens; dark sections use near-black greens
- **Feel:** High-end furniture — think RH (Restoration Hardware) meets Vermont craft studio

### Color Tokens (Tailwind Config)
```js
colors: {
  'gmt-green':       '#009440',  // primary brand
  'gmt-green-light': '#009440',  // base
  'gmt-cream':       '#F7F5F0',  // near-white warm sections
  'gmt-offwhite':    '#FAFAF7',  // page backgrounds
  'gmt-mist':        '#EFF5EC',  // very light green tint
  'gmt-sage':        '#C8DFC0',  // mid-light green
  'gmt-forest':      '#1A3D21',  // near-black dark sections
  'gmt-charcoal':    '#111714',  // deepest dark
  'gmt-stone':       '#6B7066',  // muted text / captions
}
```

### Typography
**Adobe Fonts Kit:** `https://use.typekit.net/hvg4oyp.css`

| Role | Font | Style |
|---|---|---|
| Display / H1–H2 | IvyPresto Display | Serif, elegant |
| Body / Paragraphs | Alwyn New Rounded | Clean, warm |
| Subtitles / Labels | Alwyn New Rounded | ALL CAPS + letter-spacing: 0.12em |

### Container Width
Consistent max-width container across all pages:
```css
.container {
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 24px; /* 48px on md+, 96px on xl+ */
}
```

### Spacing Scale
Use 8px base unit. Primary section padding: `py-24 md:py-32`.

---

## Site Architecture

### Navigation Structure
```
Website
├── Home
├── Live Edge Tables
├── River & Ocean Tables
│   ├── River Tables
│   └── Ocean Tables
├── All Furniture Types
│   ├── Dining Tables
│   ├── Conference Tables
│   ├── Coffee Tables
│   ├── Benches
│   ├── Console Tables
│   ├── Countertops & Island Tops
│   ├── Standalone Bars & Bar Tops
│   ├── Floating Shelves & Mantels
│   └── Wall Art & Signage
├── Table Bases
├── Locations
│   ├── Concord, NH
│   └── Smithfield, RI
└── Instant Online Estimate [CTA — distinct style]
```

### Page List
| Route | Page |
|---|---|
| `/` | Homepage |
| `/live-edge-tables` | Live Edge Tables (category) |
| `/river-tables` | River Tables |
| `/ocean-tables` | Ocean Tables |
| `/dining-tables` | Dining Tables |
| `/conference-tables` | Conference Tables |
| `/coffee-tables` | Coffee Tables |
| `/benches` | Benches |
| `/console-tables` | Console Tables |
| `/countertops-island-tops` | Countertops & Island Tops |
| `/bars-bar-tops` | Standalone Bars & Bar Tops |
| `/floating-shelves-mantels` | Floating Shelves & Mantels |
| `/wall-art-signage` | Wall Art & Signage |
| `/table-bases` | Table Bases |
| `/locations` | Locations (overview) |
| `/locations/concord-nh` | Concord, NH Showroom |
| `/locations/smithfield-ri` | Smithfield, RI Showroom |
| `/estimate` | Instant Online Estimate |
| `/showroom-inventory` | Showroom Inventory (optional future) |

---

## Instant Online Estimate Form

The estimator lives at `/estimate` and is a multi-step wizard using thumbnail-based image selectors for all options except dimensions.

### Form Fields

#### Step 1 — Wood & Dimensions
- **Wood Species** — thumbnail grid (client will supply photos)
- **Length** (inches) — number input
- **Width** (inches) — number input

#### Step 2 — Shape & Style
- **Table Shape** — thumbnail grid
  - Rectangle
  - Circle
  - Oval
  - Boat (conference-style)

#### Step 3 — Epoxy & Finish
- **Epoxy Color** — thumbnail grid (or "None")
- **Background Color** — thumbnail grid
- **Surface Finish** — thumbnail grid
  - Full Gloss
  - Full Matte
  - Matte Wood w/ Glossy Resin

#### Step 4 — Edge & Details
- **Table Edge Style** — thumbnail grid
  - Live Edge
  - Straight Edge
  - Bevel Edge
  - C-Shaped Edge
  - Lake Shaped Edge
  - Chiseled Edge
- **Engraving** — Yes / No toggle (thumbnail)

#### Step 5 — Table Base
- **Table Base** — thumbnail grid (client will supply product photos)

#### Step 6 — Contact & Submit
- Name, Email, Phone
- Preferred Location (Concord NH / Smithfield RI / Remote)
- Additional Notes (textarea)
- Submit → sends to contact@inboundnh.com (or client email TBD)

### Estimator Architecture Notes
- Client will supply pricing calculation logic in a later session
- Placeholder "Your estimate will be in touch shortly" flow until logic is confirmed
- Thumbnail selections stored in React state (no DB needed for MVP)
- Form submissions via `react-hook-form` + Resend (or Formspree as fallback)
- All thumbnail images loaded from `/public/estimate/[category]/` folders
- Images: client to supply; use placeholder color blocks with labels during build

---

## SEO Strategy

### Core Priorities
1. Indexable by Google from day 1 (no client-side rendering blocking crawlers)
2. Static generation for all category pages (next.js `generateStaticParams`)
3. Unique, keyword-rich `<title>` and `<meta description>` per page
4. Structured data (JSON-LD) on all product/location pages
5. Canonical URLs on all pages
6. Sitemap via `next-sitemap`
7. `robots.txt` allowing full crawl

### Target Keywords (Primary)
- live edge dining tables New Hampshire
- river table custom New England
- ocean table Rhode Island
- custom wood furniture Concord NH
- epoxy table Smithfield RI
- conference table live edge

### JSON-LD Types
| Page | Schema Type |
|---|---|
| Homepage | `LocalBusiness`, `WebSite` |
| Category pages | `Product`, `ItemList` |
| Location pages | `LocalBusiness` with full address |
| Estimate page | `Service` |

### Meta Structure (per page)
```tsx
// Example for Dining Tables
title: "Custom Live Edge Dining Tables | Green Mountain Tableworx"
description: "Handcrafted live edge, river & ocean dining tables starting at $1,500. Custom orders for New England homes. Two showrooms: Concord NH & Smithfield RI."
```

---

## Component Architecture

### Global
- `<Header>` — sticky, transparent-on-hero, solid on scroll
- `<Footer>` — dark forest green, two columns: nav + contact info
- `<CTABanner>` — reusable "Get an Instant Estimate" strip

### Shared UI
- `<ProductCard>` — image, title, "Starting at $X" badge, CTA
- `<ThumbnailSelector>` — image grid single/multi select (used in estimator)
- `<SectionLabel>` — ALL CAPS Alwyn subtitle with green accent line
- `<PriceTag>` — "Starting at $1,500" badge component
- `<LocationCard>` — showroom info card with map embed
- `<TestimonialCard>` — quote + customer name + piece ordered

### Page Templates
- `HomepageTemplate` — unique, bespoke layout
- `CategoryPageTemplate` — shared by all furniture type pages
- `LocationPageTemplate` — shared by showroom pages
- `EstimateWizardTemplate` — multi-step form

---

## Folder Structure

```
/app
  layout.tsx              # Root layout — loads Adobe Fonts, global CSS
  page.tsx                # Homepage
  /live-edge-tables
    page.tsx
  /river-tables
    page.tsx
  /ocean-tables
    page.tsx
  /dining-tables
    page.tsx
  /[...all other categories]
  /table-bases
    page.tsx
  /locations
    page.tsx
    /concord-nh
      page.tsx
    /smithfield-ri
      page.tsx
  /estimate
    page.tsx
    EstimateWizard.tsx   # Client component

/components
  /layout
    Header.tsx
    Footer.tsx
    Container.tsx
  /ui
    ProductCard.tsx
    ThumbnailSelector.tsx
    SectionLabel.tsx
    PriceTag.tsx
    LocationCard.tsx
    TestimonialCard.tsx
    CTABanner.tsx
  /estimate
    WizardStep.tsx
    ThumbnailGrid.tsx
    DimensionInput.tsx
    ContactForm.tsx

/lib
  seo.ts                 # generateMetadata helpers
  estimateSchema.ts      # Form field definitions
  products.ts            # Category data (prices, descriptions)
  locations.ts           # Showroom data

/public
  /images
    /hero
    /live-edge
    /river
    /ocean
    /furniture-types
    /table-bases
    /showrooms
  /estimate
    /wood-species
    /shapes
    /epoxy-colors
    /edge-styles
    /finishes
    /bases

/styles
  globals.css            # Tailwind base, custom utilities

tailwind.config.ts
next.config.ts
next-sitemap.config.js
```

---

## Environment Variables

```env
NEXT_PUBLIC_SITE_URL=https://greenmountaintableworx.com
RESEND_API_KEY=                    # Email submissions
NEXT_PUBLIC_GA_ID=                 # Google Analytics (when provided)
```

---

## Vercel Configuration

- Project: hosted under agency Vercel Pro account
- Framework: Next.js (auto-detected)
- Build command: `next build`
- Output dir: (auto)
- Custom domain: TBD — client to provide

---

## External Dependencies

```json
{
  "next": "14.x",
  "react": "18.x",
  "typescript": "5.x",
  "tailwindcss": "3.x",
  "react-hook-form": "^7",
  "resend": "latest",
  "next-sitemap": "^4",
  "clsx": "latest",
  "tailwind-merge": "latest"
}
```

---

## Session Log

| Session | Goal | Status |
|---|---|---|
| 1 | Scaffold Next.js 14, Tailwind, folder structure, Vercel config | Pending |
| 2 | Global components: Header, Footer, Container, design tokens | Pending |
| 3 | Homepage build | Pending |
| 4 | Category page template + 3 core pages | Pending |
| 5 | All remaining category pages | Pending |
| 6 | Location pages | Pending |
| 7 | Estimate wizard (UI, all steps, thumbnail system) | Pending |
| 8 | Estimate pricing logic (pending client calculations) | Pending |
| 9 | SEO pass: JSON-LD, meta, sitemap | Pending |
| 10 | Performance, image optimization, final QA | Pending |

---

## Open Questions / Decisions Pending

- [ ] Client email for form submissions (using contact@inboundnh.com for now)
- [ ] Final domain name confirmed?
- [ ] Blog / content marketing — in scope?
- [ ] Showroom inventory section — in scope for V1?
- [ ] CTA priority for hero: Estimate vs Browse vs Gallery
- [ ] Photography: what's available at build time?
- [ ] Pricing calculation formula for estimator (client to supply)
- [ ] Table base options — how many? Client to supply names + photos
- [ ] Wood species list — client to confirm
- [ ] Testimonials — client to supply quotes

---

*Last updated: Session 0 (Pre-Plan)*