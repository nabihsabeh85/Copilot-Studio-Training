interface MiniMapSection {
  id: string
  label: string
  done?: boolean
}

interface ModuleMiniMapProps {
  sections: MiniMapSection[]
}

export function ModuleMiniMap({ sections }: ModuleMiniMapProps) {
  return (
    <nav
      aria-label="On this page"
      className="sticky top-28 hidden w-48 shrink-0 self-start rounded-block border border-line bg-card p-3 text-sm xl:block print:hidden"
    >
      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
        On this page
      </p>
      <ul className="space-y-1.5">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="flex items-center gap-2 text-muted hover:text-violet"
            >
              <span
                className={`size-1.5 shrink-0 rounded-full ${section.done ? 'bg-teal' : 'bg-line'}`}
                aria-hidden="true"
              />
              <span className="leading-snug">{section.label}</span>
              <span className="sr-only">{section.done ? '(done)' : '(not done)'}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
