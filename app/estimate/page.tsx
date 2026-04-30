import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { EstimateForm } from './EstimateForm'

export const metadata: Metadata = buildMetadata({
  title: 'Live Edge, River & Ocean Table Price Calculator | Green Mountain Tableworx',
  description:
    "Spec your custom live edge, river or ocean table online. Choose wood species, dimensions, epoxy, edge style, and base. We'll prepare your estimate within 24 hours.",
  path: '/estimate',
})

export default function EstimatePage() {
  return <EstimateForm />
}
