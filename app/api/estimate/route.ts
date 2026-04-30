import { Resend } from 'resend'
import { headers } from 'next/headers'
import { checkRateLimit } from '@/lib/rateLimit'
import { buildTeamEmailHtml } from '@/lib/emails/EstimateEmailTeam'
import { buildCustomerEmailHtml } from '@/lib/emails/EstimateEmailCustomer'

function sanitizeHeader(s: string) {
  return s.replace(/[\r\n\0]/g, '').trim()
}

// Tier 2 (premium/exotic) species — everything else is Tier 1
const TIER2_SPECIES = new Set(['acacia', 'buckeye-burl', 'claro-walnut', 'olivewood', 'monkey-pod'])

interface ItemizedLine {
  label: string
  price: number
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function calculatePrice(data: any) {
  const sqFt = ((data.length || 0) * (data.width || 0)) / 144
  const linearFeet = (data.length || 0) / 12

  const itemized: ItemizedLine[] = []

  // Base: wood slab by square footage
  const woodRate = TIER2_SPECIES.has(data.woodSpecies) ? 225 : 168
  const woodCost = sqFt * woodRate
  let subtotal = woodCost
  itemized.push({ label: 'Wood Slab', price: Math.round(woodCost) })

  // Resin pricing — ocean style applies even without a resin color selection
  const resinLabel = (data.epoxyColor && data.epoxyColor !== 'none')
    ? data.epoxyColor.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())
    : 'Resin'

  if (data.backgroundColor === 'ocean-style') {
    // Ocean: $75/lin ft resin + 10% upcharge on (wood + resin) combined
    const resinCost = 75 * linearFeet
    const oceanUpcharge = (subtotal + resinCost) * 0.10
    subtotal += resinCost + oceanUpcharge
    itemized.push({ label: `Resin — ${resinLabel} / Ocean Style`, price: Math.round(resinCost + oceanUpcharge) })
  } else if (data.epoxyColor && data.epoxyColor !== 'none') {
    // Non-ocean styles only apply if a resin color was chosen
    if (data.backgroundColor === 'media-style') {
      const resinCost = 90 * linearFeet
      subtotal += resinCost
      itemized.push({ label: `Resin — ${resinLabel} / Media Style`, price: Math.round(resinCost) })
    } else if (data.backgroundColor === 'artisan-series') {
      const resinCost = 125 * linearFeet
      subtotal += resinCost
      itemized.push({ label: `Resin — ${resinLabel} / Artisan Style`, price: Math.round(resinCost) })
    } else {
      const resinCost = 75 * linearFeet
      subtotal += resinCost
      itemized.push({ label: `Resin — ${resinLabel}`, price: Math.round(resinCost) })
    }
  }

  // Round/oval upcharge if diameter > 60"
  if ((data.tableShape === 'circle' || data.tableShape === 'oval') && (data.length || 0) > 60) {
    subtotal += 200
    itemized.push({ label: 'Round/Oval Shape Upcharge', price: 200 })
  }

  return {
    min: Math.round(subtotal * 0.90),
    max: Math.round(subtotal * 1.10),
    itemized,
  }
}

export async function POST(request: Request) {
  const ip = (await headers()).get('x-forwarded-for')?.split(',')[0] ?? 'unknown'
  if (!checkRateLimit(ip, 10, 60_000)) {
    return Response.json({ error: 'Too many requests' }, { status: 429 })
  }

  try {
    const data = await request.json()

    // Validate required fields
    if (!data.email || !data.name || !data.phone) {
      return Response.json(
        { error: 'Missing required fields: email, name, phone' },
        { status: 400 }
      )
    }

    const quotePrice = calculatePrice(data)

    // Send one team email with CC
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: 'Green Mountain Tableworx <estimates@greenmountaintable.com>',
      to: 'jamie@greenmountaintable.com',
      cc: ['nikki@greenmountaintable.com', 'contact@inboundnh.com'],
      subject: `New Estimate Request — ${sanitizeHeader(data.name)}`,
      html: buildTeamEmailHtml(data, quotePrice),
    })

    // Send email to customer
    await resend.emails.send({
      from: 'Green Mountain Tableworx <estimates@greenmountaintable.com>',
      to: data.email,
      subject: 'Your Green Mountain Tableworx Estimate',
      html: buildCustomerEmailHtml(data, quotePrice),
    })

    return Response.json({
      success: true,
      message: 'Your estimate request has been received!',
      estimatedPrice: quotePrice,
    })
  } catch (error) {
    console.error('Estimate email error:', error)
    return Response.json(
      { error: 'Failed to send estimate. Please try again or contact us directly.' },
      { status: 500 }
    )
  }
}
