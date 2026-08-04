import { Callout } from '../ui/Callout'

interface TryItProps {
  text: string
  done: boolean
  onToggle: (done: boolean) => void
}

export function TryIt({ text, done, onToggle }: TryItProps) {
  return (
    <section id="try-it" className="scroll-mt-28">
      <Callout variant="try" title="Try it">
        <p>{text}</p>
        <label className="mt-3 flex cursor-pointer items-center gap-2 text-sm font-medium">
          <input
            type="checkbox"
            className="size-4 accent-sun"
            checked={done}
            onChange={(e) => onToggle(e.target.checked)}
          />
          I did this
        </label>
      </Callout>
    </section>
  )
}
