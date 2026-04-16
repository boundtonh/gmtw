'use client'

import Image from 'next/image'
import { cn } from '@/lib/utils'

export interface ThumbnailOption {
  value: string
  label: string
  subtitle?: string
  img?: string
  placeholder?: string
  objectPosition?: string
}

interface ThumbnailGridProps {
  options: ThumbnailOption[]
  selected: string
  onSelect: (value: string) => void
  cols?: '2' | '3' | '4' | '6' | '2-4' | '3-5' | '3-6' | '3-7'
  showTooltip?: boolean
  aspectRatio?: 'square' | '4/3'
  objectFit?: 'cover' | 'contain'
}

const colsMap = {
  '2': 'grid-cols-2',
  '3': 'grid-cols-2 md:grid-cols-3',
  '4': 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
  '6': 'grid-cols-5 lg:grid-cols-10',
  '2-4': 'grid-cols-2 lg:grid-cols-4',
  '3-5': 'grid-cols-3 lg:grid-cols-5',
  '3-6': 'grid-cols-3 lg:grid-cols-6',
  '3-7': 'grid-cols-3 lg:grid-cols-7',
}

export function ThumbnailGrid({
  options,
  selected,
  onSelect,
  cols = '3',
  showTooltip = false,
  aspectRatio = '4/3',
  objectFit = 'cover',
}: ThumbnailGridProps) {
  const aspectClass = aspectRatio === 'square' ? 'aspect-square' : 'aspect-[4/3]'
  const objectClass = objectFit === 'contain' ? 'object-contain' : 'object-cover'
  return (
    <div
      role="radiogroup"
      className={cn('grid gap-3 md:gap-4 mx-auto w-fit', colsMap[cols])}
    >
      {options.map((option) => {
        const isSelected = selected === option.value
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onSelect(option.value)}
            className={cn(
              'group relative flex flex-col items-center text-center rounded-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gmt-green focus-visible:ring-offset-2',
              !showTooltip && 'overflow-hidden',
              isSelected
                ? 'ring-2 ring-gmt-green shadow-md'
                : 'ring-1 ring-gmt-stone/20 hover:ring-gmt-stone/50'
            )}
          >
            {/* Tooltip — desktop only */}
            {showTooltip && option.img && (
              <div className="hidden lg:block pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="bg-white rounded-sm shadow-xl overflow-hidden w-52">
                  <div className="relative w-52 h-40">
                    <Image
                      src={option.img}
                      fill
                      alt={option.label}
                      sizes="208px"
                      className="object-cover"
                    />
                  </div>
                  <p className="font-body text-xs text-gmt-forest px-3 py-2 text-center">{option.label}</p>
                </div>
                {/* Arrow */}
                <div className="w-3 h-3 bg-white rotate-45 mx-auto -mt-1.5 shadow-sm" />
              </div>
            )}
            {/* Thumbnail area */}
            <div className={cn('relative w-full overflow-hidden', aspectClass)}>
              {option.img ? (
                <Image
                  src={option.img}
                  fill
                  alt={option.label}
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className={objectClass}
                  style={option.objectPosition ? { objectPosition: option.objectPosition } : undefined}
                />
              ) : (
                <div
                  className={cn(
                    'w-full h-full flex items-center justify-center',
                    option.placeholder ?? 'bg-gmt-mist'
                  )}
                >
                  <span className="font-body text-xs text-gmt-stone/60 tracking-wide uppercase px-2 text-center leading-tight">
                    {option.label}
                  </span>
                </div>
              )}

              {/* Selected checkmark badge */}
              {isSelected && (
                <div className="absolute top-2 right-2 w-6 h-6 bg-gmt-green rounded-full flex items-center justify-center shadow">
                  <svg
                    width="12"
                    height="9"
                    viewBox="0 0 12 9"
                    fill="none"
                    className="text-white"
                  >
                    <path
                      d="M1 4L4.5 7.5L11 1"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Label */}
            <div
              className={cn(
                'w-full px-2 py-2 font-body text-xs tracking-wide transition-colors duration-200',
                isSelected
                  ? 'bg-gmt-green text-white'
                  : 'bg-white text-gmt-forest'
              )}
            >
              {option.label}
              {option.subtitle && (
                <span className={cn('block text-[10px] leading-tight mt-0.5', isSelected ? 'text-white/80' : 'text-gmt-stone')}>
                  {option.subtitle}
                </span>
              )}
            </div>
          </button>
        )
      })}
    </div>
  )
}
