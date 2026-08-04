import { Link } from 'react-router-dom'

interface ModuleFooterNavProps {
  moduleId: number
  canComplete: boolean
  remaining: string[]
  completed: boolean
  onMarkComplete: () => void
}

export function ModuleFooterNav({
  moduleId,
  canComplete,
  remaining,
  completed,
  onMarkComplete,
}: ModuleFooterNavProps) {
  const tip =
    remaining.length === 0
      ? undefined
      : `Still needed: ${remaining.slice(0, 3).join('; ')}${remaining.length > 3 ? '…' : ''}`

  return (
    <nav
      className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6 print:hidden"
      aria-label="Module navigation"
    >
      {moduleId > 1 ? (
        <Link to={`/module/${moduleId - 1}`} className="text-violet hover:underline">
          ← Previous module
        </Link>
      ) : (
        <span />
      )}

      <div className="group relative">
        <button
          type="button"
          disabled={!canComplete || completed}
          title={!canComplete ? tip : undefined}
          onClick={onMarkComplete}
          className={`rounded-pill px-5 py-2.5 font-display text-sm font-semibold ${
            completed
              ? 'bg-teal text-white'
              : canComplete
                ? 'bg-violet text-white hover:opacity-90'
                : 'cursor-not-allowed bg-line text-muted'
          }`}
        >
          {completed ? 'Module complete' : 'Mark module complete'}
        </button>
        {!canComplete && !completed ? (
          <span className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 hidden w-64 -translate-x-1/2 rounded-inner border border-line bg-card p-3 text-left text-xs text-muted shadow-lg group-hover:block group-focus-within:block">
            {tip}
          </span>
        ) : null}
      </div>

      {moduleId < 10 ? (
        <Link to={`/module/${moduleId + 1}`} className="text-violet hover:underline">
          Next module →
        </Link>
      ) : (
        <span />
      )}
    </nav>
  )
}
