import type { Product } from './types'

export const products: Product[] = [
  {
    name: 'Live Edge Tables',
    slug: 'live-edge-tables',
    startingPrice: 1500,
    description:
      'Organic raw wood edge preserved from the natural slab. The most popular style — available as dining, conference, coffee, console, bench, or bar.',
    seoTitle: 'Custom Live Edge Tables | Green Mountain Tableworx',
    seoDescription:
      'Handcrafted live edge tables made to order in New Hampshire and Rhode Island. Starting at $1,500. Two showrooms: Concord NH & Smithfield RI.',
  },
  {
    name: 'River Tables',
    slug: 'river-tables',
    startingPrice: 1500,
    description:
      'Epoxy river running through the center of the slab. Available in any color — blues, greens, blacks, whites. High visual impact.',
    seoTitle: 'Custom River Tables — Epoxy Wood Furniture | Green Mountain Tableworx',
    seoDescription:
      'Custom river tables with epoxy inlay, handcrafted in New England. Starting at $1,500. Visit our Concord NH or Smithfield RI showroom.',
  },
  {
    name: 'Ocean Tables',
    slug: 'ocean-tables',
    startingPrice: 1500,
    description:
      'Coastal-inspired epoxy design — flowing, layered ocean aesthetic. Lighter and more airy than river tables.',
    seoTitle: 'Custom Ocean Tables — Coastal Epoxy Wood | Green Mountain Tableworx',
    seoDescription:
      'Handcrafted ocean epoxy tables in coastal-inspired colors. Custom orders for New England homes. Showrooms in Concord NH & Smithfield RI.',
  },
  {
    name: 'Dining Tables',
    slug: 'dining-tables',
    startingPrice: 1500,
    description:
      'Our most-requested category. Available as live edge, river, or ocean style — made to your exact dimensions.',
    seoTitle: 'Custom Live Edge Dining Tables | Green Mountain Tableworx',
    seoDescription:
      'Handcrafted live edge, river & ocean dining tables starting at $1,500. Custom orders for New England homes. Showrooms in Concord NH & Smithfield RI.',
  },
  {
    name: 'Conference Tables',
    slug: 'conference-tables',
    startingPrice: 2500,
    description:
      'Statement pieces for offices, boardrooms, and meeting rooms. Larger dimensions, live edge or epoxy options.',
    seoTitle: 'Custom Conference Tables — Live Edge & Epoxy | Green Mountain Tableworx',
    seoDescription:
      'Custom live edge and epoxy conference tables starting at $2,500. Made to order for New England offices. Concord NH & Smithfield RI showrooms.',
  },
  {
    name: 'Coffee Tables',
    slug: 'coffee-tables',
    startingPrice: 500,
    description:
      'An approachable entry point into custom live edge furniture. Great as a first custom piece for any living space.',
    seoTitle: 'Custom Live Edge Coffee Tables | Green Mountain Tableworx',
    seoDescription:
      'Handcrafted live edge coffee tables starting at $500. Custom orders for New England homes. Visit our NH or RI showroom.',
  },
  {
    name: 'Benches',
    slug: 'benches',
    startingPrice: 500,
    description:
      'Dining bench, entryway, bedroom, or mudroom — live edge benches made for the way you live.',
    seoTitle: 'Custom Live Edge Benches | Green Mountain Tableworx',
    seoDescription:
      'Handcrafted live edge wood benches starting at $500. Dining, entryway, and bedroom configurations. Custom orders across New England.',
  },
  {
    name: 'Console Tables',
    slug: 'console-tables',
    startingPrice: 750,
    description:
      'Entryway, hallway, and behind-sofa configurations. Live edge or straight edge, any wood species.',
    seoTitle: 'Custom Live Edge Console Tables | Green Mountain Tableworx',
    seoDescription:
      'Handcrafted live edge console tables starting at $750. Custom orders for New England homes. Showrooms in Concord NH & Smithfield RI.',
  },
  {
    name: 'Countertops & Island Tops',
    slug: 'countertops-island-tops',
    startingPrice: 'inquire',
    description:
      'Kitchen and island integration in live edge or straight configurations. Pricing based on dimensions — inquire for a quote.',
    seoTitle: 'Custom Wood Countertops & Island Tops | Green Mountain Tableworx',
    seoDescription:
      'Custom wood countertops and kitchen island tops in live edge and straight styles. Serving all of New England. Inquire for pricing.',
  },
  {
    name: 'Standalone Bars & Bar Tops',
    slug: 'bars-bar-tops',
    startingPrice: 'inquire',
    description:
      'Home bar, entertaining spaces, and man cave configurations. Live edge or epoxy bar tops made to order.',
    seoTitle: 'Custom Live Edge Bar Tops | Green Mountain Tableworx',
    seoDescription:
      'Custom wood bar tops and standalone bars in live edge and epoxy styles. Serving New England. Inquire for pricing.',
  },
  {
    name: 'Floating Shelves & Mantels',
    slug: 'floating-shelves-mantels',
    startingPrice: 'inquire',
    description:
      'Fireplace mantels and floating shelf systems. Precision-fit to your space in any wood species.',
    seoTitle: 'Custom Wood Floating Shelves & Mantels | Green Mountain Tableworx',
    seoDescription:
      'Custom live edge floating shelves and fireplace mantels for New England homes. Inquire for pricing and lead time.',
  },
  {
    name: 'Wall Art & Signage',
    slug: 'wall-art-signage',
    startingPrice: 'inquire',
    description:
      'Wood art, branded signage, and personalized pieces. One-of-a-kind work for homes and businesses.',
    seoTitle: 'Custom Wood Wall Art & Signage | Green Mountain Tableworx',
    seoDescription:
      'Custom wood wall art and branded signage for New England homes and businesses. Inquire for pricing.',
  },
  {
    name: 'Table Bases',
    slug: 'table-bases',
    startingPrice: 'inquire',
    description:
      'Metal and wood bases available in multiple styles. Paired with any slab for a complete custom table.',
    seoTitle: 'Table Bases — Metal & Wood | Green Mountain Tableworx',
    seoDescription:
      'Table bases in metal and wood styles for custom dining and conference tables. Visit our Concord NH or Smithfield RI showroom.',
  },
]

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function formatPrice(price: number | 'inquire'): string {
  if (price === 'inquire') return 'Inquire Within'
  return `Starting at $${price.toLocaleString()}`
}
