import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { SectionLabel } from '@/components/ui/SectionLabel'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

const steps = [
  {
    number: '01',
    title: 'Estimate',
    description: 'Start online in minutes. Spec your wood, dimensions, epoxy, edge, and base.',
  },
  {
    number: '02',
    title: 'Consult',
    description: 'We refine your vision together — in our showroom or remotely.',
  },
  {
    number: '03',
    title: 'Craft',
    description: 'Your piece is handbuilt by our artisans in New England.',
  },
  {
    number: '04',
    title: 'Deliver',
    description: 'In-room delivery anywhere in New England. We bring it to you.',
  },
]

export function HowItWorks() {
  return (
    <section className="bg-gmt-cream py-24 md:py-32">
      <Container>
        <RevealOnScroll>
          <SectionLabel>The Process</SectionLabel>
          <h2 className="font-display text-4xl md:text-5xl text-gmt-forest mt-2">
            How a Custom Piece Comes to Life
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-16">
          {steps.map((step, index) => (
            <RevealOnScroll key={step.number} delay={index * 0.1}>
              <div>
                <p className="font-display text-5xl text-gmt-green/20 mb-4 leading-none">
                  {step.number}
                </p>
                <h3 className="font-body font-medium text-gmt-forest text-lg">
                  {step.title}
                </h3>
                <p className="font-body text-gmt-stone text-sm leading-relaxed mt-2">
                  {step.description}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll delay={0.3}>
          <div className="text-center mt-16">
            <p className="font-body text-gmt-stone text-sm mb-3">Ready to start?</p>
            <Link
              href="/estimate"
              className="font-body text-gmt-green text-base hover:text-gmt-forest transition-colors duration-200"
            >
              Get an Instant Estimate →
            </Link>
          </div>
        </RevealOnScroll>
      </Container>
    </section>
  )
}
