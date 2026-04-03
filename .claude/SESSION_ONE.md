# Session 1 — Scaffold

## Goal
Scaffold Next.js 14 + Tailwind + TypeScript, establish folder structure, configure Vercel, set up design tokens and global styles.

## Tasks

### 1. Initialize Project
```bash
npx create-next-app@14 green-mountain-tableworx \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir \  # (no — keep /app at root to match Precision BMW pattern)
  --no-import-alias
```

### 2. Install Dependencies
```bash
npm install react-hook-form resend next-sitemap clsx tailwind-merge
```

### 3. Tailwind Config
- Add GMT color tokens to `tailwind.config.ts`
- Add IvyPresto + Alwyn to `fontFamily` config
- Set custom `container` max-width

### 4. Global Styles
`styles/globals.css`:
- CSS custom properties for GMT colors
- Base typography rules (font-family assignments)
- `.section-label` utility class (ALL CAPS + letter spacing)
- Smooth scrolling

### 5. Root Layout
`app/layout.tsx`:
- Adobe Fonts `<link>` in `<head>` via `next/head` or metadata
- Global CSS import
- Font variable classes on `<html>`

### 6. Folder Structure
Create all empty folders per CLAUDE.md spec.

### 7. Data Files
Populate `/lib/`:
- `locations.ts` — showroom data (name, address, phone, slug, coords)
- `products.ts` — category data (name, slug, startingPrice, description, seoTitle, seoDescription)
- `seo.ts` — `generateMetadata()` helper function

### 8. Container Component
`/components/layout/Container.tsx`
```tsx
// max-w-[1320px] mx-auto px-6 md:px-12 xl:px-24
```

### 9. Vercel Config
- `vercel.json` — security headers (CSP, X-Frame-Options, etc.)
- Confirm project linked to Vercel Pro account

### 10. next-sitemap Config
`next-sitemap.config.js` — siteUrl from env, all routes included

## Deliverables
- Project boots with `npm run dev` ✓
- `/` renders a placeholder "Green Mountain Tableworx — Coming Soon" with GMT green ✓
- Tailwind config loads custom colors ✓
- Vercel deployment works ✓