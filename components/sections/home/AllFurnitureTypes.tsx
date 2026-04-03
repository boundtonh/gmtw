import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { ProductCard } from '@/components/ui/ProductCard'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { products } from '@/lib/products'

// Exclude signature styles (live edge, river, ocean) and table bases — those have dedicated sections
const EXCLUDED_SLUGS = new Set(['live-edge-tables', 'river-tables', 'ocean-tables', 'table-bases'])
const furnitureProducts = products.filter((p) => !EXCLUDED_SLUGS.has(p.slug))

export function AllFurnitureTypes() {
  return (
    <section className="bg-gmt-mist py-24 md:py-32">
      <Container>
        <RevealOnScroll>
          <SectionLabel>What We Make</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl text-gmt-forest mt-2">
            A Custom Piece for Every Room
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-12">
          {furnitureProducts.map((product, index) => (
            <RevealOnScroll key={product.slug} delay={Math.min(index, 3) * 0.1}>
              <ProductCard {...product} />
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  )
}
