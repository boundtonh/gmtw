import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

export function ConferenceTablesAbout() {
  return (
    <section className="bg-gmt-offwhite py-24 md:py-32">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <RevealOnScroll direction="left">
            <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden">
              <Image
                src="/images/furniture-types/conference-table.jpg"
                alt="Sleek conference table for professional boardroom settings"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </RevealOnScroll>

          {/* Text */}
          <RevealOnScroll direction="right">
            <div>
              <SectionLabel>About Conference Tables</SectionLabel>

              <h2 className="font-display text-4xl md:text-5xl text-gmt-forest leading-tight mt-2 mb-6">
                Make a Statement in the Boardroom
              </h2>

              <p className="font-body text-base text-gmt-stone leading-relaxed mb-8">
                A conference table is the centerpiece of your boardroom—where decisions are made and teams collaborate. Our custom conference tables command respect, whether boat-shaped for executive presence, rectangular for efficiency, or artistically contoured. Each piece is handcrafted from premium solid wood and finished to exacting standards.
              </p>

              <div className="space-y-4 mb-10">
                <div>
                  <h3 className="font-display text-lg text-gmt-forest mb-2">Distinctive Shapes</h3>
                  <p className="font-body text-sm text-gmt-stone leading-relaxed">
                    Boat-shaped for boardrooms, rectangular for clean lines, or custom contours. Seating 8 to 20+ around.
                  </p>
                </div>

                <div>
                  <h3 className="font-display text-lg text-gmt-forest mb-2">Premium Wood Selection</h3>
                  <p className="font-body text-sm text-gmt-stone leading-relaxed">
                    Walnut, oak, maple, cherry, or reclaimed species. Grain and color consistent for professional appearance.
                  </p>
                </div>

                <div>
                  <h3 className="font-display text-lg text-gmt-forest mb-2">Integrated Design Options</h3>
                  <p className="font-body text-sm text-gmt-stone leading-relaxed">
                    Live edge for character, river inlay for sophistication, or ocean tables for contemporary flair. Cable management options available.
                  </p>
                </div>

                <div>
                  <h3 className="font-display text-lg text-gmt-forest mb-2">Commercial-Grade Durability</h3>
                  <p className="font-body text-sm text-gmt-stone leading-relaxed">
                    Heavy-duty bases, reinforced aprons, and durable finishes rated for daily commercial use.
                  </p>
                </div>
              </div>

              <p className="font-display text-sm text-gmt-green mb-8 italic">
                "Conference tables that your clients will remember."
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
