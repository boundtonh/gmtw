'use client'

import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Container } from '@/components/layout/Container'
import { ThumbnailGrid } from '@/components/estimate/ThumbnailGrid'
import { DimensionInput } from '@/components/estimate/DimensionInput'
import { cn } from '@/lib/utils'

export interface EstimateFormData {
  furnitureType: string
  woodSpecies: string
  length: number
  width: number
  tableShape: 'rectangle' | 'circle' | 'oval' | 'square'
  edgeStyle: 'live-edge' | 'straight' | 'bevel' | 'pencil'
  epoxyColor: string
  backgroundColor: string
  engraving: boolean
  tableBase: string
  name: string
  email: string
  phone: string
  deliveryOption: 'pickup-concord' | 'pickup-smithfield' | 'delivery'
  deliveryStreet?: string
  deliveryCity?: string
  deliveryState?: string
  deliveryZip?: string
  notes: string
}

// ─── Placeholder option data ──────────────────────────────────────────────────

const BASE = '/images/estimator/wood-species'

const MAPLE_VARIETIES = [
  { value: 'ambrosia-maple', label: 'Ambrosia Maple' },
  { value: 'big-leaf-maple', label: 'Big Leaf Maple' },
  { value: 'birdseye-maple', label: 'Birdseye Maple' },
  { value: 'curly-maple',    label: 'Curly Maple' },
  { value: 'figured-maple',  label: 'Figured Maple' },
  { value: 'hard-maple',     label: 'Hard Maple' },
  { value: 'soft-maple',     label: 'Soft Maple' },
  { value: 'spalted-maple',  label: 'Spalted Maple' },
  { value: 'sugar-maple',    label: 'Sugar Maple' },
  { value: 'red-maple',      label: 'Red Maple' },
]

const ELM_VARIETIES = [
  { value: 'english-elm', label: 'English Elm' },
  { value: 'red-elm',     label: 'Red Elm' },
  { value: 'white-elm',   label: 'White Elm' },
]

const WALNUT_VARIETIES = [
  { value: 'black-walnut',   label: 'Black Walnut' },
  { value: 'english-walnut', label: 'English Walnut' },
  { value: 'butternut',      label: 'Butternut' },
]

const MAPLE_VALUES = new Set(MAPLE_VARIETIES.map(v => v.value))
const ELM_VALUES = new Set(ELM_VARIETIES.map(v => v.value))
const WALNUT_VALUES = new Set(WALNUT_VARIETIES.map(v => v.value))

const FURNITURE_TYPES = [
  { value: 'dining-tables', label: 'Dining Table', img: '/images/furniture-types/dining-tables-main.jpg' },
  { value: 'conference-tables', label: 'Conference Table', img: '/images/furniture-types/conference-table.jpg' },
  { value: 'coffee-tables', label: 'Coffee Table', img: '/images/furniture-types/coffee-table.webp' },
  { value: 'benches', label: 'Bench', img: '/images/furniture-types/benches-main.jpg', objectPosition: '50% 98%' },
  { value: 'console-tables', label: 'Console Table', img: '/images/furniture-types/console-tables-main.jpg' },
]

const WOOD_TIER1 = [
  { value: 'ash',            label: 'Ash',            img: `${BASE}/ash.jpg` },
  { value: 'box-elder',      label: 'Box Elder',      img: `${BASE}/box-elder.jpg` },
  { value: 'cherry',         label: 'Cherry',         img: `${BASE}/cherry.jpg` },
  { value: 'chestnut',       label: 'Chestnut',       img: `${BASE}/american-chestnut.jpg` },
  { value: 'douglas-fir',    label: 'Douglas Fir',    img: `${BASE}/douglas-fir.jpg` },
  { value: 'elm',            label: 'Elm (3 Types)',  img: `${BASE}/english-elm.jpg` },
  { value: 'hemlock',        label: 'Hemlock',        img: `${BASE}/hemlock.jpg` },
  { value: 'hickory',        label: 'Hickory',        img: `${BASE}/hickory.jpg` },
  { value: 'honey-locust',   label: 'Honey Locust',   img: `${BASE}/honey-locust.jpg` },
  { value: 'maple',          label: 'Maple (10 Types)', img: `${BASE}/hard-maple.jpg` },
  { value: 'mulberry',       label: 'Mulberry',       img: `${BASE}/mullberry.jpg` },
  { value: 'pine',           label: 'Pine',           img: `${BASE}/pine.jpg` },
  { value: 'poplar',         label: 'Poplar',         img: `${BASE}/poplar.webp` },
  { value: 'red-cedar',      label: 'Red Cedar',      img: `${BASE}/red-cedar.jpg` },
  { value: 'sassafras',      label: 'Sassafras',      img: `${BASE}/sassafrass.jpg` },
  { value: 'spruce',         label: 'Spruce',         img: `${BASE}/spruce.jpg` },
  { value: 'sycamore',       label: 'Sycamore',       img: `${BASE}/sycamore.jpg` },
  { value: 'tulip',          label: 'Tulip',          img: `${BASE}/tulip.webp` },
  { value: 'walnut',         label: 'Walnut (3 Types)', img: `${BASE}/black-walnut.jpg` },
  { value: 'willow',         label: 'Willow',         img: `${BASE}/willow.jpg` },
]

const WOOD_TIER2 = [
  { value: 'acacia',        label: 'Indonesian / Mexican Acacia', img: `${BASE}/acacia.webp` },
  { value: 'buckeye-burl',  label: 'Buckeye Burl',                img: `${BASE}/Buckeye-burl.jpg` },
  { value: 'claro-walnut',  label: 'Claro Walnut',                img: `${BASE}/ClaroWalnut.jpg` },
  { value: 'olivewood',     label: 'Olivewood',                   img: `${BASE}/olive-wood.jpg` },
  { value: 'monkey-pod',    label: 'Costa Rican Monkey Pod',      img: `${BASE}/gunacoste.jpg` },
]

const TABLE_SHAPES = [
  { value: 'rectangle', label: 'Rectangle', img: '/public/estimate/shapes/Rectangle.png' },
  { value: 'square',    label: 'Square',    img: '/public/estimate/shapes/Square.png' },
  { value: 'circle',    label: 'Circle',    img: '/public/estimate/shapes/Circular.png' },
  { value: 'oval',      label: 'Oval',      img: '/public/estimate/shapes/Oval.png' },
]

const EDGE_STYLES = [
  { value: 'live-edge', label: 'Live Edge',     placeholder: 'bg-gmt-sage' },
  { value: 'straight',  label: 'Straight Edge', placeholder: 'bg-gmt-mist' },
  { value: 'bevel',     label: 'Bevel Edge',    placeholder: 'bg-gmt-mist' },
  { value: 'pencil',    label: 'Pencil Edge',   placeholder: 'bg-gmt-mist' },
]

const EPOXY_COLORS = [
  { value: 'none',   label: 'No Epoxy', placeholder: 'bg-stone-100' },
  { value: 'black',  label: 'Black',    placeholder: 'bg-stone-900' },
  { value: 'white',  label: 'White',    placeholder: 'bg-white border border-stone-200' },
  { value: 'silver', label: 'Silver',   placeholder: 'bg-slate-300' },
  { value: 'gold',   label: 'Gold',     placeholder: 'bg-yellow-400' },
  { value: 'bronze', label: 'Bronze',   placeholder: 'bg-amber-700' },
  { value: 'blue',   label: 'Blue',     placeholder: 'bg-blue-500' },
  { value: 'teal',   label: 'Teal',     placeholder: 'bg-teal-500' },
  { value: 'green',  label: 'Green',    placeholder: 'bg-green-600' },
  { value: 'purple', label: 'Purple',   placeholder: 'bg-purple-600' },
  { value: 'orange', label: 'Orange',   placeholder: 'bg-orange-500' },
  { value: 'red',    label: 'Red',      placeholder: 'bg-red-600' },
  { value: 'yellow', label: 'Yellow',   placeholder: 'bg-yellow-300' },
  { value: 'brown',  label: 'Brown',    placeholder: 'bg-amber-900' },
]

const SPECIALTY_THEMES = [
  { value: 'none',         label: 'None',                        placeholder: 'bg-stone-100' },
  { value: 'ocean-style',  label: 'Ocean Style — Our Specialty', img: '/images/ocean/ocean-style.webp' },
  { value: 'media-style',  label: 'Media Style',                 img: '/public/estimate/resin-themes/Black Walnut RR Media Style.png' },
  { value: 'artisan-series', label: 'Artisan Series',            img: '/public/estimate/resin-themes/Artisan Series.jpg' },
]

const ENGRAVING_OPTIONS = [
  { value: 'yes', label: 'Yes — Add Custom Inscription or Engraving', placeholder: 'bg-gmt-forest' },
  { value: 'no',  label: 'No',                                         placeholder: 'bg-stone-100' },
]

const TABLE_BASES_STANDARD_IRON = [
  { value: 'iron-trapezoid',    label: 'Iron Trapezoid',    img: '/images/bases/iron-trapezoid.webp' },
  { value: 'iron-a-frame',      label: 'Iron A-Frame',      img: '/images/bases/iron-a-frame.webp' },
  { value: 'iron-h-design',     label: 'Iron H-Design',     img: '/images/bases/iron-h-design.webp' },
  { value: 'rectangle',         label: 'Rectangle',         img: '/images/bases/rectangle.webp' },
  { value: 'reverse-trapezoid', label: 'Reverse Trapezoid', img: '/images/bases/reverse-trapezoid.webp' },
]

const TABLE_BASES_ELEGANT_IRON = [
  { value: 'haru-pedestal',         label: 'Haru Pedestal',         img: '/images/bases/haru-pedestal.webp' },
  { value: 'wine-glass',            label: 'Wine Glass',            img: '/images/bases/wine-glass.webp' },
  { value: 'lithe-pedestal',        label: 'Lithe Pedestal',        img: '/images/bases/lithe-pedestal.webp' },
  { value: 'summa',                 label: 'Summa',                 img: '/images/bases/Summa.webp' },
  { value: 'center-prong',          label: 'Center Prong',          img: '/images/bases/center-prong.webp' },
  { value: 'x-cross',               label: 'X Cross',               img: '/images/bases/x-cross.webp' },
  { value: 'contemporary-hairpins', label: 'Contemporary Hairpins', img: '/images/bases/contemporary-hairpins.webp' },
  { value: 'center-arch-pedestal',  label: 'Center Arch Pedestal',  img: '/images/bases/center-arch-pedestal.webp' },
]

const TABLE_BASES_WOOD = [
  { value: 'slab-post-trestle',   label: 'Slab Post Trestle',   img: '/images/bases/slab-post-tressle.webp' },
  { value: 'arch-trestle',        label: 'Arch Trestle',        img: '/images/bases/arch-trestle.webp' },
  { value: 'stump-base',          label: 'Stump Base',          img: '/images/bases/stump-base.webp' },
  { value: 'classic-turned-legs', label: 'Classic Turned Legs', img: '/images/bases/classic-turned-legs.webp' },
  { value: 'namu-pedestal',        label: 'Namu Pedestal',       img: '/images/bases/namu-pedestal.webp' },
]

const STEPS = [
  { title: 'Build Your Table Online<br>Get An Instant Quote<br>Sent To Your Email' },
  { title: 'Wood Species' },
  { title: 'Table Shape' },
  { title: 'Edge Style' },
  { title: 'Epoxy & Finish' },
  { title: 'Table Base' },
  { title: 'Your Information' },
]

// ─── Main component ───────────────────────────────────────────────────────────

export function EstimateForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [activeGroup, setActiveGroup] = useState<'maple' | 'elm' | 'walnut' | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submittedPrice, setSubmittedPrice] = useState<{ min: number; max: number } | null>(null)
  const [submittedValues, setSubmittedValues] = useState<EstimateFormData | null>(null)
  const {
    register,
    control,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm<EstimateFormData>({
    defaultValues: {
      furnitureType: '',
      woodSpecies: '',
      tableShape: undefined,
      edgeStyle: undefined,
      epoxyColor: '',
      backgroundColor: '',
      engraving: false,
      tableBase: '',
      deliveryOption: undefined,
      deliveryStreet: '',
      deliveryCity: '',
      deliveryState: '',
      deliveryZip: '',
    },
  })

  const deliveryOption = watch('deliveryOption')
  const tableShape = watch('tableShape')

  // Tier 2 (premium/exotic) species — everything else is Tier 1
  const TIER2_SPECIES = new Set(['acacia', 'buckeye-burl', 'claro-walnut', 'olivewood', 'monkey-pod'])

  // Client-side price estimate (mirrors API formula — for testing only)
  const formValues = watch()
  const liveEstimate = (() => {
    const sqFt = ((formValues.length || 0) * (formValues.width || 0)) / 144
    const linearFeet = (formValues.length || 0) / 12
    if (sqFt === 0) return null
    const woodRate = TIER2_SPECIES.has(formValues.woodSpecies) ? 225 : 168
    let subtotal = sqFt * woodRate
    if (formValues.epoxyColor && formValues.epoxyColor !== 'none') subtotal += 75 * linearFeet
    if (formValues.backgroundColor === 'ocean-style') subtotal *= 1.10
    else if (formValues.backgroundColor === 'media-style' || formValues.backgroundColor === 'artisan-series') subtotal += 15 * linearFeet
    if ((formValues.tableShape === 'circle' || formValues.tableShape === 'oval') && (formValues.length || 0) > 60) subtotal += 200
    return { min: Math.round(subtotal * 0.80), max: Math.round(subtotal * 1.20) }
  })()

  const onSubmit = async (data: EstimateFormData) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const response = await fetch('/api/estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        setSubmitError(result.error || 'Failed to send estimate')
        setIsSubmitting(false)
        return
      }

      setSubmittedPrice(liveEstimate)
      setSubmittedValues(data)
      setSubmitSuccess(true)
      setIsSubmitting(false)
    } catch {
      setSubmitError('An error occurred. Please try again or contact us directly.')
      setIsSubmitting(false)
    }
  }

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <div className="min-h-screen bg-gmt-offwhite py-12 md:py-16">
      <Container>
        {/* Step indicator dots */}
        <div className="flex justify-center gap-3 mb-12">
          {STEPS.map((_, index) => (
            <div
              key={index}
              className={cn(
                'w-3 h-3 rounded-full transition-all duration-300',
                index === currentStep
                  ? 'bg-gmt-green scale-125'
                  : index < currentStep
                    ? 'bg-gmt-green/60'
                    : 'bg-gmt-stone/30'
              )}
              aria-label={`Step ${index + 1}`}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div className="mb-12">
          <p className="font-body text-sm text-gmt-stone tracking-wide mb-6 text-center">
            Step {currentStep + 1} of {STEPS.length}
          </p>
          <div className="h-2 bg-gmt-stone/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gmt-green transition-all duration-300"
              style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Form content */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="mx-auto max-w-4xl">

            {/* ── Success state ── */}
            {submitSuccess && submittedPrice && submittedValues && (
              <div className="max-w-xl mx-auto text-center space-y-8">
                <div>
                  <svg className="w-12 h-12 text-gmt-green mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <h2 className="font-display text-3xl text-gmt-forest mb-2">Your Estimate</h2>
                  <p className="font-body text-gmt-stone text-sm">Our team will be in touch shortly to confirm the details.</p>
                </div>

                {/* Price range */}
                <div className="bg-gmt-mist/60 border border-gmt-sage rounded-sm px-8 py-6">
                  <p className="font-body text-xs tracking-[0.12em] uppercase text-gmt-stone mb-2">Estimated Price Range</p>
                  <p className="font-display text-4xl text-gmt-forest">
                    ${submittedPrice.min.toLocaleString()} — ${submittedPrice.max.toLocaleString()}
                  </p>
                  <p className="font-body text-xs text-gmt-stone mt-2">±20% range to account for wood variation, hardware, and finishing details.</p>
                </div>

                {/* Logic breakdown */}
                {(() => {
                  const sqFt = ((submittedValues.length || 0) * (submittedValues.width || 0)) / 144
                  const linFt = (submittedValues.length || 0) / 12
                  const woodRate = TIER2_SPECIES.has(submittedValues.woodSpecies) ? 225 : 168
                  const isTier2 = TIER2_SPECIES.has(submittedValues.woodSpecies)
                  const base = sqFt * woodRate
                  const hasEpoxy = submittedValues.epoxyColor && submittedValues.epoxyColor !== 'none'
                  const epoxyAdd = hasEpoxy ? 75 * linFt : 0
                  const isOcean = submittedValues.backgroundColor === 'ocean-style'
                  const isMedia = submittedValues.backgroundColor === 'media-style'
                  const isArtisan = submittedValues.backgroundColor === 'artisan-series'
                  const preTheme = base + epoxyAdd
                  const themeAdd = isOcean ? preTheme * 0.10 : (isMedia || isArtisan) ? 15 * linFt : 0
                  const subtotal = preTheme + themeAdd
                  const isRoundUpcharge = (submittedValues.tableShape === 'circle' || submittedValues.tableShape === 'oval') && (submittedValues.length || 0) > 60
                  const finalSubtotal = subtotal + (isRoundUpcharge ? 200 : 0)

                  const rows: { label: string; value: number }[] = [
                    { label: `Wood slab — ${sqFt.toFixed(1)} sq ft @ $${woodRate}/sq ft${isTier2 ? ' (Tier 2)' : ''}`, value: Math.round(base) },
                    ...(hasEpoxy ? [{ label: `Resin & color — ${linFt.toFixed(1)} lin ft @ $75/ft`, value: Math.round(epoxyAdd) }] : []),
                    ...(isOcean ? [{ label: 'Ocean Style theme (+10% of subtotal)', value: Math.round(themeAdd) }] : []),
                    ...(isMedia ? [{ label: `Media Style — ${linFt.toFixed(1)} lin ft @ $15/ft`, value: Math.round(themeAdd) }] : []),
                    ...(isArtisan ? [{ label: `Artisan Series — ${linFt.toFixed(1)} lin ft @ $15/ft`, value: Math.round(themeAdd) }] : []),
                    ...(isRoundUpcharge ? [{ label: 'Round/oval top over 60" — size upcharge', value: 200 }] : []),
                  ]

                  return (
                    <div className="bg-white border border-gmt-stone/20 rounded-sm px-6 py-5 text-left">
                      <p className="font-body text-xs tracking-[0.12em] uppercase text-gmt-stone mb-4">How we got there</p>
                      <div className="space-y-2">
                        {rows.map((row, i) => (
                          <div key={i} className="flex justify-between gap-4 font-body text-sm text-gmt-stone">
                            <span>{row.label}</span>
                            <span className="flex-shrink-0 font-medium text-gmt-forest">${row.value.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between gap-4 font-body text-sm text-gmt-forest font-semibold border-t border-gmt-stone/20 pt-3 mt-3">
                        <span>Subtotal</span>
                        <span>${Math.round(finalSubtotal).toLocaleString()}</span>
                      </div>
                    </div>
                  )
                })()}
              </div>
            )}

            {/* Steps — hidden after submission */}
            {!submitSuccess && (
            <>
            <h2 className="font-display text-3xl md:text-4xl text-gmt-forest mb-10 text-center">
              {STEPS[currentStep].title.split('<br>').map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </h2>

            {/* ── Step 0: Introduction & Dimensions ── */}
            {currentStep === 0 && (
              <div className="space-y-12">
                <div className="bg-gmt-mist/50 border-l-4 border-gmt-green p-8 rounded-sm max-w-2xl mx-auto">
                  <p className="font-body text-base text-gmt-forest leading-relaxed">
                    Use our instant estimator to spec your custom table. You&rsquo;ll walk through wood species, dimensions, edge style, epoxy colors, and more. Your personalized table quote will be sent via email ASAP, and our team will reach out to confirm the details.
                  </p>
                </div>

                {/* Dimensions */}
                <div className="max-w-2xl mx-auto mb-12">
                  <div className="flex items-center justify-center gap-4 mb-5">
                    <p className="font-body text-xs tracking-[0.12em] uppercase text-gmt-stone">
                      Table Dimensions
                    </p>
                  </div>
                  <DimensionInput register={register} errors={errors} />
                </div>

                {/* Furniture Type */}
                <div className="max-w-2xl mx-auto">
                  <div className="flex items-center justify-center gap-4 mb-5">
                    <p className="font-body text-xs tracking-[0.12em] uppercase text-gmt-stone">
                      What Are You Building?
                    </p>
                  </div>
                  <Controller
                    name="furnitureType"
                    control={control}
                    render={({ field }) => (
                      <ThumbnailGrid
                        options={FURNITURE_TYPES}
                        selected={field.value}
                        onSelect={field.onChange}
                        cols="3-5"
                      />
                    )}
                  />
                </div>
              </div>
            )}

            {/* ── Step 1: Wood Species ── */}
            {currentStep === 1 && (
              <div className="space-y-12">
                <Controller
                  name="woodSpecies"
                  control={control}
                  render={({ field }) => {
                    // Determine what to show as selected in the grid
                    const getGridSelected = (value: string) => {
                      if (MAPLE_VALUES.has(value)) return 'maple'
                      if (ELM_VALUES.has(value)) return 'elm'
                      if (WALNUT_VALUES.has(value)) return 'walnut'
                      return value
                    }

                    const handleSpeciesSelect = (value: string) => {
                      if (value === 'maple') {
                        setActiveGroup('maple')
                      } else if (value === 'elm') {
                        setActiveGroup('elm')
                      } else if (value === 'walnut') {
                        setActiveGroup('walnut')
                      } else {
                        setActiveGroup(null)
                        field.onChange(value)
                      }
                    }

                    return (
                      <div className="space-y-12">
                        {/* Tier 1 */}
                        <div>
                          <div className="flex items-center justify-center gap-4 mb-5">
                            <p className="font-body text-xs tracking-[0.12em] uppercase text-gmt-stone">
                              Standard Species
                            </p>
                          </div>
                          <ThumbnailGrid
                            options={WOOD_TIER1}
                            selected={getGridSelected(field.value)}
                            onSelect={handleSpeciesSelect}
                            cols="3-7"
                          />

                          {/* Maple dropdown */}
                          {(activeGroup === 'maple' || MAPLE_VALUES.has(field.value)) && (
                            <div className="mt-6 flex flex-col items-center gap-3">
                              <label className="font-body text-xs tracking-[0.12em] uppercase text-gmt-stone">
                                Maple Variety
                              </label>
                              <select
                                value={MAPLE_VALUES.has(field.value) ? field.value : ''}
                                onChange={(e) => {
                                  field.onChange(e.target.value)
                                  setActiveGroup(null)
                                }}
                                className="font-body text-base text-gmt-forest bg-white border border-gmt-stone/30 px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-gmt-green w-64"
                              >
                                <option value="" disabled>Choose a variety…</option>
                                {MAPLE_VARIETIES.map(v => (
                                  <option key={v.value} value={v.value}>{v.label}</option>
                                ))}
                              </select>
                            </div>
                          )}

                          {/* Elm dropdown */}
                          {(activeGroup === 'elm' || ELM_VALUES.has(field.value)) && (
                            <div className="mt-6 flex flex-col items-center gap-3">
                              <label className="font-body text-xs tracking-[0.12em] uppercase text-gmt-stone">
                                Elm Variety
                              </label>
                              <select
                                value={ELM_VALUES.has(field.value) ? field.value : ''}
                                onChange={(e) => {
                                  field.onChange(e.target.value)
                                  setActiveGroup(null)
                                }}
                                className="font-body text-base text-gmt-forest bg-white border border-gmt-stone/30 px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-gmt-green w-64"
                              >
                                <option value="" disabled>Choose a variety…</option>
                                {ELM_VARIETIES.map(v => (
                                  <option key={v.value} value={v.value}>{v.label}</option>
                                ))}
                              </select>
                            </div>
                          )}

                          {/* Walnut dropdown */}
                          {(activeGroup === 'walnut' || WALNUT_VALUES.has(field.value)) && (
                            <div className="mt-6 flex flex-col items-center gap-3">
                              <label className="font-body text-xs tracking-[0.12em] uppercase text-gmt-stone">
                                Walnut Variety
                              </label>
                              <select
                                value={WALNUT_VALUES.has(field.value) ? field.value : ''}
                                onChange={(e) => {
                                  field.onChange(e.target.value)
                                  setActiveGroup(null)
                                }}
                                className="font-body text-base text-gmt-forest bg-white border border-gmt-stone/30 px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-gmt-green w-64"
                              >
                                <option value="" disabled>Choose a variety…</option>
                                {WALNUT_VARIETIES.map(v => (
                                  <option key={v.value} value={v.value}>{v.label}</option>
                                ))}
                              </select>
                            </div>
                          )}
                        </div>

                        {/* Tier 2 */}
                        <div>
                          <div className="flex items-center justify-center gap-4 mb-5">
                            <p className="font-body text-xs tracking-[0.12em] uppercase text-gmt-stone">
                              Premium &amp; Exotic Species
                            </p>
                            <span className="font-body text-xs text-gmt-green tracking-wide">
                              Premium pricing
                            </span>
                          </div>
                          <ThumbnailGrid
                            options={WOOD_TIER2}
                            selected={getGridSelected(field.value)}
                            onSelect={handleSpeciesSelect}
                            cols="3-7"
                          />
                        </div>
                      </div>
                    )
                  }}
                />
              </div>
            )}

            {/* ── Step 2: Table Shape ── */}
            {currentStep === 2 && (
              <div className="space-y-8">
                <Controller
                  name="tableShape"
                  control={control}
                  render={({ field }) => (
                    <ThumbnailGrid
                      options={TABLE_SHAPES}
                      selected={field.value ?? ''}
                      onSelect={field.onChange}
                      cols="2-4"
                    />
                  )}
                />
                {(tableShape === 'circle' || tableShape === 'oval') && (
                  <p className="font-body text-sm text-gmt-stone italic text-center max-w-xl mx-auto">
                    Tables with a round or oval top over 60&rdquo; may incur an additional size upcharge.
                  </p>
                )}
                <p className="font-body text-sm text-gmt-stone text-center max-w-2xl mx-auto">
                  With our CNC capabilities, any shape is possible — simply inquire within. Pricing is on a case-by-case basis, and we offer up to 3 free renderings for approval.
                </p>
              </div>
            )}

            {/* ── Step 3: Edge Style ── */}
            {currentStep === 3 && (
              <div>
                <p className="font-body text-gmt-stone text-base mb-10 text-center max-w-2xl mx-auto">
                  Our tables feature soft edge profile features carefully eased and hand-finished corners that eliminate sharp angles, creating a smoother, safer surface that&rsquo;s both family-friendly and visually inviting.
                </p>
                <Controller
                  name="edgeStyle"
                  control={control}
                  render={({ field }) => (
                    <ThumbnailGrid
                      options={EDGE_STYLES}
                      selected={field.value ?? ''}
                      onSelect={field.onChange}
                      cols="3-6"
                    />
                  )}
                />
              </div>
            )}

            {/* ── Step 4: Epoxy & Finish ── */}
            {currentStep === 4 && (
              <div className="space-y-12">
                <p className="font-body text-gmt-stone text-base text-center max-w-2xl mx-auto">
                  Epoxy inlays can be poured as rivers, oceans, or abstract fills. Choose your colors and surface finish below.
                </p>

                {/* Resin & Color */}
                <div>
                  <p className="font-body text-xs tracking-[0.12em] uppercase text-gmt-stone mb-1 text-center">
                    Resin &amp; Color
                  </p>
                  <p className="font-body text-sm text-gmt-stone text-center mb-5">
                    265+ colors to choose from. We&rsquo;ll show you our color guide after receiving your estimate.
                  </p>
                  <Controller
                    name="epoxyColor"
                    control={control}
                    render={({ field }) => (
                      <ThumbnailGrid
                        options={EPOXY_COLORS}
                        selected={field.value}
                        onSelect={field.onChange}
                        cols="3-6"
                      />
                    )}
                  />
                </div>

                {/* Specialty Resin Themes */}
                <div>
                  <p className="font-body text-xs tracking-[0.12em] uppercase text-gmt-stone mb-4 text-center">
                    Specialty Resin Themes
                  </p>
                  <Controller
                    name="backgroundColor"
                    control={control}
                    render={({ field }) => (
                      <ThumbnailGrid
                        options={SPECIALTY_THEMES}
                        selected={field.value}
                        onSelect={field.onChange}
                        cols="3"
                      />
                    )}
                  />
                  <p className="font-body text-sm text-gmt-stone mt-4 text-center max-w-xl mx-auto">
                    Smoke Tints &amp; Crystal Clear finishes are also available — inquire within.
                  </p>
                </div>

                {/* Custom Inscriptions or Engraving */}
                <div>
                  <p className="font-body text-xs tracking-[0.12em] uppercase text-gmt-stone mb-4 text-center">
                    Custom Inscriptions or Engraving
                  </p>
                  <Controller
                    name="engraving"
                    control={control}
                    render={({ field }) => (
                      <ThumbnailGrid
                        options={ENGRAVING_OPTIONS}
                        selected={field.value ? 'yes' : 'no'}
                        onSelect={(val) => field.onChange(val === 'yes')}
                        cols="2"
                      />
                    )}
                  />
                  <p className="font-body text-sm text-gmt-stone mt-4 text-center max-w-xl mx-auto">
                    Engraving and inscription pricing is determined by your specifications. Our team will reach out with a quote.
                  </p>
                </div>
              </div>
            )}

            {/* ── Step 5: Table Base ── */}
            {currentStep === 5 && (
              <div>
                <Controller
                  name="tableBase"
                  control={control}
                  render={({ field }) => (
                    <div className="space-y-14">
                      {/* Standard Black Iron */}
                      <div>
                        <p className="font-body text-xs tracking-[0.12em] uppercase text-gmt-stone mb-1 text-center">
                          Standard Black Iron Bases
                        </p>
                        <p className="font-body text-sm text-gmt-green mb-6 text-center">Included in table price</p>
                        <ThumbnailGrid
                          options={TABLE_BASES_STANDARD_IRON}
                          selected={field.value}
                          onSelect={field.onChange}
                          cols="3-5"
                          showTooltip
                        />
                      </div>

                      {/* Elegant Iron */}
                      <div>
                        <p className="font-body text-xs tracking-[0.12em] uppercase text-gmt-stone mb-6 text-center">
                          Elegant Iron Bases
                        </p>
                        <ThumbnailGrid
                          options={TABLE_BASES_ELEGANT_IRON}
                          selected={field.value}
                          onSelect={field.onChange}
                          cols="3-6"
                          showTooltip
                        />
                        <p className="font-body text-sm text-gmt-stone mt-5 text-center max-w-2xl mx-auto">
                          Many more styles available upon request. For square and round tops, we recommend a pedestal base.
                        </p>
                      </div>

                      {/* Handcrafted Wood */}
                      <div>
                        <p className="font-body text-xs tracking-[0.12em] uppercase text-gmt-stone mb-6 text-center">
                          Handcrafted Wood Bases
                        </p>
                        <ThumbnailGrid
                          options={TABLE_BASES_WOOD}
                          selected={field.value}
                          onSelect={field.onChange}
                          cols="3-5"
                          showTooltip
                        />
                        <p className="font-body text-sm text-gmt-stone mt-5 text-center max-w-2xl mx-auto">
                          All wood bases are custom made and priced accordingly. Our team will reach out to confirm pricing for your specific project.
                        </p>
                      </div>
                    </div>
                  )}
                />
              </div>
            )}

            {/* ── Step 6: Your Information ── */}
            {currentStep === 6 && (
              <div className="space-y-6 max-w-xl mx-auto">
                <p className="font-body text-gmt-stone text-base mb-2 text-center">
                  A general price range will be sent to you via email based on your specs. A member of our sales team will be in touch with you shortly to confirm the estimate.
                </p>

                {/* Live price estimate + breakdown — testing only */}
                {liveEstimate && (() => {
                  const sqFt = ((formValues.length || 0) * (formValues.width || 0)) / 144
                  const linFt = (formValues.length || 0) / 12
                  const woodRate = TIER2_SPECIES.has(formValues.woodSpecies) ? 225 : 168
                  const isTier2 = TIER2_SPECIES.has(formValues.woodSpecies)
                  const base = sqFt * woodRate
                  const hasEpoxy = formValues.epoxyColor && formValues.epoxyColor !== 'none'
                  const epoxyAdd = hasEpoxy ? 75 * linFt : 0
                  const isOcean = formValues.backgroundColor === 'ocean-style'
                  const isMedia = formValues.backgroundColor === 'media-style'
                  const isArtisan = formValues.backgroundColor === 'artisan-series'
                  const preTheme = base + epoxyAdd
                  const themeAdd = isOcean ? preTheme * 0.10 : (isMedia || isArtisan) ? 15 * linFt : 0
                  const subtotal = preTheme + themeAdd
                  const isRoundUpcharge = (formValues.tableShape === 'circle' || formValues.tableShape === 'oval') && (formValues.length || 0) > 60
                  const finalSubtotal = subtotal + (isRoundUpcharge ? 200 : 0)

                  const rows: { label: string; value: number }[] = [
                    { label: `Wood slab — ${sqFt.toFixed(1)} sq ft @ $${woodRate}/sq ft${isTier2 ? ' (Tier 2)' : ''}`, value: Math.round(base) },
                    ...(hasEpoxy ? [{ label: `Resin & color — ${linFt.toFixed(1)} lin ft @ $75/ft`, value: Math.round(epoxyAdd) }] : []),
                    ...(isOcean ? [{ label: 'Ocean Style theme (+10% of subtotal)', value: Math.round(themeAdd) }] : []),
                    ...(isMedia ? [{ label: `Media Style — ${linFt.toFixed(1)} lin ft @ $15/ft`, value: Math.round(themeAdd) }] : []),
                    ...(isArtisan ? [{ label: `Artisan Series — ${linFt.toFixed(1)} lin ft @ $15/ft`, value: Math.round(themeAdd) }] : []),
                    ...(isRoundUpcharge ? [{ label: 'Round/oval top over 60" — size upcharge', value: 200 }] : []),
                  ]

                  return (
                    <div className="space-y-3">
                      <div className="bg-gmt-mist/60 border border-gmt-sage rounded-sm px-6 py-4 text-center">
                        <p className="font-body text-xs tracking-[0.12em] uppercase text-gmt-stone mb-1">Estimated Price Range</p>
                        <p className="font-display text-2xl text-gmt-forest">
                          ${liveEstimate.min.toLocaleString()} — ${liveEstimate.max.toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-white border border-gmt-stone/20 rounded-sm px-5 py-4">
                        <p className="font-body text-xs tracking-[0.12em] uppercase text-gmt-stone mb-3">How we got there</p>
                        <div className="space-y-2">
                          {rows.map((row, i) => (
                            <div key={i} className="flex justify-between gap-4 font-body text-xs text-gmt-stone">
                              <span>{row.label}</span>
                              <span className="flex-shrink-0 font-medium text-gmt-forest">${row.value.toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                        <div className="flex justify-between gap-4 font-body text-xs text-gmt-forest font-semibold border-t border-gmt-stone/20 pt-2 mt-2">
                          <span>Subtotal</span>
                          <span>${Math.round(finalSubtotal).toLocaleString()}</span>
                        </div>
                        <p className="font-body text-xs text-gmt-stone/60 pt-2">±20% range accounts for wood variation, hardware, and finishing details.</p>
                      </div>
                    </div>
                  )
                })()}

                {/* Name */}
                <div>
                  <label htmlFor="name" className="block font-body text-xs tracking-[0.12em] uppercase text-gmt-stone mb-2">
                    Full Name <span className="text-gmt-green">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    aria-required="true"
                    placeholder="Jane Smith"
                    {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'At least 2 characters' } })}
                    className={cn(
                      'w-full font-body text-base bg-white border px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-gmt-green transition-colors',
                      errors.name ? 'border-red-400' : 'border-gmt-stone/30'
                    )}
                  />
                  {errors.name && <p className="mt-1 font-body text-xs text-red-500" role="alert">{errors.name.message}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block font-body text-xs tracking-[0.12em] uppercase text-gmt-stone mb-2">
                    Email Address <span className="text-gmt-green">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    aria-required="true"
                    placeholder="jane@example.com"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
                    })}
                    className={cn(
                      'w-full font-body text-base bg-white border px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-gmt-green transition-colors',
                      errors.email ? 'border-red-400' : 'border-gmt-stone/30'
                    )}
                  />
                  {errors.email && <p className="mt-1 font-body text-xs text-red-500" role="alert">{errors.email.message}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block font-body text-xs tracking-[0.12em] uppercase text-gmt-stone mb-2">
                    Phone Number <span className="text-gmt-green">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    aria-required="true"
                    placeholder="(603) 555-0100"
                    {...register('phone', {
                      required: 'Phone is required',
                      pattern: { value: /^[\d\s\(\)\-\+\.]{7,}$/, message: 'Enter a valid phone number' },
                    })}
                    className={cn(
                      'w-full font-body text-base bg-white border px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-gmt-green transition-colors',
                      errors.phone ? 'border-red-400' : 'border-gmt-stone/30'
                    )}
                  />
                  {errors.phone && <p className="mt-1 font-body text-xs text-red-500" role="alert">{errors.phone.message}</p>}
                </div>

                {/* Delivery Options */}
                <div>
                  <p className="block font-body text-xs tracking-[0.12em] uppercase text-gmt-stone mb-3">
                    Delivery Options
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    {[
                      { value: 'pickup-concord',   label: 'Pickup — Concord, NH' },
                      { value: 'pickup-smithfield', label: 'Pickup — Smithfield, RI' },
                      { value: 'delivery',          label: 'In-Home Delivery & Setup' },
                    ].map((opt) => (
                      <label key={opt.value} className="flex items-center gap-3 cursor-pointer group">
                        <input
                          type="radio"
                          value={opt.value}
                          {...register('deliveryOption')}
                          className="sr-only"
                        />
                        <span className="w-5 h-5 rounded-full border-2 border-gmt-stone/40 flex items-center justify-center transition-colors group-has-[:checked]:border-gmt-green flex-shrink-0">
                          <span className="w-2.5 h-2.5 rounded-full bg-gmt-green scale-0 transition-transform group-has-[:checked]:scale-100" />
                        </span>
                        <span className="font-body text-sm text-gmt-forest">{opt.label}</span>
                      </label>
                    ))}
                  </div>

                  {/* Address fields — only when delivery selected */}
                  {deliveryOption === 'delivery' && (
                    <div className="mt-4 space-y-3 p-4 bg-gmt-mist/40 rounded-sm border border-gmt-stone/20">
                      <p className="font-body text-xs tracking-[0.12em] uppercase text-gmt-stone mb-2">Delivery Address</p>
                      <input
                        type="text"
                        placeholder="Street Address"
                        {...register('deliveryStreet')}
                        className="w-full font-body text-base bg-white border border-gmt-stone/30 px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-gmt-green"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="City"
                          {...register('deliveryCity')}
                          className="w-full font-body text-base bg-white border border-gmt-stone/30 px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-gmt-green"
                        />
                        <input
                          type="text"
                          placeholder="State"
                          {...register('deliveryState')}
                          className="w-full font-body text-base bg-white border border-gmt-stone/30 px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-gmt-green"
                        />
                      </div>
                      <input
                        type="text"
                        placeholder="ZIP Code"
                        {...register('deliveryZip')}
                        className="w-full font-body text-base bg-white border border-gmt-stone/30 px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-gmt-green"
                      />
                    </div>
                  )}
                </div>

                {/* Notes */}
                <div>
                  <label htmlFor="notes" className="block font-body text-xs tracking-[0.12em] uppercase text-gmt-stone mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    id="notes"
                    rows={4}
                    placeholder="Tell us more about your project — room size, intended use, inspiration images, timeline, etc."
                    {...register('notes')}
                    className="w-full font-body text-base bg-white border border-gmt-stone/30 px-4 py-3 rounded-sm focus:outline-none focus:ring-2 focus:ring-gmt-green transition-colors resize-none"
                  />
                </div>
              </div>
            )}
            </>
            )}

          </div>

          {/* Navigation — hidden after submission */}
          {!submitSuccess && <div className="mt-16 mx-auto max-w-4xl">
            <div className="flex items-center justify-between border-t border-gmt-stone/20 pt-8 gap-6">
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentStep === 0}
                className={cn(
                  'font-body px-8 py-3 rounded-sm transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed',
                  currentStep === 0
                    ? 'text-gmt-stone bg-transparent'
                    : 'text-white bg-gmt-forest hover:bg-gmt-charcoal'
                )}
              >
                Previous
              </button>

              {submitSuccess ? null : currentStep === STEPS.length - 1 ? (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    'font-body text-white px-10 py-4 transition-colors duration-300',
                    isSubmitting
                      ? 'bg-gmt-stone cursor-not-allowed'
                      : 'bg-gmt-green hover:bg-gmt-forest'
                  )}
                >
                  {isSubmitting ? 'Sending...' : 'Send My Estimate Request'}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="font-body text-white bg-gmt-green px-10 py-4 hover:bg-gmt-forest transition-colors duration-300"
                >
                  {currentStep === STEPS.length - 2 ? STEPS[currentStep + 1].title : `Select ${STEPS[currentStep + 1].title}`}
                </button>
              )}
            </div>

            {submitError && (
              <div className="mt-6 bg-red-50 border border-red-200 rounded-sm p-4 max-w-xl mx-auto">
                <p className="font-body text-sm text-red-700">{submitError}</p>
              </div>
            )}

            {currentStep === STEPS.length - 1 && (
              <p className="mt-4 font-body text-xs text-gmt-stone leading-relaxed max-w-xl mx-auto text-center">
                By submitting this form you agree to be contacted by Green Mountain Tableworx regarding your custom furniture estimate. We will never share your information.
              </p>
            )}
          </div>}
        </form>
      </Container>
    </div>
  )
}
