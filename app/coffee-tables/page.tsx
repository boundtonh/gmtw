import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { CoffeeTablesHero } from '@/components/sections/coffee-tables/CoffeeTablesHero'
import { CoffeeTablesAbout } from '@/components/sections/coffee-tables/CoffeeTablesAbout'
import { CoffeeTablesEstimatePromo } from '@/components/sections/coffee-tables/CoffeeTablesEstimatePromo'
import { CoffeeTablesGallery } from '@/components/sections/coffee-tables/CoffeeTablesGallery'
import { CTABanner } from '@/components/ui/CTABanner'
import { AllFurnitureTypes } from '@/components/sections/home/AllFurnitureTypes'
import { ReviewsSection } from '@/components/ui/ReviewsSection'

export const metadata: Metadata = buildMetadata({
  title: 'Custom Coffee Tables | Green Mountain Tableworx — NH & RI',
  description:
    'Handcrafted coffee tables starting at $500. Live edge, river, or ocean designs. Custom dimensions and wood species. Showrooms in Concord NH & Smithfield RI.',
  path: '/coffee-tables',
})

export default function CoffeeTablesPage() {
  return (
    <>
      <CoffeeTablesHero />
      <CoffeeTablesAbout />
      <CoffeeTablesEstimatePromo />
      <section id="gallery" className="scroll-mt-20">
        <CoffeeTablesGallery />
      </section>
      <AllFurnitureTypes />
      <ReviewsSection />
      <CTABanner
        headline="Start Your Custom Coffee Table"
        body="Choose your wood species, dimensions, edge style, and design — get an instant quote starting at $500."
        cta="Get an Instant Estimate"
        href="/estimate"
      />
    </>
  )
}
