import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { LiveEdgeHero } from '@/components/sections/live-edge/LiveEdgeHero'
import { LiveEdgeAbout } from '@/components/sections/live-edge/LiveEdgeAbout'
import { LiveEdgeEstimatePromo } from '@/components/sections/live-edge/LiveEdgeEstimatePromo'
import { LiveEdgeGallery } from '@/components/sections/live-edge/LiveEdgeGallery'
import { ContactFormBanner } from '@/components/ui/ContactFormBanner'
import { AllFurnitureTypes } from '@/components/sections/home/AllFurnitureTypes'
import { ReviewsSection } from '@/components/ui/ReviewsSection'

export const metadata: Metadata = buildMetadata({
  title: 'Custom Live Edge Tables | Green Mountain Tableworx — NH & RI',
  description:
    'Handcrafted live edge dining, conference & coffee tables starting at $1,500. Custom orders built to your exact dimensions. Two showrooms in Concord NH & Smithfield RI. In-room delivery across New England.',
  path: '/live-edge-tables',
})

export default function LiveEdgeTablesPage() {
  return (
    <>
      <LiveEdgeHero />
      <LiveEdgeAbout />
      <LiveEdgeEstimatePromo />
      <section id="gallery" className="scroll-mt-20">
        <LiveEdgeGallery />
      </section>
      <AllFurnitureTypes />
      <ReviewsSection />
      <ContactFormBanner
        headline="Start Your Custom Live Edge Table"
        subtitle="Leave your information, or build your table online and receive an instant quote to your email."
      />
    </>
  )
}
