import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { ShelvesHero } from '@/components/sections/floating-shelves-mantels/ShelvesHero'
import { ShelvesAbout } from '@/components/sections/floating-shelves-mantels/ShelvesAbout'
import { ShelvesEstimatePromo } from '@/components/sections/floating-shelves-mantels/ShelvesEstimatePromo'
import { CTABanner } from '@/components/ui/CTABanner'
import { FurnitureByType } from '@/components/ui/FurnitureByType'
import { ReviewsSection } from '@/components/ui/ReviewsSection'

export const metadata: Metadata = buildMetadata({
  title: 'Custom Floating Shelves & Mantels | Green Mountain Tableworx — NH & RI',
  description:
    'Custom wood floating shelves and fireplace mantels. Any wood species, any length, precision-fit to your space with concealed hardware. Showrooms in Concord NH & Smithfield RI.',
  path: '/floating-shelves-mantels',
})

export default function ShelvesPage() {
  return (
    <>
      <ShelvesHero />
      <ShelvesAbout />
      <ShelvesEstimatePromo />
      <FurnitureByType />
      <ReviewsSection />
      <CTABanner
        headline="Start Your Custom Shelf or Mantel"
        body="Tell us your dimensions, wood species, and finish — we'll build a custom quote for your floating shelves or fireplace mantel."
        cta="Get an Instant Estimate"
        href="/estimate"
      />
    </>
  )
}
