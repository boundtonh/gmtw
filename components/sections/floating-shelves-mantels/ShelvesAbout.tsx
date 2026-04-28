import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

const DIFFERENTIATORS = [
  {
    title: 'Concealed Hardware',
    body: 'Every floating shelf installs with hidden hardware for a clean, seamless look — no visible brackets, no exposed fasteners.',
  },
  {
    title: 'Fireplace Mantels',
    body: 'A solid wood mantel becomes the focal point of any living room. We build to fit your firebox opening, in any wood species and profile.',
  },
  {
    title: 'Any Length, Any Species',
    body: 'Short accent shelves or full-wall runs — we build to your exact measurements in black walnut, maple, white oak, cherry, and more.',
  },
  {
    title: 'Inquire for Pricing',
    body: 'Shelves and mantels are priced by size, species, and complexity. Reach out or use the estimator and we\'ll put together a custom quote.',
  },
]

export function ShelvesAbout() {
  return (
    <section className="bg-gmt-offwhite py-24 md:py-32">
      <Container>

        <RevealOnScroll>
          <div className="max-w-3xl">
            <SectionLabel>About Floating Shelves &amp; Mantels</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl text-gmt-forest leading-tight mt-2 mb-6">
              Solid Wood Shelving<br className="hidden md:block" /> That Disappears Into the Wall
            </h2>
            <p className="font-body text-base md:text-lg text-gmt-stone leading-relaxed">
              Floating shelves and fireplace mantels add warmth and function to any room. We precision-fit every piece to your space — any wood species, any length — with clean concealed-hardware installs that let the wood do the talking. Pricing based on dimensions and species; inquire to get started.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="mt-14 overflow-hidden rounded-sm">
            <Image
              src="/images/furniture-types/mantels-main.jpg"
              alt="Custom wood floating shelf and fireplace mantel — Green Mountain Tableworx"
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
              &ldquo;Shelves and mantels that look like they were born in the wall.&rdquo;
            </p>
          </div>
        </RevealOnScroll>

      </Container>
    </section>
  )
}
