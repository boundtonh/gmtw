import { Html, Head, Body, Container, Img, Heading, Text, Link, Hr, Section } from 'react-email'

interface EstimateEmailProps {
  data: any
  quotePrice: { min: number; max: number }
}

export function EstimateEmail({ data, quotePrice }: EstimateEmailProps) {
  const formatPrice = (price: number) => `$${price.toLocaleString()}`

  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: "'Alwyn New Rounded', Arial, sans-serif", backgroundColor: '#FAFAF7', margin: 0, padding: 0 }}>
        <Container style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 20px' }}>
          {/* Header */}
          <Section style={{ textAlign: 'center', marginBottom: '40px' }}>
            <Img
              src="https://greenmountaintableworx.com/images/logo/untitled.png"
              alt="Green Mountain Tableworx"
              width={140}
              height={81}
              style={{ margin: '0 auto' }}
            />
          </Section>

          {/* Main content */}
          <Heading style={{ color: '#009440', fontSize: '28px', margin: '30px 0 20px 0', textAlign: 'center' }}>
            Your Custom Table Estimate
          </Heading>

          <Text style={{ color: '#6B7066', fontSize: '16px', lineHeight: '1.6', marginBottom: '30px', textAlign: 'center' }}>
            Thank you for using our instant estimator! Here's a summary of your custom piece.
          </Text>

          {/* Specifications */}
          <Section style={{ backgroundColor: '#EFF5EC', borderLeft: '4px solid #009440', padding: '20px', borderRadius: '4px', marginBottom: '30px' }}>
            <Heading level={2} style={{ color: '#1A3D21', fontSize: '18px', margin: '0 0 15px 0' }}>
              Your Specifications
            </Heading>

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid #C8DFC0' }}>
                  <td style={{ padding: '10px 0', fontWeight: 'bold', color: '#1A3D21', width: '40%' }}>Furniture Type</td>
                  <td style={{ padding: '10px 0', color: '#6B7066' }}>{data.furnitureType?.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) || 'Not specified'}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #C8DFC0' }}>
                  <td style={{ padding: '10px 0', fontWeight: 'bold', color: '#1A3D21' }}>Dimensions</td>
                  <td style={{ padding: '10px 0', color: '#6B7066' }}>{data.length || '—'}" × {data.width || '—'}"</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #C8DFC0' }}>
                  <td style={{ padding: '10px 0', fontWeight: 'bold', color: '#1A3D21' }}>Wood Species</td>
                  <td style={{ padding: '10px 0', color: '#6B7066' }}>{data.woodSpecies?.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) || 'Not specified'}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #C8DFC0' }}>
                  <td style={{ padding: '10px 0', fontWeight: 'bold', color: '#1A3D21' }}>Table Shape</td>
                  <td style={{ padding: '10px 0', color: '#6B7066' }}>{data.tableShape?.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) || 'Not specified'}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #C8DFC0' }}>
                  <td style={{ padding: '10px 0', fontWeight: 'bold', color: '#1A3D21' }}>Edge Style</td>
                  <td style={{ padding: '10px 0', color: '#6B7066' }}>{data.edgeStyle?.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) || 'Not specified'}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #C8DFC0' }}>
                  <td style={{ padding: '10px 0', fontWeight: 'bold', color: '#1A3D21' }}>Epoxy Color</td>
                  <td style={{ padding: '10px 0', color: '#6B7066' }}>{data.epoxyColor?.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) || 'None'}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #C8DFC0' }}>
                  <td style={{ padding: '10px 0', fontWeight: 'bold', color: '#1A3D21' }}>Background</td>
                  <td style={{ padding: '10px 0', color: '#6B7066' }}>{data.backgroundColor?.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) || 'Not specified'}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #C8DFC0' }}>
                  <td style={{ padding: '10px 0', fontWeight: 'bold', color: '#1A3D21' }}>Finish</td>
                  <td style={{ padding: '10px 0', color: '#6B7066' }}>{data.surfaceFinish?.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) || 'Not specified'}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #C8DFC0' }}>
                  <td style={{ padding: '10px 0', fontWeight: 'bold', color: '#1A3D21' }}>Engraving</td>
                  <td style={{ padding: '10px 0', color: '#6B7066' }}>{data.engraving ? 'Yes' : 'No'}</td>
                </tr>
                <tr>
                  <td style={{ padding: '10px 0', fontWeight: 'bold', color: '#1A3D21' }}>Table Base</td>
                  <td style={{ padding: '10px 0', color: '#6B7066' }}>{data.tableBase?.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) || 'Not specified'}</td>
                </tr>
              </tbody>
            </table>
          </Section>

          {/* Price estimate */}
          <Section style={{ backgroundColor: '#F7F5F0', padding: '30px', borderRadius: '4px', marginBottom: '30px', textAlign: 'center' }}>
            <Heading level={2} style={{ color: '#009440', fontSize: '24px', margin: '0 0 10px 0' }}>
              Estimated Price Range
            </Heading>
            <Text style={{ fontSize: '32px', fontWeight: 'bold', color: '#1A3D21', margin: '10px 0' }}>
              {formatPrice(quotePrice.min)} — {formatPrice(quotePrice.max)}
            </Text>
            <Text style={{ color: '#6B7066', fontSize: '14px', margin: '10px 0 0 0' }}>
              *Final pricing based on materials, customization, and delivery
            </Text>
          </Section>

          <Hr style={{ borderColor: '#C8DFC0', margin: '30px 0' }} />

          {/* Next steps */}
          <Section style={{ marginBottom: '30px' }}>
            <Heading level={2} style={{ color: '#1A3D21', fontSize: '18px', margin: '0 0 15px 0' }}>
              What's Next?
            </Heading>
            <Text style={{ color: '#6B7066', fontSize: '16px', lineHeight: '1.6', margin: '0' }}>
              Our team will review your specifications and reach out within 24 hours to:
            </Text>
            <ul style={{ color: '#6B7066', fontSize: '16px', lineHeight: '1.8', margin: '15px 0' }}>
              <li>Confirm details and answer any questions</li>
              <li>Discuss material options and finishes</li>
              <li>Provide a more detailed quote</li>
              <li>Talk through timeline and delivery</li>
            </ul>
          </Section>

          {/* Contact info */}
          <Section style={{ backgroundColor: '#1A3D21', color: 'white', padding: '30px', borderRadius: '4px', textAlign: 'center' }}>
            <Heading level={2} style={{ color: '#009440', fontSize: '18px', margin: '0 0 15px 0' }}>
              Green Mountain Tableworx
            </Heading>
            <Text style={{ margin: '10px 0', fontSize: '14px' }}>
              Concord, NH Showroom<br />
              84 N Main St, Concord, NH 03301<br />
              (603) 565-5483
            </Text>
            <Text style={{ margin: '15px 0 0 0', fontSize: '14px' }}>
              Smithfield, RI Showroom<br />
              2 Esmond St, Smithfield, RI 02917<br />
              (401) 354-9600
            </Text>
            <Text style={{ margin: '20px 0 0 0', fontSize: '12px', color: '#C8DFC0' }}>
              In-room delivery available across New England
            </Text>
          </Section>

          {/* Footer */}
          <Text style={{ color: '#6B7066', fontSize: '12px', textAlign: 'center', margin: '30px 0 0 0' }}>
            © {new Date().getFullYear()} Green Mountain Tableworx. All rights reserved.
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
