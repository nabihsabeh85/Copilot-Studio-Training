import { useId, useState } from 'react'
import { onActivateKeyDown } from './internal/a11y'

type PartId = 'knowledge' | 'instructions' | 'tools' | 'channels'

interface PartDef {
  id: PartId
  title: string
  subtitle: string
  definition: string
  box: { x: number; y: number; width: number; height: number }
  connectorPathId: string
}

const PARTS: PartDef[] = [
  {
    id: 'knowledge',
    title: 'Knowledge',
    subtitle: 'what it knows',
    definition: 'Knowledge is what it knows.',
    box: { x: 30, y: 30, width: 150, height: 46 },
    connectorPathId: 'fig1-connector-knowledge',
  },
  {
    id: 'instructions',
    title: 'Instructions',
    subtitle: 'how it behaves',
    definition: 'Instructions are how it behaves.',
    box: { x: 30, y: 164, width: 150, height: 46 },
    connectorPathId: 'fig1-connector-instructions',
  },
  {
    id: 'tools',
    title: 'Tools',
    subtitle: 'what it can do',
    definition: 'Tools are what it can do.',
    box: { x: 460, y: 30, width: 150, height: 46 },
    connectorPathId: 'fig1-connector-tools',
  },
  {
    id: 'channels',
    title: 'Channels',
    subtitle: 'where people use it',
    definition: 'Channels are where people use it.',
    box: { x: 460, y: 164, width: 150, height: 46 },
    connectorPathId: 'fig1-connector-channels',
  },
]

const CONNECTOR_D: Record<PartId, string> = {
  knowledge: 'M180 53 C 220 53 220 100 250 105',
  instructions: 'M180 187 C 220 187 220 140 250 135',
  tools: 'M460 53 C 420 53 420 100 390 105',
  channels: 'M460 187 C 420 187 420 140 390 135',
}

/** Static diagram extracted from copilot-studio-training-guide.html (fig 1). */
export function Fig1AgentAnatomy() {
  const [activePart, setActivePart] = useState<PartId | null>(null)
  const titleId = useId()

  const active = PARTS.find((p) => p.id === activePart) ?? null

  return (
    <figure className="rounded-block border-[1.5px] border-line bg-paper p-[22px] text-center">
      <div className="mx-auto max-w-full overflow-x-auto">
        <svg
          viewBox="0 0 640 240"
          role="img"
          aria-labelledby={titleId}
          onMouseLeave={() => setActivePart(null)}
        >
          <title id={titleId}>
            Diagram: an agent is made of knowledge, instructions, tools, and channels
          </title>
          <rect
            x="250"
            y="85"
            width="140"
            height="70"
            rx="14"
            fill="#6B5BD2"
            opacity={activePart ? 1 : 0.92}
            style={{ transition: 'opacity 200ms ease' }}
          />
          <text x="320" y="115" textAnchor="middle" className="stw">
            Your agent
          </text>
          <text
            x="320"
            y="134"
            textAnchor="middle"
            fontFamily="Consolas"
            fontSize="11"
            fill="#EEEBFA"
          >
            answers + acts
          </text>

          {PARTS.map((part) => (
            <path
              key={part.connectorPathId}
              d={CONNECTOR_D[part.id]}
              fill="none"
              stroke={activePart === part.id ? '#6B5BD2' : '#1E2447'}
              strokeWidth={activePart === part.id ? 3 : 2}
              className={activePart === part.id ? 'diagram-pulse' : undefined}
              style={{ transition: 'stroke 200ms ease, stroke-width 200ms ease' }}
            />
          ))}

          {PARTS.map((part) => {
            const isActive = activePart === part.id
            const cx = part.box.x + part.box.width / 2
            return (
              <g
                key={part.id}
                className="diagram-hotspot"
                tabIndex={0}
                role="button"
                aria-pressed={isActive}
                aria-label={`${part.title}: ${part.definition}`}
                onMouseEnter={() => setActivePart(part.id)}
                onMouseLeave={() => setActivePart(null)}
                onFocus={() => setActivePart(part.id)}
                onBlur={() => setActivePart(null)}
                onClick={() => setActivePart(part.id)}
                onKeyDown={onActivateKeyDown(() => setActivePart(part.id))}
              >
                <rect
                  x={part.box.x}
                  y={part.box.y}
                  width={part.box.width}
                  height={part.box.height}
                  rx="10"
                  fill={isActive ? '#EEEBFA' : '#fff'}
                  stroke="#0E8C86"
                  strokeWidth={isActive ? 3 : 2}
                  style={{ transition: 'fill 200ms ease, stroke-width 200ms ease' }}
                />
                <text x={cx} y={part.box.y + 22} textAnchor="middle" className="st">
                  {part.title}
                </text>
                <text x={cx} y={part.box.y + 37} textAnchor="middle" className="stm">
                  {part.subtitle}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      <div
        className="mx-auto mt-3 min-h-[2.25rem] max-w-md rounded-inner border border-line bg-card px-3 py-2 text-sm"
        role="status"
        aria-live="polite"
      >
        {active ? (
          <span>
            <strong className="text-violet">{active.title}:</strong> {active.definition}
          </span>
        ) : (
          <span className="text-muted">Hover, tap, or focus a part to see what it means.</span>
        )}
      </div>

      <figcaption className="mt-2.5 font-mono text-xs text-muted">
        fig 1 · the four parts of every agent
      </figcaption>
    </figure>
  )
}
