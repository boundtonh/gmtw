import { Resend } from 'resend'
import { EstimateEmail } from '@/lib/emails/EstimateEmail'
import { EstimateEmailTeam } from '@/lib/emails/EstimateEmailTeam'

const resend = new Resend(process.env.RESEND_API_KEY)

// Basic pricing calculation
// TODO: Replace with actual pricing formula from client
function calculatePrice(data: any) {
  const basePrice = 1500 // Starting price for dining tables

  // Adjust based on furniture type
  const typeMultiplier: Record<string, number> = {
    'dining-tables': 1,
    'conference-tables': 1.5,
    'coffee-tables': 0.4,
    'benches': 0.5,
    'console-tables': 0.6,
  }
  const typeAdjustment = typeMultiplier[data.furnitureType] || 1

  // Adjust based on dimensions
  const dimensionCost = (data.length + data.width) * 3
  const subtotal = basePrice * typeAdjustment + dimensionCost

  // Adjust for materials and options
  let optionsCost = 0
  if (data.epoxyColor && data.epoxyColor !== 'none') optionsCost += 200
  if (data.engraving) optionsCost += 150

  const total = subtotal + optionsCost

  return {
    min: Math.round(total * 0.95), // 5% discount
    max: Math.round(total * 1.15), // 15% buffer
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
