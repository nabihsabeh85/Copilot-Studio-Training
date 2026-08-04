import { Link } from 'react-router-dom'
import { useLearner } from '../lib/useLearner'
import {
  countCompletedModules,
  findResumeModuleId,
  getModuleStatus,
  overallCompletionRatio,
  quizAverage,
} from '../lib/progress'
import { MODULE_NAV } from '../content/moduleNav'
import { courseMeta, modules } from '../content/modules'
import { ProgressRing } from '../components/layout/ProgressRing'
import { ModuleBadge } from '../components/ui/ModuleBadge'
import { MODULE_COUNT } from '../content/types'

export function HomePage() {
  const { state } = useLearner()
  const completed = countCompletedModules(state)
  const resumeId = findResumeModuleId(state)
  const avg = quizAverage(state)
  const isFirstVisit = completed === 0 && state.modules['1']?.quizAttempts === 0
  const earnedBadges = modules.filter((m) => getModuleStatus(state, m.id) === 'complete')

  return (
    <div className="mx-auto max-w-3xl">
      <header className="border-b-2 border-ink pb-10 pt-4">
        <p className="mb-3.5 font-mono text-xs uppercase tracking-[0.14em] text-teal">
          {courseMeta.eyebrow}
        </p>
        <h1 className="font-display text-[clamp(34px,5.5vw,54px)] font-extrabold leading-[1.05] tracking-[-0.02em]">
          {courseMeta.titleParts.map((part, i) =>
            part.accent ? (
              <span key={i} className="text-violet">
                {part.text}
              </span>
            ) : (
              <span key={i}>{part.text}</span>
            ),
          )}
        </h1>
        <p className="mt-4 max-w-[60ch] text-lg text-muted">{courseMeta.lede}</p>
        <div className="mt-6 flex flex-wrap gap-2.5">
          <span className="rounded-pill border-[1.5px] border-ink bg-card px-3 py-1.5 font-mono text-xs">
            10 modules
          </span>
          <span className="rounded-pill border-[1.5px] border-teal bg-card px-3 py-1.5 font-mono text-xs text-teal">
            45-60 min each
          </span>
          <span className="rounded-pill border-[1.5px] border-violet bg-card px-3 py-1.5 font-mono text-xs text-violet">
            1 agent, built by you
          </span>
        </div>
      </header>

      {isFirstVisit ? (
        <div className="mt-8 rounded-card border border-teal bg-teal-soft p-5">
          <h2 className="font-display text-lg font-bold">Welcome to Agent Academy</h2>
          <p className="mt-2 text-sm text-muted">
            Your progress saves automatically in this browser. Start with Module 1 — no coding
            required.
          </p>
          <Link
            to="/module/1"
            className="mt-4 inline-flex rounded-pill bg-teal px-5 py-2.5 font-display text-sm font-semibold text-white hover:opacity-90"
          >
            Start Module 1
          </Link>
        </div>
      ) : (
        <div className="mt-8 flex flex-wrap items-center gap-6 rounded-card border border-line bg-card p-5">
          <ProgressRing ratio={overallCompletionRatio(state)} size={72} />
          <div className="min-w-0 flex-1">
            <h2 className="font-display text-lg font-bold">Continue where you left off</h2>
            <p className="mt-1 text-sm text-muted">
              {completed} of {MODULE_COUNT} modules complete
              {avg != null ? ` · Quiz average ${avg.toFixed(1)}/5` : ''}
            </p>
            <Link
              to={`/module/${resumeId}`}
              className="mt-3 inline-flex rounded-pill bg-violet px-5 py-2.5 font-display text-sm font-semibold text-white hover:opacity-90"
            >
              Resume Module {resumeId}
            </Link>
          </div>
        </div>
      )}

      <section className="mt-12" aria-labelledby="journey-heading">
        <h2 id="journey-heading" className="mb-4 font-display text-[22px] font-bold">
          Your journey
        </h2>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 md:grid-cols-5">
          {MODULE_NAV.map((mod) => {
            const status = getModuleStatus(state, mod.id)
            return (
              <Link
                key={mod.id}
                to={`/module/${mod.id}`}
                className="rounded-inner border-[1.5px] border-line bg-card p-3 transition-colors hover:border-violet"
              >
                <div className="font-mono text-[11px] text-teal">
                  {String(mod.id).padStart(2, '0')}
                  <span className="ml-1 text-muted">· {status}</span>
                </div>
                <div className="mt-0.5 font-display text-[13.5px] font-semibold leading-snug">
                  {mod.title}
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="mt-12" aria-labelledby="badges-heading">
        <h2 id="badges-heading" className="mb-4 font-display text-[22px] font-bold">
          Your badges
        </h2>
        {earnedBadges.length === 0 ? (
          <p className="rounded-inner border border-dashed border-line bg-card p-4 text-sm text-muted">
            Complete your first module — checklist, try it, and knowledge check — to earn a badge
            here.
          </p>
        ) : (
          <div className="flex flex-wrap gap-5">
            {earnedBadges.map((m) => (
              <ModuleBadge key={m.id} moduleId={m.id} badgeName={m.badgeName} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
