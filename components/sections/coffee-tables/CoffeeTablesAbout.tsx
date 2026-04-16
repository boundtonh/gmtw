import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

export function CoffeeTablesAbout() {
  return (
    <section className="bg-gmt-offwhite py-24 md:py-32">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <RevealOnScroll direction="left">
            <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden">
              <Image
                src="/images/furniture-types/coffee-table.webp"
                alt="Beautiful handcrafted wooden coffee table"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </RevealOnScroll>

          {/* Text */}
          <RevealOnScroll direction="right">
            <div>
              <SectionLabel>About Coffee Tables</SectionLabel>

              <h2 className="font-display text-4xl md:text-5xl text-gmt-forest leading-tight mt-2 mb-6">
                The Perfect Living Room Centerpiece
              </h2>

              <p className="font-body text-base text-gmt-stone leading-relaxed mb-8">
                A coffee table sets the tone for your living room—a functional piece that's always on display. Our custom coffee tables start at $500, offering exceptional value and distinctive beauty. Choose from live edge designs that showcase wood grain, river tables with epoxy accents, or ocean tables with flowing color and movement.
              </p>

              <div className="space-y-4 mb-10">
                <div>
                  <h3 className="font-display text-lg text-gmt-forest mb-2">Affordable Artistry</h3>
                  <p className="font-body text-sm text-gmt-stone leading-relaxed">
                    Starting at $500, a custom GMT coffee table is an investment in beauty and craftsmanship that lasts.
                  </p>
                </div>

                <div>
                  <h3 className="font-display text-lg text-gmt-forest mb-2">Three Design Styles</h3>
                  <p className="font-body text-sm text-gmt-stone leading-relaxed">
                    Live edge reveals natural contours. River tables split two slabs with flowing epoxy. Ocean tables feature organic color and movement.
                  </p>
                </div>

                <div>
                  <h3 className="font-display text-lg text-gmt-forest mb-2">Custom Dimensions</h3>
                  <p className="font-body text-sm text-gmt-stone leading-relaxed">
                    Design to your space. Rectangular, round, oval, or unique shapes sized perfectly for your living room layout.
                  </p>
                </div>

                <div>
                  <h3 className="font-display text-lg text-gmt-forest mb-2">Premium Durability</h3>
                  <p className="font-body text-sm text-gmt-stone leading-relaxed">
                    Solid wood construction, hand-finished, and protected with durable matte or gloss finishes rated for daily use.
                  </p>
                </div>
              </div>

              <p className="font-display text-sm text-gmt-green mb-8 italic">
                "Coffee tables people stop to admire."
              </p>

              <div className="flex flex-col md:flex-row gap-4">
                <Link
                  href="/estimate"
                  className="inline-flex justify-center md:justify-start font-body text-sm text-white bg-gmt-green px-8 py-4 hover:bg-gmt-forest transition-colors duration-300"
                >
                  Get an Instant Estimate
                </Link>
                <Link
                  href="/locations/concord-nh"
                  className="inline-flex justify-center md:justify-start font-body text-sm text-gmt-green border border-gmt-green px-8 py-4 hover:bg-gmt-green/5 transition-colors duration-300"
                >
                  Visit Concord, NH
                </Link>
                <Link
                  href="/locations/smithfield-ri"
                  className="inline-flex justify-center md:justify-start font-body text-sm text-gmt-green border border-gmt-green px-8 py-4 hover:bg-gmt-green/5 transition-colors duration-300"
                >
                  Visit Smithfield, RI
                </Link>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  )
}
