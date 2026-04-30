import { Resend } from 'resend'

function escape(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

export async function POST(request: Request) {
  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const { name, email, phone, city, project } = await request.json()

    // Validate required fields
    if (!name || !email || !phone || !city || !project) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    await resend.emails.send({
      from: 'Green Mountain Tableworx <jamie@greenmountaintable.com>',
      to: ['jamie@greenmountaintable.com', 'nikki@greenmountaintable.com', 'contact@inboundnh.com'],
      subject: `New Project Inquiry — ${escape(name)}`,
      html: `
        <h2>New Project Inquiry</h2>
        <p><strong>Name:</strong> ${escape(name)}</p>
        <p><strong>Email:</strong> ${escape(email)}</p>
        <p><strong>Phone:</strong> ${escape(phone)}</p>
        <p><strong>City:</strong> ${escape(city)}</p>
        <hr />
        <h3>Project Details:</h3>
        <p>${escape(project).replace(/\n/g, '<br />')}</p>
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
