import Image from 'next/image'
import Link from 'next/link'
import { PriceTag } from './PriceTag'
import type { Product } from '@/lib/types'

// Map of slugs to their image filenames
const IMAGE_MAP: Record<string, string | null> = {
  'dining-tables': 'dining-table.jpg',
  'conference-tables': 'conference-table.jpg',
  'console-tables': 'console-table.jpg',
  'benches': 'bench.png',
  'floating-shelves-mantels': 'mantel.png',
  'wall-art-signage': 'wall-art.jpg',
  'coffee-tables': 'coffee-table.webp',
  'countertops-island-tops': 'countertop.webp',
  'bars-bar-tops': 'bartop.avif',
}

export function ProductCard({ name, slug, startingPrice }: Product) {
  const imageSrc = IMAGE_MAP[slug]
  return (
    <Link href={`/${slug}`} className="group block">
      {/* Thumbnail */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gmt-forest mb-3">
        {imageSrc ? (
          <Image
            src={`/images/furniture-types/${imageSrc}`}
            fill
            alt={`${name} — custom live edge furniture`}
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gmt-forest to-gmt-charcoal transition-transform duration-700 ease-out group-hover:scale-105" />
        )}
        <div className="absolute inset-0 bg-gmt-green/0 group-hover:bg-gmt-green/10 transition-colors duration-300" />
      </div>

      <h3 className="font-body font-medium text-gmt-forest text-sm group-hover:text-gmt-green transition-colors duration-200 mb-1">
        {name}
      </h3>
      <PriceTag price={startingPrice} />
    </Link>
  )
}
