import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

const DIFFERENTIATORS = [
  {
    title: 'Starting at $750',
    body: 'Custom GMT console tables start at $750 — exceptional craftsmanship for entryways, hallways, and living spaces.',
  },
  {
    title: 'Entryway to Behind the Sofa',
    body: 'Entryway statements, hallway accents, behind-sofa pieces, or media consoles — sized and styled to your exact need.',
  },
  {
    title: 'Live Edge & Straight Edge',
    body: 'Go organic with a live edge slab that shows off the natural grain, or choose a clean straight edge for a more contemporary look.',
  },
  {
    title: 'Any Wood Species',
    body: 'Black walnut, maple, cherry, elm, and more. We source slabs for their character and match them with the right base for your style.',
  },
]

export function ConsoleTablesAbout() {
  return (
    <section className="bg-gmt-offwhite py-24 md:py-32">
      <Container>

        <RevealOnScroll>
          <div className="max-w-3xl">
            <SectionLabel>About Console Tables</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl text-gmt-forest leading-tight mt-2 mb-6">
              The First Impression<br className="hidden md:block" /> You&apos;ve Been Looking For
            </h2>
            <p className="font-body text-base md:text-lg text-gmt-stone leading-relaxed">
              A well-chosen console table transforms a hallway or entryway into a statement. Our custom pieces start at $750 and are built to your dimensions — live edge or straight, in any wood species, with a base that fits your aesthetic. Every console we make is one of a kind, by design.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="mt-14 overflow-hidden rounded-sm">
            <Image
              src="/images/furniture-types/console-tables-main.jpg"
              alt="Handcrafted live edge console table — Green Mountain Tableworx"
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
              &ldquo;Console tables people walk past twice, just to look again.&rdquo;
            </p>
          </div>
        </RevealOnScroll>

      </Container>
    </section>
  )
}
