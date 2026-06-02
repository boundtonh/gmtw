import { Container } from '@/components/layout/Container'

const STATS = [
  { value: '75+',      label: 'Five Star Reviews' },
  { value: '4.9★',    label: 'Average Rating' },
  { value: '2',        label: 'NE Showrooms' },
  { value: 'In-Home', label: 'Delivery Available' },
]

export function TrustBar() {
  return (
    <div className="bg-[#0d1f14] min-h-[28vh] md:min-h-[15vh] md:py-4 flex items-center justify-center">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-white/10">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center px-4 py-4 md:py-1">
              <span className="font-display text-3xl md:text-3xl text-gmt-green leading-none">
                {stat.value}
              </span>
              <span className="font-body text-sm md:text-xs text-white/60 tracking-[0.1em] uppercase mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}
