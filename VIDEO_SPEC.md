# Video Hero Spec — Green Mountain Tableworx

## Mobile Autoplay Requirements

All four attributes are REQUIRED on the <video> element. Missing any one of them breaks mobile autoplay.

```html
<video autoplay muted loop playsinline>
```

- `autoplay` — triggers play on load
- `muted` — REQUIRED for autoplay on all browsers (Chrome, Safari, Firefox)
- `loop` — seamless looping
- `playsinline` — REQUIRED on iOS to prevent fullscreen hijack

## Component: HeroVideo.tsx

Location: /components/layout/HeroVideo.tsx
Type: 'use client' (needs useRef + useEffect)

```tsx
'use client'
import { useEffect, useRef } from 'react'

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.play().catch(() => {
      // Poster image showing as fallback — silent fail is correct behavior
    })
  }, [])

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      poster="/images/hero/hero-poster.jpg"
      preload="metadata"
      className="absolute inset-0 w-full h-full object-cover"
    >
      {/* Mobile: lighter encode */}
      <source src="/videos/hero-mobile.webm" type="video/webm" media="(max-width: 768px)" />
      <source src="/videos/hero-mobile.mp4"  type="video/mp4"  media="(max-width: 768px)" />
      {/* Desktop */}
      <source src="/videos/hero-desktop.webm" type="video/webm" />
      <source src="/videos/hero-desktop.mp4"  type="video/mp4"  />
    </video>
  )
}
```

## Video Files Required

| File | Resolution | Bitrate | Target Size |
|---|---|---|---|
| hero-desktop.mp4 | 1920×1080 | 2000 kbps VBR | < 8MB |
| hero-desktop.webm | 1920×1080 | 1500 kbps VBR | < 6MB |
| hero-mobile.mp4 | 1280×720 | 1000 kbps VBR | < 4MB |
| hero-mobile.webm | 1280×720 | 800 kbps VBR | < 3MB |
| hero-poster.jpg | 1920×1080 | — | < 200KB |

## Export Settings from 120fps Source

Source footage is 120fps. Slow motion target is 5× (120 ÷ 24 = 5).

- **Output FPS:** 24fps
- **Length:** 15–20 seconds (post-slowdown)
- **Format:** Export both MP4 (H.264) and WebM (VP9)
- **Bitrate mode:** Variable (VBR) — not constant (CBR)
- **Audio:** Strip completely (remove audio track entirely, don't just mute)
- **Loop:** Trim to a natural loop point — no jump cuts at the seam

Recommended tool: HandBrake (free) or Adobe Media Encoder

## Poster Image

- Must be a single compelling frame from the video
- Crop and export as JPEG, 85% quality
- Should look great if video never plays (it's the permanent mobile fallback for users with video disabled)
- Path: /public/images/hero/hero-poster.jpg

## Hero Section Layout (TSX)

```tsx
// Hero section wrapper — video sits behind overlay + content
<section className="relative h-screen min-h-[600px] overflow-hidden">
  {/* Video layer */}
  <HeroVideo />
  {/* Dark overlay for text legibility */}
  <div className="absolute inset-0 bg-gmt-charcoal/50" />
  {/* Content layer */}
  <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-6">
    <p className="section-label text-gmt-sage mb-6">Green Mountain Tableworx</p>
    <h1 className="font-display text-5xl md:text-7xl lg:text-8xl mb-6 leading-tight">
      Where the forest<br />meets your table.
    </h1>
    <p className="font-body text-lg md:text-xl text-white/80 max-w-xl mb-10">
      Custom live edge, river & ocean tables. Handcrafted in New England.
    </p>
    <div className="flex flex-col sm:flex-row gap-4">
      <Link href="/estimate" className="btn-primary">
        Get an Instant Estimate
      </Link>
      <Link href="/locations" className="btn-secondary">
        Visit a Showroom
      </Link>
    </div>
    <p className="mt-8 text-sm text-white/60 tracking-wider">
      📍 Concord, NH &nbsp;·&nbsp; Smithfield, RI
    </p>
  </div>
</section>
```

## Best Footage for GMT Hero

Priority order for selecting/editing clips:
1. Epoxy pour in slow motion (5× from 120fps) — most visually striking
2. Hand revealing / sliding across a finished table
3. Workshop process — routing, sanding, applying finish
4. Finished table in dramatic raking light

Avoid: faces, talking, readable text in frame, fast motion, handheld shake

## Performance Notes

- Use `preload="metadata"` — loads enough to show poster without fetching full video
- The WebM source goes FIRST in the <source> list — browsers stop at the first compatible source
- Safari on iOS does not support WebM — it will fall through to the MP4 source automatically
- Do NOT use CSS background-video patterns — the <video> element approach is required for mobile autoplay
- Test on a real iPhone (Safari) and Android Chrome before launch — emulators lie