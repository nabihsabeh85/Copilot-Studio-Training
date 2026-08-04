import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { searchModules, SEARCH_SECTION_ANCHORS, type SearchResult } from '../../lib/searchIndex'

interface SearchDialogProps {
  open: boolean
  onClose: () => void
}

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  // Unmounting when closed means each re-open is a fresh mount with reset state.
  if (!open) return null
  return <SearchDialogContent onClose={onClose} />
}

function SearchDialogContent({ onClose }: { onClose: () => void }) {
  const [query, setQuery] = useState('')
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const results = useMemo(() => searchModules(query), [query])

  useEffect(() => {
    const id = window.setTimeout(() => inputRef.current?.focus(), 0)
    return () => window.clearTimeout(id)
  }, [])

  const handleQueryChange = (value: string) => {
    setQuery(value)
    setActiveIndex(0)
  }

  const goToResult = (result: SearchResult) => {
    const anchor = SEARCH_SECTION_ANCHORS[result.section]
    navigate(`/module/${result.moduleId}${anchor ? `#${anchor}` : ''}`)
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-ink/40 p-4 pt-[10vh]"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="search-dialog-title"
        className="w-full max-w-xl overflow-hidden rounded-card border border-line bg-card shadow-xl"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            onClose()
          } else if (e.key === 'ArrowDown') {
            e.preventDefault()
            setActiveIndex((i) => Math.min(i + 1, results.length - 1))
          } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setActiveIndex((i) => Math.max(i - 1, 0))
          } else if (e.key === 'Enter') {
            const result = results[activeIndex]
            if (result) goToResult(result)
          }
        }}
      >
        <h2 id="search-dialog-title" className="sr-only">
          Search Agent Academy
        </h2>
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span aria-hidden="true" className="text-muted">
            ⌕
          </span>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            placeholder="Search modules, concepts, build steps…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted"
            aria-label="Search course content"
          />
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 rounded-pill border border-line px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-muted hover:border-violet"
          >
            Esc
          </button>
        </div>

        <div className="scrollbar-thin max-h-[60vh] overflow-y-auto p-2">
          {query.trim() === '' ? (
            <p className="px-3 py-6 text-center text-sm text-muted">
              Start typing to search across all 10 modules.
            </p>
          ) : results.length === 0 ? (
            <p className="px-3 py-6 text-center text-sm text-muted">
              No results for &quot;{query}&quot;.
            </p>
          ) : (
            <ul>
              {results.map((result, i) => (
                <li key={result.id}>
                  <button
                    type="button"
                    onClick={() => goToResult(result)}
                    onMouseEnter={() => setActiveIndex(i)}
                    className={`block w-full rounded-inner px-3 py-2.5 text-left ${
                      i === activeIndex ? 'bg-violet-soft' : 'hover:bg-paper'
                    }`}
                  >
                    <p className="font-mono text-[10px] uppercase tracking-wide text-teal">
                      {String(result.moduleId).padStart(2, '0')} · {result.moduleTitle} ·{' '}
                      {result.sectionLabel}
                    </p>
                    <p className="mt-0.5 line-clamp-2 text-sm text-ink">{result.snippet}</p>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}
