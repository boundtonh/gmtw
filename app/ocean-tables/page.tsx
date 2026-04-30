import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { OceanHero } from '@/components/sections/ocean/OceanHero'
import { OceanAbout } from '@/components/sections/ocean/OceanAbout'
import { OceanEstimatePromo } from '@/components/sections/ocean/OceanEstimatePromo'
import { OceanGallery } from '@/components/sections/ocean/OceanGallery'
import { ContactFormBanner } from '@/components/ui/ContactFormBanner'
import { AllFurnitureTypes } from '@/components/sections/home/AllFurnitureTypes'
import { ReviewsSection } from '@/components/ui/ReviewsSection'

export const metadata: Metadata = buildMetadata({
  title: 'Custom Ocean Tables | Green Mountain Tableworx — NH & RI',
  description:
    'Handcrafted ocean tables with hand-poured epoxy resin inspired by coastlines and open water. Custom orders built to your dimensions. Showrooms in Concord NH & Smithfield RI. In-room delivery across New England.',
  path: '/ocean-tables',
})

export default function OceanTablesPage() {
  return (
    <>
      <OceanHero />
      <OceanAbout />
      <OceanEstimatePromo />
      <section id="gallery" className="scroll-mt-20">
        <OceanGallery />
      </section>
      <AllFurnitureTypes />
      <ReviewsSection />
      <ContactFormBanner
        headline="Start Your Custom Ocean Table"
        subtitle="Leave your information, or build your table online and receive an instant quote to your email."
      />
    </>
  )
}
