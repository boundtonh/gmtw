import { Resend } from 'resend'
import { EstimateEmail } from '@/lib/emails/EstimateEmail'
import { EstimateEmailTeam } from '@/lib/emails/EstimateEmailTeam'

const resend = new Resend(process.env.RESEND_API_KEY)

function calculatePrice(data: any) {
  const linearFeet = (data.length || 0) / 12

  // Base: wood slab cost per linear foot
  let subtotal = linearFeet * 250

  // Resin & Color: $75/lin ft if any epoxy selected
  if (data.epoxyColor && data.epoxyColor !== 'none') {
    subtotal += 75 * linearFeet
  }

  // Specialty Resin Themes
  if (data.backgroundColor === 'ocean-style') {
    subtotal *= 1.10                                                              // +10%
  } else if (data.backgroundColor === 'media-style' || data.backgroundColor === 'artisan-series') {
    subtotal += 15 * linearFeet                                                   // +$15/lin ft
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

    // Send email to customer
    await resend.emails.send({
      from: 'estimates@greenmountaintableworx.com',
      to: data.email,
      subject: `Your Custom Table Estimate — Green Mountain Tableworx`,
      react: EstimateEmail({ data, quotePrice }),
    })

    // Send email to team (both Jamie and Nikki)
    const teamEmails = ['jamie@greenmountaintable.com', 'nikki@greenmountaintable.com']
    for (const email of teamEmails) {
      await resend.emails.send({
        from: 'estimates@greenmountaintableworx.com',
        to: email,
        subject: `New Estimate Request — ${data.name}`,
        react: EstimateEmailTeam({ data, quotePrice }),
      })
    }

    return Response.json({
      success: true,
      message: 'Your estimate has been sent! Check your email for details.',
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
