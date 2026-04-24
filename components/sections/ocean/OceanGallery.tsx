'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Lightbox } from '@/components/ui/Lightbox'

const GALLERY_IMAGES = [
  { src: '/images/ocean/Ocean-Table-Showroom.jpg',                    alt: 'Ocean table on display in showroom — Green Mountain Tableworx' },
  { src: '/images/ocean/ocean-table.jpeg',                            alt: 'Custom ocean table with blue epoxy — Green Mountain Tableworx' },
  { src: '/images/ocean/ocean-table-horiz.jpg',                       alt: 'Ocean dining table with live edge — Green Mountain Tableworx' },
  { src: '/images/ocean/BW-Ocean.jpg',                                alt: 'Black and white ocean epoxy table — Green Mountain Tableworx' },
  { src: '/images/ocean/Cherry-Ocean.jpg',                            alt: 'Cherry wood ocean table with epoxy — Green Mountain Tableworx' },
  { src: '/images/ocean/Olivewood-Dark-Blues.jpg',                    alt: 'Olivewood ocean table with dark blue epoxy — Green Mountain Tableworx' },
  { src: '/images/ocean/Olivewood-Ocean-Bright-Blues.jpg',            alt: 'Olivewood ocean table with bright blue epoxy — Green Mountain Tableworx' },
  { src: '/images/ocean/Round-Olivewood-Ocean.jpg',                   alt: 'Round olivewood ocean table — Green Mountain Tableworx' },
  { src: '/images/ocean/Rainbow-Tulip-Ocean.jpg',                     alt: 'Rainbow tulip ocean epoxy table — Green Mountain Tableworx' },
  { src: '/images/ocean/Maple-Burl-73x38-Ocean-river-2.jpg',          alt: 'Maple burl ocean river table — Green Mountain Tableworx' },
  { src: '/images/ocean/Lagoon-Table.jpg',                            alt: 'Lagoon ocean table with epoxy — Green Mountain Tableworx' },
  { src: '/images/ocean/Lagoon-Table-(1).jpg',                        alt: 'Lagoon ocean table alternate view — Green Mountain Tableworx' },
  { src: '/images/ocean/IMG_0109.jpg',                                alt: 'Custom ocean epoxy dining table — Green Mountain Tableworx' },
  { src: '/images/ocean/IMG_0116.jpg',                                alt: 'Handcrafted ocean table — Green Mountain Tableworx' },
  { src: '/images/ocean/IMG_3249.jpg',                                alt: 'Live edge ocean table New England — Green Mountain Tableworx' },
  { src: '/images/ocean/IMG_3501.jpg',                                alt: 'Custom ocean table with flowing epoxy — Green Mountain Tableworx' },
  { src: '/images/ocean/IMG_4090.jpg',                                alt: 'Ocean table with epoxy inlay — Green Mountain Tableworx' },
  { src: '/images/ocean/IMG_8270-scaled.jpg',                         alt: 'Custom ocean table — Green Mountain Tableworx' },
  { src: '/images/ocean/IMG_8521-scaled.jpg',                         alt: 'Ocean epoxy table handcrafted in New England — Green Mountain Tableworx' },
  { src: '/images/ocean/IMG_8528-scaled.jpg',                         alt: 'Live edge ocean dining table — Green Mountain Tableworx' },
  { src: '/images/ocean/IMG_8826-scaled.jpg',                         alt: 'Ocean table with wood and resin — Green Mountain Tableworx' },
  { src: '/images/ocean/IMG_8841-scaled.jpg',                         alt: 'Custom ocean table gallery piece — Green Mountain Tableworx' },
  { src: '/images/ocean/IMG_8867-scaled.jpg',                         alt: 'Handcrafted ocean epoxy table — Green Mountain Tableworx' },
  { src: '/images/ocean/IMG_9546-scaled.jpg',                         alt: 'Ocean table for New England home — Green Mountain Tableworx' },
  { src: '/images/ocean/IMG_9552-scaled.jpg',                         alt: 'Ocean table with flowing color — Green Mountain Tableworx' },
  { src: '/images/ocean/IMG_9978.jpg',                                alt: 'Custom ocean dining table — Green Mountain Tableworx' },
  { src: '/images/ocean/Resized_20250806_161456.jpeg',                alt: 'Ocean epoxy table — Green Mountain Tableworx' },
  { src: '/images/ocean/rs=w_1160,h_870.webp',                       alt: 'Ocean table with epoxy river — Green Mountain Tableworx' },
  { src: '/images/ocean/rs=w_1160,h_1547.webp',                      alt: 'Tall ocean table with epoxy — Green Mountain Tableworx' },
  { src: '/images/ocean/rs=w_1160,h_1547-(1).webp',                  alt: 'Ocean table vertical gallery — Green Mountain Tableworx' },
  { src: '/images/ocean/rs=w_1160,h_1547-(2).webp',                  alt: 'Live edge ocean slab with epoxy — Green Mountain Tableworx' },
  { src: '/images/ocean/rs=w_1160,h_1612.webp',                      alt: 'Custom ocean table showcase — Green Mountain Tableworx' },
  { src: '/images/ocean/cr=t_0%,l_0%,w_100%,h_100%.webp',           alt: 'Ocean table full view — Green Mountain Tableworx' },
  { src: '/images/ocean/cr=t_0%,l_0%,w_100%,h_100%-(1).webp',       alt: 'Ocean table with colorful epoxy — Green Mountain Tableworx' },
  { src: '/images/ocean/download.webp',                               alt: 'Handcrafted ocean epoxy table — Green Mountain Tableworx' },
  { src: '/images/ocean/thumbnail_8229257204774820777.jpg',           alt: 'Ocean table detail — Green Mountain Tableworx' },
  { src: '/images/ocean/thumbnail_Black-Walnut-Ocean.jpg',            alt: 'Black walnut ocean table — Green Mountain Tableworx' },
  { src: '/images/ocean/thumbnail_IMG_1907.jpg',                      alt: 'Custom ocean table New England — Green Mountain Tableworx' },
  { src: '/images/ocean/thumbnail_IMG_3179.jpg',                      alt: 'Ocean table with live edge slab — Green Mountain Tableworx' },
  { src: '/images/ocean/thumbnail_Maple-Burl-72x46-Nokia-Blue-Radius-Corners-2.jpg', alt: 'Maple burl ocean table with Nokia blue epoxy — Green Mountain Tableworx' },
  { src: '/images/ocean/thumbnail_Ocean-sand-rocks-waves.jpg',        alt: 'Ocean table with sand and rocks media — Green Mountain Tableworx' },
  { src: '/images/ocean/thumbnail_Ocean-sand-rocks-waves-1.jpg',      alt: 'Ocean table sand rocks waves detail — Green Mountain Tableworx' },
  { src: '/images/ocean/thumbnail_Ocean-sand-rocks-waves-2.jpg',      alt: 'Ocean media table with waves design — Green Mountain Tableworx' },
  { src: '/images/ocean/thumbnail_processed-8E859C85-689A-4238-94EC-686FBFC08C9B.jpg', alt: 'Custom ocean epoxy table — Green Mountain Tableworx' },
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
                  <div className="overflow-hidden rounded-sm">
                    <Image src={image.src} width={0} height={0} sizes="(max-width: 768px) 80vw, 40vw" alt={image.alt} className="w-full h-auto" />
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
