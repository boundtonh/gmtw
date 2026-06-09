import { buildMetadata } from '@/lib/seo'
import { LandingHero } from '@/components/sections/ads/LandingHero'
import { TrustBar } from '@/components/sections/ads/TrustBar'
import { ThreePillars } from '@/components/sections/home/ThreePillars'
import { AllFurnitureTypesNoLinks } from '@/components/sections/ads/AllFurnitureTypesNoLinks'
import { HowItWorks } from '@/components/sections/home/HowItWorks'
import { ReviewsSection } from '@/components/ui/ReviewsSection'
import { LandingShowroomBlock } from '@/components/sections/ads/LandingShowroomBlock'
import { LandingContactForm } from '@/components/sections/ads/LandingContactForm'
import { StickyMobileCTA } from '@/components/sections/ads/StickyMobileCTA'

export const metadata = {
  ...buildMetadata({
    title: 'Custom Live Edge, River & Ocean Tables in New Hampshire | Green Mountain Tableworx',
    description: 'Handcrafted live edge, river & ocean tables built to your exact specifications. Visit our Concord, NH showroom or get a free quote today. In-home delivery across New England.',
    path: '/ads/nh',
  }),
  robots: { index: false, follow: false },
}

export default function AdsNHPage() {
  return (
    <>
      <LandingHero subtitle="Live Edge · River Tables · Ocean Tables — Serving New Hampshire & Beyond" />
      <TrustBar />
      <ThreePillars hideExploreLink />
      <AllFurnitureTypesNoLinks />
      <HowItWorks ctaHref="#contact-form" />
      <ReviewsSection />
      <LandingShowroomBlock location="nh" />
      <LandingContactForm showroomNote="Our Concord, NH showroom is open and ready to help — or leave your info and we'll reach out within 24 hours." />
      <StickyMobileCTA defaultPhone="(603) 565-5483" />
      <div className="h-16 lg:hidden bg-gmt-forest" />
    </>
  )
}
