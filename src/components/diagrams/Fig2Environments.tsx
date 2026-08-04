import { useId, useState } from 'react'
import { Callout } from '../ui/Callout'
import { onActivateKeyDown } from './internal/a11y'

type EnvId = 'dev' | 'test' | 'prod'

interface EnvDef {
  id: EnvId
  label: string
  box: { x: number; y: number; width: number; height: number }
  happens: string
  never: string
}

const ENVS: EnvDef[] = [
  {
    id: 'dev',
    label: 'Dev',
    box: { x: 30, y: 55, width: 160, height: 62 },
    happens: 'You build and experiment here, freely and often.',
    never: 'Never treat Dev as production truth — it can break at any time.',
  },
  {
    id: 'test',
    label: 'Test',
    box: { x: 240, y: 55, width: 160, height: 62 },
    happens: 'Other people verify your work before it goes further.',
    never: 'Never skip verification before Production.',
  },
  {
    id: 'prod',
    label: 'Production',
    box: { x: 450, y: 55, width: 160, height: 62 },
    happens: 'Real users rely on this every day.',
    never: 'Never build or experiment directly in Production.',
  },
]

/** Static diagram extracted from copilot-studio-training-guide.html (fig 2). */
export function Fig2Environments() {
  const [selected, setSelected] = useState<EnvId | null>(null)
  const titleId = useId()

  const active = ENVS.find((e) => e.id === selected) ?? null

  return (
    <figure className="rounded-block border-[1.5px] border-line bg-paper p-[22px] text-center">
      <div className="mx-auto max-w-full overflow-x-auto">
        <svg viewBox="0 0 640 170" role="img" aria-labelledby={titleId}>
          <title id={titleId}>Diagram: build in Dev, verify in Test, ship to Production</title>

          {ENVS.map((env) => {
            const isDev = env.id === 'dev'
            const isSelected = selected === env.id
            return (
              <g key={env.id}>
                {isDev ? (
                  <rect
                    x={env.box.x - 6}
                    y={env.box.y - 6}
                    width={env.box.width + 12}
                    height={env.box.height + 12}
                    rx="16"
                    fill="none"
                    stroke="#0E8C86"
                    strokeWidth="3"
                    className="diagram-glow"
                  />
                ) : null}
                <g
                  className="diagram-hotspot"
                  tabIndex={0}
                  role="button"
                  aria-pressed={isSelected}
                  aria-label={`${env.label}: ${env.happens} ${env.never}`}
                  onClick={() => setSelected(env.id)}
                  onKeyDown={onActivateKeyDown(() => setSelected(env.id))}
                >
                  <rect
                    x={env.box.x}
                    y={env.box.y}
                    width={env.box.width}
                    height={env.box.height}
                    rx="12"
                    fill={isDev ? '#0E8C86' : isSelected ? '#EEEBFA' : '#fff'}
                    stroke={isSelected ? '#6B5BD2' : isDev ? '#0E8C86' : '#1E2447'}
                    strokeWidth={isSelected ? 3 : 2}
                    style={{ transition: 'fill 200ms ease, stroke 200ms ease' }}
                  />
                  <text
                    x={env.box.x + env.box.width / 2}
                    y={env.box.y + 27}
                    textAnchor="middle"
                    className={isDev ? 'stw' : 'st'}
                    fontWeight={isDev ? undefined : 600}
                  >
                    {env.label}
                  </text>
                  <text
                    x={env.box.x + env.box.width / 2}
                    y={env.box.y + 45}
                    textAnchor="middle"
                    className="stm"
                    fontFamily={isDev ? 'Consolas' : undefined}
                    fill={isDev ? '#E3F3F2' : undefined}
                  >
                    {env.id === 'dev'
                      ? 'you build here'
                      : env.id === 'test'
                        ? 'others verify here'
                        : 'real users, never build here'}
                  </text>
                </g>
              </g>
            )
          })}

          <path d="M190 86 L232 86" stroke="#1E2447" strokeWidth="2" fill="none" />
          <path d="M226 80 L236 86 L226 92" fill="none" stroke="#1E2447" strokeWidth="2" />
          <path d="M400 86 L442 86" stroke="#1E2447" strokeWidth="2" fill="none" />
          <path d="M436 80 L446 86 L436 92" fill="none" stroke="#1E2447" strokeWidth="2" />
          <text x="110" y="35" textAnchor="middle" className="stm">
            ← start every project here
          </text>
        </svg>
      </div>

      <div className="mx-auto mt-3 max-w-lg text-left">
        {active ? (
          <div className="space-y-2">
            <Callout variant="why" title={`${active.label} · what happens here`}>
              <p>{active.happens}</p>
            </Callout>
            <Callout variant="watch" title="What you must never do here">
              <p>{active.never}</p>
            </Callout>
          </div>
        ) : (
          <p className="text-center text-sm text-muted">
            Click or focus Dev, Test, or Production to see what happens there — and what to never do
            there.
          </p>
        )}
      </div>

      <figcaption className="mt-2.5 font-mono text-xs text-muted">
        fig 2 · work flows one direction: Dev → Test → Production
      </figcaption>
    </figure>
  )
}
