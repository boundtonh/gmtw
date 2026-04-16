'use client'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Splide from '@splidejs/splide'
import { Container } from '@/components/layout/Container'
import { Lightbox } from '@/components/ui/Lightbox'

// Gallery images - update with actual dining table images
const GALLERY_IMAGES = [
  {
    src: '/images/furniture-types/dining-table.jpg',
    alt: 'Walnut dining table with natural live edge',
    title: 'Walnut Live Edge Dining Table',
  },
  {
    src: '/images/furniture-types/dining-table.jpg',
    alt: 'River table dining set with blue epoxy',
    title: 'River Dining Table — Glacier Blue',
  },
  {
    src: '/images/furniture-types/dining-table.jpg',
    alt: 'Cherry wood dining table with custom base',
    title: 'Cherry Wood Dining Table',
  },
  {
    src: '/images/furniture-types/dining-table.jpg',
    alt: 'Large reclaimed wood dining table',
    title: 'Reclaimed Wood Dining Table',
  },
  {
    src: '/images/furniture-types/dining-table.jpg',
    alt: 'Modern dining table with walnut and maple',
    title: 'Mixed Wood Dining Table',
  },
]

export function DiningTablesGallery() {
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
