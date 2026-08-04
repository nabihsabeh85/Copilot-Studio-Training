export type BadgeColor = 'violet' | 'teal' | 'sun'

interface BadgeProps {
  color?: BadgeColor
  size?: number
  label: string
  title?: string
  className?: string
}

const COLOR_TOKENS: Record<BadgeColor, { ring: string; fill: string; text: string }> = {
  violet: {
    ring: 'var(--color-violet)',
    fill: 'var(--color-violet-soft)',
    text: 'var(--color-violet)',
  },
  teal: { ring: 'var(--color-teal)', fill: 'var(--color-teal-soft)', text: 'var(--color-teal)' },
  sun: { ring: 'var(--color-sun)', fill: 'var(--color-sun-soft)', text: '#7a5a13' },
}

const CENTER = 28
const OUTER_RADIUS = 27
const INNER_RADIUS = 24
const SCALLOP_POINTS = 12

function scallopPoints(): string {
  return Array.from({ length: SCALLOP_POINTS * 2 }, (_, i) => {
    const radius = i % 2 === 0 ? OUTER_RADIUS : INNER_RADIUS
    const angle = (Math.PI * i) / SCALLOP_POINTS - Math.PI / 2
    const x = CENTER + radius * Math.cos(angle)
    const y = CENTER + radius * Math.sin(angle)
    return `${x.toFixed(2)},${y.toFixed(2)}`
  }).join(' ')
}

const SCALLOP = scallopPoints()

/** A simple scalloped seal, used to celebrate a completed module. No external assets. */
export function Badge({ color = 'violet', size = 56, label, title, className = '' }: BadgeProps) {
  const tokens = COLOR_TOKENS[color]

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      role="img"
      aria-label={title ?? label}
      className={className}
    >
      <title>{title ?? label}</title>
      <polygon
        points={SCALLOP}
        fill={tokens.fill}
        stroke={tokens.ring}
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      <circle cx={CENTER} cy={CENTER} r={17} fill="none" stroke={tokens.ring} strokeWidth={1.5} />
      <text
        x={CENTER}
        y={CENTER + 6}
        textAnchor="middle"
        fontSize={17}
        fontWeight={800}
        fill={tokens.text}
        className="font-display"
      >
        {label}
      </text>
    </svg>
  )
}
