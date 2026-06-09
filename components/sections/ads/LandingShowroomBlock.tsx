import { SingleShowroomSpot } from '@/components/sections/locations/SingleShowroomSpot'

const NH_MAP_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2908.140430861595!2d-71.53601379999999!3d43.2065438!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e1cb92b3099b75%3A0xb4e53ca937c77f81!2sGreen%20Mountain%20Tableworx!5e0!3m2!1sen!2sus!4v1775235502684!5m2!1sen!2sus'

const RI_MAP_EMBED =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2970.74045656283!2d-71.50356788835644!3d41.87693026536748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89e44774a0844d21%3A0x82074a62ef447864!2sGreen%20Mountain%20Tableworx!5e0!3m2!1sen!2sus!4v1775235527814!5m2!1sen!2sus'

const SHOWROOMS = {
  nh: {
    slug: 'concord-nh' as const,
    city: 'Concord',
    state: 'NH',
    address: '84 N Main St',
    zip: '03301',
    phone: '(603) 565-5483',
    coords: { lat: 43.2081, lng: -71.5376 },
    mapEmbed: NH_MAP_EMBED,
    bodyText: 'Stop by our Concord showroom to see our custom pieces in person. Our team is here to help you bring your vision to life.',
  },
  ri: {
    slug: 'smithfield-ri' as const,
    city: 'Smithfield',
    state: 'RI',
    address: '2 Esmond St',
    zip: '02917',
    phone: '(401) 354-9600',
    coords: { lat: 41.8918, lng: -71.5440 },
    mapEmbed: RI_MAP_EMBED,
    bodyText: 'Stop by our Smithfield showroom to see our custom pieces in person. Our team is here to help you bring your vision to life.',
  },
}

interface LandingShowroomBlockProps {
  location: 'nh' | 'ri'
}

export function LandingShowroomBlock({ location }: LandingShowroomBlockProps) {
  const showroom = SHOWROOMS[location]
  return <SingleShowroomSpot {...showroom} hideEstimateLink />
}
