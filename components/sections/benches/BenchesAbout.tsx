import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

const DIFFERENTIATORS = [
  {
    title: 'Starting at $500',
    body: 'A custom GMT bench starts at $500 — an accessible entry point for handcrafted live edge furniture that transforms any space.',
  },
  {
    title: 'Multiple Uses',
    body: 'Dining benches, entryway seating, mudroom storage benches, or outdoor accent pieces — we build for any purpose and any room.',
  },
  {
    title: 'Live Edge, River & Ocean',
    body: 'Showcase natural wood grain with a live edge design, or add flowing epoxy in river or ocean style. Every slab is unique.',
  },
  {
    title: 'Custom Dimensions',
    body: 'Sized to your space. Specify the exact length, width, and height — we build to your room, not the other way around.',
  },
]

export function BenchesAbout() {
  return (
    <section className="bg-gmt-offwhite py-24 md:py-32">
      <Container>

        <RevealOnScroll>
          <div className="max-w-3xl">
            <SectionLabel>About Benches</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl text-gmt-forest leading-tight mt-2 mb-6">
              Handcrafted Seating<br className="hidden md:block" /> Built to Last
            </h2>
            <p className="font-body text-base md:text-lg text-gmt-stone leading-relaxed">
              Our custom live edge benches bring warmth and character to dining rooms, entryways, and mudrooms alike. Starting at $500, each piece is built from solid wood slabs and finished by hand. Choose your wood species, epoxy design, and base style — we&apos;ll build it to your exact dimensions.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="mt-14 overflow-hidden rounded-sm">
            <Image
              src="/images/furniture-types/benches-main.jpg"
              alt="Handcrafted live edge bench — Green Mountain Tableworx"
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
              &ldquo;Benches that make guests ask where you found them.&rdquo;
            </p>
          </div>
        </RevealOnScroll>

      </Container>
    </section>
  )
}
