import { Resend } from 'resend'
import { buildTeamEmailHtml } from '@/lib/emails/EstimateEmailTeam'

// Tier 2 (premium/exotic) species — everything else is Tier 1
const TIER2_SPECIES = new Set(['acacia', 'buckeye-burl', 'claro-walnut', 'olivewood', 'monkey-pod'])

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function calculatePrice(data: any) {
  const sqFt = ((data.length || 0) * (data.width || 0)) / 144
  const linearFeet = (data.length || 0) / 12

  // Base: wood slab by square footage
  const woodRate = TIER2_SPECIES.has(data.woodSpecies) ? 225 : 168
  let subtotal = sqFt * woodRate

  // Resin pricing — depends on style
  if (data.epoxyColor && data.epoxyColor !== 'none') {
    if (data.backgroundColor === 'ocean-style') {
      // Ocean: $75/lin ft + 10% of total price
      subtotal += 75 * linearFeet
      subtotal *= 1.10
    } else if (data.backgroundColor === 'media-style') {
      // Media: $75/lin ft + $15/lin ft = $90/lin ft
      subtotal += 90 * linearFeet
    } else if (data.backgroundColor === 'artisan-series') {
      // Artisan: $125/lin ft
      subtotal += 125 * linearFeet
    } else {
      // Base epoxy: $75/lin ft
      subtotal += 75 * linearFeet
    }
  }

  // Surface Finish: High-Gloss Resin +20%
  if (data.surfaceFinish === 'high-gloss-resin') {
    subtotal *= 1.20
  }

  // Round/oval upcharge if diameter > 60"
  if ((data.tableShape === 'circle' || data.tableShape === 'oval') && (data.length || 0) > 60) {
    subtotal += 200
  }

  return {
    min: Math.round(subtotal * 0.80),
    max: Math.round(subtotal * 1.20),
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
        from: 'jamie@greenmountaintable.com',
        to: email,
        subject: `New Estimate Request — ${data.name}`,
        html: buildTeamEmailHtml(data, quotePrice),
      })
    }

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
