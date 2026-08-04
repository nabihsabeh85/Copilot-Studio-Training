import { useEffect, useId, useState } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

type Step = 0 | 1 | 2 | 3

const STOPS: Record<Exclude<Step, 0>, { x: number; y: number; caption: string }> = {
  1: { x: 105, y: 105, caption: 'Searches the connected sources.' },
  2: { x: 325, y: 105, caption: 'Composes an answer from what it found.' },
  3: { x: 530, y: 105, caption: 'Cites the source in the final answer.' },
}

/** Static diagram extracted from copilot-studio-training-guide.html (fig 3). */
export function Fig3KnowledgeGrounding() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [step, setStep] = useState<Step>(0)
  const [playing, setPlaying] = useState(false)
  const titleId = useId()

  useEffect(() => {
    if (!playing) return
    const stepDelay = prefersReducedMotion ? 80 : 1100
    const finishDelay = prefersReducedMotion ? 120 : 900

    if (step >= 3) {
      const timer = setTimeout(() => setPlaying(false), finishDelay)
      return () => clearTimeout(timer)
    }

    const timer = setTimeout(() => setStep((s) => (s + 1) as Step), stepDelay)
    return () => clearTimeout(timer)
  }, [step, playing, prefersReducedMotion])

  const handlePlay = () => {
    setStep(1)
    setPlaying(true)
  }

  const current = step > 0 ? STOPS[step as Exclude<Step, 0>] : null

  return (
    <figure className="rounded-block border-[1.5px] border-line bg-paper p-[22px] text-center">
      <div className="mx-auto max-w-full overflow-x-auto">
        <svg viewBox="0 0 640 210" role="img" aria-labelledby={titleId}>
          <title id={titleId}>
            Diagram: knowledge sources feed the agent, which gives a cited answer
          </title>
          <rect
            x="30"
            y="20"
            width="150"
            height="42"
            rx="10"
            fill="#fff"
            stroke="#0E8C86"
            strokeWidth="2"
          />
          <text x="105" y="46" textAnchor="middle" className="st">
            SharePoint
          </text>
          <rect
            x="30"
            y="84"
            width="150"
            height="42"
            rx="10"
            fill="#fff"
            stroke="#0E8C86"
            strokeWidth="2"
          />
          <text x="105" y="110" textAnchor="middle" className="st">
            Files you upload
          </text>
          <rect
            x="30"
            y="148"
            width="150"
            height="42"
            rx="10"
            fill="#fff"
            stroke="#0E8C86"
            strokeWidth="2"
          />
          <text x="105" y="174" textAnchor="middle" className="st">
            Public websites
          </text>
          <rect
            x="260"
            y="76"
            width="130"
            height="58"
            rx="12"
            fill="#6B5BD2"
            stroke={step === 2 ? '#1E2447' : 'none'}
            strokeWidth={step === 2 ? 3 : 0}
            style={{ transition: 'stroke-width 200ms ease' }}
          />
          <text x="325" y="110" textAnchor="middle" className="stw">
            Agent
          </text>
          <rect
            x="450"
            y="66"
            width="160"
            height="78"
            rx="12"
            fill="#fff"
            stroke={step === 3 ? '#6B5BD2' : '#1E2447'}
            strokeWidth={step === 3 ? 3 : 2}
            style={{ transition: 'stroke 200ms ease, stroke-width 200ms ease' }}
          />
          <text x="530" y="92" textAnchor="middle" className="st" fontWeight="600">
            Answer
          </text>
          <text x="530" y="112" textAnchor="middle" className="stm">
            grounded in sources,
          </text>
          <text x="530" y="127" textAnchor="middle" className="stm">
            with a citation [1]
          </text>
          <path d="M180 41 C 225 41 225 95 260 98" fill="none" stroke="#1E2447" strokeWidth="2" />
          <path d="M180 105 L260 105" fill="none" stroke="#1E2447" strokeWidth="2" />
          <path
            d="M180 169 C 225 169 225 115 260 112"
            fill="none"
            stroke="#1E2447"
            strokeWidth="2"
          />
          <path d="M390 105 L442 105" stroke="#1E2447" strokeWidth="2" />
          <path d="M436 99 L446 105 L436 111" fill="none" stroke="#1E2447" strokeWidth="2" />

          {current ? (
            <g
              className="diagram-token"
              style={{ transform: `translate(${current.x}px, ${current.y}px)` }}
            >
              <circle r="8" fill="#F2B33D" stroke="#1E2447" strokeWidth="1.5" />
            </g>
          ) : null}
        </svg>
      </div>

      <div className="mx-auto mt-3 flex flex-col items-center gap-2">
        <button
          type="button"
          onClick={handlePlay}
          disabled={playing}
          className={`rounded-pill px-5 py-2 font-display text-sm font-semibold ${
            playing
              ? 'cursor-not-allowed bg-line text-muted'
              : 'bg-violet text-white hover:opacity-90'
          }`}
        >
          {playing ? 'Playing…' : step === 3 ? 'Replay' : 'Play'}
        </button>
        <div className="min-h-[1.5rem] text-sm text-ink" role="status" aria-live="polite">
          {current ? current.caption : 'Press Play to watch a question get answered.'}
        </div>
      </div>

      <figcaption className="mt-2.5 font-mono text-xs text-muted">
        fig 3 · ground the agent in trusted sources
      </figcaption>
    </figure>
  )
}
