import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { DiningTablesHero } from '@/components/sections/dining-tables/DiningTablesHero'
import { DiningTablesAbout } from '@/components/sections/dining-tables/DiningTablesAbout'
import { DiningTablesEstimatePromo } from '@/components/sections/dining-tables/DiningTablesEstimatePromo'
import { DiningTablesGallery } from '@/components/sections/dining-tables/DiningTablesGallery'
import { CTABanner } from '@/components/ui/CTABanner'
import { AllFurnitureTypes } from '@/components/sections/home/AllFurnitureTypes'
import { ReviewsSection } from '@/components/ui/ReviewsSection'

export const metadata: Metadata = buildMetadata({
  title: 'Custom Dining Tables | Green Mountain Tableworx — NH & RI',
  description:
    'Handcrafted dining tables with live edge, river inlay, or custom finishes starting at $1,500. Built to your exact dimensions. Showrooms in Concord NH & Smithfield RI. New England delivery.',
  path: '/dining-tables',
})

export default function DiningTablesPage() {
  return (
    <>
      <DiningTablesHero />
      <DiningTablesAbout />
      <DiningTablesEstimatePromo />
      <section id="gallery" className="scroll-mt-20">
        <DiningTablesGallery />
      </section>
      <AllFurnitureTypes />
      <ReviewsSection />
      <CTABanner
        headline="Start Your Custom Dining Table"
        body="Tell us your seating capacity, wood species, dimensions, edge style, and base — get an accurate quote in minutes."
        cta="Get an Instant Estimate"
        href="/estimate"
      />
    </>
  )
}
