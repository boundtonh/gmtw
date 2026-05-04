import { Resend } from 'resend'
import { headers } from 'next/headers'
import { checkRateLimit } from '@/lib/rateLimit'

function escape(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function sanitizeHeader(s: string) {
  return s.replace(/[\r\n\0]/g, '').trim()
}

export async function POST(request: Request) {
  const ip = (await headers()).get('x-forwarded-for')?.split(',')[0] ?? 'unknown'
  if (!checkRateLimit(ip, 10, 60_000)) {
    return Response.json({ error: 'Too many requests' }, { status: 429 })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)

  try {
    const { name, email, phone, city, project, hearAboutUs } = await request.json()

    if (!name || !email || !phone || !city || !project) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 })
    }

    await resend.emails.send({
      from: 'Green Mountain Tableworx <estimates@greenmountaintable.com>',
      to: ['jamie@greenmountaintable.com', 'nikki@greenmountaintable.com', 'contact@inboundnh.com'],
      subject: `New Project Inquiry — ${sanitizeHeader(name)}`,
      html: `
        <h2>New Project Inquiry</h2>
        <p><strong>Name:</strong> ${escape(name)}</p>
        <p><strong>Email:</strong> ${escape(email)}</p>
        <p><strong>Phone:</strong> ${escape(phone)}</p>
        <p><strong>City:</strong> ${escape(city)}</p>
        ${hearAboutUs ? `<p><strong>How They Heard About Us:</strong> ${escape(hearAboutUs)}</p>` : ''}
        <hr />
        <h3>Project Details:</h3>
        <p>${escape(project).replace(/\n/g, '<br />')}</p>
      `,
    })

    return Response.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)
    return Response.json({ error: 'Failed to submit form' }, { status: 500 })
  }
}
