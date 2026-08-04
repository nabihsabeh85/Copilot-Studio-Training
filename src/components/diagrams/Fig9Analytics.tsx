import { useId, useState } from 'react'
import { Callout } from '../ui/Callout'

interface WeekBar {
  label: string
  sessions: number
  box: { x: number; y: number; width: number; height: number }
  opacity?: number
}

const WEEKS: WeekBar[] = [
  { label: 'Week 1', sessions: 62, box: { x: 60, y: 150, width: 70, height: 30 } },
  { label: 'Week 2', sessions: 141, box: { x: 150, y: 110, width: 70, height: 70 } },
  { label: 'Week 3', sessions: 214, box: { x: 240, y: 70, width: 70, height: 110 } },
  {
    label: 'This week (so far)',
    sessions: 176,
    box: { x: 330, y: 90, width: 70, height: 90 },
    opacity: 0.55,
  },
]

/** Static diagram extracted from copilot-studio-training-guide.html (fig 9). */
export function Fig9Analytics() {
  const [hovered, setHovered] = useState<number | null>(null)
  const [badWeek, setBadWeek] = useState(false)
  const titleId = useId()

  const hoveredWeek = hovered !== null ? WEEKS[hovered] : null

  return (
    <figure className="rounded-block border-[1.5px] border-line bg-paper p-[22px] text-center">
      <div className="mx-auto max-w-full overflow-x-auto">
        <svg viewBox="0 0 640 210" role="img" aria-labelledby={titleId}>
          <title id={titleId}>
            Diagram: a simple analytics view showing sessions, resolution, and escalation
          </title>

          {WEEKS.map((week, i) => {
            const isHovered = hovered === i
            return (
              <rect
                key={week.label}
                x={week.box.x}
                y={week.box.y}
                width={week.box.width}
                height={week.box.height}
                rx="6"
                fill="#0E8C86"
                opacity={isHovered ? 1 : (week.opacity ?? 1)}
                tabIndex={0}
                role="img"
                aria-label={`${week.label}: ${week.sessions} sessions`}
                className="diagram-hotspot"
                style={{ transition: 'opacity 150ms ease' }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(i)}
                onBlur={() => setHovered(null)}
              />
            )
          })}

          <line x1="40" y1="180" x2="430" y2="180" stroke="#1E2447" strokeWidth="2" />
          <text x="235" y="202" textAnchor="middle" className="stm">
            sessions per week
          </text>
          <rect
            x="470"
            y="55"
            width="140"
            height="52"
            rx="10"
            fill="#fff"
            stroke="#0E8C86"
            strokeWidth="2"
          />
          <text x="540" y="77" textAnchor="middle" className="st" fontWeight="600">
            Resolved
          </text>
          <text x="540" y="95" textAnchor="middle" className="stm">
            ↑ good, keep going
          </text>
          <rect
            x="470"
            y="123"
            width="140"
            height="52"
            rx="10"
            fill={badWeek ? '#FBEAE8' : '#fff'}
            stroke={badWeek ? '#C4453B' : '#F2B33D'}
            strokeWidth={badWeek ? 3.5 : 2.5}
            style={{ transition: 'fill 200ms ease, stroke 200ms ease, stroke-width 200ms ease' }}
          />
          <text x="540" y="145" textAnchor="middle" className="st" fontWeight="600">
            Escalated
          </text>
          <text x="540" y="163" textAnchor="middle" className="stm">
            ↑ investigate why
          </text>
        </svg>
      </div>

      <div className="mx-auto mt-3 max-w-md space-y-3">
        <div className="min-h-[1.5rem] text-sm text-ink" role="status" aria-live="polite">
          {hoveredWeek
            ? `${hoveredWeek.label}: ${hoveredWeek.sessions} sessions`
            : 'Hover or focus a bar to see its session count.'}
        </div>

        <label className="flex cursor-pointer items-center justify-center gap-2 text-sm">
          <input
            type="checkbox"
            className="size-4 accent-red"
            checked={badWeek}
            onChange={(e) => setBadWeek(e.target.checked)}
          />
          Simulate a bad week
        </label>

        {badWeek ? (
          <Callout variant="watch" title="Escalations spiked">
            <p>
              This week&apos;s escalation rate is well above normal — investigate why. Check recent
              topic changes, knowledge gaps, or a model update before assuming it will pass.
            </p>
          </Callout>
        ) : null}
      </div>

      <figcaption className="mt-2.5 font-mono text-xs text-muted">
        fig 9 · watch two numbers first: resolution and escalation
      </figcaption>
    </figure>
  )
}
