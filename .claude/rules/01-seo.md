# 01 — SEO Rules

## Core Requirements
- Every page exports `generateMetadata()` — no exceptions
- All pages statically generated — no client-side-only rendering that blocks Googlebot
- Canonical URL set on every page
- `robots.txt` allows full crawl
- Sitemap generated via `next-sitemap` and submitted to Google Search Console at launch

## Metadata Pattern
```tsx
// /lib/seo.ts — use this helper, never write raw metadata inline
export function buildMetadata({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}${path}`,
    },
    openGraph: {
      title,
      description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}${path}`,
      siteName: 'Green Mountain Tableworx',
      type: 'website',
    },
  }
}
```

## Title Formula
`[Page Topic] | Green Mountain Tableworx`

Examples:
- `Custom Live Edge Dining Tables | Green Mountain Tableworx`
- `River Tables — Custom Epoxy Wood Furniture | Green Mountain Tableworx`
- `Concord, NH Showroom | Green Mountain Tableworx`

## Description Formula
~155 characters. Include: product, style keywords, location (NH/RI/New England), and a value signal (starting price or custom order).

Examples:
- `Handcrafted live edge, river & ocean dining tables starting at $1,500. Custom orders for New England homes. Showrooms in Concord NH & Smithfield RI.`
- `Custom river tables with epoxy inlay starting at $1,500. Serving all of New England with in-room delivery. Visit our Concord NH or Smithfield RI showroom.`

## JSON-LD Schema (required per page type)
| Page | Schema Type |
|---|---|
| Homepage | `LocalBusiness` + `WebSite` |
| Category pages | `Product` + `ItemList` |
| Location pages | `LocalBusiness` with full address + geo |
| Estimate page | `Service` |

## Image SEO
- All `next/image` elements require descriptive `alt` text
- Format: `[wood species] [style] [product type], [approximate dimensions]`
- Example: `Black walnut river dining table, 96 inches by 42 inches`
- Never use: "image", "photo", "table", generic descriptions

## Heading Hierarchy
- One `<h1>` per page — contains primary keyword — rendered by IvyPresto display font
- `<h2>` for major sections
- `<h3>` for subsections / card titles
- Never skip levels (no h1 → h3)

## Internal Linking
Every category page must link to:
- `/estimate` (at least one CTA)
- `/table-bases` (if relevant)
- 2–3 related category pages

## Page Speed / Core Web Vitals
- Hero video uses `preload="metadata"` — not `preload="auto"`
- All images use `next/image` with correct `sizes` prop
- No render-blocking scripts above the fold
- Adobe Fonts loaded in `<head>` via `<link rel="stylesheet">` — not dynamically injected

## next-sitemap Config
```js
// next-sitemap.config.js
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  generateRobotsTxt: true,
  changefreq: 'weekly',
  priority: 0.7,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
}
```