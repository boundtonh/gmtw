# Session 2 — Global Components

## Goal
Build Header, Footer, and verify Container + design tokens from Session 1. These components appear on every page — get them right before any page work begins.

## Read First
Before writing any code, read:
- CLAUDE.md
- .claude/context/brand.md
- .claude/rules/02-styling.md
- .claude/rules/03-layout.md
- .claude/rules/04-components.md
- .claude/rules/05-animations.md

---

## Task 1 — Header

### Behavior
- Fixed at top, full width
- Transparent when overlapping the hero video (homepage)
- Solid `gmt-charcoal` background on scroll (threshold: 80px)
- Solid `gmt-charcoal` background on all non-homepage pages (no hero video)
- Smooth `transition-colors duration-300` between states
- `'use client'` — needs scroll detection via `useEffect` + `useScrollPosition`

### Logo
- No SVG yet — render "Green Mountain Tableworx" in Alwyn, white, font-size sm, tracking-widest, uppercase
- Leave a clearly marked `{/* TODO: Replace with <Image> SVG logo */}` comment
- Logo links to `/`

### Desktop Nav (768px+)
```
[Logo]                    [Live Edge Tables] [River & Ocean ▾] [All Furniture ▾] [Table Bases] [Locations ▾] [Get an Estimate →]
```

- Nav links: Alwyn, white, text-sm, tracking-wide, `hover:text-gmt-green transition-colors duration-200`
- "Get an Estimate →" is a distinct CTA button — `bg-gmt-green text-white px-5 py-2 rounded-sm hover:bg-gmt-forest transition-colors duration-300`
- Dropdowns open on **hover** — see dropdown spec below

### Dropdown Spec (desktop)
Three nav items have dropdowns:
- **River & Ocean Tables** → River Tables, Ocean Tables
- **All Furniture Types** → Dining Tables, Conference Tables, Coffee Tables, Benches, Console Tables, Countertops & Island Tops, Standalone Bars & Bar Tops, Floating Shelves & Mantels, Wall Art & Signage
- **Locations** → Concord, NH · Smithfield, RI

Dropdown behavior:
- Opens on `onMouseEnter`, closes on `onMouseLeave` (with 150ms delay to prevent flicker)
- Background: `gmt-charcoal` with subtle border-top `gmt-green` 2px
- Padding: `py-4 px-6`
- Items: Alwyn, white, text-sm, `hover:text-gmt-green`, stacked vertically with `gap-3`
- Framer Motion: `initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}` — duration 200ms
- "All Furniture Types" dropdown is wide — consider 2-column grid layout for the 9 items

### Mobile Nav (below 768px)
- Hamburger icon (right side of header) — use a simple 3-line SVG, no external icon library
- Tapping hamburger opens **fullscreen overlay**
- Overlay: `fixed inset-0 z-50 bg-gmt-charcoal flex flex-col`
- Framer Motion: `initial={{ opacity: 0 }} animate={{ opacity: 1 }}` — duration 300ms
- Close button (×) top-right corner
- Nav items stacked vertically, centered, large text — IvyPresto display font, text-3xl
- Dropdowns become accordion-style expanders (tap to expand/collapse sub-items)
- "Get an Estimate →" at bottom of overlay — full width green button
- Body scroll locked when overlay is open (`overflow-hidden` on `<body>`)

### Scroll Detection Hook
```tsx
// /lib/hooks/useScrolled.ts
'use client'
import { useState, useEffect } from 'react'

export function useScrolled(threshold = 80) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [threshold])
  return scrolled
}
```

### Header transparency logic
- Homepage (`/`): transparent until scrolled, then solid
- All other pages: always solid
- Detect homepage via `usePathname()` from `next/navigation`

---

## Task 2 — Footer

### Layout
- Background: `gmt-forest`
- Full width, `py-16 md:py-20`
- Inner: `Container` component
- Two-column grid on desktop (`grid-cols-2 md:grid-cols-4 gap-12`)

### Columns
**Col 1 — Brand**
- Logo placeholder (same as header — "Green Mountain Tableworx" text)
- Tagline placeholder: "Handcrafted in New England."
- GMT Green small rule beneath

**Col 2 — Navigation**
- Label: `<SectionLabel>Explore</SectionLabel>`
- Links: Home, Live Edge Tables, River Tables, Ocean Tables, All Furniture Types, Table Bases, Locations, Get an Estimate

**Col 3 — Products**
- Label: `<SectionLabel>Products</SectionLabel>`
- Links: Dining Tables, Conference Tables, Coffee Tables, Benches, Console Tables, Countertops, Bars & Bar Tops, Shelves & Mantels, Wall Art

**Col 4 — Visit Us**
- Label: `<SectionLabel>Showrooms</SectionLabel>`
- Concord, NH — address + phone (imported from `/lib/locations.ts`)
- Smithfield, RI — address + phone (imported from `/lib/locations.ts`)
- "In-room delivery across New England"

### Bottom Strip
- Border-top: `border-gmt-sage/20`
- `py-6`
- Left: © 2025 Green Mountain Tableworx. All rights reserved.
- Right: "Website by Inbound NH" (plain text, no link needed)
- Text: `text-gmt-stone text-xs`

### Mobile
- All 4 columns stack vertically
- Generous gap between each (`gap-10`)

---

## Task 3 — Verify Container

Confirm `/components/layout/Container.tsx` matches this exactly:
```tsx
import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full max-w-[1320px] px-6 md:px-12 xl:px-24', className)}>
      {children}
    </div>
  )
}
```

---

## Task 4 — Root Layout Wiring

Confirm `app/layout.tsx`:
- Adobe Fonts `<link rel="stylesheet" href="https://use.typekit.net/hvg4oyp.css">` in `<head>`
- `<Header />` above `{children}`
- `<Footer />` below `{children}`
- `<main id="main-content">` wrapping `{children}`
- Skip-to-content link as first element in body (see 08-accessibility.md)

---

## Deliverables
- [ ] Header renders correctly on desktop and mobile
- [ ] Transparent/solid scroll behavior works on homepage
- [ ] Always solid on all other pages
- [ ] All three dropdowns open on hover desktop
- [ ] Fullscreen overlay works on mobile with accordion sub-items
- [ ] Footer renders with all four columns
- [ ] Footer location data imported from `/lib/locations.ts` — not hardcoded
- [ ] Container verified
- [ ] Root layout wired correctly
- [ ] `npm run dev` — no TypeScript errors, no console errors