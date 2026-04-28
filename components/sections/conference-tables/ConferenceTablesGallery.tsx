'use client'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Splide from '@splidejs/splide'
import { Container } from '@/components/layout/Container'
import { Lightbox } from '@/components/ui/Lightbox'

const GALLERY_IMAGES = [
  { src: '/images/furniture-types/dining-tables/dt1.webp', alt: 'Custom live edge conference table', title: 'Live Edge Conference Table' },
  { src: '/images/furniture-types/dining-tables/dt2.webp', alt: 'River epoxy conference table', title: 'River Conference Table' },
  { src: '/images/furniture-types/dining-tables/dt3.webp', alt: 'Walnut conference table with natural grain', title: 'Walnut Conference Table' },
  { src: '/images/furniture-types/dining-tables/dt4.webp', alt: 'Live edge conference table with steel base', title: 'Live Edge with Steel Base' },
  { src: '/images/furniture-types/dining-tables/dt5.webp', alt: 'Ocean epoxy conference table', title: 'Ocean Conference Table' },
  { src: '/images/furniture-types/dining-tables/dt6.webp', alt: 'Custom conference table in maple', title: 'Maple Conference Table' },
  { src: '/images/furniture-types/dining-tables/dt7.webp', alt: 'Handcrafted conference table with live edge slab', title: 'Handcrafted Live Edge' },
  { src: '/images/furniture-types/dining-tables/dt8.webp', alt: 'Conference table with river epoxy inlay', title: 'River Table — Blue Epoxy' },
  { src: '/images/furniture-types/dining-tables/dt9.webp', alt: 'Custom conference table with wood base', title: 'Wood Base Conference Table' },
  { src: '/images/furniture-types/dining-tables/dt10.webp', alt: 'Live edge conference table in walnut', title: 'Walnut Live Edge' },
  { src: '/images/furniture-types/dining-tables/dt11.webp', alt: 'Custom conference table with natural finish', title: 'Natural Finish' },
  { src: '/images/furniture-types/dining-tables/dt12.webp', alt: 'Conference table with ocean style epoxy', title: 'Ocean Style Table' },
  { src: '/images/furniture-types/dining-tables/dt13.webp', alt: 'Live edge slab conference table', title: 'Live Edge Slab Table' },
  { src: '/images/furniture-types/dining-tables/dt14.webp', alt: 'Handcrafted conference table with matte finish', title: 'Matte Finish Table' },
  { src: '/images/furniture-types/dining-tables/dt15.webp', alt: 'Custom conference table — Green Mountain Tableworx', title: 'Custom Conference Table' },
]

export function ConferenceTablesGallery() {
  const mainRef = useRef(null)
  const thumbRef = useRef(null)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const mainSplideRef = useRef<Splide | null>(null)

  // Detect mobile on mount
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!mainRef.current) return

    const main = new Splide(mainRef.current, {
      type: 'loop',
      perPage: 1,
      perMove: 1,
      focus: 'center',
      gap: '1.5rem',
      padding: '22%',
      autoplay: true,
      interval: 4500,
      pauseOnHover: true,
      breakpoints: {
        768: {
          perPage: 1,
          perMove: 1,
          padding: '14%',
          gap: '1rem',
          autoplay: true,
          interval: 4500,
          pauseOnHover: true,
        },
      },
    })

    mainSplideRef.current = main

    const thumbnails = new Splide(thumbRef.current!, {
      type: 'slide',
      rewind: true,
      perPage: 5,
      perMove: 1,
      gap: '0.5rem',
      pagination: false,
      arrows: false,
      breakpoints: {
        768: {
          perPage: 3,
        },
      },
    })

    main.sync(thumbnails)
    main.mount()
    thumbnails.mount()

    // Lightbox on main slide click
    const slides = main.Components.Elements.slides
    slides.forEach((slide, index) => {
      slide.addEventListener('click', () => {
        if (isMobile) {
          // On mobile, just open lightbox for any click
          setLightboxIndex(index)
        } else {
          // On desktop, only open if it's the active slide
          const activeIndex = main.index
          if (index === activeIndex || index === activeIndex - 1 || index === activeIndex + 1) {
            // If not active, navigate to it first
            if (index !== activeIndex) {
              main.go(index)
            } else {
              setLightboxIndex(index)
            }
          }
        }
      })
    })

    // Thumbnail clicks to expand lightbox
    const thumbSlides = thumbnails.Components.Elements.slides
    thumbSlides.forEach((slide, index) => {
      slide.addEventListener('click', () => {
        setLightboxIndex(index)
      })
    })

    return () => {
      main.destroy()
      thumbnails.destroy()
    }
  }, [isMobile])

  return (
    <section className="bg-gmt-cream py-16 md:py-20">
      <Container>
        {/* Main Slider */}
        <div ref={mainRef} className="splide">
          <div className="splide__track">
            <ul className="splide__list">
              {GALLERY_IMAGES.map((image, index) => (
                <li key={index} className="splide__slide cursor-pointer">
                  <div className="relative w-full aspect-square rounded-sm overflow-hidden">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 80vw, 40vw"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Thumbnails */}
        <div ref={thumbRef} className="splide mt-8">
          <div className="splide__track">
            <ul className="splide__list">
              {GALLERY_IMAGES.map((image, index) => (
                <li key={index} className="splide__slide cursor-pointer">
                  <div className="relative w-full aspect-square rounded-sm overflow-hidden ring-2 ring-transparent hover:ring-gmt-green transition-all">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 20vw, 10vw"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          src={GALLERY_IMAGES[lightboxIndex].src}
          alt={GALLERY_IMAGES[lightboxIndex].alt}
          isOpen={true}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  )
}
