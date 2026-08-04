import { useId, useState } from 'react'

type Branch = 'knowledge' | 'escalate'

const BRANCH_INFO: Record<Branch, { label: string; caption: string; color: string }> = {
  knowledge: {
    label: 'Ask: routine question',
    caption: 'Routine question → the agent answers straight from its knowledge.',
    color: '#6B5BD2',
  },
  escalate: {
    label: 'Ask: urgent issue',
    caption: 'Urgent issue → the condition routes it to a person instead.',
    color: '#C4453B',
  },
}

/** Static diagram extracted from copilot-studio-training-guide.html (fig 4). */
export function Fig4TopicFlow() {
  const [branch, setBranch] = useState<Branch | null>(null)
  const titleId = useId()

  const commonActive = branch !== null
  const activeColor = branch ? BRANCH_INFO[branch].color : '#1E2447'

  return (
    <figure className="rounded-block border-[1.5px] border-line bg-paper p-[22px] text-center">
      <div className="mx-auto max-w-full overflow-x-auto">
        <svg viewBox="0 0 640 220" role="img" aria-labelledby={titleId}>
          <title id={titleId}>
            Diagram: a topic flows from trigger to question to a condition with two branches
          </title>
          <rect
            x="40"
            y="85"
            width="120"
            height="50"
            rx="10"
            fill="#0E8C86"
            stroke={commonActive ? '#1E2447' : 'none'}
            strokeWidth={commonActive ? 2 : 0}
            style={{ transition: 'stroke-width 200ms ease' }}
          />
          <text x="100" y="106" textAnchor="middle" className="stw">
            Trigger
          </text>
          <text
            x="100"
            y="123"
            textAnchor="middle"
            fontFamily="Consolas"
            fontSize="10.5"
            fill="#E3F3F2"
          >
            "I need help"
          </text>
          <rect
            x="215"
            y="85"
            width="120"
            height="50"
            rx="10"
            fill="#fff"
            stroke={commonActive ? activeColor : '#1E2447'}
            strokeWidth={commonActive ? 3 : 2}
            style={{ transition: 'stroke 200ms ease, stroke-width 200ms ease' }}
          />
          <text x="275" y="106" textAnchor="middle" className="st" fontWeight="600">
            Question
          </text>
          <text x="275" y="123" textAnchor="middle" className="stm">
            "Which system?"
          </text>
          <path
            d="M390 110 L440 80 L490 110 L440 140 Z"
            fill="#F2B33D"
            stroke={commonActive ? activeColor : 'none'}
            strokeWidth={commonActive ? 3 : 0}
            style={{ transition: 'stroke 200ms ease, stroke-width 200ms ease' }}
          />
          <text x="440" y="114" textAnchor="middle" className="st" fontWeight="600" fontSize="12">
            Condition
          </text>
          <rect
            x="520"
            y="35"
            width="105"
            height="46"
            rx="10"
            fill={branch === 'knowledge' ? '#EEEBFA' : '#fff'}
            stroke={branch === 'knowledge' ? BRANCH_INFO.knowledge.color : '#6B5BD2'}
            strokeWidth={branch === 'knowledge' ? 3 : 2}
            style={{ transition: 'fill 200ms ease, stroke 200ms ease, stroke-width 200ms ease' }}
          />
          <text x="572" y="55" textAnchor="middle" className="st" fontSize="12.5">
            Answer from
          </text>
          <text x="572" y="71" textAnchor="middle" className="st" fontSize="12.5">
            knowledge
          </text>
          <rect
            x="520"
            y="139"
            width="105"
            height="46"
            rx="10"
            fill={branch === 'escalate' ? '#FBEAE8' : '#fff'}
            stroke={branch === 'escalate' ? BRANCH_INFO.escalate.color : '#6B5BD2'}
            strokeWidth={branch === 'escalate' ? 3 : 2}
            style={{ transition: 'fill 200ms ease, stroke 200ms ease, stroke-width 200ms ease' }}
          />
          <text x="572" y="159" textAnchor="middle" className="st" fontSize="12.5">
            Escalate to
          </text>
          <text x="572" y="175" textAnchor="middle" className="st" fontSize="12.5">
            a person
          </text>

          <path
            d="M160 110 L207 110"
            stroke={commonActive ? activeColor : '#1E2447'}
            strokeWidth={commonActive ? 3 : 2}
            style={{ transition: 'stroke 200ms ease, stroke-width 200ms ease' }}
          />
          <path d="M201 104 L211 110 L201 116" fill="none" stroke="#1E2447" strokeWidth="2" />
          <path
            d="M335 110 L382 110"
            stroke={commonActive ? activeColor : '#1E2447'}
            strokeWidth={commonActive ? 3 : 2}
            style={{ transition: 'stroke 200ms ease, stroke-width 200ms ease' }}
          />
          <path d="M376 104 L386 110 L376 116" fill="none" stroke="#1E2447" strokeWidth="2" />
          <path
            key={`upper-${branch ?? 'none'}`}
            d="M470 92 C 495 75 495 60 512 58"
            fill="none"
            stroke={branch === 'knowledge' ? BRANCH_INFO.knowledge.color : '#1E2447'}
            strokeWidth={branch === 'knowledge' ? 3 : 2}
            className={branch === 'knowledge' ? 'diagram-draw' : undefined}
          />
          <path
            key={`lower-${branch ?? 'none'}`}
            d="M470 128 C 495 145 495 160 512 162"
            fill="none"
            stroke={branch === 'escalate' ? BRANCH_INFO.escalate.color : '#1E2447'}
            strokeWidth={branch === 'escalate' ? 3 : 2}
            className={branch === 'escalate' ? 'diagram-draw' : undefined}
          />
        </svg>
      </div>

      <div className="mx-auto mt-3 flex flex-wrap items-center justify-center gap-2">
        {(Object.keys(BRANCH_INFO) as Branch[]).map((b) => (
          <button
            key={b}
            type="button"
            onClick={() => setBranch(b)}
            aria-pressed={branch === b}
            className={`rounded-pill border px-4 py-2 font-mono text-xs uppercase tracking-wide ${
              branch === b
                ? 'border-transparent text-white'
                : 'border-line bg-card hover:border-violet'
            }`}
            style={branch === b ? { backgroundColor: BRANCH_INFO[b].color } : undefined}
          >
            {BRANCH_INFO[b].label}
          </button>
        ))}
      </div>

      <div
        className="mx-auto mt-2 min-h-[1.5rem] text-sm text-ink"
        role="status"
        aria-live="polite"
      >
        {branch
          ? BRANCH_INFO[branch].caption
          : 'Choose how the question comes in to see the path light up.'}
      </div>

      <figcaption className="mt-2.5 font-mono text-xs text-muted">
        fig 4 · a topic is a small flowchart anyone can read
      </figcaption>
    </figure>
  )
}
