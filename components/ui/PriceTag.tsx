interface PriceTagProps {
  price: number | 'inquire'
  className?: string
}

export function PriceTag({ price, className }: PriceTagProps) {
  return (
    <span className={`font-body text-xs text-gmt-stone ${className ?? ''}`}>
      {price === 'inquire' ? 'Inquire Within' : `Starting at $${price.toLocaleString()}`}
    </span>
  )
}
