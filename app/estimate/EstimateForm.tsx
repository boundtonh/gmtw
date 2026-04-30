'use client'

import { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import Image from 'next/image'
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

interface SelectionCard {
  stepIndex: number
  stepLabel: string
  valueLabel: string
  img?: string
  placeholder?: string
  objectPosition?: string
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
  { value: 'olivewood',     label: 'Olivewood',                   img: `${BASE}/olivewood-2.png` },
  { value: 'monkey-pod',    label: 'Costa Rican Monkey Pod',      img: `${BASE}/olive-wood.jpg` },
]

const TABLE_SHAPES = [
  { value: 'rectangle', label: 'Rectangle', img: '/estimate/shapes/Rectangle.png' },
  { value: 'square',    label: 'Square',    img: '/estimate/shapes/Square.png' },
  { value: 'circle',    label: 'Circle',    img: '/estimate/shapes/Circular.png' },
  { value: 'oval',      label: 'Oval',      img: '/estimate/shapes/Oval.png' },
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
  { value: 'basic-river',  label: 'Basic River',                 img: '/images/start-build-bg.jpg' },
  { value: 'ocean-style',  label: 'Ocean Style — Our Specialty', img: '/images/ocean/ocean-style.webp' },
  { value: 'media-style',  label: 'Media Style',                 subtitle: 'Stones, Rocks, Shells, Sand, Memorabilia', img: '/estimate/resin-themes/Black Walnut RR Media Style.png' },
  { value: 'artisan-series', label: 'Artisan Series',            subtitle: 'Marbling or Artistically Blended Colors', img: '/estimate/resin-themes/Artisan Series.jpg' },
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
  { value: 'cleo',      label: 'Cleo',      img: '/images/bases/cleo.jpg' },
  { value: 'curva',     label: 'Curva',     img: '/images/bases/curva.jpg' },
  { value: 'draco',     label: 'Draco',     img: '/images/bases/draco.jpg' },
  { value: 'faras',     label: 'Faras',     img: '/images/bases/faras.jpg' },
  { value: 'lithe',     label: 'Lithe',     img: '/images/bases/lithe.jpg' },
  { value: 'norah',     label: 'Norah',     img: '/images/bases/norah.jpg' },
  { value: 'summa',     label: 'Summa',     img: '/images/bases/summa.webp' },
  { value: 'tulipe',    label: 'Tulipe',    img: '/images/bases/tulipe.jpg' },
  { value: 'wineglass', label: 'Wineglass', img: '/images/bases/wineglass.jpg' },
  { value: 'wishbone',  label: 'Wishbone',  img: '/images/bases/wishbone.jpg' },
  { value: 'xeni',      label: 'Xeni',      img: '/images/bases/xeni.jpg' },
]

const TABLE_BASES_WOOD = [
  { value: 'slab-post-trestle',   label: 'Slab Post Trestle',   img: '/images/bases/slab-post-tressle.webp' },
  { value: 'arch-trestle',        label: 'Arch Trestle',        img: '/images/bases/arch-trestle.webp' },
  { value: 'stump-base',          label: 'Stump Base',          img: '/images/bases/stump-base.webp' },
  { value: 'classic-turned-legs', label: 'Classic Turned Legs', img: '/images/bases/classic-turned-legs.webp' },
]

const STEPS = [
  { title: 'Build Your Table Online<br>Get An Instant Quote<br>Sent To Your Email', trackingName: 'Dimensions & Furniture Type' },
  { title: 'Wood Species',     trackingName: 'Wood Species' },
  { title: 'Table Shape',      trackingName: 'Table Shape' },
  { title: 'Edge Style',       trackingName: 'Edge Style' },
  { title: 'Epoxy & Finish',   trackingName: 'Epoxy & Finish' },
  { title: 'Table Base',       trackingName: 'Table Base' },
  { title: 'Your Information', trackingName: 'Your Information' },
]

function pushStepEvent(stepNumber: number, stepName: string) {
  if (typeof window === 'undefined') return
  window.dataLayer = (window as any).dataLayer || []
  ;(window as any).dataLayer.push({
    event: 'estimator_step_complete',
    estimator_step: stepNumber,
    estimator_step_name: stepName,
  })
}

// ─── Selection Chip Component ─────────────────────────────────────────────────

function SelectionChip({
  card,
  onClick,
}: {
  card: SelectionCard
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={`Go back to ${card.stepLabel}`}
      className="group flex items-center gap-2 bg-white border border-gmt-stone/20 hover:border-gmt-green/40 transition-colors duration-200 rounded-sm overflow-hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gmt-green focus-visible:ring-offset-1 focus-visible:ring-offset-gmt-offwhite px-3 py-2"
    >
      {/* Thumbnail */}
      <div className="relative w-8 h-8 flex-shrink-0">
        {card.img ? (
          <Image
            src={card.img}
            fill
            alt={card.valueLabel}
            sizes="32px"
            className="object-cover"
            style={card.objectPosition ? { objectPosition: card.objectPosition } : undefined}
          />
        ) : (
          <div className={cn('w-full h-full', card.placeholder ?? 'bg-gmt-stone/30')} />
        )}
      </div>
      {/* Text */}
      <div className="flex flex-col justify-center min-w-0 text-left">
        <span className="font-body text-[8px] tracking-[0.10em] uppercase text-gmt-stone leading-none truncate">
          {card.stepLabel}
        </span>
        <span className="font-body text-[10px] text-gmt-forest leading-tight truncate mt-0.5">
          {card.valueLabel}
        </span>
      </div>
    </button>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function EstimateForm() {
  const formTopRef = useRef<HTMLDivElement>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [activeGroup, setActiveGroup] = useState<'maple' | 'elm' | 'walnut' | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const {
    register,
    control,
    watch,
    setValue,
    getValues,
    trigger,
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
  const epoxyColor = watch('epoxyColor')

  // When a resin color is chosen, auto-select Basic River if no theme is set yet
  useEffect(() => {
    if (epoxyColor && epoxyColor !== 'none') {
      const current = getValues('backgroundColor')
      if (!current || current === 'none') {
        setValue('backgroundColor', 'basic-river')
      }
    }
  }, [epoxyColor, getValues, setValue])

  const scrollToTop = useCallback(() => {
    if (formTopRef.current) {
      const offset = formTopRef.current.getBoundingClientRect().top + window.scrollY - 90
      window.scrollTo({ top: offset, behavior: 'smooth' })
    }
  }, [])

  // Build selection cards for the strip
  function buildSelectionCards(): SelectionCard[] {
    const cards: SelectionCard[] = []
    const findOpt = <T extends { value: string; label?: string; img?: string; placeholder?: string; objectPosition?: string }>(arr: T[], value: string): T | undefined => arr.find(o => o.value === value)

    if (currentStep > 0) {
      const ft = findOpt(FURNITURE_TYPES, formValues.furnitureType)
      if (ft) cards.push({ stepIndex: 0, stepLabel: 'Furniture', valueLabel: ft.label, img: ft.img, objectPosition: ft.objectPosition })
      if ((formValues.length || 0) > 0 && (formValues.width || 0) > 0) {
        cards.push({ stepIndex: 0, stepLabel: 'Size', valueLabel: `${formValues.length}" × ${formValues.width}"`, placeholder: 'bg-gmt-charcoal' })
      }
    }

    if (currentStep > 1 && formValues.woodSpecies) {
      const allWood = [...WOOD_TIER1, ...WOOD_TIER2]
      let opt = findOpt(allWood, formValues.woodSpecies)
      if (!opt) {
        if (MAPLE_VALUES.has(formValues.woodSpecies)) opt = findOpt(WOOD_TIER1, 'maple')
        else if (ELM_VALUES.has(formValues.woodSpecies)) opt = findOpt(WOOD_TIER1, 'elm')
        else if (WALNUT_VALUES.has(formValues.woodSpecies)) opt = findOpt(WOOD_TIER1, 'walnut')
      }
      const subLabel = findOpt([...MAPLE_VARIETIES, ...ELM_VARIETIES, ...WALNUT_VARIETIES], formValues.woodSpecies)
      const label = subLabel?.label ?? opt?.label ?? formValues.woodSpecies
      if (opt) cards.push({ stepIndex: 1, stepLabel: 'Wood', valueLabel: label, img: opt.img })
    }

    if (currentStep > 2 && formValues.tableShape) {
      const opt = findOpt(TABLE_SHAPES, formValues.tableShape)
      if (opt) cards.push({ stepIndex: 2, stepLabel: 'Shape', valueLabel: opt.label, img: opt.img })
    }

    if (currentStep > 3 && formValues.edgeStyle) {
      const opt = findOpt(EDGE_STYLES, formValues.edgeStyle)
      if (opt) cards.push({ stepIndex: 3, stepLabel: 'Edge', valueLabel: opt.label, placeholder: opt.placeholder })
    }

    if (currentStep > 4) {
      if (formValues.epoxyColor) {
        const opt = findOpt(EPOXY_COLORS, formValues.epoxyColor)
        if (opt) cards.push({ stepIndex: 4, stepLabel: 'Resin', valueLabel: opt.label, placeholder: opt.placeholder })
      }
      if (formValues.backgroundColor && formValues.backgroundColor !== 'none') {
        const opt = findOpt(SPECIALTY_THEMES, formValues.backgroundColor)
        if (opt) cards.push({ stepIndex: 4, stepLabel: 'Theme', valueLabel: opt.label, img: opt.img, placeholder: opt.placeholder })
      }
    }

    if (currentStep > 5 && formValues.tableBase) {
      const allBases = [...TABLE_BASES_STANDARD_IRON, ...TABLE_BASES_ELEGANT_IRON, ...TABLE_BASES_WOOD]
      const opt = findOpt(allBases, formValues.tableBase)
      if (opt) cards.push({ stepIndex: 5, stepLabel: 'Base', valueLabel: opt.label, img: opt.img })
    }

    return cards
  }

  // Tier 2 (premium/exotic) species — everything else is Tier 1

  // Client-side price estimate (mirrors API formula — for testing only)
  const formValues = watch()

  const selectionCards = useMemo(() => buildSelectionCards(), [formValues, currentStep, buildSelectionCards])

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

      pushStepEvent(7, STEPS[6].trackingName)
      ;(window as any).dataLayer = (window as any).dataLayer || []
      ;(window as any).dataLayer.push({ event: 'estimator_submitted' })
      setSubmitSuccess(true)
      setIsSubmitting(false)
    } catch {
      setSubmitError('An error occurred. Please try again or contact us directly.')
      setIsSubmitting(false)
    }
  }

  const handleNext = async () => {
    if (currentStep === 0) {
      const valid = await trigger(['length', 'width', 'furnitureType'])
      if (!valid) return
    }
    if (currentStep < STEPS.length - 1) {
      pushStepEvent(currentStep + 1, STEPS[currentStep].trackingName)
      setCurrentStep(currentStep + 1)
      scrollToTop()
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      scrollToTop()
    }
  }

  return (
    <div ref={formTopRef} className="min-h-screen bg-gmt-offwhite py-12 md:py-16">
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
            {submitSuccess && (
              <div className="max-w-xl mx-auto text-center space-y-6">
                <svg className="w-12 h-12 text-gmt-green mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <h2 className="font-display text-3xl text-gmt-forest">Estimate Received!</h2>
                <p className="font-body text-gmt-stone">
                  Check your email — your price estimate and a full breakdown of your selections are on their way. A member of our team will follow up shortly to confirm the details.
                </p>
              </div>
            )}

            {/* Steps — hidden after submission */}
            {!submitSuccess && (
            <>
            {/* Selection Strip */}
            {selectionCards.length > 0 && (
              <div className="mb-10">
                <div
                  className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2"
                  role="navigation"
                  aria-label="Your selections so far"
                >
                  {selectionCards.map((card, i) => (
                    <SelectionChip
                      key={`${card.stepIndex}-${card.valueLabel}-${i}`}
                      card={card}
                      onClick={() => {
                        setCurrentStep(card.stepIndex)
                        scrollToTop()
                      }}
                    />
                  ))}
                </div>
              </div>
            )}

            <h2 id="step-heading" className="font-display text-3xl md:text-4xl text-gmt-forest mb-10 text-center">
              {STEPS[currentStep].title.split('<br>').map((line, idx) => (
                <div key={idx}>{line}</div>
              ))}
            </h2>

            {/* ── Step 0: Introduction & Dimensions ── */}
            {currentStep === 0 && (
              <div className="space-y-12">
                <div className="hidden md:block bg-gmt-mist/50 border-l-4 border-gmt-green px-6 py-4 rounded-sm max-w-2xl mx-auto">
                  <p className="font-body text-sm text-gmt-forest leading-relaxed">
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
                    rules={{ required: 'Please select what you are building' }}
                    render={({ field }) => (
                      <>
                        <ThumbnailGrid
                          options={FURNITURE_TYPES}
                          selected={field.value}
                          onSelect={field.onChange}
                          cols="3-5"
                        />
                        {errors.furnitureType && (
                          <p className="mt-3 font-body text-xs text-red-500 text-center" role="alert">
                            {errors.furnitureType.message}
                          </p>
                        )}
                      </>
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
                      cols="4"
                      aspectRatio="square"
                      objectFit="contain"
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
                      cols="4"
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
                        options={epoxyColor && epoxyColor !== 'none' ? SPECIALTY_THEMES.filter(t => t.value !== 'none') : SPECIALTY_THEMES}
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
                <p className="font-body text-gmt-stone text-base mb-6 text-center leading-relaxed">
                  A general price range will be sent to you via email based on your specs. A member of our sales team will be in touch with you shortly to confirm the estimate. The above prices are based on the parameters you put in. It could change based on discounts available, errors in specifications input. These are general prices, but are very close. Your final estimate is valid for 30 days.
                </p>

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
            <div className="flex flex-col-reverse lg:flex-row items-stretch lg:items-center lg:justify-between border-t border-gmt-stone/20 pt-8 gap-4">
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
              <p className="mt-6 font-body text-xs text-gmt-stone leading-relaxed max-w-xl mx-auto text-center">
                By submitting your information, you agree to be contacted by our team to verify the accuracy of the instant estimate tool.
              </p>
            )}
          </div>}
        </form>
      </Container>
    </div>
  )
}
