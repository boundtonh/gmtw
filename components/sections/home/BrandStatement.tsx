import { Container } from '@/components/layout/Container'
import { RevealOnScroll } from '@/components/ui/RevealOnScroll'

export function BrandStatement() {
  return (
    <section className="bg-gmt-offwhite py-24 md:py-32">
      <Container>
        <div className="max-w-3xl mx-auto text-center">
          <RevealOnScroll>
            <div className="w-12 h-px bg-gmt-green mx-auto mb-8" />
            <p className="font-display italic text-2xl md:text-3xl text-gmt-forest leading-relaxed">
              &ldquo;Every piece begins with a single slab of wood — its grain, its history, its character. We build around that.&rdquo;
            </p>
          </RevealOnScroll>
        </div>
      </Container>
    </section>
  )
}
