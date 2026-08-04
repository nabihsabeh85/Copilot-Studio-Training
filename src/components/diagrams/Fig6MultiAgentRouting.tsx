import { useId, useState } from 'react'

type SpecialistId = 'hr' | 'it' | 'finance'

interface QuestionPreset {
  id: SpecialistId
  question: string
  specialistLabel: string
  pathD: string
  color: string
}

const PRESETS: QuestionPreset[] = [
  {
    id: 'hr',
    question: 'What does PTO accrual mean?',
    specialistLabel: 'HR specialist',
    pathD: 'M280 76 C 200 95 150 110 132 128',
    color: '#0E8C86',
  },
  {
    id: 'it',
    question: "My laptop won't start",
    specialistLabel: 'IT specialist',
    pathD: 'M320 76 L320 128',
    color: '#0E8C86',
  },
  {
    id: 'finance',
    question: 'Where is my expense reimbursement?',
    specialistLabel: 'Finance specialist',
    pathD: 'M360 76 C 440 95 490 110 508 128',
    color: '#0E8C86',
  },
]

const SPECIALIST_BOX = {
  hr: { x: 55, y: 135, width: 150, height: 52 },
  it: { x: 245, y: 135, width: 150, height: 52 },
  finance: { x: 435, y: 135, width: 150, height: 52 },
}

/** Static diagram extracted from copilot-studio-training-guide.html (fig 6). */
export function Fig6MultiAgentRouting() {
  const [asked, setAsked] = useState<QuestionPreset | null>(null)
  const [runId, setRunId] = useState(0)
  const titleId = useId()

  const ask = (preset: QuestionPreset) => {
    setAsked(preset)
    setRunId((n) => n + 1)
  }

  return (
    <figure className="rounded-block border-[1.5px] border-line bg-paper p-[22px] text-center">
      <div className="mx-auto max-w-full overflow-x-auto">
        <svg viewBox="0 0 640 210" role="img" aria-labelledby={titleId}>
          <title id={titleId}>
            Diagram: a parent agent routes questions to specialist child agents
          </title>
          <rect x="245" y="20" width="150" height="56" rx="12" fill="#6B5BD2" />
          <text x="320" y="44" textAnchor="middle" className="stw">
            Parent agent
          </text>
          <text
            x="320"
            y="62"
            textAnchor="middle"
            fontFamily="Consolas"
            fontSize="10.5"
            fill="#EEEBFA"
          >
            {asked ? `"${asked.question}"` : 'routes the question'}
          </text>

          {(Object.entries(SPECIALIST_BOX) as [SpecialistId, (typeof SPECIALIST_BOX)['hr']][]).map(
            ([id, box]) => {
              const isActive = asked?.id === id
              const label =
                id === 'hr' ? 'HR specialist' : id === 'it' ? 'IT specialist' : 'Finance specialist'
              const sub =
                id === 'hr'
                  ? 'policies & leave'
                  : id === 'it'
                    ? 'access & devices'
                    : 'expenses & POs'
              return (
                <g key={id}>
                  <rect
                    x={box.x}
                    y={box.y}
                    width={box.width}
                    height={box.height}
                    rx="10"
                    fill={isActive ? '#E3F3F2' : '#fff'}
                    stroke={isActive ? '#6B5BD2' : '#0E8C86'}
                    strokeWidth={isActive ? 3 : 2}
                    style={{
                      transition: 'fill 200ms ease, stroke 200ms ease, stroke-width 200ms ease',
                    }}
                  />
                  <text
                    x={box.x + box.width / 2}
                    y={box.y + 22}
                    textAnchor="middle"
                    className="st"
                    fontWeight="600"
                  >
                    {label}
                  </text>
                  <text
                    x={box.x + box.width / 2}
                    y={box.y + 39}
                    textAnchor="middle"
                    className="stm"
                  >
                    {sub}
                  </text>
                </g>
              )
            },
          )}

          {PRESETS.map((preset) => (
            <path
              key={asked?.id === preset.id ? `${preset.id}-${runId}` : preset.id}
              d={preset.pathD}
              fill="none"
              stroke={asked?.id === preset.id ? '#6B5BD2' : '#1E2447'}
              strokeWidth={asked?.id === preset.id ? 3 : 2}
              className={asked?.id === preset.id ? 'diagram-draw' : undefined}
            />
          ))}
        </svg>
      </div>

      <div className="mx-auto mt-3 flex max-w-xl flex-col items-center gap-2">
        <p className="font-mono text-xs uppercase tracking-wide text-muted">Ask the parent agent</p>
        <div className="flex flex-wrap justify-center gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => ask(preset)}
              aria-pressed={asked?.id === preset.id}
              className={`rounded-pill border px-3 py-1.5 text-sm ${
                asked?.id === preset.id
                  ? 'border-violet bg-violet-soft text-ink'
                  : 'border-line bg-card hover:border-violet'
              }`}
            >
              {preset.question}
            </button>
          ))}
        </div>
        <div className="min-h-[1.5rem] text-sm text-ink" role="status" aria-live="polite">
          {asked
            ? `Routed to the ${asked.specialistLabel} — that's what its description covers.`
            : 'Pick a question to see how the parent agent routes it.'}
        </div>
      </div>

      <figcaption className="mt-2.5 font-mono text-xs text-muted">
        fig 6 · clear descriptions = correct routing
      </figcaption>
    </figure>
  )
}
