import { Badge, type BadgeColor } from './Badge'

interface ModuleBadgeProps {
  moduleId: number
  badgeName: string
  size?: number
}

const COLOR_CYCLE: BadgeColor[] = ['violet', 'teal', 'sun']

/** Module completion badge: a colored seal with the module number, labeled with its badge name. */
export function ModuleBadge({ moduleId, badgeName, size = 64 }: ModuleBadgeProps) {
  const color = COLOR_CYCLE[(moduleId - 1) % COLOR_CYCLE.length] ?? 'violet'

  return (
    <div className="flex w-20 flex-col items-center gap-1.5 text-center print:break-inside-avoid">
      <Badge
        color={color}
        size={size}
        label={String(moduleId).padStart(2, '0')}
        title={badgeName}
      />
      <span className="font-display text-[11px] font-semibold leading-tight">{badgeName}</span>
    </div>
  )
}
