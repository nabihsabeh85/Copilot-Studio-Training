import { useEffect, useState } from 'react'

interface CelebrationProps {
  active: boolean
  onDone: () => void
}

function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function Celebration({ active, onDone }: CelebrationProps) {
  const [reduced] = useState(prefersReducedMotion)

  useEffect(() => {
    if (!active) return
    const ms = reduced ? 400 : 1400
    const t = window.setTimeout(onDone, ms)
    return () => window.clearTimeout(t)
  }, [active, onDone, reduced])

  if (!active) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[60] flex items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <div
        className={`rounded-card border border-violet bg-card px-8 py-6 text-center shadow-xl ${
          reduced ? '' : 'animate-[pop_0.4s_ease-out]'
        }`}
      >
        <p className="font-display text-2xl font-bold text-violet">Module complete!</p>
        <p className="mt-1 text-sm text-muted">Nice work — the next module is unlocked.</p>
      </div>
      {!reduced
        ? Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              className="absolute size-2 rounded-full"
              style={{
                left: `${10 + ((i * 37) % 80)}%`,
                top: `${20 + ((i * 53) % 60)}%`,
                background: i % 3 === 0 ? '#6B5BD2' : i % 3 === 1 ? '#0E8C86' : '#F2B33D',
                animation: `confetti 1.2s ease-out ${i * 0.04}s both`,
              }}
            />
          ))
        : null}
      <style>{`
        @keyframes pop {
          from { transform: scale(0.85); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes confetti {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          100% { transform: translateY(80px) scale(0.4); opacity: 0; }
        }
      `}</style>
    </div>
  )
}
