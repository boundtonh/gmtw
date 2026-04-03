# 06 — Forms Rules

## Library
All forms use `react-hook-form` — no uncontrolled inputs, no raw `useState` per field.

```bash
npm install react-hook-form resend
```

## Estimate Form
- Single page layout at `/app/estimate/page.tsx` — everything visible, no steps, no wizard
- Client scrolls through sections naturally and fills out at their own pace
- All state managed by a single `react-hook-form` instance in `EstimateForm.tsx` (`'use client'`)
- Thumbnail selections use the shared `ThumbnailGrid` component
- No database — form state held in React until submission

### Page Layout (top to bottom)
```
/estimate
  ├── Page hero (short — title + subtitle)
  ├── EstimateForm (client component)
  │     ├── Section: Wood & Dimensions
  │     │     ├── Wood Species (ThumbnailGrid)
  │     │     └── Length × Width (number inputs)
  │     ├── Section: Table Shape
  │     │     └── Shape (ThumbnailGrid — Rectangle, Circle, Oval, Boat)
  │     ├── Section: Edge Style
  │     │     └── Edge (ThumbnailGrid — 6 options)
  │     ├── Section: Epoxy & Finish
  │     │     ├── Epoxy Color (ThumbnailGrid — includes "None" option)
  │     │     ├── Background Color (ThumbnailGrid)
  │     │     ├── Surface Finish (ThumbnailGrid — 3 options)
  │     │     └── Engraving (Yes / No toggle)
  │     ├── Section: Table Base
  │     │     └── Base (ThumbnailGrid — client photos)
  │     ├── Section: Your Information
  │     │     ├── Name, Email, Phone
  │     │     ├── Preferred Location (Concord NH / Smithfield RI / Remote)
  │     │     └── Notes (textarea)
  │     └── Submit button + legal line
```

### Section Headers
Each section uses `<SectionLabel>` + a short descriptor line. Visual separation between sections via padding — no dividers or cards. The form should feel open and airy, not boxed in.

### Form State Shape
```ts
interface EstimateFormData {
  woodSpecies: string
  length: number
  width: number
  tableShape: 'rectangle' | 'circle' | 'oval' | 'boat'
  edgeStyle: 'live-edge' | 'straight' | 'bevel' | 'c-shaped' | 'lake-shaped' | 'chiseled'
  epoxyColor: string | 'none'
  backgroundColor: string
  surfaceFinish: 'full-gloss' | 'full-matte' | 'matte-wood-glossy-resin'
  engraving: boolean
  tableBase: string
  name: string
  email: string
  phone: string
  preferredLocation: 'concord-nh' | 'smithfield-ri' | 'remote'
  notes: string
}
```

## ThumbnailGrid Component
All non-text selections use thumbnail image grids:
```tsx
<ThumbnailGrid
  options={woodSpeciesOptions}
  selected={selected}
  onSelect={(value) => setValue('woodSpecies', value)}
/>
```
- Images loaded from `/public/estimate/[category]/`
- Placeholder: labeled color block while waiting for client photos
- Single select — selected item gets GMT green border + checkmark
- Grid: `grid-cols-2 md:grid-cols-3 lg:grid-cols-4` depending on number of options

## Submission
- Handler: `react-hook-form` `handleSubmit`
- API route: `/app/api/estimate/route.ts`
- Transport: Resend
- Recipient: client email (placeholder: contact@inboundnh.com)
- Email includes: all selections by label name, dimensions, contact info, preferred location, notes
- Success state: inline confirmation message replacing the submit button — no redirect, no page reload
- Error state: inline error message with retry — never silently fail

## API Route Pattern
```ts
// /app/api/estimate/route.ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const data = await request.json()

  await resend.emails.send({
    from: 'estimates@greenmountaintableworx.com',
    to: process.env.CONTACT_EMAIL!,
    subject: `New Estimate Request — ${data.name}`,
    // Format all selections into readable email body
  })

  return Response.json({ success: true })
}
```

## Validation Rules
| Field | Rule |
|---|---|
| Name | Required, min 2 chars |
| Email | Required, valid email format |
| Phone | Required, US phone format |
| Length | Required, number, min 12, max 240 (inches) |
| Width | Required, number, min 12, max 96 (inches) |
| Thumbnail selections | Optional — form can submit without all selections made |

Note: thumbnail fields are optional on submit. Not every customer will know their wood species or base preference upfront — the goal is to get the lead, not block it.

## Pricing Logic
Pricing calculation formula to be supplied by client before Session 8.
Until then, no price is shown anywhere on the form.
Submission confirmation says: "We'll prepare your custom estimate and be in touch within 24 hours."
Do NOT display a calculated price in the UI until the formula is confirmed and validated.