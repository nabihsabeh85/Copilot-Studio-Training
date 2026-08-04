import type { KeyboardEvent } from 'react'

/**
 * Keyboard handler for SVG hotspots acting as buttons (Enter and Space both activate,
 * matching native `<button>` behavior). Pass the element's `onClick`-equivalent callback.
 */
export function onActivateKeyDown(onActivate: () => void) {
  return (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ' || event.key === 'Spacebar') {
      event.preventDefault()
      onActivate()
    }
  }
}
