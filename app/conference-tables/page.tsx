import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { ConferenceTablesHero } from '@/components/sections/conference-tables/ConferenceTablesHero'
import { ConferenceTablesAbout } from '@/components/sections/conference-tables/ConferenceTablesAbout'
import { ConferenceTablesEstimatePromo } from '@/components/sections/conference-tables/ConferenceTablesEstimatePromo'
import { ConferenceTablesGallery } from '@/components/sections/conference-tables/ConferenceTablesGallery'
import { CTABanner } from '@/components/ui/CTABanner'
import { FurnitureByType } from '@/components/ui/FurnitureByType'
import { ReviewsSection } from '@/components/ui/ReviewsSection'

export const metadata: Metadata = buildMetadata({
  title: 'Custom Conference Tables | Green Mountain Tableworx — NH & RI',
  description:
    'Handcrafted conference tables for boardrooms and professional spaces starting at $2,500. Boat-shaped, rectangular, or custom designs. Showrooms in Concord NH & Smithfield RI.',
  path: '/conference-tables',
})

export default function ConferenceTablesPage() {
  return (
    <>
      <ConferenceTablesHero />
      <ConferenceTablesAbout />
      <ConferenceTablesEstimatePromo />
      <section id="gallery" className="scroll-mt-20">
        <ConferenceTablesGallery />
      </section>
      <FurnitureByType />
      <ReviewsSection />
      <CTABanner
        headline="Start Your Custom Conference Table"
        body="Tell us your seating capacity, wood species, table shape, dimensions, and base — get an instant quote for your boardroom."
        cta="Get an Instant Estimate"
        href="/estimate"
      />
    </>
  )
}
