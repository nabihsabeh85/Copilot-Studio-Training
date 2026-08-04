import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const HIGHLIGHT_CLASS = 'search-highlight'
const HIGHLIGHT_DURATION_MS = 2200

/**
 * Scrolls to and briefly highlights the element matching the current URL hash.
 * Needed because client-side navigation (react-router) doesn't trigger the
 * browser's native same-page anchor scrolling the way clicking an `<a>` does.
 */
export function useHashHighlight(): void {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return

    const id = location.hash.slice(1)
    const target = document.getElementById(id)
    if (!target) return

    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    target.classList.add(HIGHLIGHT_CLASS)

    const timeout = window.setTimeout(() => {
      target.classList.remove(HIGHLIGHT_CLASS)
    }, HIGHLIGHT_DURATION_MS)

    return () => window.clearTimeout(timeout)
  }, [location.pathname, location.hash])
}
