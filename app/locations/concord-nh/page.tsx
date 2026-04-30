import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { LocationHeroSection } from '@/components/sections/locations/LocationHeroSection'
import { EstimatePromo } from '@/components/sections/home/EstimatePromo'
import { ThreePillars } from '@/components/sections/home/ThreePillars'
import { AllFurnitureTypes } from '@/components/sections/home/AllFurnitureTypes'
import { HowItWorks } from '@/components/sections/home/HowItWorks'
import { GallerySection } from '@/components/sections/home/GallerySection'
import { TableBasesCallout } from '@/components/sections/home/TableBasesCallout'
import { Testimonials } from '@/components/sections/home/Testimonials'
import { SingleShowroomSpot } from '@/components/sections/locations/SingleShowroomSpot'
import { ContactFormBanner } from '@/components/ui/ContactFormBanner'

export const metadata: Metadata = buildMetadata({
  title: 'Custom Wood Furniture in Concord, NH | Green Mountain Tableworx',
  description:
    'Handcrafted live edge, river & ocean tables in Concord, New Hampshire. Custom dining tables, benches, countertops & more starting at $1,500. Visit our showroom at 84 N Main St or get an instant quote online.',
  path: '/locations/concord-nh',
})

const MAP_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2908.140430861595!2d-71.53601379999999!3d43.2065438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e1cb92b3099b75%3A0xb4e53ca937c77f81!2sGreen%20Mountain%20Tableworx!5e0!3m2!1sen!2sus!4v1775235502684!5m2!1sen!2sus'

export default function ConcordNHPage() {
  return (
    <>
      <LocationHeroSection
        headline={"Custom Wood Furniture\nConcord, New Hampshire"}
        subheadline="Live edge, river & ocean tables handcrafted in New England. Visit our Concord showroom or build your piece online."
        address="84 N Main St"
        city="Concord"
        state="NH"
        zip="03301"
        phone="(603) 565-5483"
        otherCity="Smithfield"
        otherState="RI"
      />
      <ThreePillars />
      <AllFurnitureTypes />
      <EstimatePromo />
      <HowItWorks />
      <GallerySection />
      <TableBasesCallout />
      <Testimonials />
      <SingleShowroomSpot
        slug="concord-nh"
        city="Concord"
        state="NH"
        address="84 N Main St"
        zip="03301"
        phone="(603) 565-5483"
        coords={{ lat: 43.2081, lng: -71.5376 }}
        mapEmbed={MAP_EMBED}
        bodyText="Walk through our Concord showroom and see live edge slabs, river tables, and ocean tables up close. Our team is here to help you spec your custom piece — no pressure, just furniture."
      />
      <ContactFormBanner
        headline="Start Your Custom Piece in Concord, NH"
        subtitle="Fill out your info and we'll reach out within 24 hours to discuss your project — or build your piece online now and get an instant quote."
      />
    </>
  )
}
