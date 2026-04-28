'use client'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Splide from '@splidejs/splide'
import { Container } from '@/components/layout/Container'
import { Lightbox } from '@/components/ui/Lightbox'

const GALLERY_IMAGES = [
  { src: '/images/furniture-types/countertops/ct-boards-112.png', alt: 'Custom wood countertop slab', title: 'Wood Countertop Slab' },
  { src: '/images/furniture-types/countertops/ct-boards-5.png', alt: 'Handcrafted wood countertop', title: 'Handcrafted Countertop' },
  { src: '/images/furniture-types/countertops/IMG_0972.JPG', alt: 'Custom wood countertop installation', title: 'Countertop Installation' },
  { src: '/images/furniture-types/countertops/ct-olivewood-ocean.jpg', alt: 'Olivewood ocean bar and countertop', title: 'Olivewood Ocean Countertop' },
  { src: '/images/furniture-types/countertops/ct-pine-bar.png', alt: 'Pine bar counter surface', title: 'Pine Bar Counter' },
  { src: '/images/furniture-types/countertops/ct-tiki-bar-counter-2.jpg', alt: 'Custom tiki bar countertop', title: 'Tiki Bar Counter' },
  { src: '/images/furniture-types/countertops/ct-tiki-bar.jpg', alt: 'Live edge tiki bar top', title: 'Live Edge Bar Top' },
  { src: '/images/furniture-types/countertops/thumbnail_IMG_2426.jpg', alt: 'Custom wood island top', title: 'Custom Island Top' },
  { src: '/images/furniture-types/countertops/thumbnail_IMG_9460.jpg', alt: 'Wood countertop with live edge', title: 'Live Edge Countertop' },
  { src: '/images/furniture-types/countertops/thumbnail_IMG_9462.jpg', alt: 'Custom kitchen countertop in wood', title: 'Kitchen Countertop' },
]

export function CountertopsGallery() {
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
