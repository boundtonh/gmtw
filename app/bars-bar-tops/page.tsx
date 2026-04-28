import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { BarsHero } from '@/components/sections/bars-bar-tops/BarsHero'
import { BarsAbout } from '@/components/sections/bars-bar-tops/BarsAbout'
import { BarsEstimatePromo } from '@/components/sections/bars-bar-tops/BarsEstimatePromo'
import { BarsGallery } from '@/components/sections/bars-bar-tops/BarsGallery'
import { CTABanner } from '@/components/ui/CTABanner'
import { FurnitureByType } from '@/components/ui/FurnitureByType'
import { ReviewsSection } from '@/components/ui/ReviewsSection'

export const metadata: Metadata = buildMetadata({
  title: 'Custom Bars & Bar Tops | Green Mountain Tableworx — NH & RI',
  description:
    'Custom standalone bars and live edge bar tops for home and commercial spaces. River, ocean, and live edge styles in any wood species. Showrooms in Concord NH & Smithfield RI.',
  path: '/bars-bar-tops',
})

export default function BarsPage() {
  return (
    <>
      <BarsHero />
      <BarsAbout />
      <BarsEstimatePromo />
      <section id="gallery" className="scroll-mt-20">
        <BarsGallery />
      </section>
      <FurnitureByType />
      <ReviewsSection />
      <CTABanner
        headline="Start Your Custom Bar Top"
        body="Spec your bar top — wood species, dimensions, edge style, and epoxy design. We'll put together a custom quote within 24 hours."
        cta="Get an Instant Estimate"
        href="/estimate"
      />
    </>
  )
}
