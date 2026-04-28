'use client'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Splide from '@splidejs/splide'
import { Container } from '@/components/layout/Container'
import { Lightbox } from '@/components/ui/Lightbox'

const GALLERY_IMAGES = [
  { src: '/images/furniture-types/coffee-tables/ct1.webp', alt: 'Custom live edge coffee table', title: 'Live Edge Coffee Table' },
  { src: '/images/furniture-types/coffee-tables/ct2.webp', alt: 'River epoxy coffee table', title: 'River Coffee Table' },
  { src: '/images/furniture-types/coffee-tables/ct3.webp', alt: 'Walnut coffee table with natural grain', title: 'Walnut Coffee Table' },
  { src: '/images/furniture-types/coffee-tables/ct4.webp', alt: 'Ocean style coffee table', title: 'Ocean Coffee Table' },
  { src: '/images/furniture-types/coffee-tables/ct5.webp', alt: 'Custom coffee table with steel base', title: 'Coffee Table — Steel Base' },
  { src: '/images/furniture-types/coffee-tables/ct6.webp', alt: 'Live edge coffee table in maple', title: 'Maple Live Edge Coffee Table' },
  { src: '/images/furniture-types/coffee-tables/ct7.webp', alt: 'Custom coffee table with matte finish', title: 'Matte Finish Coffee Table' },
  { src: '/images/furniture-types/coffee-tables/ct8.webp', alt: 'Handcrafted coffee table with natural edge', title: 'Handcrafted Coffee Table' },
  { src: '/images/furniture-types/coffee-tables/ct9.webp', alt: 'Custom coffee table — natural wood slab', title: 'Natural Slab Coffee Table' },
  { src: '/images/furniture-types/coffee-tables/c9.webp', alt: 'Coffee table with organic live edge', title: 'Organic Live Edge Coffee Table' },
  { src: '/images/furniture-types/coffee-tables/ct10.webp', alt: 'Coffee table with river inlay detail', title: 'River Inlay Coffee Table' },
  { src: '/images/furniture-types/coffee-tables/ct11.webp', alt: 'Custom coffee table with gloss finish', title: 'Gloss Finish Coffee Table' },
  { src: '/images/furniture-types/coffee-tables/ct12.webp', alt: 'Live edge coffee table with wood base', title: 'Wood Base Coffee Table' },
  { src: '/images/furniture-types/coffee-tables/ct13.webp', alt: 'Custom coffee table in walnut', title: 'Walnut Custom Coffee Table' },
  { src: '/images/furniture-types/coffee-tables/ct14.webp', alt: 'Handcrafted coffee table — Green Mountain Tableworx', title: 'Handcrafted Coffee Table' },
  { src: '/images/furniture-types/coffee-tables/c10.webp', alt: 'Custom coffee table with natural finish', title: 'Natural Finish Coffee Table' },
]

export function CoffeeTablesGallery() {
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
