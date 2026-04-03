# Session 3 — Homepage

## Goal
Build the complete homepage. All sections, all components, all animations. Placeholder images and copy where client assets aren't ready yet.

## Read First
Before writing any code, read:
- CLAUDE.md
- HOMEPAGE_FLOW.md
- .claude/context/brand.md
- .claude/context/services.md
- .claude/rules/02-styling.md
- .claude/rules/03-layout.md
- .claude/rules/05-animations.md

---

## Page File
`/app/page.tsx` — Server Component. Import and compose all sections in order.

```tsx
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandStatement />
      <ThreePillars />
      <AllFurnitureTypes />
      <HowItWorks />
      <GallerySection />
      <TableBasesCallout />
      <Testimonials />
      <ShowroomsStrip />
      <CTABanner />
    </>
  )
}
```

Each section is its own component in `/components/sections/home/`.

---

## Section 1 — Hero

**File:** `/components/sections/home/HeroSection.tsx` — `'use client'` (contains HeroVideo)

**Layout:**
- `relative h-[60vh] md:h-screen min-h-[500px] overflow-hidden`
- Video layer: `<HeroVideo />` — `absolute inset-0 w-full h-full object-cover`
- Overlay: `absolute inset-0 bg-gmt-charcoal/55`
- Content: `relative z-10 flex flex-col items-center justify-center h-full text-center px-6`

**Content (top to bottom):**
- `<SectionLabel>` in `gmt-sage` — "Green Mountain Tableworx"
- H1 — client has already set this — leave a `{/* Client H1 */}` placeholder comment and use "Handcrafted Live Edge & Epoxy Tables" as temporary text. IvyPresto display, text-4xl md:text-6xl lg:text-7xl, white, leading-tight
- Subtext — Alwyn body, text-lg md:text-xl, white/80, max-w-xl mx-auto — "Custom live edge, river & ocean tables. Handcrafted in New England."
- Two CTA buttons side by side (stack on mobile):
  - Primary: "Get an Instant Estimate" → `/estimate` — `bg-gmt-green text-white`
  - Secondary: "Visit a Showroom" → `/locations` — `border border-white/60 text-white hover:border-white`
- Location pill — `mt-8 text-sm text-white/50 tracking-widest` — "CONCORD, NH  ·  SMITHFIELD, RI"

**Animations:** `<FadeUp>` staggered — label 0.1s, H1 0.25s, subtext 0.4s, buttons 0.55s, pill 0.65s

---

## Section 2 — Brand Statement

**File:** `/components/sections/home/BrandStatement.tsx`

**Layout:**
- Background: `gmt-offwhite`
- `py-24 md:py-32`
- `Container` — centered, max-w-3xl mx-auto text-center

**Content:**
- Small GMT green rule above: `w-12 h-px bg-gmt-green mx-auto mb-8`
- Pull quote in IvyPresto italic, text-2xl md:text-3xl, `gmt-forest`, leading-relaxed:
  "Every piece begins with a single slab of wood — its grain, its history, its character. We build around that."
- No CTA. No products. Brand voice only.

**Animation:** `<RevealOnScroll>` on the rule + quote

---

## Section 3 — Three Pillars

**File:** `/components/sections/home/ThreePillars.tsx`

**Layout:**
- Background: `gmt-forest`
- `py-24 md:py-32`
- `Container`
- `<SectionLabel>` in `gmt-sage` — "Our Signature Styles"
- 3-column grid: `grid grid-cols-1 md:grid-cols-3 gap-6 mt-12`

**Each card:**
- `relative overflow-hidden rounded-sm aspect-[4/5]` — tall portrait ratio
- Full-bleed placeholder image (use `/public/images/placeholder.jpg`)
- Dark overlay: `absolute inset-0 bg-gradient-to-t from-gmt-charcoal/90 via-transparent to-transparent`
- Content anchored to bottom: `absolute bottom-0 left-0 right-0 p-8`
- Category name: IvyPresto, text-2xl, white
- One-line description: Alwyn, text-sm, white/70, mt-2
- Arrow link: "Explore →" in `gmt-green`, text-sm, mt-4
- Hover: `group-hover:scale-105` on the image (duration-700), slight overlay darkening

**Cards:**
1. Live Edge Tables → `/live-edge-tables` — "Raw, organic edges. Every slab is one of a kind."
2. River Tables → `/river-tables` — "Epoxy rivers of color flowing through solid wood."
3. Ocean Tables → `/ocean-tables` — "Coastal-inspired waves captured in resin and grain."

**Animation:** `<RevealOnScroll>` staggered on each card — 0s, 0.1s, 0.2s

---

## Section 4 — All Furniture Types

**File:** `/components/sections/home/AllFurnitureTypes.tsx`

**Layout:**
- Background: `gmt-mist`
- `py-24 md:py-32`
- `Container`
- `<SectionLabel>` — "What We Make"
- H2 IvyPresto — "A Custom Piece for Every Room"
- Grid: `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12` — but only 9 items so last row has one card offset on large screens (use `lg:col-start-2` on the 9th item or just left-align)

**Each product card (`<ProductCard>`):**
- Placeholder image
- Category name: Alwyn, font-medium, `gmt-forest`
- `<PriceTag>` — "Starting at $X" or "Inquire Within"
- Arrow on hover
- Links to category page

**Import product data from `/lib/products.ts` — never hardcode**

**Animation:** `<RevealOnScroll>` staggered, delay capped at 0.3s (see 05-animations.md)

---

## Section 5 — How It Works

**File:** `/components/sections/home/HowItWorks.tsx`

**Layout:**
- Background: `gmt-cream`
- `py-24 md:py-32`
- `Container`
- `<SectionLabel>` — "The Process"
- H2 IvyPresto — "How a Custom Piece Comes to Life"
- 4-column grid on desktop, stacked on mobile: `grid grid-cols-1 md:grid-cols-4 gap-8 mt-16`

**Each step:**
- Step number: `text-5xl font-display text-gmt-green/20 mb-4` (large, faded)
- Step title: Alwyn font-medium, `gmt-forest`, text-lg
- Description: Alwyn, `gmt-stone`, text-sm, leading-relaxed, mt-2

**Steps:**
1. **Estimate** — "Start online in minutes. Spec your wood, dimensions, epoxy, edge, and base."
2. **Consult** — "We refine your vision together — in our showroom or remotely."
3. **Craft** — "Your piece is handbuilt by our artisans in New England."
4. **Deliver** — "In-room delivery anywhere in New England. We bring it to you."

Inline CTA after steps: centered text — "Ready to start?" + "Get an Instant Estimate →" link in `gmt-green`

**Animation:** `<RevealOnScroll>` staggered on each step

---

## Section 6 — Gallery

**File:** `/components/sections/home/GallerySection.tsx`

**Layout:**
- Background: `gmt-charcoal`
- `py-24 md:py-32`
- `Container`
- `<SectionLabel>` in `gmt-sage` — "Recent Work"
- H2 IvyPresto, white — "Pieces We're Proud Of"
- Masonry-style grid: `columns-2 md:columns-3 gap-4 mt-12`
- 6 placeholder images of varying heights (use `next/image` with different aspect ratios to simulate masonry)
- Each image: `break-inside-avoid mb-4 overflow-hidden rounded-sm`
- Hover: subtle dark overlay + "View" label fades in

**Note:** Placeholder images only — client to supply product shots. Add `{/* TODO: Replace with client gallery photos */}` comment above the image array.

**Animation:** `<RevealOnScroll>` on the grid as a whole

---

## Section 7 — Table Bases Callout

**File:** `/components/sections/home/TableBasesCallout.tsx`

**Layout:**
- Background: `gmt-mist`
- `py-20`
- `Container`
- Two-column: text left, thumbnails right — `grid grid-cols-1 md:grid-cols-2 gap-12 items-center`

**Left:**
- `<SectionLabel>` — "Complete the Piece"
- H2 IvyPresto — "The Right Base Makes All the Difference"
- Body copy: "From sleek steel hairpins to solid wood trestles — every base is matched to the slab above it."
- CTA link: "Explore Table Bases →" in `gmt-green`

**Right:**
- 3–4 placeholder base thumbnails in a small grid
- `grid grid-cols-2 gap-3`
- Each: square aspect ratio, placeholder image, base name caption below in `gmt-stone text-xs`

**Animation:** `<RevealOnScroll direction="left">` on text, `<RevealOnScroll direction="right">` on thumbnails

---

## Section 8 — Testimonials

**File:** `/components/sections/home/Testimonials.tsx`

**Layout:**
- Background: `gmt-offwhite`
- `py-24 md:py-32`
- `Container`
- `<SectionLabel>` — "What Our Customers Say"
- 3-column grid: `grid grid-cols-1 md:grid-cols-3 gap-8 mt-12`

**Each `<TestimonialCard>`:**
- GMT green opening quote mark — large, decorative, IvyPresto `"`
- Quote text: Alwyn italic, `gmt-forest`, text-base, leading-relaxed
- Customer name: Alwyn font-medium, `gmt-forest`, text-sm, mt-4
- Piece ordered: `gmt-stone`, text-xs, tracking-wide uppercase

**Placeholder quotes:**
1. "We couldn't be happier with our dining table. The craftsmanship is incredible — it's the centerpiece of our entire home." — Sarah M. · Black Walnut River Dining Table
2. "The team was fantastic to work with. They took our vision and made it even better than we imagined." — James R. · Live Edge Conference Table
3. "Worth every penny. We've had it for two years and it still stops every single guest in their tracks." — Alicia T. · Ocean Coffee Table

**Note:** `{/* TODO: Replace with client-supplied testimonials */}`

**Animation:** `<RevealOnScroll>` staggered on each card

---

## Section 9 — Showrooms Strip

**File:** `/components/sections/home/ShowroomsStrip.tsx`

**Layout:**
- Background: `gmt-green`
- `py-16`
- `Container`
- Two-column: `grid grid-cols-1 md:grid-cols-2 gap-8`
- Centered label above: `<SectionLabel>` in white/70 — "Visit Us In Person"

**Each location card:**
- Location name: IvyPresto, white, text-xl
- Address + phone: Alwyn, white/80, text-sm, mt-2 — **imported from `/lib/locations.ts`**
- "Get Directions →" link — white, underline offset, links to Google Maps URL

**Below grid:**
- Centered note: Alwyn, white/70, text-sm — "In-room delivery available anywhere in New England"

**Animation:** `<RevealOnScroll direction="left">` on Concord card, `<RevealOnScroll direction="right">` on Smithfield card

---

## Section 10 — CTA Banner

Use the shared `<CTABanner>` component:
```tsx
<CTABanner
  headline="Start Your Custom Piece Today"
  body="Use our online estimator to spec your table — wood species, dimensions, epoxy color, edge style, and base. We'll be in touch within 24 hours."
  cta="Get an Instant Estimate"
  href="/estimate"
/>
```

CTABanner background: `gmt-forest`. Build this component if it doesn't exist yet:
- `py-24 md:py-32`
- `Container` — centered, max-w-2xl
- H2 IvyPresto, white
- Body Alwyn, white/70, mt-4
- CTA button `bg-gmt-green` — mt-8

---

## Deliverables
- [ ] All 10 sections render in correct order
- [ ] Hero video autoplays on desktop and mobile (test on real device)
- [ ] FadeUp animations fire on hero elements
- [ ] All RevealOnScroll animations fire once on scroll
- [ ] Product cards import data from `/lib/products.ts`
- [ ] Showroom data imported from `/lib/locations.ts`
- [ ] No hardcoded prices or addresses
- [ ] All placeholder images use `next/image`
- [ ] No TypeScript errors
- [ ] No console errors
- [ ] Looks correct at 375px mobile and 1440px desktop