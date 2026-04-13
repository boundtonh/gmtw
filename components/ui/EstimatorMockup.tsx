import { cn } from '@/lib/utils'

const MOCK_SPECIES = [
  { label: 'Black Walnut', color: 'bg-amber-900' },
  { label: 'Hard Maple',   color: 'bg-amber-200' },
  { label: 'Cherry',       color: 'bg-amber-700' },
  { label: 'White Ash',    color: 'bg-stone-200' },
  { label: 'Live Edge',    color: 'bg-amber-800' },
  { label: 'Douglas Fir',  color: 'bg-orange-200' },
]

const MOCK_SHAPES = [
  { label: 'Rectangle', selected: true },
  { label: 'Square',    selected: false },
  { label: 'Circle',    selected: false },
  { label: 'Oval',      selected: false },
]

const STEPS = 7
const ACTIVE = 2

export function EstimatorMockup() {
  return (
    <div className="w-full h-full bg-gmt-offwhite rounded-sm overflow-hidden flex flex-col p-6 gap-5 select-none pointer-events-none">

      {/* Step dots */}
      <div className="flex justify-center gap-2">
        {Array.from({ length: STEPS }).map((_, i) => (
          <div
            key={i}
            className={cn(
              'rounded-full transition-all',
              i === ACTIVE
                ? 'w-3 h-3 bg-gmt-green'
                : i < ACTIVE
                  ? 'w-2.5 h-2.5 bg-gmt-green/50'
                  : 'w-2.5 h-2.5 bg-gmt-stone/25'
            )}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-gmt-stone/15 rounded-full overflow-hidden">
        <div
          className="h-full bg-gmt-green rounded-full"
          style={{ width: `${((ACTIVE + 1) / STEPS) * 100}%` }}
        />
      </div>

      {/* Step label */}
      <div className="text-center">
        <p className="font-body text-[10px] tracking-[0.14em] uppercase text-gmt-stone">
          Step {ACTIVE + 1} of {STEPS}
        </p>
        <p className="font-display text-xl text-gmt-forest mt-1">Wood Species</p>
      </div>

      {/* Thumbnail grid — wood species */}
      <div className="grid grid-cols-3 gap-2 flex-1">
        {MOCK_SPECIES.map((s, i) => (
          <div
            key={s.label}
            className={cn(
              'rounded-sm overflow-hidden flex flex-col',
              i === 0 ? 'ring-2 ring-gmt-green shadow-sm' : 'ring-1 ring-gmt-stone/20'
            )}
          >
            <div className={cn('flex-1 min-h-[36px]', s.color)}>
              {i === 0 && (
                <div className="flex items-start justify-end p-1">
                  <div className="w-4 h-4 bg-gmt-green rounded-full flex items-center justify-center">
                    <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                      <path d="M1 3l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              )}
            </div>
            <div className={cn(
              'px-1.5 py-1 text-center',
              i === 0 ? 'bg-gmt-green' : 'bg-white'
            )}>
              <p className={cn('font-body text-[8px] leading-tight', i === 0 ? 'text-white' : 'text-gmt-forest')}>
                {s.label}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Table shape row */}
      <div>
        <p className="font-body text-[9px] tracking-[0.12em] uppercase text-gmt-stone mb-2 text-center">
          Table Shape
        </p>
        <div className="grid grid-cols-4 gap-1.5">
          {MOCK_SHAPES.map((shape) => (
            <div
              key={shape.label}
              className={cn(
                'rounded-sm py-1.5 text-center',
                shape.selected
                  ? 'bg-gmt-green ring-1 ring-gmt-green'
                  : 'bg-white ring-1 ring-gmt-stone/20'
              )}
            >
              <p className={cn('font-body text-[8px]', shape.selected ? 'text-white' : 'text-gmt-stone')}>
                {shape.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Estimated price preview */}
      <div className="bg-gmt-mist/70 border border-gmt-sage rounded-sm px-4 py-3 text-center">
        <p className="font-body text-[9px] tracking-[0.12em] uppercase text-gmt-stone mb-0.5">Estimated Range</p>
        <p className="font-display text-lg text-gmt-forest">$3,200 — $4,800</p>
      </div>

      {/* Next button */}
      <div className="bg-gmt-green rounded-sm py-2.5 text-center">
        <p className="font-body text-xs text-white">Select Table Shape →</p>
      </div>

    </div>
  )
}
