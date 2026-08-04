import type { ReactNode } from 'react'

interface PillProps {
  children: ReactNode
  variant?: 'ui' | 'chip' | 'kw'
}

export function Pill({ children, variant = 'chip' }: PillProps) {
  if (variant === 'ui') {
    return (
      <span className="mx-0.5 inline-block rounded-md border border-line bg-paper px-1.5 py-0.5 font-mono text-[12.5px] text-ink">
        {children}
      </span>
    )
  }
  if (variant === 'kw') {
    return (
      <button
        type="button"
        className="mx-0.5 inline-block rounded-pill border border-teal/40 bg-teal-soft px-2 py-0.5 font-medium text-teal hover:border-teal"
      >
        {children}
      </button>
    )
  }
  return (
    <span className="inline-flex rounded-pill border-[1.5px] border-ink bg-card px-3 py-1.5 font-mono text-xs">
      {children}
    </span>
  )
}
