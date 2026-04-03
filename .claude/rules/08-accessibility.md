# 08 — Accessibility Rules

## Target
Best effort accessibility — no formal WCAG audit required, but follow these rules on every component to ensure the site is usable by everyone.

## Color Contrast
- Body text on light backgrounds: minimum 4.5:1 ratio
- Large text / headings: minimum 3:1 ratio
- GMT Green (#009440) on white: passes AA for large text — verify contrast for small text use cases
- Dark sections (gmt-forest / gmt-charcoal): use white or gmt-sage text — always passes
- Never use gmt-stone (#6B7066) on gmt-mist — check contrast before pairing

## Images
- All `next/image` elements require `alt` text — no exceptions
- Decorative images only: `alt=""`
- Never use `alt="image"` or `alt="photo"`

## Video
- Hero video is decorative (muted, background) — add `aria-hidden="true"` to the video element
- No captions required for decorative background video

## Interactive Elements
- All buttons and links have visible focus styles:
  ```css
  :focus-visible {
    outline: 2px solid #009440;
    outline-offset: 2px;
  }
  ```
- Minimum touch target size: 44×44px on mobile
- Never remove outline on focus — only replace it with a styled alternative

## Forms
- All inputs have associated `<label>` elements (not just placeholder text)
- Error messages are associated with their field via `aria-describedby`
- Required fields marked with `aria-required="true"`
- Form submission errors announced to screen readers via `role="alert"`

## Navigation
- Skip-to-main-content link as first focusable element in the DOM:
  ```tsx
  <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-gmt-green focus:text-white focus:px-4 focus:py-2">
    Skip to main content
  </a>
  ```
- Nav landmark: `<nav aria-label="Main navigation">`
- Main content landmark: `<main id="main-content">`

## Heading Hierarchy
- One `<h1>` per page — never skip levels
- Screen readers navigate by headings — maintain logical order

## Animations
- All Framer Motion components use `useReducedMotion()` — see 05-animations.md
- `globals.css` includes `prefers-reduced-motion` media query as a safety net

## Semantic HTML
- Use `<section>`, `<article>`, `<aside>`, `<nav>`, `<main>`, `<header>`, `<footer>` correctly
- Never use `<div>` for interactive elements — use `<button>` for actions, `<a>` for navigation
- Thumbnail grid selections use `role="radio"` and `role="radiogroup"` pattern

## Checklist (per page before marking complete)
- [ ] One `<h1>` present
- [ ] All images have `alt` text
- [ ] All interactive elements keyboard accessible
- [ ] Focus styles visible on all focusable elements
- [ ] Color contrast passes AA
- [ ] Skip-to-content link present in root layout
- [ ] Form labels associated with inputs