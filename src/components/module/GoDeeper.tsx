import type { LinkItem } from '../../content/types'

interface GoDeeperProps {
  links: LinkItem[]
}

export function GoDeeper({ links }: GoDeeperProps) {
  if (links.length === 0) return null
  return (
    <section id="go-deeper" className="scroll-mt-28">
      <h2 className="mb-2 font-display text-sm font-bold uppercase tracking-[0.06em]">Go deeper</h2>
      <ul className="flex flex-wrap gap-x-4 gap-y-2 text-[14.5px]">
        {links.map((link) => (
          <li key={link.url}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet underline decoration-violet-soft underline-offset-2 hover:decoration-violet"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
