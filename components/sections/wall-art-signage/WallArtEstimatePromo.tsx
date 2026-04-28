import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { EstimatorMockup } from '@/components/ui/EstimatorMockup'

const specs = [
  'Wood species & piece dimensions',
  'Art style or signage type',
  'Text, logo, or design details',
  'Surface finish (matte or gloss)',
  'Business or personal use',
  'Receive a custom quote',
]

export function WallArtEstimatePromo() {
  return (
    <section className="bg-gmt-offwhite py-24 md:py-32">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          <RevealOnScroll direction="left">
            <div className="text-center lg:text-left">
              <SectionLabel>Custom Wall Art &amp; Signage</SectionLabel>

              <h2 className="font-display text-4xl md:text-5xl text-gmt-forest leading-tight mt-2 mb-6">
                Describe Your Vision<br />Get a Custom Quote
              </h2>

              <div className="mb-8">
                <p className="font-display text-2xl text-gmt-green leading-none">2–3</p>
                <p className="font-body text-xs text-gmt-stone tracking-[0.12em] uppercase mt-1">Minutes</p>
              </div>

              <p className="font-body text-base text-gmt-stone leading-relaxed max-w-md mb-8 lg:max-w-none">
                Tell us the size, species, and what you have in mind — business signage, personalized home art, or a gift. We&apos;ll put together a custom quote, typically within 24 hours.
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
                Start Your Art Inquiry
              </Link>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="right">
            <div className="relative aspect-[4/5] rounded-sm overflow-hidden shadow-xl ring-1 ring-gmt-stone/10">
              <EstimatorMockup />
            </div>
          </RevealOnScroll>

        </div>
      </Container>
    </section>
  )
}
