# 02 — Styling Rules

## Stack
- Tailwind CSS utility classes only
- No CSS Modules, no styled-components, no inline `style={}`
- Exception: `globals.css` for base resets, custom properties, and the `.section-label` utility

## Tailwind Config — Color Tokens
```ts
// tailwind.config.ts
colors: {
  'gmt-green':    '#009440',
  'gmt-cream':    '#F7F5F0',
  'gmt-offwhite': '#FAFAF7',
  'gmt-mist':     '#EFF5EC',
  'gmt-sage':     '#C8DFC0',
  'gmt-forest':   '#1A3D21',
  'gmt-charcoal': '#111714',
  'gmt-stone':    '#6B7066',
}
```

## Tailwind Config — Typography
```ts
fontFamily: {
  display: ['ivypresto-display', 'Georgia', 'serif'],
  body:    ['alwyn-new-rounded-web', 'system-ui', 'sans-serif'],
}
```

## Color Rules
- GMT Green (#009440) is the only accent color — no blue, purple, orange, red as primary UI
- Dark sections use `gmt-forest` or `gmt-charcoal` backgrounds
- Light sections alternate between `gmt-offwhite`, `gmt-cream`, and `gmt-mist`
- Never use Tailwind's default color palette (slate, blue, indigo, etc.) for brand elements

## Typography Rules
- `font-display` (IvyPresto) — H1, H2, hero headlines, section pull quotes only
- `font-body` (Alwyn) — all body copy, H3+, nav, buttons, labels
- Section labels: ALL CAPS + `tracking-[0.12em]` — always use `<SectionLabel>` component, never raw text
- Sentence case on all headings — never Title Case
- Never use Inter, Roboto, or system fonts for visible text

## Container
Always use the `<Container>` component — never hardcode `max-w-` on page sections:
```tsx
// /components/layout/Container.tsx
export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full max-w-[1320px] px-6 md:px-12 xl:px-24', className)}>
      {children}
    </div>
  )
}
```

## Spacing Scale
- Base unit: 8px
- Primary section vertical padding: `py-24 md:py-32`
- Card gap: `gap-6 md:gap-8`
- Never use arbitrary spacing values — stick to Tailwind's scale

## Conditional Classes
Always use the `cn()` utility (clsx + tailwind-merge):
```ts
// /lib/utils.ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

## globals.css Additions
```css
@layer base {
  :root {
    scroll-behavior: smooth;
  }
}

@layer utilities {
  .section-label {
    @apply font-body text-xs tracking-[0.12em] uppercase;
  }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Section Background Sequence (homepage)
Alternate to create visual rhythm — never two identical backgrounds in a row:
1. Hero — dark video overlay
2. Brand Statement — `gmt-offwhite`
3. Three Pillars — `gmt-forest`
4. All Furniture Types — `gmt-mist`
5. How It Works — `gmt-cream`
6. Gallery — dark or light TBD
7. Table Bases — `gmt-mist` or `gmt-cream`
8. Testimonials — `gmt-offwhite`
9. Showrooms — `gmt-green`
10. Final CTA — `gmt-forest`