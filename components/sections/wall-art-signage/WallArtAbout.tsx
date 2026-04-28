import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

const DIFFERENTIATORS = [
  {
    title: 'One of a Kind',
    body: 'Every piece of wall art starts with a unique slab — the grain alone makes it unlike anything else in the world. No two pieces are ever the same.',
  },
  {
    title: 'Business Signage',
    body: 'Custom wood signage for restaurants, breweries, offices, retail shops, and hospitality spaces. Branded, beautiful, and built to last.',
  },
  {
    title: 'Personalized Art',
    body: 'Wedding gifts, family name signs, commemorative pieces, and home decor — we create custom wood art for every occasion.',
  },
  {
    title: 'Inquire for Pricing',
    body: 'Wall art and signage pricing varies by size, complexity, and species. Contact us or start an estimate to get the conversation going.',
  },
]

export function WallArtAbout() {
  return (
    <section className="bg-gmt-offwhite py-24 md:py-32">
      <Container>

        <RevealOnScroll>
          <div className="max-w-3xl">
            <SectionLabel>About Wall Art &amp; Signage</SectionLabel>
            <h2 className="font-display text-4xl md:text-5xl text-gmt-forest leading-tight mt-2 mb-6">
              Custom Wood Art<br className="hidden md:block" /> That Tells Your Story
            </h2>
            <p className="font-body text-base md:text-lg text-gmt-stone leading-relaxed">
              From business signage to personalized home decor, our custom wood wall art is handcrafted from solid slabs chosen for their character. The natural grain, color variation, and texture make each piece completely unique — a work of art that happens to have your name on it.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="mt-14 overflow-hidden rounded-sm">
            <Image
              src="/images/furniture-types/signs-main.jpg"
              alt="Custom wood wall art and signage — Green Mountain Tableworx"
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
              &ldquo;Art that grows more beautiful every year.&rdquo;
            </p>
          </div>
        </RevealOnScroll>

      </Container>
    </section>
  )
}
