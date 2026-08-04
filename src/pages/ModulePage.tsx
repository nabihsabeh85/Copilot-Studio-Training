import { useCallback, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getModuleById } from '../content/modules'
import { useLearner } from '../lib/useLearner'
import {
  canMarkModuleComplete,
  getModuleProgress,
  getModuleStatus,
  isModuleUnlocked,
  isQuizPassed,
} from '../lib/progress'
import { ModuleDiagram } from '../components/diagrams'
import { ConceptSection } from '../components/module/ConceptSection'
import { BuildStepper } from '../components/module/BuildStepper'
import { WatchOut } from '../components/module/WatchOut'
import { ScreenshotSlotCard } from '../components/module/ScreenshotSlot'
import { TryIt } from '../components/module/TryIt'
import { GoDeeper } from '../components/module/GoDeeper'
import { ModuleFooterNav } from '../components/module/ModuleFooterNav'
import { ModuleMiniMap } from '../components/module/ModuleMiniMap'
import { NotesBox } from '../components/module/NotesBox'
import { Quiz } from '../components/module/Quiz'
import { Celebration } from '../components/module/Celebration'
import { Callout } from '../components/ui/Callout'

export function ModulePage() {
  const { id } = useParams()
  const moduleId = Number(id)
  const { state, updateModule } = useLearner()
  const [celebrate, setCelebrate] = useState(false)

  const mod = getModuleById(moduleId)

  const progress = getModuleProgress(state, moduleId)
  const unlocked = isModuleUnlocked(state, moduleId)
  const status = getModuleStatus(state, moduleId)

  const stepIds = useMemo(() => mod?.buildSteps.map((s) => s.id) ?? [], [mod])

  const completion = useMemo(() => {
    if (!mod) return { ready: false, remaining: ['Module not found'] }
    // Treat build steps as the checklist gate. Quiz must be passed (best score >= 4 of 5).
    return canMarkModuleComplete(
      {
        ...progress,
        checklist: Object.fromEntries(
          stepIds.map((sid) => [sid, progress.buildSteps[sid] === true]),
        ),
      },
      { checklistIds: stepIds, requireTryIt: true },
    )
  }, [mod, progress, stepIds])

  const onToggleStep = useCallback(
    (stepId: string, value: boolean) => {
      updateModule(moduleId, {
        buildSteps: { ...progress.buildSteps, [stepId]: value },
      })
    },
    [moduleId, progress.buildSteps, updateModule],
  )

  const onToggleTryIt = useCallback(
    (done: boolean) => {
      updateModule(moduleId, { tryItDone: done })
    },
    [moduleId, updateModule],
  )

  const onNotes = useCallback(
    (notes: string) => {
      updateModule(moduleId, { notes })
    },
    [moduleId, updateModule],
  )

  const onQuizResult = useCallback(
    ({ score }: { score: number; passed: boolean }) => {
      updateModule(moduleId, {
        quizBestScore: Math.max(progress.quizBestScore, score),
        quizAttempts: progress.quizAttempts + 1,
      })
    },
    [moduleId, progress.quizBestScore, progress.quizAttempts, updateModule],
  )

  const onMarkComplete = useCallback(() => {
    if (!completion.ready || progress.completed) return
    updateModule(moduleId, { completed: true })
    setCelebrate(true)
  }, [completion.ready, progress.completed, moduleId, updateModule])

  if (!mod || !Number.isInteger(moduleId) || moduleId < 1 || moduleId > 10) {
    return (
      <div className="mx-auto max-w-xl py-16 text-center">
        <h1 className="font-display text-2xl font-bold">Module not found</h1>
        <Link to="/" className="mt-4 inline-block text-violet underline">
          Back home
        </Link>
      </div>
    )
  }

  const miniSections = [
    { id: 'concept', label: 'In plain words', done: true },
    { id: 'diagram', label: 'Diagram', done: true },
    {
      id: 'build',
      label: 'Build it',
      done: stepIds.every((sid) => progress.buildSteps[sid]),
    },
    { id: 'watch-out', label: 'Watch out', done: true },
    { id: 'screenshots', label: 'Screenshots', done: true },
    { id: 'try-it', label: 'Try it', done: progress.tryItDone },
    {
      id: 'quiz',
      label: 'Knowledge check',
      done: isQuizPassed(progress),
    },
    { id: 'notes', label: 'My notes', done: progress.notes.trim().length > 0 },
    { id: 'go-deeper', label: 'Go deeper', done: true },
  ]

  return (
    <div className="flex gap-8">
      <article className="mx-auto min-w-0 max-w-3xl flex-1 print:max-w-none">
        {!unlocked ? (
          <div
            role="status"
            className="mb-4 rounded-block border-l-4 border-sun bg-sun-soft px-4 py-3 text-sm"
          >
            This module is still locked in the recommended path. You can read ahead, but the quiz
            stays disabled until you complete prior modules — or turn on <strong>Free roam</strong>{' '}
            in Settings.
          </div>
        ) : null}

        <header className="rounded-card border border-line bg-card p-6 sm:p-8">
          <div className="flex flex-wrap items-baseline gap-4">
            <span className="font-display text-4xl font-extrabold text-violet">
              {String(moduleId).padStart(2, '0')}
            </span>
            <h1 className="font-display text-[26px] font-bold tracking-tight">{mod.title}</h1>
            <span className="rounded-pill border border-line px-3 py-1 font-mono text-xs capitalize text-muted">
              {status}
            </span>
          </div>
          <div className="mt-4">
            <Callout variant="why">
              <strong className="text-teal">Why it matters:</strong> {mod.whyItMatters}
            </Callout>
          </div>
          <p className="mt-3 font-mono text-xs text-muted">
            Estimated time: {mod.estimatedMinutes}
          </p>
          <div className="mt-4 flex flex-wrap gap-2 print:hidden">
            <button
              type="button"
              onClick={() => window.print()}
              className="rounded-pill border border-line px-3 py-1.5 font-mono text-xs uppercase tracking-wide hover:border-violet"
            >
              Print summary
            </button>
          </div>
        </header>

        <div className="mt-10 space-y-10">
          <ConceptSection blocks={mod.concept} />

          <section id="diagram" className="scroll-mt-28">
            <h2 className="mb-3 font-display text-sm font-bold uppercase tracking-[0.06em]">
              Diagram
            </h2>
            <ModuleDiagram id={mod.diagram} />
          </section>

          <BuildStepper
            steps={mod.buildSteps}
            checked={progress.buildSteps}
            onToggle={onToggleStep}
          />

          <WatchOut items={mod.watchOuts} />

          <section id="screenshots" className="scroll-mt-28 space-y-4">
            <h2 className="font-display text-sm font-bold uppercase tracking-[0.06em]">
              Screenshots
            </h2>
            {mod.screenshotSlots.map((slot, i) => (
              <ScreenshotSlotCard key={slot.id} moduleId={moduleId} slot={slot} index={i} />
            ))}
          </section>

          <TryIt text={mod.tryIt} done={progress.tryItDone} onToggle={onToggleTryIt} />

          <Quiz
            questions={mod.quiz}
            locked={!unlocked}
            bestScore={progress.quizBestScore}
            onResult={onQuizResult}
          />

          <NotesBox value={progress.notes} onChange={onNotes} />

          <GoDeeper links={mod.goDeeper} />
        </div>

        <ModuleFooterNav
          moduleId={moduleId}
          canComplete={completion.ready}
          remaining={completion.remaining}
          completed={progress.completed}
          onMarkComplete={onMarkComplete}
        />
      </article>

      <ModuleMiniMap sections={miniSections} />

      <Celebration active={celebrate} onDone={() => setCelebrate(false)} />
    </div>
  )
}
