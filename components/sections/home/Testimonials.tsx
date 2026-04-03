import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { TestimonialCard } from '@/components/ui/TestimonialCard'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

// TODO: Replace with client-supplied testimonials
const testimonials = [
  {
    quote: "I had a great experience working with Nikki to get a custom cocktail tray and end table for my living room. I would recommend Green Mountain Table for anyone wanting unique and charming accent pieces for the home!",
    name: 'Peter V.',
    piece: 'Custom Cocktail Tray & End Table',
  },
  {
    quote: "This was the best experience ever getting a piece of furniture from the moment I walked in there to the delivery. It was so professional and right on point! The table and bench is like nothing I've ever seen before. It's absolutely gorgeous and beautiful quality. Thank you guys for an amazing experience!",
    name: 'Lisa G.',
    piece: 'Custom Table & Bench',
  },
  {
    quote: "Can a company make your dream come true? The answer is YES, if your dream is to have a unique dining room table that represents water, beaches and waves. The people & artists at Green Mountain exceeded my expectations, and they were high. I am still amazed every time I look at it. Everyone was so sweet & nice to work with.",
    name: 'Tamara C.',
    piece: 'Custom Ocean Dining Table',
  },
]

export function Testimonials() {
  return (
    <section className="bg-gmt-offwhite py-24 md:py-32">
      <Container>
        <RevealOnScroll>
          <div className="w-12 h-px bg-gmt-green mb-4" />
          <h2 className="font-display text-4xl md:text-5xl text-gmt-forest">What Our Customers Say</h2>
          <div className="flex flex-col sm:flex-row gap-8 mt-6">
            <div>
              <p className="font-display text-4xl md:text-5xl text-gmt-green">75+</p>
              <p className="font-body text-sm text-gmt-stone uppercase tracking-[0.08em] mt-1">Five Star Reviews</p>
            </div>
            <div>
              <p className="font-display text-4xl md:text-5xl text-gmt-green">4.9</p>
              <p className="font-body text-sm text-gmt-stone uppercase tracking-[0.08em] mt-1">Star Average</p>
            </div>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {testimonials.map((t, index) => (
            <RevealOnScroll key={t.name} delay={index * 0.1}>
              <TestimonialCard {...t} />
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-4 mt-12 justify-center">
            <a
              href="https://reviewthis.biz/gmtw-ri"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-body text-sm text-white bg-gmt-green px-8 py-4 hover:bg-gmt-forest transition-colors duration-300 text-center"
            >
              Leave Review | RI Location
            </a>
            <a
              href="https://g.page/r/CYF_xzepPOW0EBM/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-body text-sm text-white bg-gmt-green px-8 py-4 hover:bg-gmt-forest transition-colors duration-300 text-center"
            >
              Leave Review | NH Location
            </a>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  )
}
