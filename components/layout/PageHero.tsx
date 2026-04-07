import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { FadeUp } from '@/components/ui/FadeUp'

interface PageHeroProps {
  label: string
  heading: string
  subheading?: string
}

/**
 * Standard hero for all sub-pages (non-homepage).
 * Accounts for fixed nav on desktop (105px) and TopBanner + nav on mobile (114px).
 * Background starts at 0 so gmt-forest fills behind the nav — content is padded clear of it.
 */
export function PageHero({ label, heading, subheading }: PageHeroProps) {
  return (
    <section className="bg-gmt-forest">
      {/* pt accounts for: mobile = TopBanner(54px) + Header(60px) + 32px breathing room
                          desktop = Header(105px) + 32px breathing room              */}
      <Container className="pt-[146px] lg:pt-[137px] pb-20 md:pb-28">
        <FadeUp delay={0.1}>
          <SectionLabel className="text-gmt-sage">{label}</SectionLabel>
        </FadeUp>
        <FadeUp delay={0.25}>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-white leading-tight mt-2 mb-4 max-w-2xl">
            {heading}
          </h1>
        </FadeUp>
        {subheading && (
          <FadeUp delay={0.4}>
            <p className="font-body text-white/70 text-lg max-w-xl leading-relaxed">
              {subheading}
            </p>
          </FadeUp>
        )}
      </Container>
    </section>
  )
}
