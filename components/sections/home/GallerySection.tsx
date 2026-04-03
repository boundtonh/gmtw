import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { GalleryLightbox } from '@/components/ui/GalleryLightbox'

// Gallery items with varying aspect ratios to simulate masonry
const galleryItems = [
  { id: 1, img: 'pwpo1.jpg',    aspect: 'aspect-[3/4]',  alt: 'Custom live edge dining table' },
  { id: 3, img: 'pwpo3.jpg',    aspect: 'aspect-[4/3]',  alt: 'Custom ocean table detail' },
  { id: 2, img: 'pwpo2.jpg',    aspect: 'aspect-square',  alt: 'Custom river table with epoxy' },
  { id: 4, img: 'pwpo10.jpg',   aspect: 'aspect-[3/4]',  alt: 'Custom furniture piece' },
  { id: 5, img: 'pwpo5.jpg',    aspect: 'aspect-[4/3]',  alt: 'Custom river table' },
  { id: 6, img: 'pwpo6.jpg',    aspect: 'aspect-square',  alt: 'Custom live edge bench' },
  { id: 7, img: 'pwpo7.jpeg',   aspect: 'aspect-[4/3]',  alt: 'Custom furniture detail' },
  { id: 8, img: 'pwpo8.jpg',    aspect: 'aspect-[3/4]',  alt: 'Custom wood furniture piece' },
  { id: 9, img: 'pwpo9.jpg',    aspect: 'aspect-square',  alt: 'Custom furniture showcase' },
]

export function GallerySection() {
  return (
    <section className="bg-gmt-charcoal py-24 md:py-32">
      <Container>
        <RevealOnScroll>
          <SectionLabel className="text-gmt-sage">Recent Work</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl text-white mt-2">
            Pieces We&rsquo;re Proud Of
          </h2>
        </RevealOnScroll>

        <RevealOnScroll delay={0.1}>
          <div className="columns-2 md:columns-3 gap-4 mt-12">
            {galleryItems.map((item, index) => (
              <div
                key={item.id}
                className={`${item.aspect} break-inside-avoid mb-4`}
              >
                <GalleryLightbox items={galleryItems} initialIndex={index} />
              </div>
            ))}
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  )
}
