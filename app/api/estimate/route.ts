import { Resend } from 'resend'
import { buildTeamEmailHtml } from '@/lib/emails/EstimateEmailTeam'
import { buildCustomerEmailHtml } from '@/lib/emails/EstimateEmailCustomer'

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

  // Resin pricing — depends on style
  if (data.epoxyColor && data.epoxyColor !== 'none') {
    let resinCost = 0
    const resinLabel = data.epoxyColor ? data.epoxyColor.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) : 'Resin'

    if (data.backgroundColor === 'ocean-style') {
      // Ocean: $75/lin ft + 10% of subtotal
      resinCost = 75 * linearFeet
      const oceanTenPercent = subtotal * 0.10
      subtotal += resinCost + oceanTenPercent
      itemized.push({ label: `Resin — ${resinLabel} / Ocean Style`, price: Math.round(resinCost + oceanTenPercent) })
    } else if (data.backgroundColor === 'media-style') {
      // Media: $90/lin ft
      resinCost = 90 * linearFeet
      subtotal += resinCost
      itemized.push({ label: `Resin — ${resinLabel} / Media Style`, price: Math.round(resinCost) })
    } else if (data.backgroundColor === 'artisan-series') {
      // Artisan: $125/lin ft
      resinCost = 125 * linearFeet
      subtotal += resinCost
      itemized.push({ label: `Resin — ${resinLabel} / Artisan Style`, price: Math.round(resinCost) })
    } else {
      // Base epoxy: $75/lin ft
      resinCost = 75 * linearFeet
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

    // Send email to team (both Jamie and Nikki)
    const resend = new Resend(process.env.RESEND_API_KEY)
    const teamEmails = ['jamie@greenmountaintable.com', 'nikki@greenmountaintable.com']
    for (const email of teamEmails) {
      await resend.emails.send({
        from: 'Green Mountain Tableworx <estimates@greenmountaintable.com>',
        to: email,
        subject: `New Estimate Request — ${data.name}`,
        html: buildTeamEmailHtml(data, quotePrice),
      })
    }

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
