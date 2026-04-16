import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'
import { TestimonialCard } from '@/components/ui/TestimonialCard'

const REVIEWS = [
  {
    quote: "We've had our river table for two years and it still stops every single person who walks into our house. The quality is unreal — it's the first thing people ask about.",
    name: 'Sarah M.',
    piece: 'Custom River Dining Table — Concord, NH',
  },
  {
    quote: "I was nervous ordering a custom piece without seeing it first, but the team walked me through every step. The ocean table they built for my office is absolutely stunning.",
    name: 'James T.',
    piece: 'Custom Ocean Conference Table — Providence, RI',
  },
  {
    quote: "The live edge walnut table we ordered exceeded every expectation. The craftsmanship is heirloom quality — we plan on passing this down.",
    name: 'Karen & David L.',
    piece: 'Live Edge Dining Table — Burlington, VT',
  },
  {
    quote: "Fast turnaround, great communication, and the piece itself is jaw-dropping. The epoxy color we picked came out even better than the sample. Couldn't be happier.",
    name: 'Mike R.',
    piece: 'Custom River Coffee Table — Smithfield, RI',
  },
]

export function ReviewsSection() {
  return (
    <section className="bg-gmt-offwhite py-16 md:py-20">
      <Container>
        <RevealOnScroll>
          <SectionLabel>Customer Reviews</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl text-gmt-forest leading-tight mt-2 mb-6">
            What our clients say
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {REVIEWS.map((review, index) => (
            <RevealOnScroll key={review.name} delay={Math.min(index, 3) * 0.1}>
              <TestimonialCard
                quote={review.quote}
                name={review.name}
                piece={review.piece}
              />
            </RevealOnScroll>
          ))}
        </div>
      </Container>
    </section>
  )
}
