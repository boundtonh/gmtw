import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

const DIFFERENTIATORS = [
  {
    title: 'Fully Custom',
    body: 'No standard sizes here. We build standalone bars and bar tops to your exact specifications — width, length, overhang, and height all tailored to your space.',
  },
  {
    title: 'Live Edge, River & Ocean',
    body: 'A live edge bar top brings raw natural beauty. River and ocean styles add dramatic flowing epoxy. Any species, any style.',
  },
  {
    title: 'Home & Commercial',
    body: 'From basement home bars to restaurant and hospitality surfaces — we build for residential and commercial environments alike.',
  },
  {
    title: 'Inquire for Pricing',
    body: 'Bar tops and standalone bars are priced based on dimensions, species, and design. Contact us or use the estimator to get the conversation started.',
  },
]

export function BarsAbout() {
  return (
    <section className="bg-gmt-offwhite py-24 md:py-32">
      <Container>

        <RevealOnScroll>
          <div className="max-w-3xl">
            <SectionLabel>About Bars &amp; Bar Tops</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl text-gmt-forest leading-tight mt-2 mb-6">
              Transform Any Space Into<br className="hidden md:block" /> an Entertaining Destination
            </h2>
            <p className="font-body text-base md:text-lg text-gmt-stone leading-relaxed">
              A custom wood bar top is the centerpiece of any entertaining space. We build standalone bars, home bar tops, and commercial bar surfaces — live edge, river, or ocean style, in any wood species. Every piece is built to your dimensions and finished to withstand real use.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="mt-14 overflow-hidden rounded-sm">
            <Image
              src="/images/furniture-types/horiz-pics/bar-top-horiz.jpg"
              alt="Custom live edge bar top — Green Mountain Tableworx"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto"
            />
          </div>
        </RevealOnScroll>

        <div className="w-12 h-[2px] bg-gmt-green mt-12 mb-16" />

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

        <RevealOnScroll delay={0.2}>
          <div className="mt-20 border-l-2 border-gmt-green pl-8 max-w-2xl">
            <p className="font-display text-2xl md:text-3xl text-gmt-forest leading-snug">
              &ldquo;Bar tops that make every gathering feel like an occasion.&rdquo;
            </p>
          </div>
        </RevealOnScroll>

      </Container>
    </section>
  )
}
