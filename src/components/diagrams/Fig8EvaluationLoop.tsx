import { useEffect, useId, useState } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { onActivateKeyDown } from './internal/a11y'

interface Stage {
  label: string
  box: { x: number; y: number; width: number; height: number }
  fill: string
  description: string
}

const STAGES: Stage[] = [
  {
    label: 'Build a test set',
    box: { x: 245, y: 15, width: 150, height: 46 },
    fill: '#fff',
    description: 'Collect real questions with known-good answers so results are measurable.',
  },
  {
    label: 'Run evaluation',
    box: { x: 460, y: 90, width: 150, height: 46 },
    fill: '#fff',
    description: 'Run the agent against every test question automatically.',
  },
  {
    label: 'Review results',
    box: { x: 245, y: 162, width: 150, height: 46 },
    fill: '#fff',
    description: 'Look at what passed, what failed, and why.',
  },
  {
    label: 'Fix & improve',
    box: { x: 30, y: 90, width: 150, height: 46 },
    fill: '#F2B33D',
    description:
      'Adjust instructions, knowledge, or topics based on what you learned, then run it again.',
  },
]

const CYCLE_MS = 2200

/** Static diagram extracted from copilot-studio-training-guide.html (fig 8). */
export function Fig8EvaluationLoop() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [activeIndex, setActiveIndex] = useState(0)
  const [paused, setPaused] = useState(prefersReducedMotion)
  const titleId = useId()

  useEffect(() => {
    if (paused || prefersReducedMotion) return
    const id = setInterval(() => setActiveIndex((i) => (i + 1) % STAGES.length), CYCLE_MS)
    return () => clearInterval(id)
  }, [paused, prefersReducedMotion])

  const handleStageActivate = (index: number) => {
    if (paused && activeIndex === index) {
      setPaused(false)
      return
    }
    setActiveIndex(index)
    setPaused(true)
  }

  const handleToggle = () => {
    if (prefersReducedMotion) {
      setActiveIndex((i) => (i + 1) % STAGES.length)
      return
    }
    setPaused((p) => !p)
  }

  const active = STAGES[activeIndex]!

  return (
    <figure className="rounded-block border-[1.5px] border-line bg-paper p-[22px] text-center">
      <div className="mx-auto max-w-full overflow-x-auto">
        <svg viewBox="0 0 640 220" role="img" aria-labelledby={titleId}>
          <title id={titleId}>
            Diagram: the evaluation loop of test set, run, results, fix, repeat
          </title>

          {STAGES.map((stage, i) => {
            const isActive = i === activeIndex
            return (
              <g
                key={stage.label}
                className="diagram-hotspot"
                tabIndex={0}
                role="button"
                aria-pressed={isActive}
                aria-label={`${stage.label}: ${stage.description}`}
                onClick={() => handleStageActivate(i)}
                onKeyDown={onActivateKeyDown(() => handleStageActivate(i))}
              >
                <rect
                  x={stage.box.x}
                  y={stage.box.y}
                  width={stage.box.width}
                  height={stage.box.height}
                  rx="10"
                  fill={stage.fill}
                  stroke={isActive ? '#6B5BD2' : '#0E8C86'}
                  strokeWidth={isActive ? 4 : 2}
                  style={{ transition: 'stroke 200ms ease, stroke-width 200ms ease' }}
                />
                <text
                  x={stage.box.x + stage.box.width / 2}
                  y={stage.box.y + stage.box.height / 2 + 5}
                  textAnchor="middle"
                  className="st"
                  fontWeight="600"
                >
                  {stage.label}
                </text>
              </g>
            )
          })}

          <path d="M395 45 C 490 55 520 65 535 82" fill="none" stroke="#1E2447" strokeWidth="2" />
          <path d="M528 76 L537 84 L525 87" fill="none" stroke="#1E2447" strokeWidth="2" />
          <path
            d="M535 136 C 520 158 440 175 400 182"
            fill="none"
            stroke="#1E2447"
            strokeWidth="2"
          />
          <path d="M407 176 L397 183 L408 188" fill="none" stroke="#1E2447" strokeWidth="2" />
          <path
            d="M245 185 C 150 175 120 160 105 142"
            fill="none"
            stroke="#1E2447"
            strokeWidth="2"
          />
          <path d="M112 149 L103 140 L115 138" fill="none" stroke="#1E2447" strokeWidth="2" />
          <path d="M105 90 C 120 62 200 48 240 41" fill="none" stroke="#1E2447" strokeWidth="2" />
          <path d="M233 47 L243 40 L232 35" fill="none" stroke="#1E2447" strokeWidth="2" />
        </svg>
      </div>

      <div className="mx-auto mt-3 flex flex-col items-center gap-2">
        <button
          type="button"
          onClick={handleToggle}
          className="rounded-pill border border-line bg-card px-4 py-1.5 font-mono text-xs uppercase tracking-wide hover:border-violet"
        >
          {prefersReducedMotion ? 'Next stage' : paused ? 'Resume' : 'Pause'}
        </button>
        <div
          className="min-h-[2.5rem] max-w-md rounded-inner border border-line bg-card px-3 py-2 text-sm"
          role="status"
          aria-live="polite"
        >
          <strong className="text-violet">{active.label}:</strong> {active.description}
        </div>
      </div>

      <figcaption className="mt-2.5 font-mono text-xs text-muted">
        fig 8 · the loop that makes agents trustworthy
      </figcaption>
    </figure>
  )
}
