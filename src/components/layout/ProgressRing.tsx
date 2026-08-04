interface ProgressRingProps {
  ratio: number
  size?: number
  label?: string
}

export function ProgressRing({ ratio, size = 48, label }: ProgressRingProps) {
  const clamped = Math.max(0, Math.min(1, ratio))
  const stroke = 4
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = c * (1 - clamped)
  const pct = Math.round(clamped * 100)

  return (
    <div
      className="relative inline-flex items-center justify-center"
      role="img"
      aria-label={label ?? `Course progress ${pct} percent`}
    >
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          className="text-line"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="currentColor"
          strokeWidth={stroke}
          strokeDasharray={c}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="text-teal transition-[stroke-dashoffset] duration-500"
        />
      </svg>
      <span className="absolute font-mono text-[10px] font-semibold text-ink">{pct}%</span>
    </div>
  )
}
