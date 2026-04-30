import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { CoffeeTablesHero } from '@/components/sections/coffee-tables/CoffeeTablesHero'
import { CoffeeTablesAbout } from '@/components/sections/coffee-tables/CoffeeTablesAbout'
import { CoffeeTablesEstimatePromo } from '@/components/sections/coffee-tables/CoffeeTablesEstimatePromo'
import { CoffeeTablesGallery } from '@/components/sections/coffee-tables/CoffeeTablesGallery'
import { ContactFormBanner } from '@/components/ui/ContactFormBanner'
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
      <ContactFormBanner
        headline="Start Your Custom Coffee Table"
        subtitle="Leave your information, or build your table online and receive an instant quote to your email."
      />
    </>
  )
}
