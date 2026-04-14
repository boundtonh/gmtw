import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

const DIFFERENTIATORS = [
  {
    title: 'The Natural Edge is Preserved',
    body: 'Where traditional furniture mills every edge square and uniform, live edge pieces keep the original contour of the slab — the exact silhouette the tree grew into over decades. That edge is never duplicated.',
  },
  {
    title: 'No Two Pieces Are the Same',
    body: 'Every slab has its own grain pattern, figure, knots, and edge profile. A live edge table cannot be reordered. It is a singular object, shaped by biology, not a factory.',
  },
  {
    title: 'Character Is the Point',
    body: 'Traditional furniture hides imperfections. Live edge celebrates them. Natural voids, mineral streaks, spalting, and cracks are features — each one part of what makes the piece irreplaceable.',
  },
  {
    title: 'Built to Outlast Everything Else',
    body: 'Live edge slabs are thick, dense, and cut from old-growth timber. When properly finished and cared for, a live edge table is a 100-year piece — something you pass down, not replace.',
  },
]

export function LiveEdgeAbout() {
  return (
    <section className="bg-gmt-offwhite py-24 md:py-32">
      <Container>

        {/* Header */}
        <RevealOnScroll>
          <div className="max-w-3xl">
            <SectionLabel>What Is Live Edge</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl text-gmt-forest leading-tight mt-2 mb-6">
              Furniture shaped by the tree,<br className="hidden md:block" /> not the mill
            </h2>
            <p className="font-body text-base md:text-lg text-gmt-stone leading-relaxed">
              Live edge furniture starts with a single slab — a cross-section cut from a tree with its natural edge left completely intact. The raw, organic silhouette of the wood becomes the defining feature of the piece. It is the opposite of conventional furniture, where every surface is squared, smoothed, and made predictable.
            </p>
          </div>
        </RevealOnScroll>

        {/* Full-width image */}
        <RevealOnScroll>
          <div className="mt-14 overflow-hidden rounded-sm">
            <Image
              src="/images/live-edge/live-edge-horiz.jpg"
              alt="Custom live edge table crafted in New England — Green Mountain Tableworx"
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
              &ldquo;A live edge table isn&rsquo;t furniture you buy. It&rsquo;s a piece of a tree you live with.&rdquo;
            </p>
          </div>
        </RevealOnScroll>

      </Container>
    </section>
  )
}
