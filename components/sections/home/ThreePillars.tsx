import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

const pillars = [
  {
    title: 'Live Edge Tables',
    href: '/live-edge-tables',
    img: '/images/live-edge/Live-Edge.jpg',
    description: 'Raw, organic edges. Every slab is one of a kind.',
    objectPosition: '50% 60%',
  },
  {
    title: 'River Tables',
    href: '/river-tables',
    img: '/images/river/River-Table.jpg',
    description: 'Epoxy rivers of color flowing through solid wood.',
    objectPosition: '50% 50%',
  },
  {
    title: 'Ocean Tables',
    href: '/ocean-tables',
    img: '/images/ocean/Ocean-Table-Showroom.jpg',
    description: 'Coastal-inspired waves captured in resin and grain.',
    objectPosition: '50% 50%',
  },
]

export function ThreePillars() {
  return (
    <section className="bg-gmt-forest py-24 md:py-32">
      <Container>
        <RevealOnScroll>
          <div className="w-12 h-px bg-gmt-sage mb-4" />
          <h2 className="font-display text-4xl md:text-5xl text-white">Our Signature Styles</h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {pillars.map((pillar, index) => (
            <RevealOnScroll key={pillar.href} delay={index * 0.1}>
              <Link
                href={pillar.href}
                className="group relative overflow-hidden block rounded-sm aspect-[3/2] md:aspect-[4/5]"
              >
                <Image
                  src={pillar.img}
                  fill
                  alt={`${pillar.title} — Green Mountain Tableworx`}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ objectPosition: pillar.objectPosition }}
                />

                {/* Bottom gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gmt-charcoal/90 via-transparent to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <h2 className="font-display text-2xl text-white">{pillar.title}</h2>
                  <p className="font-body text-sm text-white/70 mt-2">{pillar.description}</p>
                  <p className="font-body text-sm text-gmt-green mt-4">Explore →</p>
                </div>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  )
}
