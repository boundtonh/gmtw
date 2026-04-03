export interface Product {
  name: string
  slug: string
  startingPrice: number | 'inquire'
  description: string
  seoTitle: string
  seoDescription: string
}

export interface Location {
  name: string
  slug: string
  address: string
  city: string
  state: string
  zip: string
  phone: string
  coords: { lat: number; lng: number }
}
