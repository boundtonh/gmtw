# 04 — Component Rules

## Server vs Client Components
- Default to Server Components — no `'use client'` unless required
- Mark `'use client'` when using: `useState`, `useEffect`, `useRef`, event handlers, Framer Motion, browser APIs
- Never use `useState` in a Server Component — Next.js will throw

## Global Layout Components
| Component | Location | Notes |
|---|---|---|
| `Header` | `/components/layout/Header.tsx` | Client — needs scroll detection |
| `Footer` | `/components/layout/Footer.tsx` | Server |
| `Container` | `/components/layout/Container.tsx` | Server — max-w-[1320px] wrapper |
| `HeroVideo` | `/components/layout/HeroVideo.tsx` | Client — autoplay requires useEffect |

## Shared UI Components
| Component | Location | Notes |
|---|---|---|
| `ProductCard` | `/components/ui/ProductCard.tsx` | Image + title + price badge + CTA |
| `ThumbnailSelector` | `/components/ui/ThumbnailSelector.tsx` | Single select image grid |
| `SectionLabel` | `/components/ui/SectionLabel.tsx` | ALL CAPS Alwyn label — always use this, never raw text |
| `PriceTag` | `/components/ui/PriceTag.tsx` | "Starting at $X" or "Inquire Within" |
| `LocationCard` | `/components/ui/LocationCard.tsx` | Address + phone + directions link |
| `TestimonialCard` | `/components/ui/TestimonialCard.tsx` | Quote + customer name + piece |
| `CTABanner` | `/components/ui/CTABanner.tsx` | Reusable estimate CTA strip |

## Estimate Form Components
| Component | Location | Notes |
|---|---|---|
| `EstimateForm` | `/app/estimate/EstimateForm.tsx` | Client — single page form, all sections visible |
| `ThumbnailGrid` | `/components/estimate/ThumbnailGrid.tsx` | Image grid selector, single select |
| `DimensionInput` | `/components/estimate/DimensionInput.tsx` | Length × width number inputs |
| `ContactForm` | `/components/estimate/ContactForm.tsx` | Name, email, phone, location, notes |

## Animation Components
| Component | Location | Notes |
|---|---|---|
| `FadeUp` | `/components/ui/FadeUp.tsx` | Page load animation — hero only |
| `RevealOnScroll` | `/components/ui/RevealOnScroll.tsx` | Scroll-triggered reveal |

## SectionLabel Usage
```tsx
// Always use this component — never write raw uppercase text
<SectionLabel>What We Make</SectionLabel>

// Implementation:
export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <p className={cn('section-label text-gmt-green mb-4', className)}>
      {children}
    </p>
  )
}
```

## CTABanner Usage
```tsx
// Drop at bottom of every page, before Footer
<CTABanner
  headline="Start Your Custom Piece Today"
  body="Use our online estimator to spec your table — wood species, dimensions, epoxy, edge style, and base."
  cta="Get an Instant Estimate"
  href="/estimate"
/>
```

## Data — Never Hardcode
```tsx
// WRONG
<p>Starting at $1,500</p>
<p>84 N Main St, Concord, NH 03301</p>

// RIGHT
import { products } from '@/lib/products'
import { locations } from '@/lib/locations'
```

## TypeScript Rules
- No `any` — use proper types or `unknown`
- All component props have explicit interfaces
- Data shapes defined in `/lib/types.ts`

## Key Type Definitions
```ts
// /lib/types.ts
export interface Product {
  name: string
  slug: string
  startingPrice: number | 'inquire'
  description: string
  seoTitle: string
  seoDescription: string
}

export interface Location {
  name: string
  slug: string
  address: string
  city: string
  state: string
  zip: string
  phone: string
  coords: { lat: number; lng: number }
}
```