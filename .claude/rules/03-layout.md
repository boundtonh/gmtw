# 03 — Layout Rules

## Framework
- Next.js 14 App Router — no Pages Router patterns ever
- TypeScript everywhere — no `.js` files except config files
- Mobile-first — build at 375px, scale up with `md:` and `lg:` prefixes

## Images
- Always `next/image` — never raw `<img>`
- Always provide `width` + `height` OR `fill` prop
- For fill images, parent must have `position: relative` and explicit dimensions
- Always include descriptive `alt` text (see 01-seo.md for format)
- Use `sizes` prop to prevent oversized image downloads:
  ```tsx
  // Full-width hero
  sizes="100vw"
  // Half-width (2-col layout)
  sizes="(max-width: 768px) 100vw, 50vw"
  // Card grid (3-col)
  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
  ```

## Links
- Internal links: always `next/link` — never raw `<a>`
- External links: raw `<a>` with `target="_blank" rel="noopener noreferrer"`

## Video (Hero)
```tsx
// HeroVideo is a 'use client' component
// Required attributes — all four, no exceptions:
<video autoPlay muted loop playsInline poster="..." preload="metadata">
  <source src="/videos/hero-mobile.mp4" type="video/mp4" media="(max-width: 768px)" />
  <source src="/videos/hero-desktop.mp4" type="video/mp4" />
</video>
```
Hero section height: `h-[60vh] md:h-screen min-h-[500px]`

## Page Structure Pattern
```tsx
// Every page follows this shell:
export default function PageName() {
  return (
    <>
      <PageHero />          {/* Full or partial width, section-specific */}
      <Section1 />
      <Section2 />
      ...
      <CTABanner />         {/* Always last before footer */}
    </>
  )
}
```

## Responsive Breakpoints
| Breakpoint | Width | Usage |
|---|---|---|
| default | 375px+ | Mobile — single column |
| `md:` | 768px+ | Tablet — 2 columns |
| `lg:` | 1024px+ | Desktop — 3 columns |
| `xl:` | 1280px+ | Wide — max container |

## Grid Patterns
- 3-pillar section: `grid grid-cols-1 md:grid-cols-3`
- Product card grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- 2-column editorial: `grid grid-cols-1 md:grid-cols-2 items-center gap-12 md:gap-20`
- How It Works steps: `grid grid-cols-1 md:grid-cols-4`

## Header Behavior
- Sticky: `position: sticky` or `fixed` at top
- Transparent over hero, solid on scroll — use `useScrollPosition` hook
- Solid background: `gmt-charcoal` or `white` depending on page
- Transition: `transition-colors duration-300`

## Footer
- Background: `gmt-forest`
- Two columns: navigation links left, contact info right
- Bottom strip: copyright + agency credit

## Component Naming
- Components: PascalCase (`ProductCard.tsx`)
- Pages: `page.tsx` inside route folder
- Utilities: camelCase (`formatPrice.ts`)
- Data files: camelCase (`products.ts`, `locations.ts`)