import { useId, useState } from 'react'
import { onActivateKeyDown } from './internal/a11y'

const EXAMPLE_SETS: [string, string, string][] = [
  ['Send an email', 'Look up a record', 'Start an approval'],
  ['Create a file', 'Post a message', 'Update a row'],
  ['Schedule a meeting', 'Add a calendar event', 'Notify a channel'],
]

const BOX_Y = [18, 78, 138]

/** Static diagram extracted from copilot-studio-training-guide.html (fig 5). */
export function Fig5Tools() {
  const [setIndex, setSetIndex] = useState(0)
  const titleId = useId()
  const examples = EXAMPLE_SETS[setIndex % EXAMPLE_SETS.length]!

  const cycle = () => setSetIndex((i) => (i + 1) % EXAMPLE_SETS.length)

  return (
    <figure className="rounded-block border-[1.5px] border-line bg-paper p-[22px] text-center">
      <div className="mx-auto max-w-full overflow-x-auto">
        <svg viewBox="0 0 640 200" role="img" aria-labelledby={titleId}>
          <title id={titleId}>
            Diagram: the agent uses connectors as tools to act in other systems
          </title>
          <rect x="40" y="70" width="130" height="58" rx="12" fill="#6B5BD2" />
          <text x="105" y="104" textAnchor="middle" className="stw">
            Agent
          </text>

          <g
            className="diagram-hotspot"
            tabIndex={0}
            role="button"
            aria-label={`Connector: a pre-built bridge. Click to cycle example actions. Showing set ${setIndex + 1} of ${EXAMPLE_SETS.length}.`}
            onClick={cycle}
            onKeyDown={onActivateKeyDown(cycle)}
          >
            <rect
              x="240"
              y="70"
              width="150"
              height="58"
              rx="12"
              fill="#fff"
              stroke="#F2B33D"
              strokeWidth="2.5"
            />
            <text x="315" y="94" textAnchor="middle" className="st" fontWeight="600">
              Connector
            </text>
            <text x="315" y="112" textAnchor="middle" className="stm">
              a pre-built bridge
            </text>
          </g>

          {examples.map((label, i) => (
            <g key={`${setIndex}-${i}`}>
              <rect
                x="460"
                y={BOX_Y[i]}
                width="150"
                height="44"
                rx="10"
                fill="#fff"
                stroke="#0E8C86"
                strokeWidth="2"
                className="diagram-draw"
              />
              <text
                x="535"
                y={(BOX_Y[i] ?? 0) + 27}
                textAnchor="middle"
                className="st"
                style={{ fontSize: label.length > 18 ? '11.5px' : undefined }}
              >
                {label}
              </text>
            </g>
          ))}

          <path d="M170 99 L232 99" stroke="#1E2447" strokeWidth="2" />
          <path d="M226 93 L236 99 L226 105" fill="none" stroke="#1E2447" strokeWidth="2" />
          <path d="M390 90 C 425 80 425 45 452 40" fill="none" stroke="#1E2447" strokeWidth="2" />
          <path d="M390 99 L452 100" fill="none" stroke="#1E2447" strokeWidth="2" />
          <path
            d="M390 108 C 425 118 425 155 452 160"
            fill="none"
            stroke="#1E2447"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="mx-auto mt-3 flex flex-col items-center gap-1.5">
        <button
          type="button"
          onClick={cycle}
          className="rounded-pill border border-line bg-card px-4 py-2 font-mono text-xs uppercase tracking-wide hover:border-violet"
        >
          Show other examples
        </button>
        <p className="font-mono text-xs text-muted">
          Example set {setIndex + 1} of {EXAMPLE_SETS.length} · one bridge, many actions
        </p>
      </div>

      <figcaption className="mt-2.5 font-mono text-xs text-muted">
        fig 5 · one agent, many actions, through connectors
      </figcaption>
    </figure>
  )
}
