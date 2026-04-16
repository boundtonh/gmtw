import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

const DIFFERENTIATORS = [
  {
    title: 'Distinctive Shapes',
    body: 'Boat-shaped for boardrooms, rectangular for clean lines, or custom contours. Seating 8 to 20+ around.',
  },
  {
    title: 'Premium Wood Selection',
    body: 'Walnut, oak, maple, cherry, or reclaimed species. Grain and color consistent for professional appearance.',
  },
  {
    title: 'Integrated Design Options',
    body: 'Live edge for character, river inlay for sophistication, or ocean tables for contemporary flair. Cable management options available.',
  },
  {
    title: 'Commercial-Grade Durability',
    body: 'Heavy-duty bases, reinforced aprons, and durable finishes rated for daily commercial use.',
  },
]

export function ConferenceTablesAbout() {
  return (
    <section className="bg-gmt-offwhite py-24 md:py-32">
      <Container>

        {/* Header */}
        <RevealOnScroll>
          <div className="max-w-3xl">
            <SectionLabel>About Conference Tables</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl text-gmt-forest leading-tight mt-2 mb-6">
              Make a Statement<br className="hidden md:block" /> in the Boardroom
            </h2>
            <p className="font-body text-base md:text-lg text-gmt-stone leading-relaxed">
              A conference table is the centerpiece of your boardroom—where decisions are made and teams collaborate. Our custom conference tables command respect, whether boat-shaped for executive presence, rectangular for efficiency, or artistically contoured. Each piece is handcrafted from premium solid wood and finished to exacting standards.
            </p>
          </div>
        </RevealOnScroll>

        {/* Full-width image */}
        <RevealOnScroll>
          <div className="mt-14 overflow-hidden rounded-sm">
            <Image
              src="/images/furniture-types/conference-table.jpg"
              alt="Custom conference table for professional spaces — Green Mountain Tableworx"
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
              &ldquo;Conference tables that your clients will remember.&rdquo;
            </p>
          </div>
        </RevealOnScroll>

      </Container>
    </section>
  )
}
