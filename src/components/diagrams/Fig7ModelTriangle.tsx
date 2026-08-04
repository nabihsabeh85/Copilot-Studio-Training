import { useId, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react'
import { clampToTriangle, describeTradeoff, type Point } from '../../lib/triangleMath'

const VIEWBOX_WIDTH = 640
const VIEWBOX_HEIGHT = 230
const KEY_STEP = 12

const REASONING_VERTEX: Point = { x: 320, y: 30 }
const SPEED_VERTEX: Point = { x: 80, y: 190 }
const COST_VERTEX: Point = { x: 560, y: 190 }

const DEFAULT_POSITION: Point = { x: 320, y: 140 }

/** Static diagram extracted from copilot-studio-training-guide.html (fig 7). */
export function Fig7ModelTriangle() {
  const [position, setPosition] = useState<Point>(DEFAULT_POSITION)
  const [dragging, setDragging] = useState(false)
  const svgRef = useRef<SVGSVGElement>(null)
  const titleId = useId()

  const { weights } = clampToTriangle(position, REASONING_VERTEX, SPEED_VERTEX, COST_VERTEX)
  const reasoningPct = Math.round(weights.a * 100)
  const speedPct = Math.round(weights.b * 100)
  const costPct = Math.round(weights.c * 100)
  const caption = describeTradeoff(weights)

  const clientToSvgPoint = (clientX: number, clientY: number): Point => {
    const svg = svgRef.current
    if (!svg) return position
    const rect = svg.getBoundingClientRect()
    if (rect.width === 0 || rect.height === 0) {
      return { x: clientX, y: clientY }
    }
    const scaleX = VIEWBOX_WIDTH / rect.width
    const scaleY = VIEWBOX_HEIGHT / rect.height
    return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY }
  }

  const movePointer = (clientX: number, clientY: number) => {
    const raw = clientToSvgPoint(clientX, clientY)
    const { point } = clampToTriangle(raw, REASONING_VERTEX, SPEED_VERTEX, COST_VERTEX)
    setPosition(point)
  }

  const handlePointerDown = (event: PointerEvent<SVGCircleElement>) => {
    if (typeof event.currentTarget.setPointerCapture === 'function') {
      event.currentTarget.setPointerCapture(event.pointerId)
    }
    setDragging(true)
    movePointer(event.clientX, event.clientY)
  }

  const handlePointerMove = (event: PointerEvent<SVGCircleElement>) => {
    if (!dragging) return
    movePointer(event.clientX, event.clientY)
  }

  const handlePointerUp = (event: PointerEvent<SVGCircleElement>) => {
    if (typeof event.currentTarget.releasePointerCapture === 'function') {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
    setDragging(false)
  }

  const handleKeyDown = (event: KeyboardEvent<SVGCircleElement>) => {
    let dx = 0
    let dy = 0
    if (event.key === 'ArrowUp') dy = -KEY_STEP
    else if (event.key === 'ArrowDown') dy = KEY_STEP
    else if (event.key === 'ArrowLeft') dx = -KEY_STEP
    else if (event.key === 'ArrowRight') dx = KEY_STEP
    else return

    event.preventDefault()
    const { point } = clampToTriangle(
      { x: position.x + dx, y: position.y + dy },
      REASONING_VERTEX,
      SPEED_VERTEX,
      COST_VERTEX,
    )
    setPosition(point)
  }

  return (
    <figure className="rounded-block border-[1.5px] border-line bg-paper p-[22px] text-center">
      <div className="mx-auto max-w-full overflow-x-auto">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
          role="img"
          aria-labelledby={titleId}
        >
          <title id={titleId}>
            Diagram: choosing a model balances reasoning depth, speed, and cost
          </title>
          <path
            d={`M${REASONING_VERTEX.x} ${REASONING_VERTEX.y} L${COST_VERTEX.x} ${COST_VERTEX.y} L${SPEED_VERTEX.x} ${SPEED_VERTEX.y} Z`}
            fill="none"
            stroke="#1E2447"
            strokeWidth="2"
          />
          <circle cx={REASONING_VERTEX.x} cy={REASONING_VERTEX.y} r="7" fill="#6B5BD2" />
          <text
            x={REASONING_VERTEX.x}
            y={REASONING_VERTEX.y - 12}
            textAnchor="middle"
            className="st"
            fontWeight="600"
          >
            Reasoning depth
          </text>
          <circle cx={SPEED_VERTEX.x} cy={SPEED_VERTEX.y} r="7" fill="#0E8C86" />
          <text
            x={SPEED_VERTEX.x}
            y={SPEED_VERTEX.y + 25}
            textAnchor="middle"
            className="st"
            fontWeight="600"
          >
            Speed
          </text>
          <circle cx={COST_VERTEX.x} cy={COST_VERTEX.y} r="7" fill="#F2B33D" />
          <text
            x={COST_VERTEX.x}
            y={COST_VERTEX.y + 25}
            textAnchor="middle"
            className="st"
            fontWeight="600"
          >
            Cost efficiency
          </text>

          <circle
            cx={position.x}
            cy={position.y}
            r={dragging ? 8 : 6}
            fill="#1E2447"
            stroke="#fff"
            strokeWidth="1.5"
            tabIndex={0}
            role="slider"
            aria-label="Model trade-off position. Use arrow keys to move between reasoning depth, speed, and cost."
            aria-valuetext={`Reasoning ${reasoningPct}%, speed ${speedPct}%, cost efficiency ${costPct}%`}
            className="diagram-hotspot"
            style={{ touchAction: 'none', transition: dragging ? 'none' : 'r 150ms ease' }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onKeyDown={handleKeyDown}
          />
        </svg>
      </div>

      <div className="mx-auto mt-3 max-w-sm space-y-2">
        <TradeoffBar label="Reasoning" value={reasoningPct} color="#6B5BD2" />
        <TradeoffBar label="Speed" value={speedPct} color="#0E8C86" />
        <TradeoffBar label="Cost" value={costPct} color="#F2B33D" />
        <p className="pt-1 text-sm text-ink" role="status" aria-live="polite">
          This fits {caption}.
        </p>
      </div>

      <figcaption className="mt-2.5 font-mono text-xs text-muted">
        fig 7 · model choice is a trade-off, not a right answer — drag the dot
      </figcaption>
    </figure>
  )
}

function TradeoffBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="w-16 shrink-0 text-left font-mono text-xs text-muted">{label}</span>
      <div className="h-2.5 flex-1 overflow-hidden rounded-pill bg-line">
        <div
          className="h-full rounded-pill"
          style={{ width: `${value}%`, backgroundColor: color, transition: 'width 150ms ease' }}
        />
      </div>
      <span className="w-10 shrink-0 text-right font-mono text-xs text-muted">{value}%</span>
    </div>
  )
}
