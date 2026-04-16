import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

const FURNITURE_TYPES = [
  { label: 'Dining Tables',              href: '/dining-tables',           img: '/images/furniture-types/dining-table.jpg' },
  { label: 'Coffee Tables',              href: '/coffee-tables',           img: '/images/furniture-types/coffee-table.webp' },
  { label: 'Conference Tables',          href: '/conference-tables',        img: '/images/furniture-types/conference-table.jpg' },
  { label: 'Benches',                    href: '/benches',                  img: '/images/furniture-types/bench.png' },
  { label: 'Console Tables',             href: '/console-tables',           img: '/images/furniture-types/console-table.jpg' },
  { label: 'Countertops & Island Tops',  href: '/countertops-island-tops',  img: '/images/furniture-types/countertop.webp' },
  { label: 'Bars & Bar Tops',            href: '/bars-bar-tops',            img: '/images/furniture-types/bartop.avif' },
  { label: 'Floating Shelves & Mantels', href: '/floating-shelves-mantels', img: '/images/furniture-types/mantel.png' },
  { label: 'Wall Art & Signage',         href: '/wall-art-signage',         img: '/images/furniture-types/wall-art.jpg' },
]

export function FurnitureByType() {
  return (
    <section className="bg-gmt-cream py-16 md:py-20">
      <Container>
        <RevealOnScroll>
          <SectionLabel>What We Build</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl text-gmt-forest leading-tight mt-2 mb-6">
            Every style, any room
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {FURNITURE_TYPES.map((item, index) => (
            <RevealOnScroll key={item.label} delay={Math.min(index, 3) * 0.07}>
              <Link href={item.href} className="group block">
                <div className="relative aspect-square overflow-hidden rounded-sm mb-2">
                  <Image
                    src={item.img}
                    fill
                    alt={item.label}
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gmt-charcoal/20 group-hover:bg-gmt-charcoal/10 transition-colors duration-300" />
                </div>
                <p className="font-body text-sm text-gmt-forest group-hover:text-gmt-green transition-colors duration-200">
                  {item.label}
                </p>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  )
}
