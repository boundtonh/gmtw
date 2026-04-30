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
  title: 'Custom Live Edge & River Tables | Green Mountain Tableworx — Smithfield, RI',
  description:
    'Handcrafted live edge, river & ocean tables in Smithfield, Rhode Island. Custom dining tables, benches, countertops & more starting at $1,500. Visit our showroom at 2 Esmond St or get an instant quote online.',
  path: '/locations/smithfield-ri',
})

const MAP_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2970.74045656283!2d-71.50356788835644!3d41.87693026536748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e44774a0844d21%3A0x82074a62ef447864!2sGreen%20Mountain%20Tableworx!5e0!3m2!1sen!2sus!4v1775235527814!5m2!1sen!2sus'

export default function SmithfieldRIPage() {
  return (
    <>
      <LocationHeroSection
        headline={"Custom Wood Furniture\nSmithfield, Rhode Island"}
        subheadline="Live edge, river & ocean tables handcrafted in New England. Visit our Smithfield showroom or build your piece online."
        address="2 Esmond St"
        city="Smithfield"
        state="RI"
        zip="02917"
        phone="(401) 354-9600"
        otherCity="Concord"
        otherState="NH"
      />
      <ThreePillars />
      <AllFurnitureTypes />
      <EstimatePromo />
      <HowItWorks />
      <GallerySection />
      <TableBasesCallout />
      <Testimonials />
      <SingleShowroomSpot
        slug="smithfield-ri"
        city="Smithfield"
        state="RI"
        address="2 Esmond St"
        zip="02917"
        phone="(401) 354-9600"
        coords={{ lat: 41.8918, lng: -71.5440 }}
        mapEmbed={MAP_EMBED}
        bodyText="Explore our Smithfield showroom and see custom live edge slabs, river tables, and ocean tables in person. Our team is ready to help you design your one-of-a-kind piece — walk-ins welcome."
      />
      <ContactFormBanner
        headline="Start Your Custom Piece in Smithfield, RI"
        subtitle="Fill out your info and we'll reach out within 24 hours to discuss your project — or build your piece online now and get an instant quote."
      />
    </>
  )
}
