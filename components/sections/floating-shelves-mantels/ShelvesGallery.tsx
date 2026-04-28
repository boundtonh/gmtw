'use client'
import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Splide from '@splidejs/splide'
import { Container } from '@/components/layout/Container'
import { Lightbox } from '@/components/ui/Lightbox'

const GALLERY_IMAGES = [
  { src: '/images/furniture-types/mantels/mantel-boards-100.png', alt: 'Custom wood mantel slab', title: 'Custom Mantel Slab' },
  { src: '/images/furniture-types/mantels/mantel-boards-178.png', alt: 'Handcrafted floating shelf', title: 'Floating Shelf' },
  { src: '/images/furniture-types/mantels/IMG_3818.jpg', alt: 'Fireplace mantel installation', title: 'Fireplace Mantel' },
  { src: '/images/furniture-types/mantels/IMG_3819.jpg', alt: 'Custom wood fireplace mantel', title: 'Custom Fireplace Mantel' },
  { src: '/images/furniture-types/mantels/IMG_3820.jpg', alt: 'Live edge mantel with natural grain', title: 'Live Edge Mantel' },
  { src: '/images/furniture-types/mantels/IMG_3821.jpg', alt: 'Wood mantel on stone fireplace', title: 'Mantel on Stone Fireplace' },
  { src: '/images/furniture-types/mantels/IMG_8443.jpg', alt: 'Custom floating shelf installation', title: 'Floating Shelf Installation' },
  { src: '/images/furniture-types/mantels/IMG_9495.jpg', alt: 'Wood shelf with concealed hardware', title: 'Concealed Hardware Shelf' },
  { src: '/images/furniture-types/mantels/mantel-rod-mount.png', alt: 'Mantel mounted with hidden rods', title: 'Rod-Mount Mantel' },
  { src: '/images/furniture-types/mantels/mantel-corbels.png', alt: 'Live edge mantel with corbels', title: 'Mantel with Corbels' },
  { src: '/images/furniture-types/mantels/thumbnail_IMG_4159.jpg', alt: 'Custom mantel detail', title: 'Mantel Detail' },
  { src: '/images/furniture-types/mantels/thumbnail_IMG_4160.jpg', alt: 'Floating shelf in walnut', title: 'Walnut Floating Shelf' },
  { src: '/images/furniture-types/mantels/thumbnail_IMG_4161.jpg', alt: 'Custom wood shelf with natural finish', title: 'Natural Finish Shelf' },
]

export function ShelvesGallery() {
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
