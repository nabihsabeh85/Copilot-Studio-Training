import type { BuildStep } from '../../content/types'
import { RichText } from './RichText'

interface BuildStepperProps {
  steps: BuildStep[]
  checked: Record<string, boolean>
  onToggle: (stepId: string, value: boolean) => void
}

export function BuildStepper({ steps, checked, onToggle }: BuildStepperProps) {
  const done = steps.filter((s) => checked[s.id]).length
  const ratio = steps.length === 0 ? 0 : done / steps.length

  return (
    <section id="build" className="scroll-mt-28">
      <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
        <h2 className="font-display text-sm font-bold uppercase tracking-[0.06em]">Build it</h2>
        <p className="font-mono text-xs text-muted">
          {done}/{steps.length} steps
        </p>
      </div>
      <div
        className="mb-4 h-2 overflow-hidden rounded-pill bg-line"
        role="progressbar"
        aria-valuenow={done}
        aria-valuemin={0}
        aria-valuemax={steps.length}
        aria-label="Build steps progress"
      >
        <div
          className="h-full rounded-pill bg-teal transition-[width] duration-300"
          style={{ width: `${ratio * 100}%` }}
        />
      </div>
      <ol className="space-y-3">
        {steps.map((step, index) => {
          const isChecked = checked[step.id] === true
          return (
            <li
              key={step.id}
              className={`flex gap-3 rounded-block border px-3 py-3 ${
                isChecked ? 'border-teal bg-teal-soft/50' : 'border-line bg-card'
              }`}
            >
              <span
                className="flex size-8 shrink-0 items-center justify-center rounded-full bg-ink font-display text-sm font-bold text-white"
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <label className="flex min-w-0 flex-1 cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  className="mt-1 size-4 accent-teal"
                  checked={isChecked}
                  onChange={(e) => onToggle(step.id, e.target.checked)}
                />
                <span className="text-[15px] leading-relaxed">
                  <RichText tokens={step.tokens} />
                </span>
              </label>
            </li>
          )
        })}
      </ol>
    </section>
  )
}
