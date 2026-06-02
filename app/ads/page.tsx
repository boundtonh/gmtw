import { buildMetadata } from '@/lib/seo'
import { LandingHero } from '@/components/sections/ads/LandingHero'
import { TrustBar } from '@/components/sections/ads/TrustBar'
import { ThreePillars } from '@/components/sections/home/ThreePillars'
import { AllFurnitureTypesNoLinks } from '@/components/sections/ads/AllFurnitureTypesNoLinks'
import { HowItWorks } from '@/components/sections/home/HowItWorks'
import { ReviewsSection } from '@/components/ui/ReviewsSection'
import { LandingContactForm } from '@/components/sections/ads/LandingContactForm'
import { StickyMobileCTA } from '@/components/sections/ads/StickyMobileCTA'

export const metadata = {
  ...buildMetadata({
    title: 'Custom Live Edge, River & Ocean Tables | Green Mountain Tableworx',
    description: 'Handcrafted live edge, river & ocean tables built to your exact specifications. Two showrooms in Concord NH & Smithfield RI. In-home delivery across New England. Get a free quote today.',
    path: '/ads',
  }),
  robots: { index: false, follow: false },
}

export default function AdsPage() {
  return (
    <>
      <LandingHero />
      <TrustBar />
      <ThreePillars hideExploreLink />
      <AllFurnitureTypesNoLinks />
      <HowItWorks ctaHref="#contact-form" />
      <ReviewsSection />
      <LandingContactForm />
      <StickyMobileCTA />
      {/* Padding so sticky mobile CTA doesn't overlap last section */}
      <div className="h-16 lg:hidden bg-gmt-forest" />
    </>
  )
}
