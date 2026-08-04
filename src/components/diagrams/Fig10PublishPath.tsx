import { useEffect, useId, useState } from 'react'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { onActivateKeyDown } from './internal/a11y'

type TokenPosition = 'hidden' | 'draft' | 'demo'

const TOKEN_COORDS: Record<Exclude<TokenPosition, 'hidden'>, { x: number; y: number }> = {
  draft: { x: 110, y: 104 },
  demo: { x: 535, y: 37 },
}

const DEFAULT_MESSAGE = 'Publish to send this draft to the demo website first.'

/** Static diagram extracted from copilot-studio-training-guide.html (fig 10). */
export function Fig10PublishPath() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const [publishRun, setPublishRun] = useState(0)
  const [tokenAt, setTokenAt] = useState<TokenPosition>('hidden')
  const [demoUnlocked, setDemoUnlocked] = useState(false)
  const [nudge, setNudge] = useState<string | null>(null)
  const [message, setMessage] = useState(DEFAULT_MESSAGE)
  const titleId = useId()

  useEffect(() => {
    if (publishRun === 0) return
    const arriveDelay = prefersReducedMotion ? 60 : 900
    const raf = requestAnimationFrame(() => setTokenAt('demo'))
    const arriveTimer = setTimeout(() => {
      setDemoUnlocked(true)
      setMessage('Published! The demo website now shows this snapshot — Teams is unlocked.')
    }, arriveDelay)
    const hideTimer = setTimeout(() => setTokenAt('hidden'), arriveDelay + 500)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(arriveTimer)
      clearTimeout(hideTimer)
    }
  }, [publishRun, prefersReducedMotion])

  useEffect(() => {
    if (!nudge) return
    const timer = setTimeout(() => setNudge(null), 3200)
    return () => clearTimeout(timer)
  }, [nudge])

  const handlePublish = () => {
    setTokenAt('draft')
    setPublishRun((n) => n + 1)
  }

  const handleDemoClick = () => {
    setDemoUnlocked(true)
    setNudge(null)
    setMessage('Demo website visited — Teams is now unlocked.')
  }

  const handleLiveClick = () => setMessage('Live website updated with this snapshot.')

  const handleTeamsClick = () => {
    if (!demoUnlocked) {
      setNudge('Demo first! Visit or publish to the demo website before enabling Teams.')
      return
    }
    setNudge(null)
    setMessage('Now live in Teams & Microsoft 365.')
  }

  const tokenCoords = tokenAt === 'hidden' ? null : TOKEN_COORDS[tokenAt]

  return (
    <figure className="rounded-block border-[1.5px] border-line bg-paper p-[22px] text-center">
      <div className="mx-auto max-w-full overflow-x-auto">
        <svg viewBox="0 0 640 210" role="img" aria-labelledby={titleId}>
          <title id={titleId}>
            Diagram: a draft agent is published to channels like the demo website, live website, and
            Teams
          </title>
          <rect
            x="40"
            y="75"
            width="140"
            height="58"
            rx="12"
            fill="#fff"
            stroke="#1E2447"
            strokeWidth="2"
            strokeDasharray="6 4"
          />
          <text x="110" y="99" textAnchor="middle" className="st" fontWeight="600">
            Draft agent
          </text>
          <text x="110" y="117" textAnchor="middle" className="stm">
            only you see this
          </text>

          <g
            className="diagram-hotspot"
            tabIndex={0}
            role="button"
            aria-label="Publish: send the draft snapshot to the demo website"
            onClick={handlePublish}
            onKeyDown={onActivateKeyDown(handlePublish)}
          >
            <rect x="250" y="75" width="130" height="58" rx="29" fill="#6B5BD2" />
            <text x="315" y="110" textAnchor="middle" className="stw">
              Publish
            </text>
          </g>

          <g
            className="diagram-hotspot"
            tabIndex={0}
            role="button"
            aria-label="Demo website: stakeholder review"
            onClick={handleDemoClick}
            onKeyDown={onActivateKeyDown(handleDemoClick)}
          >
            <rect
              x="460"
              y="15"
              width="150"
              height="44"
              rx="10"
              fill={demoUnlocked ? '#E3F3F2' : '#fff'}
              stroke="#0E8C86"
              strokeWidth={demoUnlocked ? 3 : 2}
              style={{ transition: 'fill 200ms ease, stroke-width 200ms ease' }}
            />
            <text x="535" y="36" textAnchor="middle" className="st" fontSize="12.5">
              Demo website
            </text>
            <text x="535" y="51" textAnchor="middle" className="stm">
              stakeholder review
            </text>
          </g>

          <g
            className="diagram-hotspot"
            tabIndex={0}
            role="button"
            aria-label="Live website"
            onClick={handleLiveClick}
            onKeyDown={onActivateKeyDown(handleLiveClick)}
          >
            <rect
              x="460"
              y="83"
              width="150"
              height="44"
              rx="10"
              fill="#fff"
              stroke="#0E8C86"
              strokeWidth="2"
            />
            <text x="535" y="110" textAnchor="middle" className="st" fontSize="12.5">
              Live website
            </text>
          </g>

          <g
            className="diagram-hotspot"
            tabIndex={0}
            role="button"
            aria-disabled={!demoUnlocked}
            aria-label={
              demoUnlocked
                ? 'Teams & Microsoft 365: admin approval needed'
                : 'Teams & Microsoft 365, locked until the demo website has been visited'
            }
            onClick={handleTeamsClick}
            onKeyDown={onActivateKeyDown(handleTeamsClick)}
          >
            <rect
              x="460"
              y="151"
              width="150"
              height="44"
              rx="10"
              fill="#fff"
              stroke="#0E8C86"
              strokeWidth="2"
              opacity={demoUnlocked ? 1 : 0.5}
              style={{ transition: 'opacity 200ms ease' }}
            />
            <text
              x="535"
              y="172"
              textAnchor="middle"
              className="st"
              fontSize="12.5"
              opacity={demoUnlocked ? 1 : 0.5}
            >
              {demoUnlocked ? 'Teams & Microsoft 365' : 'Teams & Microsoft 365 🔒'}
            </text>
            <text
              x="535"
              y="187"
              textAnchor="middle"
              className="stm"
              opacity={demoUnlocked ? 1 : 0.5}
            >
              admin approval needed
            </text>
          </g>

          <path d="M180 104 L242 104" stroke="#1E2447" strokeWidth="2" />
          <path d="M236 98 L246 104 L236 110" fill="none" stroke="#1E2447" strokeWidth="2" />
          <path d="M380 90 C 415 75 425 45 452 38" fill="none" stroke="#1E2447" strokeWidth="2" />
          <path d="M380 104 L452 105" fill="none" stroke="#1E2447" strokeWidth="2" />
          <path
            d="M380 118 C 415 133 425 165 452 172"
            fill="none"
            stroke="#1E2447"
            strokeWidth="2"
          />

          {tokenCoords ? (
            <g
              className="diagram-token"
              style={{ transform: `translate(${tokenCoords.x}px, ${tokenCoords.y}px)` }}
            >
              <circle r="7" fill="#F2B33D" stroke="#1E2447" strokeWidth="1.5" />
            </g>
          ) : null}
        </svg>
      </div>

      <div className="mx-auto mt-3 max-w-md space-y-2">
        {nudge ? (
          <div
            className="rounded-inner border border-sun bg-sun-soft px-3 py-2 text-sm font-semibold text-ink"
            role="alert"
          >
            {nudge}
          </div>
        ) : (
          <div className="min-h-[2.5rem] text-sm text-ink" role="status" aria-live="polite">
            {message}
          </div>
        )}
      </div>

      <figcaption className="mt-2.5 font-mono text-xs text-muted">
        fig 10 · demo website first, then the real channels
      </figcaption>
    </figure>
  )
}
