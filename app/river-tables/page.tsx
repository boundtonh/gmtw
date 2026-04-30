import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { RiverHero } from '@/components/sections/river/RiverHero'
import { RiverAbout } from '@/components/sections/river/RiverAbout'
import { RiverEstimatePromo } from '@/components/sections/river/RiverEstimatePromo'
import { RiverGallery } from '@/components/sections/river/RiverGallery'
import { ContactFormBanner } from '@/components/ui/ContactFormBanner'
import { AllFurnitureTypes } from '@/components/sections/home/AllFurnitureTypes'
import { ReviewsSection } from '@/components/ui/ReviewsSection'

export const metadata: Metadata = buildMetadata({
  title: 'Custom River Tables | Green Mountain Tableworx — NH & RI',
  description:
    'Handcrafted river tables with custom epoxy inlay starting at $1,500. Two live edge slabs united by your choice of color and depth. Showrooms in Concord NH & Smithfield RI. In-room delivery across New England.',
  path: '/river-tables',
})

export default function RiverTablesPage() {
  return (
    <>
      <RiverHero />
      <RiverAbout />
      <RiverEstimatePromo />
      <section id="gallery" className="scroll-mt-20">
        <RiverGallery />
      </section>
      <AllFurnitureTypes />
      <ReviewsSection />
      <ContactFormBanner
        headline="Start Your Custom River Table"
        subtitle="Leave your information, or build your table online and receive an instant quote to your email."
      />
    </>
  )
}
