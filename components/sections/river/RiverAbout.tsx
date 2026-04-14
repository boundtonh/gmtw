import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

const DIFFERENTIATORS = [
  {
    title: 'Two Slabs, One Statement',
    body: 'A river table is built from two matching live edge slabs placed face-to-face with a channel of epoxy running between them. The result is a piece that feels like a landscape — wood on both sides, water in the middle.',
  },
  {
    title: 'The River Is Yours to Design',
    body: 'Color, width, depth, clarity — every element of the epoxy river is chosen by you. From deep ocean blue to smoky black to crystal clear, the river becomes a reflection of your space.',
  },
  {
    title: 'Depth That Draws You In',
    body: 'High-quality casting epoxy can be poured in layers to create the illusion of real depth — the deeper the pour, the more the river appears to have dimension beneath the surface.',
  },
  {
    title: 'Live Edge Character on Both Sides',
    body: 'Unlike a standard epoxy table, a river table preserves two full natural edges. The knots, grain, and organic silhouette of the wood frame the river from both sides, making every inch intentional.',
  },
]

export function RiverAbout() {
  return (
    <section className="bg-gmt-offwhite py-24 md:py-32">
      <Container>

        {/* Header */}
        <RevealOnScroll>
          <div className="max-w-3xl">
            <SectionLabel>What Is a River Table</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl text-gmt-forest leading-tight mt-2 mb-6">
              Wood and water, captured<br className="hidden md:block" /> in a single piece
            </h2>
            <p className="font-body text-base md:text-lg text-gmt-stone leading-relaxed">
              A river table combines two live edge slabs with a flowing channel of poured epoxy between them. The epoxy — often colored to resemble water — fills the natural space between the slabs and creates the illusion of a river running through the piece. It is one of the most visually striking forms of custom furniture available today.
            </p>
          </div>
        </RevealOnScroll>

        {/* Full-width image */}
        <RevealOnScroll>
          <div className="mt-14 overflow-hidden rounded-sm">
            <Image
              src="/images/river/river-table-horiz.jpg"
              alt="Custom river table with epoxy inlay — Green Mountain Tableworx"
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
              &ldquo;A river table turns two pieces of wood into one conversation piece — and the river is always the topic.&rdquo;
            </p>
          </div>
        </RevealOnScroll>

      </Container>
    </section>
  )
}
