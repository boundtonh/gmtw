'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

// ─── Gallery images ────────────────────────────────────────────────────────────
// Add client photos here as they arrive.
// Format: { src: '/images/live-edge/filename.jpg', alt: 'descriptive alt text' }
const GALLERY_IMAGES = [
  { src: '/images/live-edge/Live-Edge.jpg', alt: 'Custom live edge dining table in black walnut — Green Mountain Tableworx' },
  { src: '/images/live-edge/Live-Edge.jpg', alt: 'Live edge river table with blue epoxy inlay, New England' },
  { src: '/images/live-edge/Live-Edge.jpg', alt: 'Live edge conference table with steel base, Concord NH' },
  { src: '/images/live-edge/Live-Edge.jpg', alt: 'Live edge coffee table in cherry wood, custom order Rhode Island' },
  { src: '/images/live-edge/Live-Edge.jpg', alt: 'Live edge bench in white ash — Green Mountain Tableworx' },
]

export function LiveEdgeGallery() {
  const splideRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let splide: { mount: () => void; destroy: () => void } | null = null

    import('@splidejs/splide').then(({ Splide }) => {
      if (!splideRef.current) return

      splide = new Splide(splideRef.current, {
        type:        'loop',
        perPage:     3,
        focus:       'center',
        gap:         '1.5rem',
        padding:     '8%',
        arrows:      true,
        pagination:  true,
        autoplay:    false,
        speed:       700,
        easing:      'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        breakpoints: {
          768: {
            perPage: 1,
            padding: '14%',
            gap:     '1rem',
          },
        },
      })

      splide.mount()
    })

    return () => {
      splide?.destroy()
    }
  }, [])

  return (
    <section className="bg-gmt-charcoal py-24 md:py-32 overflow-hidden">
      {/* Section header */}
      <div className="mb-14 text-center px-6">
        <p className="font-body text-xs tracking-[0.12em] uppercase text-gmt-green mb-3">Our Work</p>
        <h2 className="font-display text-4xl md:text-5xl text-white">Live Edge Gallery</h2>
        <p className="font-body text-gmt-stone text-base mt-4 max-w-xl mx-auto">
          Every piece is one of a kind. Browse live edge tables we&rsquo;ve built for clients across New England.
        </p>
      </div>

      {/* Splide slider */}
      <div ref={splideRef} className="splide splide-gmt" aria-label="Live edge table gallery">
        <div className="splide__track">
          <ul className="splide__list">
            {GALLERY_IMAGES.map((image, index) => (
              <li key={index} className="splide__slide">
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                  <Image
                    src={image.src}
                    fill
                    alt={image.alt}
                    sizes="(max-width: 768px) 72vw, 38vw"
                    className="object-cover"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style>{`
        .splide-gmt .splide__slide {
          opacity: 0.3;
          transform: scale(0.90);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .splide-gmt .splide__slide.is-active {
          opacity: 1;
          transform: scale(1);
        }
        .splide-gmt .splide__arrow {
          background: rgba(0,148,64,0.9);
          width: 44px;
          height: 44px;
          border-radius: 2px;
          opacity: 1;
        }
        .splide-gmt .splide__arrow:hover {
          background: #1A3D21;
          opacity: 1;
        }
        .splide-gmt .splide__arrow svg {
          fill: white;
          width: 14px;
          height: 14px;
        }
        .splide-gmt .splide__pagination {
          bottom: -2.5rem;
          gap: 6px;
        }
        .splide-gmt .splide__pagination__page {
          background: rgba(255,255,255,0.25);
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: none;
          margin: 0;
        }
        .splide-gmt .splide__pagination__page.is-active {
          background: #009440;
          transform: scale(1.3);
        }
      `}</style>

      {/* Space for pagination dots */}
      <div className="h-12" />
    </section>
  )
}
