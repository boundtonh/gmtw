# Category Page Template — Green Mountain Tableworx

## Applied To
All furniture-type pages: Live Edge Tables, River Tables, Ocean Tables, Dining Tables, Conference Tables, Coffee Tables, Benches, Console Tables, Countertops & Island Tops, Standalone Bars & Bar Tops, Floating Shelves & Mantels, Wall Art & Signage

---

## Page Flow (Shared Template)

### 1. Page Hero (Shorter than Homepage)
- **60–70vh** — not full viewport, establishes context quickly
- Full-bleed category photo
- Breadcrumb: Home → [Category Name]
- Page title (IvyPresto): e.g. "Custom Dining Tables"
- Starting price (if applicable): "Starting at $1,500"
- Primary CTA: "Get an Estimate" → `/estimate`

---

### 2. Category Introduction
**2-column layout** (text left, supporting image right) OR centered editorial block for smaller categories

- 2–3 paragraphs of SEO-rich copy (unique per page)
- Covers: what makes this piece special, materials used, customization options, typical use cases
- Keyword-rich but reads naturally — written for humans first
- Example for Dining Tables: talks about live edge slabs, epoxy options, base pairings, family heirloom quality

---

### 3. Style Selector — "Any Style, Your Vision"
*(Relevant for Dining, Conference, Coffee, Console, Bench)*

3 cards showing this furniture type across the three core styles:
- **Live Edge** — organic, raw wood edge
- **River Table** — epoxy river through center
- **Ocean Table** — ocean/coastal epoxy design

Each card: photo + short descriptor + → "Learn more about [style]"

This section reinforces that most furniture types can be any of the three styles.

---

### 4. Gallery / Inspiration Grid
6–9 photos of this category in real customer spaces
- Masonry or even grid
- Hover: slight overlay + "View Full Size" icon
- Caption: wood species + style (e.g. "Black Walnut River Table, 96" × 42"")

---

### 5. Customization Options Overview
**Icon-list or thumbnail-grid style** — visual, scannable

What can be customized on this piece:
- Wood Species
- Table Shape (if applicable)
- Dimensions
- Epoxy Color & Style
- Edge Style
- Surface Finish
- Table Base (if applicable)
- Engraving

→ "Spec yours with our Estimator" CTA embedded in this section

---

### 6. Starting Price Callout
**Accent block** (GMT Green or Forest)

"[Category Name] start at **$X,XXX**" (or "Inquire Within")
- 1-sentence note: "Final price depends on dimensions, wood species, and customization."
- CTA: "Get a Custom Estimate"

*(Skip price callout for Countertops, Bars, Shelves, Wall Art — use "Inquire Within" instead)*

---

### 7. Related Categories
3 sibling product cards
Example on Dining Tables: → Conference Tables, Coffee Tables, Benches

---

### 8. Estimate CTA Strip
Reusable `<CTABanner>` component
"Ready to Start? Get an Instant Online Estimate →"

---

## SEO Notes Per Page

Each category page needs:
- Unique `<title>` targeting local + product keywords
- Unique `<meta description>` ~155 chars
- H1 = page title (IvyPresto, on-page)
- H2s = section titles
- Alt text on all images: "Custom live edge dining table, black walnut, 84 inches, Concord NH"
- JSON-LD Product schema with name, description, offers (starting price)
- Internal links to: /estimate, /table-bases, 2–3 related pages

---

## Individual Page Notes

### Live Edge Tables `/live-edge-tables`
- This is a hub page — links out to dining, conference, coffee, etc. all as live edge
- Hero: dramatic close-up of a live edge grain
- Unique angle: the slab IS the design — raw, organic, one-of-a-kind

### River Tables `/river-tables`
- Focus on the epoxy river effect — colors, translucency, depth
- Gallery should show range of epoxy colors
- Note the "ocean table" as a related style

### Ocean Tables `/ocean-tables`
- Coastal, flowing aesthetic — differentiate from river tables
- Lighter, more airy tone in copy and imagery direction
- Note the "river table" as a related style

### Dining Tables `/dining-tables`
- Highest search volume page — most SEO investment
- Cover: live edge dining tables NH, river dining table RI, custom dining table New England
- Starting at $1,500

### Conference Tables `/conference-tables`
- B2B angle — mention offices, boardrooms, meeting rooms
- Larger dimensions, more formal edge styles
- Starting at $2,500 — highest stated starting price

### Coffee Tables `/coffee-tables`
- Entry-level price point — $500 starting, accessibility angle
- Great for "first custom piece" framing

### Benches `/benches`
- Versatile — dining bench, entryway, bedroom, mudroom
- Starting at $500

### Console Tables `/console-tables`
- Entryway, hallway, behind-sofa use cases
- Starting at $750

### Countertops & Island Tops `/countertops-island-tops`
- Kitchen integration angle — wood + epoxy countertops
- "Inquire Within" — complex pricing based on dimensions
- Strong SEO opportunity for local searches

### Standalone Bars & Bar Tops `/bars-bar-tops`
- Home bar, man cave, entertaining spaces
- "Inquire Within"

### Floating Shelves & Mantels `/floating-shelves-mantels`
- Fireplace mantels + floating shelf systems
- "Inquire Within"

### Wall Art & Signage `/wall-art-signage`
- Wood art, branded signage, personalized pieces
- "Inquire Within"