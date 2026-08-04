import type { ReactNode } from 'react'

interface CalloutProps {
  variant: 'why' | 'watch' | 'try' | 'info'
  title?: string
  children: ReactNode
}

const styles: Record<CalloutProps['variant'], string> = {
  why: 'border-teal bg-teal-soft',
  watch: 'border-red bg-red-soft',
  try: 'border-sun bg-sun-soft',
  info: 'border-violet bg-violet-soft',
}

export function Callout({ variant, title, children }: CalloutProps) {
  return (
    <div className={`rounded-r-[10px] border-l-4 px-4 py-3 ${styles[variant]}`}>
      {title ? (
        <p
          className={`mb-1 font-display text-sm font-bold uppercase tracking-wide ${
            variant === 'why'
              ? 'text-teal'
              : variant === 'watch'
                ? 'text-red'
                : variant === 'try'
                  ? 'text-ink'
                  : 'text-violet'
          }`}
        >
          {title}
        </p>
      ) : null}
      <div className="text-[15px]">{children}</div>
    </div>
  )
}
