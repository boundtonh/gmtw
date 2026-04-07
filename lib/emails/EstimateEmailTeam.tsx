import { Html, Head, Body, Container, Heading, Text, Hr, Section } from 'react-email'

interface EstimateEmailTeamProps {
  data: any
  quotePrice: { min: number; max: number }
}

export function EstimateEmailTeam({ data, quotePrice }: EstimateEmailTeamProps) {
  const formatPrice = (price: number) => `$${price.toLocaleString()}`

  return (
    <Html>
      <Head />
      <Body style={{ fontFamily: "'Alwyn New Rounded', Arial, sans-serif", backgroundColor: '#FAFAF7', margin: 0, padding: 0 }}>
        <Container style={{ maxWidth: '700px', margin: '0 auto', padding: '40px 20px' }}>
          {/* Header */}
          <Heading style={{ color: '#009440', fontSize: '28px', margin: '0 0 10px 0' }}>
            New Estimate Request
          </Heading>
          <Text style={{ color: '#6B7066', fontSize: '14px', margin: '0 0 30px 0' }}>
            From: <strong>{data.name}</strong>
          </Text>

          {/* Customer info */}
          <Section style={{ backgroundColor: '#EFF5EC', borderLeft: '4px solid #009440', padding: '20px', borderRadius: '4px', marginBottom: '30px' }}>
            <Heading level={2} style={{ color: '#1A3D21', fontSize: '16px', margin: '0 0 15px 0' }}>
              Customer Information
            </Heading>
            <table style={{ width: '100%' }}>
              <tbody>
                <tr>
                  <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#1A3D21', width: '30%' }}>Name</td>
                  <td style={{ padding: '8px 0', color: '#6B7066' }}>{data.name}</td>
                </tr>
                <tr>
                  <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#1A3D21' }}>Email</td>
                  <td style={{ padding: '8px 0', color: '#6B7066' }}>{data.email}</td>
                </tr>
                <tr>
                  <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#1A3D21' }}>Phone</td>
                  <td style={{ padding: '8px 0', color: '#6B7066' }}>{data.phone}</td>
                </tr>
                <tr>
                  <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#1A3D21' }}>Preferred Location</td>
                  <td style={{ padding: '8px 0', color: '#6B7066' }}>
                    {data.preferredLocation === 'concord-nh' ? 'Concord, NH' : data.preferredLocation === 'smithfield-ri' ? 'Smithfield, RI' : 'Remote / Delivery'}
                  </td>
                </tr>
              </tbody>
            </table>
          </Section>

          {/* Specifications */}
          <Section style={{ backgroundColor: '#F7F5F0', padding: '20px', borderRadius: '4px', marginBottom: '30px' }}>
            <Heading level={2} style={{ color: '#1A3D21', fontSize: '16px', margin: '0 0 15px 0' }}>
              Specifications
            </Heading>
            <table style={{ width: '100%' }}>
              <tbody>
                <tr>
                  <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#1A3D21', width: '30%' }}>Furniture Type</td>
                  <td style={{ padding: '8px 0', color: '#6B7066' }}>{data.furnitureType?.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) || '—'}</td>
                </tr>
                <tr>
                  <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#1A3D21' }}>Dimensions</td>
                  <td style={{ padding: '8px 0', color: '#6B7066' }}>{data.length || '—'}" × {data.width || '—'}"</td>
                </tr>
                <tr>
                  <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#1A3D21' }}>Wood Species</td>
                  <td style={{ padding: '8px 0', color: '#6B7066' }}>{data.woodSpecies?.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) || '—'}</td>
                </tr>
                <tr>
                  <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#1A3D21' }}>Table Shape</td>
                  <td style={{ padding: '8px 0', color: '#6B7066' }}>{data.tableShape?.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) || '—'}</td>
                </tr>
                <tr>
                  <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#1A3D21' }}>Edge Style</td>
                  <td style={{ padding: '8px 0', color: '#6B7066' }}>{data.edgeStyle?.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) || '—'}</td>
                </tr>
                <tr>
                  <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#1A3D21' }}>Epoxy Color</td>
                  <td style={{ padding: '8px 0', color: '#6B7066' }}>{data.epoxyColor?.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) || 'None'}</td>
                </tr>
                <tr>
                  <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#1A3D21' }}>Background</td>
                  <td style={{ padding: '8px 0', color: '#6B7066' }}>{data.backgroundColor?.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) || '—'}</td>
                </tr>
                <tr>
                  <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#1A3D21' }}>Finish</td>
                  <td style={{ padding: '8px 0', color: '#6B7066' }}>{data.surfaceFinish?.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) || '—'}</td>
                </tr>
                <tr>
                  <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#1A3D21' }}>Engraving</td>
                  <td style={{ padding: '8px 0', color: '#6B7066' }}>{data.engraving ? 'Yes' : 'No'}</td>
                </tr>
                <tr>
                  <td style={{ padding: '8px 0', fontWeight: 'bold', color: '#1A3D21' }}>Table Base</td>
                  <td style={{ padding: '8px 0', color: '#6B7066' }}>{data.tableBase?.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) || '—'}</td>
                </tr>
              </tbody>
            </table>
          </Section>

          {/* Price estimate */}
          <Section style={{ backgroundColor: '#009440', color: 'white', padding: '20px', borderRadius: '4px', marginBottom: '30px', textAlign: 'center' }}>
            <Heading level={2} style={{ color: 'white', fontSize: '18px', margin: '0 0 10px 0' }}>
              Est. Price Range
            </Heading>
            <Text style={{ fontSize: '24px', fontWeight: 'bold', margin: '0' }}>
              {formatPrice(quotePrice.min)} — {formatPrice(quotePrice.max)}
            </Text>
          </Section>

          {/* Notes */}
          {data.notes && (
            <Section style={{ backgroundColor: '#EFF5EC', padding: '20px', borderRadius: '4px', marginBottom: '30px' }}>
              <Heading level={2} style={{ color: '#1A3D21', fontSize: '16px', margin: '0 0 10px 0' }}>
                Additional Notes
              </Heading>
              <Text style={{ color: '#6B7066', fontSize: '14px', lineHeight: '1.6', margin: '0', whiteSpace: 'pre-wrap' }}>
                {data.notes}
              </Text>
            </Section>
          )}

          <Hr style={{ borderColor: '#C8DFC0', margin: '30px 0' }} />

          {/* Footer */}
          <Text style={{ color: '#6B7066', fontSize: '12px', textAlign: 'center', margin: '0' }}>
            Sent from Green Mountain Tableworx Instant Estimator
          </Text>
        </Container>
      </Body>
    </Html>
  )
}
