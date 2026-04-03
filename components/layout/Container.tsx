import { cn } from '@/lib/utils'

interface ContainerProps {
  children: React.ReactNode
  className?: string
}

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn('mx-auto w-full max-w-[1320px] px-6 md:px-12 xl:px-24', className)}>
      {children}
    </div>
  )
}
