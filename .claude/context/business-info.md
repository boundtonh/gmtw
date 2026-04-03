# Business Info — Green Mountain Tableworx

## Overview
GMT specializes in custom live edge furniture. Primary revenue is custom orders; secondary is showroom inventory for inspiration. In-room delivery available across all of New England.

## Bread & Butter Products
1. Live Edge Tables
2. River Tables
3. Ocean Tables

Note: Most furniture types can be configured as any of the three above styles.

## Showrooms
| Location | Address | Phone |
|---|---|---|
| Concord, NH | 84 N Main St, Concord, NH 03301 | (603) 565-5483 |
| Smithfield, RI | 2 Esmond St, Smithfield, RI 02917 | (401) 354-9600 |

**Never hardcode these values in components — always import from `/lib/locations.ts`**

## Service Area
In-room delivery anywhere in New England.

## Starting Prices
| Product | Starting Price |
|---|---|
| Dining Tables | $1,500 |
| Conference Tables | $2,500 |
| Coffee Tables | $500 |
| Benches | $500 |
| Console Tables | $750 |
| Countertops & Island Tops | Inquire Within |
| Standalone Bars & Bar Tops | Inquire Within |
| Floating Shelves & Mantels | Inquire Within |
| Wall Art & Signage | Inquire Within |

**Never hardcode prices in components — always import from `/lib/products.ts`**

## Contact
- Agency email (placeholder until client email confirmed): contact@inboundnh.com
- Domain: TBD — client to confirm

## Online Estimate Wizard
6-step multi-step form at `/estimate`. Steps:
1. Wood Species + Dimensions (length × width in inches)
2. Table Shape (Rectangle / Circle / Oval / Boat)
3. Edge Style (Live Edge / Straight / Bevel / C-Shaped / Lake Shaped / Chiseled)
4. Epoxy Color + Background + Surface Finish + Engraving toggle
5. Table Base
6. Contact info + submit

Pricing calculation logic: client to supply formula before Session 8.
Submissions sent via Resend to client email.