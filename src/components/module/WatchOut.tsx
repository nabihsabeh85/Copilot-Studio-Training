import { Callout } from '../ui/Callout'

interface WatchOutProps {
  items: string[]
}

export function WatchOut({ items }: WatchOutProps) {
  if (items.length === 0) return null
  return (
    <section id="watch-out" className="scroll-mt-28">
      <Callout variant="watch" title="Watch out">
        <ul className="list-disc space-y-1.5 pl-5">
          {items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Callout>
    </section>
  )
}
