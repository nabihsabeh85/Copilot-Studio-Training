import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLearner } from '../lib/useLearner'
import { countCompletedModules, getModuleStatus, quizAverage } from '../lib/progress'
import { MODULE_NAV } from '../content/moduleNav'
import { modules } from '../content/modules'
import { ModuleBadge } from '../components/ui/ModuleBadge'

export function ProgressPage() {
  const { state, resetProgress } = useLearner()
  const [confirming, setConfirming] = useState(false)
  const completed = countCompletedModules(state)
  const avg = quizAverage(state)
  const earnedBadges = modules.filter((m) => getModuleStatus(state, m.id) === 'complete')

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-display text-3xl font-bold">My progress</h1>
      <p className="mt-2 text-muted">
        {completed}/10 modules complete
        {avg != null ? ` · Quiz average ${avg.toFixed(1)}/5` : ' · No quizzes attempted yet'}
      </p>

      <section className="mt-8" aria-labelledby="badges-heading">
        <h2 id="badges-heading" className="font-display text-lg font-bold">
          Badges earned
        </h2>
        {earnedBadges.length === 0 ? (
          <p className="mt-2 text-sm text-muted">
            Complete a module&apos;s checklist, try it, and knowledge check to earn its badge.
          </p>
        ) : (
          <div className="mt-4 flex flex-wrap gap-5">
            {earnedBadges.map((m) => (
              <ModuleBadge key={m.id} moduleId={m.id} badgeName={m.badgeName} />
            ))}
          </div>
        )}
      </section>

      <ul className="mt-8 space-y-2">
        {MODULE_NAV.map((mod) => {
          const status = getModuleStatus(state, mod.id)
          const progress = state.modules[String(mod.id)]
          return (
            <li
              key={mod.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-inner border border-line bg-card px-4 py-3"
            >
              <div>
                <Link
                  to={`/module/${mod.id}`}
                  className="font-display font-semibold hover:text-violet"
                >
                  {String(mod.id).padStart(2, '0')} · {mod.title}
                </Link>
                <p className="font-mono text-xs capitalize text-muted">{status}</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="font-mono text-xs text-muted">
                  Best quiz: {progress?.quizBestScore ?? 0}/5 · Attempts:{' '}
                  {progress?.quizAttempts ?? 0}
                </p>
                <Link
                  to={`/module/${mod.id}#quiz`}
                  className="rounded-pill border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-muted hover:border-violet hover:text-violet"
                >
                  Retake quiz
                </Link>
              </div>
            </li>
          )
        })}
      </ul>

      <div className="mt-10 rounded-card border border-line bg-card p-5">
        <h2 className="font-display text-lg font-bold">Free roam</h2>
        <p className="mt-1 text-sm text-muted">
          Want to skip ahead? Turn on <strong>Free roam</strong> from the Settings button in the top
          bar to unlock every module immediately — reading is never blocked either way.
        </p>
      </div>

      <div className="mt-6 rounded-card border border-red-soft bg-red-soft/40 p-5">
        <h2 className="font-display text-lg font-bold">Reset progress</h2>
        <p className="mt-1 text-sm text-muted">
          Clears all checklist, quiz, and completion data stored in this browser.
        </p>
        {!confirming ? (
          <button
            type="button"
            className="mt-4 rounded-pill border border-red px-4 py-2 text-sm text-red hover:bg-red hover:text-white"
            onClick={() => setConfirming(true)}
          >
            Reset all progress…
          </button>
        ) : (
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-pill bg-red px-4 py-2 text-sm text-white"
              onClick={() => {
                resetProgress()
                setConfirming(false)
              }}
            >
              Yes, reset everything
            </button>
            <button
              type="button"
              className="rounded-pill border border-line px-4 py-2 text-sm"
              onClick={() => setConfirming(false)}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
