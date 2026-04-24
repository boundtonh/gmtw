import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

const DIFFERENTIATORS = [
  {
    title: 'Solid Wood Construction',
    body: 'Hand-selected wood slabs featuring various wood species. Every grain pattern is unique.',
  },
  {
    title: 'Custom Sizing',
    body: 'Design to your exact dimensions. From intimate 2-tops to grand 12+ seat tables for entertaining.',
  },
  {
    title: 'Choice of Design',
    body: 'Live edge keeps natural edge and contours. River tables split two slabs with epoxy. Ocean tables feature poured color and wave patterns.',
  },
  {
    title: 'Professional Finishing',
    body: 'Matte or gloss finish. Durable, food-safe, and protected for years of daily use.',
  },
]

export function DiningTablesAbout() {
  return (
    <section className="bg-gmt-offwhite py-24 md:py-32">
      <Container>

        {/* Header */}
        <RevealOnScroll>
          <div className="max-w-3xl">
            <SectionLabel>About Dining Tables</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl text-gmt-forest leading-tight mt-2 mb-6">
              Tables That Bring<br className="hidden md:block" /> People Together
            </h2>
            <p className="font-body text-base md:text-lg text-gmt-stone leading-relaxed">
              A dining table isn&apos;t just furniture&mdash;it&apos;s where your family gathers, celebrates, and makes memories. Our custom dining tables are built to last generations, designed in three signature styles: live edge for natural character, river tables for artistic flair, and ocean tables for dynamic color and movement.
            </p>
          </div>
        </RevealOnScroll>

        {/* Full-width image */}
        <RevealOnScroll>
          <div className="mt-14 overflow-hidden rounded-sm">
            <Image
              src="/images/furniture-types/dining-table.jpg"
              alt="Handcrafted custom dining table — Green Mountain Tableworx"
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
              &ldquo;A GMT table becomes part of your home&rsquo;s story.&rdquo;
            </p>
          </div>
        </RevealOnScroll>

      </Container>
    </section>
  )
}
