import { useMemo, useState } from 'react'
import { glossary } from '../content/glossary'
import type { GlossaryTerm } from '../content/types'

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

function letterFor(term: string): string {
  const first = term.charAt(0).toUpperCase()
  return /[A-Z]/.test(first) ? first : '#'
}

export function GlossaryPage() {
  const [query, setQuery] = useState('')

  const sorted = useMemo(() => [...glossary].sort((a, b) => a.term.localeCompare(b.term)), [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return sorted
    return sorted.filter(
      (term) => term.term.toLowerCase().includes(q) || term.definition.toLowerCase().includes(q),
    )
  }, [sorted, query])

  const groups = useMemo(() => {
    const map = new Map<string, GlossaryTerm[]>()
    for (const term of filtered) {
      const letter = letterFor(term.term)
      const existing = map.get(letter)
      if (existing) {
        existing.push(term)
      } else {
        map.set(letter, [term])
      }
    }
    return map
  }, [filtered])

  const availableLetters = useMemo(() => ALPHABET.filter((letter) => groups.has(letter)), [groups])

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="font-display text-3xl font-bold">Glossary</h1>
      <p className="mt-2 text-muted">
        Plain-language definitions for every term used across the ten modules.
      </p>

      <div className="mt-6">
        <label htmlFor="glossary-search" className="sr-only">
          Search glossary
        </label>
        <input
          id="glossary-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search terms or definitions…"
          className="w-full rounded-pill border-[1.5px] border-line bg-card px-4 py-2.5 text-sm outline-none focus:border-violet"
        />
      </div>

      {availableLetters.length > 0 ? (
        <nav aria-label="Jump to letter" className="mt-5 flex flex-wrap gap-1.5 print:hidden">
          {availableLetters.map((letter) => (
            <a
              key={letter}
              href={`#glossary-${letter}`}
              className="flex size-7 items-center justify-center rounded-inner border border-line font-mono text-xs text-muted hover:border-violet hover:text-violet"
            >
              {letter}
            </a>
          ))}
        </nav>
      ) : null}

      <div className="mt-8 space-y-8">
        {availableLetters.length === 0 ? (
          <p className="text-sm text-muted">No terms match &quot;{query}&quot;.</p>
        ) : (
          availableLetters.map((letter) => (
            <section key={letter} id={`glossary-${letter}`} className="scroll-mt-28">
              <h2 className="mb-3 border-b border-line pb-1 font-display text-lg font-bold text-violet">
                {letter}
              </h2>
              <dl className="space-y-3">
                {(groups.get(letter) ?? []).map((term) => (
                  <div key={term.id} className="rounded-inner border border-line bg-card p-4">
                    <dt className="font-display font-semibold">{term.term}</dt>
                    <dd className="mt-1 text-sm text-muted">{term.definition}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ))
        )}
      </div>
    </div>
  )
}
