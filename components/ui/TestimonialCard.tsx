interface TestimonialCardProps {
  quote: string
  name: string
  piece: string
}

export function TestimonialCard({ quote, name, piece }: TestimonialCardProps) {
  return (
    <div>
      <p className="font-display text-5xl text-gmt-green leading-none mb-4" aria-hidden="true">&ldquo;</p>
      <p className="font-body italic text-gmt-forest text-base leading-relaxed">&ldquo;{quote}&rdquo;</p>
      <p className="font-body font-medium text-gmt-forest text-sm mt-4">{name}</p>
      <p className="font-body text-gmt-stone text-xs tracking-[0.1em] uppercase mt-1">{piece}</p>
    </div>
  )
}
