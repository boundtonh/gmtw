import type { Location } from './types'

export const locations: Location[] = [
  {
    name: 'Concord, NH Showroom',
    slug: 'concord-nh',
    address: '84 N Main St',
    city: 'Concord',
    state: 'NH',
    zip: '03301',
    phone: '(603) 565-5483',
    coords: { lat: 43.2081, lng: -71.5376 },
  },
  {
    name: 'Smithfield, RI Showroom',
    slug: 'smithfield-ri',
    address: '2 Esmond St',
    city: 'Smithfield',
    state: 'RI',
    zip: '02917',
    phone: '(401) 354-9600',
    coords: { lat: 41.8918, lng: -71.5440 },
  },
]

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug)
}
