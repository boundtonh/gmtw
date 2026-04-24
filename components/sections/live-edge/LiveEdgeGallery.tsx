'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Lightbox } from '@/components/ui/Lightbox'

// ─── Gallery images ────────────────────────────────────────────────────────────
// Add client photos here as they arrive.
// Format: { src: '/images/live-edge/filename.jpg', alt: 'descriptive alt text' }
const GALLERY_IMAGES = [
  { src: '/images/live-edge/Live-Edge.jpg',            alt: 'Custom live edge dining table — Green Mountain Tableworx' },
  { src: '/images/live-edge/live-edge-horiz.jpg',      alt: 'Live edge table horizontal view — Green Mountain Tableworx' },
  { src: '/images/live-edge/rs=w_1160,h_870.webp',     alt: 'Handcrafted live edge table — Green Mountain Tableworx' },
  { src: '/images/live-edge/rs=w_1160,h_870-(1).webp', alt: 'Live edge dining table New England — Green Mountain Tableworx' },
  { src: '/images/live-edge/rs=w_1160,h_965.webp',     alt: 'Custom live edge slab table — Green Mountain Tableworx' },
  { src: '/images/live-edge/rs=w_1160,h_1547.webp',    alt: 'Tall live edge table — Green Mountain Tableworx' },
  { src: '/images/live-edge/rs=w_1160,h_1547-(1).webp', alt: 'Live edge table with natural contours — Green Mountain Tableworx' },
  { src: '/images/live-edge/rs=w_1160,h_1547-(2).webp', alt: 'Live edge wood slab furniture — Green Mountain Tableworx' },
  { src: '/images/live-edge/rs=w_1160,h_1547-(3).webp', alt: 'Custom live edge piece — Green Mountain Tableworx' },
  { src: '/images/live-edge/rs=w_1160,h_1547-(4).webp', alt: 'Live edge table handcrafted in New England — Green Mountain Tableworx' },
  { src: '/images/live-edge/rs=w_984,h_738.webp',      alt: 'Live edge dining table — Green Mountain Tableworx' },
  { src: '/images/live-edge/rs=w_984,h_738-(1).webp',  alt: 'Custom live edge table with wood base — Green Mountain Tableworx' },
  { src: '/images/live-edge/rs=w_984,h_767.webp',      alt: 'Live edge slab table — Green Mountain Tableworx' },
  { src: '/images/live-edge/download.webp',             alt: 'Handcrafted live edge furniture — Green Mountain Tableworx' },
  { src: '/images/live-edge/download-(1).webp',         alt: 'Live edge table New England — Green Mountain Tableworx' },
  { src: '/images/live-edge/download-(2).webp',         alt: 'Custom live edge dining table — Green Mountain Tableworx' },
  { src: '/images/live-edge/download-(3).webp',         alt: 'Live edge table with natural edge — Green Mountain Tableworx' },
  { src: '/images/live-edge/download-(4).webp',         alt: 'Live edge wood table — Green Mountain Tableworx' },
  { src: '/images/live-edge/download-(5).webp',         alt: 'Custom live edge piece New England — Green Mountain Tableworx' },
  { src: '/images/live-edge/download-(6).webp',         alt: 'Handcrafted live edge table — Green Mountain Tableworx' },
]

export function LiveEdgeGallery() {
  const mainRef        = useRef<HTMLDivElement>(null)
  const thumbsRef      = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const splideMain     = useRef<any>(null)
  const pendingLightbox = useRef<{ src: string; alt: string } | null>(null)
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let thumbs: any = null

    import('@splidejs/splide').then(({ Splide }) => {
      if (!mainRef.current || !thumbsRef.current) return

      thumbs = new Splide(thumbsRef.current, {
        type:         'slide',
        rewind:       true,
        gap:          '0.5rem',
        pagination:   false,
        arrows:       false,
        fixedWidth:   72,
        fixedHeight:  72,
        cover:        true,
        isNavigation: true,
        breakpoints: {
          768: {
            fixedWidth:  56,
            fixedHeight: 56,
          },
        },
      })

      splideMain.current = new Splide(mainRef.current, {
        type:         'loop',
        perPage:      3,
        perMove:      1,
        focus:        'center',
        gap:          '1rem',
        padding:      '6%',
        arrows:       true,
        pagination:   false,
        autoplay:     true,
        interval:     4500,
        pauseOnHover: true,
        speed:        700,
        easing:       'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        breakpoints: {
          768: {
            perPage: 1,
            padding: '12%',
            gap:     '0.75rem',
          },
        },
      })

      splideMain.current.on('moved', () => {
        if (pendingLightbox.current) {
          setLightbox(pendingLightbox.current)
          pendingLightbox.current = null
        }
      })

      splideMain.current.sync(thumbs)
      splideMain.current.mount()
      thumbs.mount()
    })

    return () => {
      splideMain.current?.destroy()
      thumbs?.destroy()
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

      {/* Main slider */}
      <div ref={mainRef} className="splide splide-gmt-main" aria-label="Live edge table gallery">
        <div className="splide__track">
          <ul className="splide__list">
            {GALLERY_IMAGES.map((image, index) => (
              <li key={index} className="splide__slide">
                <button
                  className="block w-full md:cursor-pointer cursor-zoom-in"
                  onClick={(e) => {
                    const slide = (e.currentTarget as HTMLElement).closest('.splide__slide')
                    const isActive = slide?.classList.contains('is-active')
                    if (isActive) {
                      setLightbox({ src: image.src, alt: image.alt })
                    } else {
                      pendingLightbox.current = { src: image.src, alt: image.alt }
                      splideMain.current?.go(index)
                    }
                  }}
                  aria-label={`View full size: ${image.alt}`}
                >
                  <div className="overflow-hidden rounded-sm">
                    <Image
                      src={image.src}
                      width={0}
                      height={0}
                      sizes="(max-width: 768px) 80vw, 40vw"
                      alt={image.alt}
                      className="w-full h-auto"
                    />
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Thumbnail nav */}
      <div ref={thumbsRef} className="splide splide-gmt-thumbs mt-5 px-8 md:px-16" aria-label="Gallery thumbnails">
        <div className="splide__track">
          <ul className="splide__list">
            {GALLERY_IMAGES.map((image, index) => (
              <li key={index} className="splide__slide">
                <div className="relative w-[72px] h-[72px] md:w-[72px] md:h-[72px] overflow-hidden rounded-sm cursor-pointer">
                  <Image
                    src={image.src}
                    fill
                    alt=""
                    sizes="72px"
                    className="object-cover"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style>{`
        /* ── Main slider ── */
        .splide-gmt-main .splide__slide {
          opacity: 0.3;
          transform: scale(0.88);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .splide-gmt-main .splide__slide.is-active {
          opacity: 1;
          transform: scale(1);
        }
        .splide-gmt-main .splide__arrow {
          background: rgba(0,148,64,0.9);
          width: 44px;
          height: 44px;
          border-radius: 2px;
          opacity: 1;
        }
        .splide-gmt-main .splide__arrow:hover {
          background: #1A3D21;
        }
        .splide-gmt-main .splide__arrow svg {
          fill: white;
          width: 14px;
          height: 14px;
        }
        @media (max-width: 768px) {
          .splide-gmt-main .splide__slide {
            opacity: 1;
            transform: scale(1);
          }
        }

        /* ── Thumbnail nav ── */
        .splide-gmt-thumbs .splide__list {
          justify-content: center;
        }
        .splide-gmt-thumbs .splide__slide {
          opacity: 0.45;
          transition: opacity 0.3s ease;
        }
        .splide-gmt-thumbs .splide__slide.is-active {
          opacity: 1;
          outline: 2px solid #009440;
          outline-offset: 2px;
          border-radius: 2px;
        }
        .splide-gmt-thumbs .splide__slide:hover {
          opacity: 0.8;
          cursor: pointer;
        }
      `}</style>

      <Lightbox
        src={lightbox?.src ?? ''}
        alt={lightbox?.alt ?? ''}
        isOpen={!!lightbox}
        onClose={() => setLightbox(null)}
      />
    </section>
  )
}
