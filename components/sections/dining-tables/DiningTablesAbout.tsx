import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

export function DiningTablesAbout() {
  return (
    <section className="bg-gmt-offwhite py-24 md:py-32">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <RevealOnScroll direction="left">
            <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden">
              <Image
                src="/images/furniture-types/dining-table.jpg"
                alt="Custom wood dining table with detailed woodworking"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </RevealOnScroll>

          {/* Text */}
          <RevealOnScroll direction="right">
            <div>
              <SectionLabel>About Dining Tables</SectionLabel>

              <h2 className="font-display text-4xl md:text-5xl text-gmt-forest leading-tight mt-2 mb-6">
                Tables That Bring People Together
              </h2>

              <p className="font-body text-base text-gmt-stone leading-relaxed mb-8">
                A dining table isn't just furniture—it's where your family gathers, celebrates, and makes memories. Our custom dining tables are built to last generations, designed in three signature styles: live edge for natural character, river tables for artistic flair, and ocean tables for dynamic color and movement.
              </p>

              <div className="space-y-4 mb-10">
                <div>
                  <h3 className="font-display text-lg text-gmt-forest mb-2">Solid Wood Construction</h3>
                  <p className="font-body text-sm text-gmt-stone leading-relaxed">
                    Hand-selected wood slabs from walnut, maple, cherry, and reclaimed species. Every grain pattern is unique.
                  </p>
                </div>

                <div>
                  <h3 className="font-display text-lg text-gmt-forest mb-2">Custom Sizing</h3>
                  <p className="font-body text-sm text-gmt-stone leading-relaxed">
                    Design to your exact dimensions. From intimate 4-tops to grand 12+ seat tables for entertaining.
                  </p>
                </div>

                <div>
                  <h3 className="font-display text-lg text-gmt-forest mb-2">Choice of Design</h3>
                  <p className="font-body text-sm text-gmt-stone leading-relaxed">
                    Live edge keeps natural bark and contours. River tables split two slabs with epoxy. Ocean tables feature poured color and wave patterns.
                  </p>
                </div>

                <div>
                  <h3 className="font-display text-lg text-gmt-forest mb-2">Professional Finishing</h3>
                  <p className="font-body text-sm text-gmt-stone leading-relaxed">
                    Matte or gloss finish. Durable, food-safe, and protected for years of daily use.
                  </p>
                </div>
              </div>

              <p className="font-display text-sm text-gmt-green mb-8 italic">
                "A GMT table becomes part of your home's story."
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
