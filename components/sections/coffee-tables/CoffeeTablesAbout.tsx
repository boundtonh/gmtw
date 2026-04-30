import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

const DIFFERENTIATORS = [
  {
    title: 'Affordable Artistry',
    body: 'Starting at $500, a custom GMT coffee table is an investment in beauty and craftsmanship that lasts.',
  },
  {
    title: 'Design Styles',
    body: 'Live edge reveals natural contours. River tables split two slabs with flowing epoxy. Ocean tables feature organic color and movement. It can also be a solid top—whether a solid top without epoxy, river, or ocean styling.',
  },
  {
    title: 'Custom Dimensions',
    body: 'Design to your space. Rectangular, round, oval, or unique shapes sized perfectly for your living room layout.',
  },
  {
    title: 'Premium Durability',
    body: 'Solid wood construction, hand-finished, and protected with durable matte or gloss finishes rated for daily use.',
  },
]

export function CoffeeTablesAbout() {
  return (
    <section className="bg-gmt-offwhite py-24 md:py-32">
      <Container>

        {/* Header */}
        <RevealOnScroll>
          <div className="max-w-3xl">
            <SectionLabel>About Coffee Tables</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl text-gmt-forest leading-tight mt-2 mb-6">
              The Perfect Living Room<br className="hidden md:block" /> Centerpiece
            </h2>
            <p className="font-body text-base md:text-lg text-gmt-stone leading-relaxed">
              A coffee table sets the tone for your living room&mdash;a functional piece that&apos;s always on display. Our custom coffee tables start at $500, offering exceptional value and distinctive beauty. Choose from live edge designs that showcase wood grain, river tables with epoxy accents, or ocean tables with flowing color and movement.
            </p>
          </div>
        </RevealOnScroll>

        {/* Full-width image */}
        <RevealOnScroll>
          <div className="mt-14 overflow-hidden rounded-sm">
            <Image
              src="/images/furniture-types/coffee-tables/c10.webp"
              alt="Handcrafted custom coffee table — Green Mountain Tableworx"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto"
            />
          </div>
        </RevealOnScroll>

        {/* Divider */}
        <div className="w-12 h-[2px] bg-gmt-green mt-12 mb-16" />

        {/* Differentiators grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {DIFFERENTIATORS.map((item, index) => (
            <RevealOnScroll key={item.title} delay={index * 0.1}>
              <div className="flex gap-5">
                <div className="mt-1.5 w-2 h-2 rounded-full bg-gmt-green shrink-0" />
                <div>
                  <h3 className="font-display text-xl text-gmt-forest mb-2">{item.title}</h3>
                  <p className="font-body text-sm text-gmt-stone leading-relaxed">{item.body}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        {/* CTAs */}
        <RevealOnScroll delay={0.1}>
          <div className="mt-16 flex flex-wrap gap-4">
            <Link
              href="/estimate"
              className="font-body text-sm text-white bg-gmt-green px-8 py-4 hover:bg-gmt-forest transition-colors duration-300"
            >
              Instant Online Quotes
            </Link>
            <Link
              href="/locations/concord-nh"
              className="font-body text-sm text-gmt-forest border border-gmt-forest/40 px-8 py-4 hover:border-gmt-forest hover:bg-gmt-forest/5 transition-colors duration-300"
            >
              Visit Concord, NH Showroom
            </Link>
            <Link
              href="/locations/smithfield-ri"
              className="font-body text-sm text-gmt-forest border border-gmt-forest/40 px-8 py-4 hover:border-gmt-forest hover:bg-gmt-forest/5 transition-colors duration-300"
            >
              Visit Smithfield, RI Showroom
            </Link>
          </div>
        </RevealOnScroll>

        {/* Bottom pull quote */}
        <RevealOnScroll delay={0.2}>
          <div className="mt-20 border-l-2 border-gmt-green pl-8 max-w-2xl">
            <p className="font-display text-2xl md:text-3xl text-gmt-forest leading-snug">
              &ldquo;Coffee tables people stop to admire.&rdquo;
            </p>
          </div>
        </RevealOnScroll>

      </Container>
    </section>
  )
}
