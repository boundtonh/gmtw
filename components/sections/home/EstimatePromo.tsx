import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

const specs = [
  'Wood species & slab dimensions',
  'Table shape & edge style',
  'Epoxy color, background & surface finish',
  'Engraving options',
  'Table base style',
]

export function EstimatePromo() {
  return (
    <section className="bg-gmt-offwhite py-24 md:py-32">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Text */}
          <RevealOnScroll direction="left">
            <div className="text-center lg:text-left">
              <SectionLabel>Instant Online Estimate</SectionLabel>

              <h2 className="font-display text-4xl md:text-5xl text-gmt-forest leading-tight mt-2 mb-6">
                Build Your Table Online<br />Get An Instant Quote
              </h2>

              <div className="mb-8">
                <p className="font-display text-2xl text-gmt-green leading-none">2–3</p>
                <p className="font-body text-xs text-gmt-stone tracking-[0.12em] uppercase mt-1">Minutes</p>
              </div>

              <p className="font-body text-base text-gmt-stone leading-relaxed max-w-md mb-8 lg:max-w-none">
                Our online estimator walks you through every detail of your custom piece — wood, dimensions, epoxy, edge, and base. Tell us exactly what you want and get an accurate quote without a phone call or showroom visit.
              </p>

              <ul className="space-y-3 mb-10 flex flex-col items-center lg:items-start">
              {specs.map((spec) => (
                <li key={spec} className="flex items-start gap-3 font-body text-sm text-gmt-forest text-center lg:text-left">
                  <span className="mt-0.5 w-4 h-4 shrink-0 rounded-full bg-gmt-green flex items-center justify-center">
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none" aria-hidden="true">
                      <path d="M1 3l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  {spec}
                </li>
              ))}
            </ul>

              <Link
                href="/estimate"
                className="inline-block font-body text-sm text-white bg-gmt-green px-8 py-4 hover:bg-gmt-forest transition-colors duration-300"
              >
                Build Your Table Online
              </Link>
            </div>
          </RevealOnScroll>

          {/* Image */}
          <RevealOnScroll direction="right">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-gradient-to-br from-gmt-forest to-gmt-charcoal">
              {/*
                TODO: Replace with client-supplied estimate/lifestyle photo:
                <Image
                  src="/images/estimate/estimate-hero.jpg"
                  fill
                  alt="Custom live edge dining table being built at Green Mountain Tableworx"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              */}
              {/* Decorative accent line */}
              <div className="absolute left-8 top-8 bottom-8 w-px bg-gmt-green/40" />
              <div className="absolute inset-0 flex items-end p-10">
                <p className="font-display italic text-2xl text-white/60 leading-snug">
                  &ldquo;Every detail,<br />your way.&rdquo;
                </p>
              </div>
            </div>
          </RevealOnScroll>

        </div>
      </Container>
    </section>
  )
}
