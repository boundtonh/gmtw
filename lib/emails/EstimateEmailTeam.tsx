function fmt(value: string | undefined) {
  if (!value) return '—'
  return value.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())
}

function formatPrice(price: number) {
  return `$${price.toLocaleString()}`
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function buildTeamEmailHtml(data: any, quotePrice: { min: number; max: number }): string {
  const deliveryLabel =
    data.deliveryOption === 'pickup-concord'
      ? 'Pickup — Concord, NH'
      : data.deliveryOption === 'pickup-smithfield'
      ? 'Pickup — Smithfield, RI'
      : 'In-Home Delivery & Setup'

  const deliveryAddress =
    data.deliveryOption === 'delivery'
      ? [data.deliveryStreet, data.deliveryCity, data.deliveryState, data.deliveryZip]
          .filter(Boolean)
          .join(', ')
      : null

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="font-family:Arial,sans-serif;background:#FAFAF7;margin:0;padding:0">
  <div style="max-width:700px;margin:0 auto;padding:40px 20px">

    <h1 style="color:#009440;font-size:26px;margin:0 0 6px 0">New Estimate Request</h1>
    <p style="color:#6B7066;font-size:14px;margin:0 0 30px 0">From: <strong>${data.name}</strong></p>

    <!-- Customer Info -->
    <div style="background:#EFF5EC;border-left:4px solid #009440;padding:20px;border-radius:4px;margin-bottom:30px">
      <h2 style="color:#1A3D21;font-size:16px;margin:0 0 15px 0">Customer Information</h2>
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:8px 0;font-weight:bold;color:#1A3D21;width:30%">Name</td><td style="padding:8px 0;color:#6B7066">${data.name}</td></tr>
        <tr><td style="padding:8px 0;font-weight:bold;color:#1A3D21">Email</td><td style="padding:8px 0;color:#6B7066">${data.email}</td></tr>
        <tr><td style="padding:8px 0;font-weight:bold;color:#1A3D21">Phone</td><td style="padding:8px 0;color:#6B7066">${data.phone}</td></tr>
        <tr><td style="padding:8px 0;font-weight:bold;color:#1A3D21">Delivery</td><td style="padding:8px 0;color:#6B7066">${deliveryLabel}</td></tr>
        ${deliveryAddress ? `<tr><td style="padding:8px 0;font-weight:bold;color:#1A3D21">Address</td><td style="padding:8px 0;color:#6B7066">${deliveryAddress}</td></tr>` : ''}
      </table>
    </div>

    <!-- Specifications -->
    <div style="background:#F7F5F0;padding:20px;border-radius:4px;margin-bottom:30px">
      <h2 style="color:#1A3D21;font-size:16px;margin:0 0 15px 0">Specifications</h2>
      <table style="width:100%;border-collapse:collapse">
        <tr><td style="padding:8px 0;font-weight:bold;color:#1A3D21;width:30%">Furniture Type</td><td style="padding:8px 0;color:#6B7066">${fmt(data.furnitureType)}</td></tr>
        <tr><td style="padding:8px 0;font-weight:bold;color:#1A3D21">Dimensions</td><td style="padding:8px 0;color:#6B7066">${data.length || '—'}" × ${data.width || '—'}"</td></tr>
        <tr><td style="padding:8px 0;font-weight:bold;color:#1A3D21">Wood Species</td><td style="padding:8px 0;color:#6B7066">${fmt(data.woodSpecies)}</td></tr>
        <tr><td style="padding:8px 0;font-weight:bold;color:#1A3D21">Table Shape</td><td style="padding:8px 0;color:#6B7066">${fmt(data.tableShape)}</td></tr>
        <tr><td style="padding:8px 0;font-weight:bold;color:#1A3D21">Edge Style</td><td style="padding:8px 0;color:#6B7066">${fmt(data.edgeStyle)}</td></tr>
        <tr><td style="padding:8px 0;font-weight:bold;color:#1A3D21">Resin & Color</td><td style="padding:8px 0;color:#6B7066">${fmt(data.epoxyColor) || 'None'}</td></tr>
        <tr><td style="padding:8px 0;font-weight:bold;color:#1A3D21">Specialty Theme</td><td style="padding:8px 0;color:#6B7066">${fmt(data.backgroundColor) || '—'}</td></tr>
        <tr><td style="padding:8px 0;font-weight:bold;color:#1A3D21">Surface Finish</td><td style="padding:8px 0;color:#6B7066">${fmt(data.surfaceFinish) || '—'}</td></tr>
        <tr><td style="padding:8px 0;font-weight:bold;color:#1A3D21">Engraving</td><td style="padding:8px 0;color:#6B7066">${data.engraving ? 'Yes' : 'No'}</td></tr>
        <tr><td style="padding:8px 0;font-weight:bold;color:#1A3D21">Table Base</td><td style="padding:8px 0;color:#6B7066">${fmt(data.tableBase) || '—'}</td></tr>
      </table>
    </div>

    <!-- Price -->
    <div style="background:#009440;color:white;padding:20px;border-radius:4px;margin-bottom:30px;text-align:center">
      <h2 style="color:white;font-size:18px;margin:0 0 10px 0">Estimated Price Range</h2>
      <p style="font-size:26px;font-weight:bold;margin:0">${formatPrice(quotePrice.min)} — ${formatPrice(quotePrice.max)}</p>
    </div>

    ${data.notes ? `
    <!-- Notes -->
    <div style="background:#EFF5EC;padding:20px;border-radius:4px;margin-bottom:30px">
      <h2 style="color:#1A3D21;font-size:16px;margin:0 0 10px 0">Additional Notes</h2>
      <p style="color:#6B7066;font-size:14px;line-height:1.6;margin:0;white-space:pre-wrap">${data.notes}</p>
    </div>` : ''}

    <hr style="border-color:#C8DFC0;margin:30px 0">
    <p style="color:#6B7066;font-size:12px;text-align:center;margin:0">Sent from Green Mountain Tableworx Instant Estimator</p>
  </div>
</body>
</html>
  `.trim()
}
