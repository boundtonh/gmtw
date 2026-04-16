import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { name, email, phone, city, project } = await request.json()

    // Validate required fields
    if (!name || !email || !phone || !city || !project) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Send email to business
    await resend.emails.send({
      from: 'contact@greenmountaintableworx.com',
      to: process.env.CONTACT_EMAIL || 'contact@inboundnh.com',
      subject: `New Project Inquiry — ${name}`,
      html: `
        <h2>New Project Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>City:</strong> ${city}</p>
        <hr />
        <h3>Project Details:</h3>
        <p>${project.replace(/\n/g, '<br />')}</p>
      `,
    })

    return Response.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return Response.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    )
  }
}
