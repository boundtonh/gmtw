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
  tableShape: 'rectangle' | 'circle' | 'oval' | 'other'
  edgeStyle: 'live-edge' | 'straight' | 'bevel' | 'c-shaped' | 'lake-shaped' | 'chiseled'
  epoxyColor: string
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
  { value: 'walnut',         label: 'Walnut (2 Types)', img: `${BASE}/black-walnut.jpg` },
  { value: 'willow',         label: 'Willow',         img: `${BASE}/willow.jpg` },
  { value: 'butternut',      label: 'Butternut',      img: `${BASE}/butternut.jpg` },
]

const WOOD_TIER2 = [
  { value: 'acacia',            label: 'Indonesian / Mexican Acacia', img: `${BASE}/acacia.webp` },
  { value: 'brazilian-catalpa', label: 'Brazilian Catalpa',           img: `${BASE}/brazilian-catalpa.jpg` },
  { value: 'guanacaste',        label: 'Costa Rican Guanacaste',      img: `${BASE}/gunacoste.jpg` },
  { value: 'buckeye-burl',      label: 'Buckeye Burl',                img: `${BASE}/Buckeye-burl.jpg` },
  { value: 'claro-walnut',      label: 'Claro Walnut',                img: `${BASE}/ClaroWalnut.jpg` },
  { value: 'olivewood',         label: 'Olivewood',                   img: `${BASE}/olive-wood.jpg` },
  { value: 'monkey-pod',        label: 'Costa Rican Monkey Pod',      img: `${BASE}/monkey-pod.webp` },
]

const TABLE_SHAPES = [
  { value: 'rectangle', label: 'Rectangle', placeholder: 'bg-gmt-mist' },
  { value: 'circle',    label: 'Circle',    placeholder: 'bg-gmt-mist' },
  { value: 'oval',      label: 'Oval',      placeholder: 'bg-gmt-mist' },
  { value: 'other',     label: 'Other / Custom', placeholder: 'bg-gmt-mist' },
]

const EDGE_STYLES = [
  { value: 'live-edge',  label: 'Live Edge',     placeholder: 'bg-gmt-sage' },
  { value: 'straight',   label: 'Straight Edge', placeholder: 'bg-gmt-mist' },
  { value: 'bevel',      label: 'Bevel Edge',    placeholder: 'bg-gmt-mist' },
  { value: 'c-shaped',   label: 'C-Shaped Edge', placeholder: 'bg-gmt-mist' },
  { value: 'lake-shaped',label: 'Lake Shaped',   placeholder: 'bg-gmt-mist' },
  { value: 'chiseled',   label: 'Chiseled Edge', placeholder: 'bg-gmt-mist' },
]

const EPOXY_COLORS = [
  { value: 'none',       label: 'No Epoxy',    placeholder: 'bg-stone-100' },
  { value: 'blue',       label: 'Blue',        placeholder: 'bg-blue-500' },
  { value: 'teal',       label: 'Teal',        placeholder: 'bg-teal-500' },
  { value: 'ocean-blue', label: 'Ocean Blue',  placeholder: 'bg-cyan-700' },
  { value: 'black',      label: 'Black',       placeholder: 'bg-stone-900' },
  { value: 'white',      label: 'White',       placeholder: 'bg-white' },
  { value: 'custom',     label: 'Custom Color',placeholder: 'bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400' },
]

const BACKGROUND_COLORS = [
  { value: 'ocean-style', label: 'Ocean Style',  img: '/images/ocean/ocean-style.webp' },
  { value: 'stone-style', label: 'Stone Style',  img: '/images/ocean/stone-style.webp' },
  { value: 'custom',      label: 'Custom',       placeholder: 'bg-gmt-mist' },
]

const SURFACE_FINISHES = [
  { value: 'full-gloss',             label: 'Full Gloss',              placeholder: 'bg-sky-100' },
  { value: 'full-matte',             label: 'Full Matte',              placeholder: 'bg-stone-200' },
  { value: 'matte-wood-glossy-resin',label: 'Matte Wood / Glossy Resin', placeholder: 'bg-amber-100' },
]

const ENGRAVING_OPTIONS = [
  { value: 'yes', label: 'Yes — Add Engraving', placeholder: 'bg-gmt-forest' },
  { value: 'no',  label: 'No Engraving',        placeholder: 'bg-stone-100' },
]

const TABLE_BASES = [
  { value: 'haru-pedestal',            label: 'Haru Pedestal',           img: '/images/bases/haru-pedestal.webp' },
  { value: 'wine-glass',               label: 'Wine Glass',              img: '/images/bases/wine-glass.webp' },
  { value: 'lithe-pedestal',           label: 'Lithe Pedestal',          img: '/images/bases/lithe-pedestal.webp' },
  { value: 'summa',                    label: 'Summa',                   img: '/images/bases/Summa.webp' },
  { value: 'center-prong',             label: 'Center Prong',            img: '/images/bases/center-prong.webp' },
  { value: 'x-cross',                  label: 'X Cross',                 img: '/images/bases/x-cross.webp' },
  { value: 'iron-trapezoid',           label: 'Iron Trapezoid',          img: '/images/bases/iron-trapezoid.webp' },
  { value: 'iron-a-frame',             label: 'Iron A-Frame',            img: '/images/bases/iron-a-frame.webp' },
  { value: 'iron-h-design',            label: 'Iron H-Design',           img: '/images/bases/iron-h-design.webp' },
  { value: 'rectangle',                label: 'Rectangle',               img: '/images/bases/rectangle.webp' },
  { value: 'reverse-trapezoid',        label: 'Reverse Trapezoid',       img: '/images/bases/reverse-trapezoid.webp' },
  { value: 'contemporary-hairpins',    label: 'Contemporary Hairpins',   img: '/images/bases/contemporary-hairpins.webp' },
  { value: 'slab-post-trestle',        label: 'Slab Post Trestle',       img: '/images/bases/slab-post-tressle.webp' },
  { value: 'center-arch-pedestal',     label: 'Center Arch Pedestal',    img: '/images/bases/center-arch-pedestal.webp' },
  { value: 'arch-trestle',             label: 'Arch Trestle',            img: '/images/bases/arch-trestle.webp' },
  { value: 'stump-base',               label: 'Stump Base',              img: '/images/bases/stump-base.webp' },
  { value: 'classic-turned-legs',      label: 'Classic Turned Legs',     img: '/images/bases/classic-turned-legs.webp' },
  { value: 'namu-pedestal',            label: 'Namu Pedestal',           img: '/images/bases/namu-pedestal.webp' },
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
  const {
    register,
    control,
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
      surfaceFinish: undefined,
      engraving: false,
      tableBase: '',
      preferredLocation: undefined,
    },
  })

  const onSubmit = (data: EstimateFormData) => {
    console.log('Estimate form submitted:', data)
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
            {/* Step title */}
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
                <div className="border-l-4 border-gmt-green bg-gmt-mist/50 p-6 rounded-sm max-w-2xl mx-auto">
                  <p className="font-body text-sm text-gmt-forest leading-relaxed">
                    <span className="font-semibold">We can make practically any shape.</span> Select &ldquo;Other&rdquo; if you&rsquo;d like a custom shape. Live edge pieces are not naturally straight, and there can be slight inconsistencies in the straightness of the table edges, which is natural to the wood character.
                  </p>
                </div>
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
              </div>
            )}

            {/* ── Step 3: Edge Style ── */}
            {currentStep === 3 && (
              <div>
                <p className="font-body text-gmt-stone text-base mb-10 text-center max-w-2xl mx-auto">
                  The edge profile defines the character of your piece. Live edge preserves the natural tree form; other options offer a cleaner, more refined silhouette.
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

                <div>
                  <p className="font-body text-xs tracking-[0.12em] uppercase text-gmt-stone mb-4 text-center">
                    Epoxy Color
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

                <div>
                  <p className="font-body text-xs tracking-[0.12em] uppercase text-gmt-stone mb-4 text-center">
                    Background
                  </p>
                  <Controller
                    name="backgroundColor"
                    control={control}
                    render={({ field }) => (
                      <ThumbnailGrid
                        options={BACKGROUND_COLORS}
                        selected={field.value}
                        onSelect={field.onChange}
                        cols="3-6"
                      />
                    )}
                  />
                </div>

                <div>
                  <p className="font-body text-xs tracking-[0.12em] uppercase text-gmt-stone mb-4 text-center">
                    Surface Finish
                  </p>
                  <Controller
                    name="surfaceFinish"
                    control={control}
                    render={({ field }) => (
                      <ThumbnailGrid
                        options={SURFACE_FINISHES}
                        selected={field.value ?? ''}
                        onSelect={field.onChange}
                        cols="3"
                      />
                    )}
                  />
                </div>

                <div>
                  <p className="font-body text-xs tracking-[0.12em] uppercase text-gmt-stone mb-4 text-center">
                    Engraving
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
                </div>
              </div>
            )}

            {/* ── Step 5: Table Base ── */}
            {currentStep === 5 && (
              <div>
                <p className="font-body text-gmt-stone text-base mb-10 text-center max-w-2xl mx-auto">
                  Choose a base style. More options are available in our showrooms — these are our most popular.
                </p>
                <Controller
                  name="tableBase"
                  control={control}
                  render={({ field }) => (
                    <>
                      <ThumbnailGrid
                        options={TABLE_BASES}
                        selected={field.value}
                        onSelect={field.onChange}
                        cols="3-6"
                        showTooltip
                      />
                      <p className="font-body text-gmt-stone text-sm mt-10 text-center max-w-2xl mx-auto">
                        More options are available, and we will send them to you shortly.
                      </p>
                    </>
                  )}
                />
              </div>
            )}

            {/* ── Step 6: Your Information ── */}
            {currentStep === 6 && (
              <div className="space-y-6 max-w-xl mx-auto">
                <p className="font-body text-gmt-stone text-base mb-8 text-center">
                  We&rsquo;ll reach out within 24 hours with your custom estimate.
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

                {/* Preferred Location */}
                <div>
                  <p className="block font-body text-xs tracking-[0.12em] uppercase text-gmt-stone mb-3">
                    Preferred Showroom
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    {[
                      { value: 'concord-nh',   label: 'Concord, NH' },
                      { value: 'smithfield-ri',label: 'Smithfield, RI' },
                      { value: 'remote',       label: 'Remote / Delivery' },
                    ].map((loc) => (
                      <label
                        key={loc.value}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <input
                          type="radio"
                          value={loc.value}
                          {...register('preferredLocation')}
                          className="sr-only"
                        />
                        <span className="w-5 h-5 rounded-full border-2 border-gmt-stone/40 flex items-center justify-center transition-colors group-has-[:checked]:border-gmt-green">
                          <span className="w-2.5 h-2.5 rounded-full bg-gmt-green scale-0 transition-transform group-has-[:checked]:scale-100" />
                        </span>
                        <span className="font-body text-sm text-gmt-forest">{loc.label}</span>
                      </label>
                    ))}
                  </div>
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

          </div>

          {/* Navigation */}
          <div className="mt-16 mx-auto max-w-4xl">
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

              {currentStep === STEPS.length - 1 ? (
                <button
                  type="submit"
                  className="font-body text-white bg-gmt-green px-10 py-4 hover:bg-gmt-forest transition-colors duration-300"
                >
                  Send My Estimate Request
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

            {currentStep === STEPS.length - 1 && (
              <p className="mt-4 font-body text-xs text-gmt-stone leading-relaxed max-w-xl mx-auto text-center">
                By submitting this form you agree to be contacted by Green Mountain Tableworx regarding your custom furniture estimate. We will never share your information.
              </p>
            )}
          </div>
        </form>
      </Container>
    </div>
  )
}
