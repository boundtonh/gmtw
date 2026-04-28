'use client'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Splide from '@splidejs/splide'
import { Container } from '@/components/layout/Container'
import { Lightbox } from '@/components/ui/Lightbox'

const GALLERY_IMAGES = [
  { src: '/images/furniture-types/bar-tops/bt1.webp', alt: 'Custom live edge bar top', title: 'Live Edge Bar Top' },
  { src: '/images/furniture-types/bar-tops/bt2.webp', alt: 'River epoxy bar top', title: 'River Bar Top' },
  { src: '/images/furniture-types/bar-tops/bt3.webp', alt: 'Walnut bar top with natural grain', title: 'Walnut Bar Top' },
  { src: '/images/furniture-types/bar-tops/bt4.webp', alt: 'Standalone home bar with wood top', title: 'Home Bar' },
  { src: '/images/furniture-types/bar-tops/bt5.webp', alt: 'Custom bar top with ocean epoxy', title: 'Ocean Bar Top' },
  { src: '/images/furniture-types/bar-tops/bt6.webp', alt: 'Commercial bar surface in live edge', title: 'Commercial Bar Top' },
  { src: '/images/furniture-types/bar-tops/bt7.webp', alt: 'Bar top with straight edge profile', title: 'Straight Edge Bar Top' },
  { src: '/images/furniture-types/bar-tops/bt8.webp', alt: 'Custom bar top installation', title: 'Custom Bar Installation' },
  { src: '/images/furniture-types/bar-tops/bt-walnut-river-rock-lit.jpg', alt: 'Black walnut live edge river rock lit bar top', title: 'Walnut River Rock Bar — Lit' },
  { src: '/images/furniture-types/bar-tops/bt-maple-live-edge.jpg', alt: 'Live edge maple bar top', title: 'Maple Live Edge Bar Top' },
  { src: '/images/furniture-types/bar-tops/bt-maple-river-rock-pearl.jpg', alt: 'Maple live edge river rock on pearl bar top', title: 'Maple River Rock — Pearl' },
]

export function BarsGallery() {
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
