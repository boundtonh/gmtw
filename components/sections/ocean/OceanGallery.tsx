'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Lightbox } from '@/components/ui/Lightbox'

const GALLERY_IMAGES = [
  { src: '/images/ocean/ocean-table.jpeg',          alt: 'Custom ocean table with blue epoxy — Green Mountain Tableworx' },
  { src: '/images/ocean/Ocean-Table-Showroom.jpg',  alt: 'Ocean table on display in showroom — Green Mountain Tableworx' },
  { src: '/images/ocean/ocean-style.webp',          alt: 'Custom ocean style epoxy table — Green Mountain Tableworx' },
  { src: '/images/ocean/ocean-table.jpeg',          alt: 'Ocean dining table with live edge walnut — Green Mountain Tableworx' },
  { src: '/images/ocean/Ocean-Table-Showroom.jpg',  alt: 'Ocean table detail — resin and wood — Green Mountain Tableworx' },
]

export function OceanGallery() {
  const mainRef         = useRef<HTMLDivElement>(null)
  const thumbsRef       = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const splideMain      = useRef<any>(null)
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
          768: { fixedWidth: 56, fixedHeight: 56 },
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
          768: { perPage: 1, padding: '12%', gap: '0.75rem' },
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
      <div className="mb-14 text-center px-6">
        <p className="font-body text-xs tracking-[0.12em] uppercase text-gmt-green mb-3">Our Work</p>
        <h2 className="font-display text-4xl md:text-5xl text-white">Ocean Table Gallery</h2>
        <p className="font-body text-gmt-stone text-base mt-4 max-w-xl mx-auto">
          Every ocean table is poured and finished by hand. Browse pieces we&rsquo;ve built for clients across New England.
        </p>
      </div>

      <div ref={mainRef} className="splide splide-ocean-main" aria-label="Ocean table gallery">
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
                  <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
                    <Image src={image.src} fill alt={image.alt} sizes="(max-width: 768px) 80vw, 40vw" className="object-cover" />
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div ref={thumbsRef} className="splide splide-ocean-thumbs mt-5 px-8 md:px-16" aria-label="Gallery thumbnails">
        <div className="splide__track">
          <ul className="splide__list">
            {GALLERY_IMAGES.map((image, index) => (
              <li key={index} className="splide__slide">
                <div className="relative w-[72px] h-[72px] overflow-hidden rounded-sm cursor-pointer">
                  <Image src={image.src} fill alt="" sizes="72px" className="object-cover" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <style>{`
        .splide-ocean-main .splide__slide {
          opacity: 0.3;
          transform: scale(0.88);
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        .splide-ocean-main .splide__slide.is-active {
          opacity: 1;
          transform: scale(1);
        }
        .splide-ocean-main .splide__arrow {
          background: rgba(0,148,64,0.9);
          width: 44px;
          height: 44px;
          border-radius: 2px;
          opacity: 1;
        }
        .splide-ocean-main .splide__arrow:hover { background: #1A3D21; }
        .splide-ocean-main .splide__arrow svg { fill: white; width: 14px; height: 14px; }
        @media (max-width: 768px) {
          .splide-ocean-main .splide__slide { opacity: 1; transform: scale(1); }
        }
        .splide-ocean-thumbs .splide__list { justify-content: center; }
        .splide-ocean-thumbs .splide__slide { opacity: 0.45; transition: opacity 0.3s ease; }
        .splide-ocean-thumbs .splide__slide.is-active {
          opacity: 1;
          outline: 2px solid #009440;
          outline-offset: 2px;
          border-radius: 2px;
        }
        .splide-ocean-thumbs .splide__slide:hover { opacity: 0.8; cursor: pointer; }
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
