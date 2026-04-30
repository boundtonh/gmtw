interface ItemizedLine {
  label: string
  price: number
}

function fmtLabel(value: string | undefined): string {
  if (!value) return '—'
  return value.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

const ELEGANT_IRON_BASES = new Set(['cleo', 'curva', 'draco', 'faras', 'lithe', 'norah', 'summa', 'tulipe', 'wineglass', 'wishbone', 'xeni'])
const HANDCRAFTED_WOOD_BASES = new Set(['live-edge-live', 'live-edge-slab', 'hand-turned', 'x-frame', 'hairpin-legs'])

interface EstimateData {
  name: string
  email: string
  furnitureType?: string
  length?: number
  width?: number
  woodSpecies?: string
  tableShape?: string
  edgeStyle?: string
  epoxyColor?: string
  backgroundColor?: string
  tableBase?: string
}

export function buildCustomerEmailHtml(
  data: EstimateData,
  quotePrice: { min: number; max: number; itemized: ItemizedLine[] }
): string {

  // Build selections grid (only show non-empty selections)
  const selections = [
    {
      label: 'FURNITURE TYPE',
      value: fmtLabel(data.furnitureType),
      show: !!data.furnitureType,
    },
    {
      label: 'DIMENSIONS',
      value: data.length && data.width ? `${data.length}" × ${data.width}"` : '—',
      show: !!(data.length && data.width),
    },
    {
      label: 'WOOD SPECIES',
      value: fmtLabel(data.woodSpecies),
      show: !!data.woodSpecies,
    },
    {
      label: 'TABLE SHAPE',
      value: fmtLabel(data.tableShape),
      show: !!data.tableShape,
    },
    {
      label: 'EDGE STYLE',
      value: fmtLabel(data.edgeStyle),
      show: !!data.edgeStyle,
    },
    {
      label: 'RESIN COLOR',
      value: fmtLabel(data.epoxyColor),
      show: !!(data.epoxyColor && data.epoxyColor !== 'none'),
    },
    {
      label: 'DESIGN STYLE',
      value: fmtLabel(data.backgroundColor),
      show: !!(data.backgroundColor && data.backgroundColor !== 'none'),
    },
    {
      label: 'TABLE BASE',
      value: fmtLabel(data.tableBase),
      show: !!data.tableBase,
    },
  ]

  const visibleSelections = selections.filter((s) => s.show)

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your Green Mountain Tableworx Estimate</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #1A3D21;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #FAFAF7;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table width="100%" max-width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #FFFFFF;">
          <!-- Header Bar -->
          <tr>
            <td style="background-color: #111714; padding: 0; text-align: center;">
              <img
                src="https://greenmountaintable.com/images/logo/new-logo.jpg"
                alt="Green Mountain Tableworx"
                width="600"
                style="display: block; width: 100%; max-width: 600px;"
              />
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <!-- Greeting -->
              <h1 style="margin: 0 0 20px 0; font-size: 28px; color: #1A3D21; font-family: Georgia, serif; font-weight: normal;">
                Hello, ${data.name}!
              </h1>

              <p style="margin: 0 0 24px 0; font-size: 15px; line-height: 1.6; color: #1A3D21;">
                Based on your specifications selected, you can expect to be in <strong>${formatPrice(quotePrice.min)} – ${formatPrice(quotePrice.max)}</strong>. This price could be less based on a variety of factors: current promotions, sales, multi piece orders, veteran discounts & more. Scroll down to view an itemized list of your selections, and how they may affect pricing. A member of our team will reach out shortly to verify the accuracy of your online estimate.
              </p>

              <!-- Your Selections Section -->
              <p style="margin: 36px 0 20px 0; font-size: 11px; font-weight: bold; color: #009440; letter-spacing: 0.12em; text-transform: uppercase;">
                Your Selections
              </p>

              <!-- Selections Grid -->
              <table width="100%" cellpadding="0" cellspacing="8" style="margin-bottom: 40px;">
                <tr>
                  ${visibleSelections
                    .slice(0, 3)
                    .map(
                      (sel) => `
                  <td style="border: 1px solid #C8DFC0; border-radius: 4px; padding: 14px; text-align: center; width: 33.33%;">
                    <p style="margin: 0 0 8px 0; font-size: 8px; font-weight: bold; color: #6B7066; letter-spacing: 0.08em; text-transform: uppercase;">
                      ${sel.label}
                    </p>
                    <p style="margin: 0; font-size: 14px; font-weight: 600; color: #1A3D21;">
                      ${sel.value}
                    </p>
                  </td>
                `
                    )
                    .join('')}
                </tr>
                ${
                  visibleSelections.length > 3
                    ? `
                <tr>
                  ${visibleSelections
                    .slice(3, 6)
                    .map(
                      (sel) => `
                  <td style="border: 1px solid #C8DFC0; border-radius: 4px; padding: 14px; text-align: center; width: 33.33%;">
                    <p style="margin: 0 0 8px 0; font-size: 8px; font-weight: bold; color: #6B7066; letter-spacing: 0.08em; text-transform: uppercase;">
                      ${sel.label}
                    </p>
                    <p style="margin: 0; font-size: 14px; font-weight: 600; color: #1A3D21;">
                      ${sel.value}
                    </p>
                  </td>
                `
                    )
                    .join('')}
                </tr>
              `
                    : ''
                }
                ${
                  visibleSelections.length > 6
                    ? `
                <tr>
                  ${visibleSelections
                    .slice(6)
                    .map(
                      (sel) => `
                  <td style="border: 1px solid #C8DFC0; border-radius: 4px; padding: 14px; text-align: center; width: 33.33%;">
                    <p style="margin: 0 0 8px 0; font-size: 8px; font-weight: bold; color: #6B7066; letter-spacing: 0.08em; text-transform: uppercase;">
                      ${sel.label}
                    </p>
                    <p style="margin: 0; font-size: 14px; font-weight: 600; color: #1A3D21;">
                      ${sel.value}
                    </p>
                  </td>
                `
                    )
                    .join('')}
                </tr>
              `
                    : ''
                }
              </table>

              <!-- How We Got There Section -->
              <p style="margin: 36px 0 20px 0; font-size: 11px; font-weight: bold; color: #009440; letter-spacing: 0.12em; text-transform: uppercase;">
                How We Got There
              </p>

              <!-- Itemized Pricing Table -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                ${quotePrice.itemized
                  .map(
                    (line) => `
                <tr>
                  <td style="padding: 12px 0; font-size: 14px; color: #1A3D21; border-bottom: 1px solid #EFF5EC;">
                    ${line.label}
                  </td>
                  <td style="padding: 12px 0; font-size: 14px; color: #1A3D21; text-align: right; border-bottom: 1px solid #EFF5EC;">
                    ${formatPrice(Math.round(line.price * 0.9))} – ${formatPrice(Math.round(line.price * 1.1))}
                  </td>
                </tr>
              `
                  )
                  .join('')}
              </table>

              ${
                data.tableBase && (ELEGANT_IRON_BASES.has(data.tableBase.toLowerCase()) || HANDCRAFTED_WOOD_BASES.has(data.tableBase.toLowerCase()))
                  ? `
              <p style="margin: 24px 0 24px 0; font-size: 13px; color: #1A3D21; line-height: 1.6; padding: 16px; background-color: #EFF5EC; border-radius: 4px;">
                Your selected table base is not included in the price range above, as our ${
                  ELEGANT_IRON_BASES.has(data.tableBase.toLowerCase()) ? 'elegant iron' : 'handcrafted wood'
                } bases can range vastly in pricing. Our team will reach out to discuss table base pricing.
              </p>
              `
                  : ''
              }

              <!-- Price Range Box -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 32px;">
                <tr>
                  <td style="background-color: #009440; border-radius: 8px; padding: 32px 20px; text-align: center;">
                    <p style="margin: 0 0 12px 0; font-size: 13px; color: #FFFFFF; letter-spacing: 0.05em; text-transform: uppercase; font-weight: 500;">
                      Your Estimated Price Range
                    </p>
                    <p style="margin: 0; font-size: 32px; font-weight: bold; color: #FFFFFF;">
                      ${formatPrice(quotePrice.min)} – ${formatPrice(quotePrice.max)}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Validity Notice -->
              <p style="margin: 0 0 8px 0; font-size: 13px; color: #1A3D21; text-align: center;">
                Your estimate is valid for <strong>30 days</strong>.
              </p>
              <p style="margin: 0 0 40px 0; font-size: 12px; color: #6B7066; text-align: center;">
                Prices are estimates only and will be confirmed by our team.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #1A3D21; padding: 32px 30px; color: #FFFFFF; font-size: 12px;">
              <p style="margin: 0 0 16px 0; font-weight: 600;">Green Mountain Tableworx</p>
              <p style="margin: 0 0 12px 0; line-height: 1.5;">
                <strong>Concord, NH:</strong> 84 N Main St, Concord, NH 03301 | (603) 565-5483<br>
                <strong>Smithfield, RI:</strong> 2 Esmond St, Smithfield, RI 02917 | (401) 354-9600
              </p>
              <p style="margin: 0; line-height: 1.5;">
                In-room delivery available anywhere in New England.<br>
                <a href="https://greenmountaintableworx.com" style="color: #C8DFC0; text-decoration: none;">greenmountaintableworx.com</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}
