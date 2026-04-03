# 05 — Animation Rules

## Philosophy
Premium, restrained, purposeful. Motion should feel like the furniture — unhurried and deliberate. Nothing bounces. Nothing spins. Everything eases.

## Dependency
```bash
npm install framer-motion
```
Use Framer Motion for all scroll-triggered and page-load animations. Do not use raw CSS `@keyframes` for component animations.

## Core Easing
All animations use: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` (ease-out curve)
Never use `ease-in` for entrance animations.

---

## Page Load — FadeUp Component
Used on hero elements only. Fires on mount via `animate`.

```tsx
// /components/ui/FadeUp.tsx
'use client'
import { motion } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'

export function FadeUp({ children, delay = 0, className }) {
  const shouldReduce = useReducedMotion()
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: shouldReduce ? 0 : 0.7,
        delay: shouldReduce ? 0 : delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

### Hero stagger order
```tsx
<FadeUp delay={0.1}>  {/* Section label */}
<FadeUp delay={0.25}> {/* H1 headline */}
<FadeUp delay={0.4}>  {/* Subtext */}
<FadeUp delay={0.55}> {/* CTA buttons */}
```

---

## Scroll Reveal — RevealOnScroll Component
Used on everything below the hero. Fires once when element enters viewport.

```tsx
// /components/ui/RevealOnScroll.tsx
'use client'
import { motion, useReducedMotion } from 'framer-motion'

const variants = {
  up:    { hidden: { opacity: 0, y: 32 },  visible: { opacity: 1, y: 0 } },
  left:  { hidden: { opacity: 0, x: -32 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 32 },  visible: { opacity: 1, x: 0 } },
}

export function RevealOnScroll({ children, delay = 0, className, direction = 'up' }) {
  const shouldReduce = useReducedMotion()
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: shouldReduce ? 0 : 0.7,
        delay: shouldReduce ? 0 : delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      variants={variants[direction]}
      className={className}
    >
      {children}
    </motion.div>
  )
}
```

---

## Where Each Direction Is Used
| Direction | Where |
|---|---|
| `up` (default) | Section labels, body copy, cards, testimonials, process steps |
| `left` | Text side of 2-column layouts (text left, image right) |
| `right` | Image side of 2-column layouts |

## Card Grid Staggering
```tsx
{products.map((product, index) => (
  <RevealOnScroll key={product.slug} delay={Math.min(index, 3) * 0.1}>
    <ProductCard {...product} />
  </RevealOnScroll>
))}
```
Cap delay at index 3 (0.3s max) — beyond 4 items, use flat 0.1s delay.

---

## Hover States (Tailwind — no Framer Motion needed)

### Cards
```tsx
className="transition-transform duration-500 ease-out hover:-translate-y-1"
```

### Images inside cards (scale on parent hover)
```tsx
// Parent: className="group overflow-hidden"
// Image: className="transition-transform duration-700 ease-out group-hover:scale-105"
```

### Primary CTA button
```tsx
className="transition-all duration-300 ease-out hover:bg-gmt-forest hover:tracking-wider"
```

### Nav links
```tsx
className="transition-colors duration-200 hover:text-gmt-green"
```

---

## Timing Reference
| Element | Duration | Delay |
|---|---|---|
| Hero label | 700ms | 100ms |
| Hero H1 | 700ms | 250ms |
| Hero subtext | 700ms | 400ms |
| Hero CTAs | 700ms | 550ms |
| Section labels | 600ms | 0ms |
| Body copy | 700ms | 100ms |
| Card 1 | 700ms | 0ms |
| Card 2 | 700ms | 100ms |
| Card 3 | 700ms | 200ms |
| Card 4+ | 700ms | 300ms |
| Card hover | 500ms | — |
| Image hover | 700ms | — |
| Button hover | 300ms | — |
| Nav hover | 200ms | — |

---

## Never Do These
- Never animate `width`, `height`, or `padding` — causes layout reflow
- Never use `ease-in` for entrances
- Never use spring bounce (`type: "spring"` with high stiffness)
- Never animate the header or footer
- Never re-trigger on scroll up — `once: true` always
- Never use `scale` on entrance — translate only
- Never delay a single element more than 600ms