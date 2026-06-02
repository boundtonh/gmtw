import { Container } from '@/components/layout/Container'

const STATS = [
  { value: '75+',      label: 'Five Star Reviews' },
  { value: '4.9★',    label: 'Average Rating' },
  { value: '2',        label: 'NE Showrooms' },
  { value: 'In-Home', label: 'Delivery Available' },
]

export function TrustBar() {
  return (
    <div className="bg-[#0d1f14] py-4">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-0 md:divide-x md:divide-white/10">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center text-center px-4 py-1">
              <span className="font-display text-2xl md:text-3xl text-gmt-green leading-none">
                {stat.value}
              </span>
              <span className="font-body text-xs text-white/60 tracking-[0.1em] uppercase mt-1">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </div>
  )
}
