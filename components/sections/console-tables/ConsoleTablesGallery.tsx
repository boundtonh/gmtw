'use client'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Splide from '@splidejs/splide'
import { Container } from '@/components/layout/Container'
import { Lightbox } from '@/components/ui/Lightbox'

const GALLERY_IMAGES = [
  { src: '/images/furniture-types/console-tables/con1.webp', alt: 'Custom live edge console table', title: 'Live Edge Console Table' },
  { src: '/images/furniture-types/console-tables/con2.webp', alt: 'Handcrafted wood console table', title: 'Handcrafted Console Table' },
  { src: '/images/furniture-types/console-tables/con3.webp', alt: 'Entryway console table in walnut', title: 'Walnut Entryway Console' },
  { src: '/images/furniture-types/console-tables/con4.webp', alt: 'Behind-sofa console table', title: 'Behind-Sofa Console' },
  { src: '/images/furniture-types/console-tables/con5.webp', alt: 'Custom console table with natural grain', title: 'Natural Grain Console Table' },
]

export function ConsoleTablesGallery() {
  const mainRef = useRef(null)
  const thumbRef = useRef<HTMLDivElement>(null)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)
  const mainSplideRef = useRef<Splide | null>(null)

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
        768: { perPage: 1, perMove: 1, padding: '14%', gap: '1rem', autoplay: true, interval: 4500, pauseOnHover: true },
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
      breakpoints: { 768: { perPage: 3 } },
    })

    main.sync(thumbnails)
    main.mount()
    thumbnails.mount()

    const slides = main.Components.Elements.slides
    slides.forEach((slide, index) => {
      slide.addEventListener('click', () => {
        if (isMobile) {
          setLightboxIndex(index)
        } else {
          const activeIndex = main.index
          if (index === activeIndex) setLightboxIndex(index)
          else main.go(index)
        }
      })
    })

    const thumbSlides = thumbnails.Components.Elements.slides
    thumbSlides.forEach((slide, index) => {
      slide.addEventListener('click', () => setLightboxIndex(index))
    })

    return () => { main.destroy(); thumbnails.destroy() }
  }, [isMobile])

  return (
    <section className="bg-gmt-cream py-16 md:py-20">
      <Container>
        <div ref={mainRef} className="splide">
          <div className="splide__track">
            <ul className="splide__list">
              {GALLERY_IMAGES.map((image, index) => (
                <li key={index} className="splide__slide cursor-pointer">
                  <div className="relative w-full aspect-square rounded-sm overflow-hidden">
                    <Image src={image.src} alt={image.alt} fill className="object-cover" sizes="(max-width: 768px) 80vw, 40vw" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div ref={thumbRef} className="splide mt-8">
          <div className="splide__track">
            <ul className="splide__list">
              {GALLERY_IMAGES.map((image, index) => (
                <li key={index} className="splide__slide cursor-pointer">
                  <div className="relative w-full aspect-square rounded-sm overflow-hidden ring-2 ring-transparent hover:ring-gmt-green transition-all">
                    <Image src={image.src} alt={image.alt} fill className="object-cover" sizes="(max-width: 768px) 20vw, 10vw" />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>

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
