import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { CountertopsHero } from '@/components/sections/countertops-island-tops/CountertopsHero'
import { CountertopsAbout } from '@/components/sections/countertops-island-tops/CountertopsAbout'
import { CountertopsGallery } from '@/components/sections/countertops-island-tops/CountertopsGallery'
import { ContactFormBanner } from '@/components/ui/ContactFormBanner'
import { AllFurnitureTypes } from '@/components/sections/home/AllFurnitureTypes'
import { ReviewsSection } from '@/components/ui/ReviewsSection'

export const metadata: Metadata = buildMetadata({
  title: 'Custom Wood Countertops & Island Tops | Green Mountain Tableworx — NH & RI',
  description:
    'Custom solid wood countertops and kitchen island tops. Live edge or straight, precision-fit to your kitchen dimensions. Any wood species. Showrooms in Concord NH & Smithfield RI.',
  path: '/countertops-island-tops',
})

export default function CountertopsPage() {
  return (
    <>
      <CountertopsHero />
      <CountertopsAbout />
      <section id="gallery" className="scroll-mt-20">
        <CountertopsGallery />
      </section>
      <AllFurnitureTypes />
      <ReviewsSection />
      <ContactFormBanner
        headline="Start Your Custom Countertop"
        subtitle="Leave your information, or build your table online and receive an instant quote to your email."
      />
    </>
  )
}
