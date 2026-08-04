interface NotesBoxProps {
  value: string
  onChange: (value: string) => void
}

export function NotesBox({ value, onChange }: NotesBoxProps) {
  return (
    <section id="notes" className="scroll-mt-28 print:break-inside-avoid">
      <h2 className="mb-2 font-display text-sm font-bold uppercase tracking-[0.06em]">My notes</h2>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        placeholder="Jot down tips while you work in Copilot Studio…"
        className="w-full rounded-block border border-line bg-card px-3 py-2 text-sm outline-none focus:border-violet print:border-ink"
      />
    </section>
  )
}
