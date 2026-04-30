import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { BasesHero } from '@/components/sections/table-bases/BasesHero'
import { BasesGallery } from '@/components/sections/table-bases/BasesGallery'
import { ContactFormBanner } from '@/components/ui/ContactFormBanner'

export const metadata: Metadata = buildMetadata({
  title: 'Table Bases — Iron & Handcrafted Wood | Green Mountain Tableworx',
  description:
    'Browse standard black iron, elegant Flowyline iron, and fully custom handcrafted wood table bases. Paired with any live edge, river, or ocean table. Showrooms in Concord NH & Smithfield RI.',
  path: '/table-bases',
})

export default function TableBasesPage() {
  return (
    <>
      <BasesHero />
      <section id="gallery" className="scroll-mt-20">
        <BasesGallery />
      </section>
      <ContactFormBanner
        headline="Ready to Spec Your Table Base?"
        subtitle="Leave your information, or build your table online and receive an instant quote to your email."
      />
    </>
  )
}
