import { NavLink } from 'react-router-dom'
import { useLearner } from '../../lib/useLearner'
import { getModuleStatus } from '../../lib/progress'
import { MODULE_NAV } from '../../content/moduleNav'
import type { ModuleStatus } from '../../content/types'

interface SidebarProps {
  open: boolean
  onClose: () => void
}

function StatusIcon({ status }: { status: ModuleStatus }) {
  const label =
    status === 'complete'
      ? 'Complete'
      : status === 'in-progress'
        ? 'In progress'
        : status === 'locked'
          ? 'Locked'
          : 'Available'

  const symbol =
    status === 'complete' ? '✓' : status === 'in-progress' ? '●' : status === 'locked' ? '○' : '◇'

  return (
    <span
      className={`inline-flex size-5 shrink-0 items-center justify-center rounded-full font-mono text-[10px] ${
        status === 'complete'
          ? 'bg-teal text-white'
          : status === 'in-progress'
            ? 'bg-violet text-white'
            : status === 'locked'
              ? 'bg-line text-muted'
              : 'border border-line text-muted'
      }`}
      title={label}
      aria-label={label}
    >
      {symbol}
    </span>
  )
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const { state } = useLearner()

  const nav = (
    <nav aria-label="Course modules" className="flex h-full flex-col">
      <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Modules</p>
      <ul className="scrollbar-thin flex-1 space-y-1 overflow-y-auto">
        {MODULE_NAV.map((mod) => {
          const status = getModuleStatus(state, mod.id)
          return (
            <li key={mod.id}>
              <NavLink
                to={`/module/${mod.id}`}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-start gap-2 rounded-inner border px-3 py-2 text-sm transition-colors ${
                    isActive
                      ? 'border-violet bg-violet-soft'
                      : 'border-transparent hover:border-line hover:bg-card'
                  }`
                }
              >
                <StatusIcon status={status} />
                <span className="min-w-0">
                  <span className="block font-mono text-[10px] text-teal">
                    {String(mod.id).padStart(2, '0')}
                  </span>
                  <span className="block font-display text-[13.5px] font-semibold leading-snug">
                    {mod.title}
                  </span>
                </span>
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )

  return (
    <>
      {/* Desktop */}
      <aside className="sticky top-[105px] hidden h-[calc(100vh-105px)] w-64 shrink-0 overflow-y-auto border-r border-line bg-paper p-4 print:hidden lg:block">
        {nav}
      </aside>

      {/* Mobile drawer */}
      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden print:hidden" role="presentation">
          <button
            type="button"
            className="absolute inset-0 bg-ink/40"
            aria-label="Close navigation"
            onClick={onClose}
          />
          <aside className="absolute inset-y-0 left-0 w-[min(100%,20rem)] overflow-y-auto border-r border-line bg-card p-4 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-display font-bold">Modules</p>
              <button
                type="button"
                className="rounded-pill border border-line px-3 py-1 font-mono text-xs"
                onClick={onClose}
              >
                Close
              </button>
            </div>
            {nav}
          </aside>
        </div>
      ) : null}
    </>
  )
}
