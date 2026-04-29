import type { UseFormRegister, FieldErrors } from 'react-hook-form'
import type { EstimateFormData } from '@/app/estimate/EstimateForm'
import { cn } from '@/lib/utils'

interface DimensionInputProps {
  register: UseFormRegister<EstimateFormData>
  errors: FieldErrors<EstimateFormData>
}

export function DimensionInput({ register, errors }: DimensionInputProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-6 max-w-md mx-auto">
      <div className="flex-1">
        <label
          htmlFor="length"
          className="block font-body text-xs tracking-[0.12em] uppercase text-gmt-stone mb-2"
        >
          Length
        </label>
        <div className="relative">
          <input
            id="length"
            type="number"
            inputMode="numeric"
            min={12}
            max={96}
            placeholder="96"
            aria-required="true"
            {...register('length', {
              required: 'Length is required',
              valueAsNumber: true,
              min: { value: 12, message: 'Minimum 12 inches' },
              max: { value: 96, message: 'The estimator is accurate up until 96 inches or 8 feet. For tables that exceed this, please inquire within.' },
            })}
            className={cn(
              'w-full font-body text-base bg-white border px-4 py-3 pr-16 rounded-sm focus:outline-none focus:ring-2 focus:ring-gmt-green transition-colors',
              errors.length ? 'border-red-400' : 'border-gmt-stone/30'
            )}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 font-body text-sm text-gmt-stone pointer-events-none">
            inches
          </span>
        </div>
        {errors.length && (
          <p className="mt-1 font-body text-xs text-red-500" role="alert">
            {errors.length.message}
            {errors.length.message?.includes('inquire') && (
              <> <a href="/contact" className="underline font-semibold hover:text-red-600">Contact us</a></>
            )}
          </p>
        )}
      </div>

      <div className="flex-1">
        <label
          htmlFor="width"
          className="block font-body text-xs tracking-[0.12em] uppercase text-gmt-stone mb-2"
        >
          Width
        </label>
        <div className="relative">
          <input
            id="width"
            type="number"
            inputMode="numeric"
            min={12}
            max={96}
            placeholder="42"
            aria-required="true"
            {...register('width', {
              required: 'Width is required',
              valueAsNumber: true,
              min: { value: 12, message: 'Minimum 12 inches' },
              max: { value: 96, message: 'Maximum 96 inches' },
            })}
            className={cn(
              'w-full font-body text-base bg-white border px-4 py-3 pr-16 rounded-sm focus:outline-none focus:ring-2 focus:ring-gmt-green transition-colors',
              errors.width ? 'border-red-400' : 'border-gmt-stone/30'
            )}
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 font-body text-sm text-gmt-stone pointer-events-none">
            inches
          </span>
        </div>
        {errors.width && (
          <p className="mt-1 font-body text-xs text-red-500" role="alert">
            {errors.width.message}
          </p>
        )}
      </div>
    </div>
  )
}
