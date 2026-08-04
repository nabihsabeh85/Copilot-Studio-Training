import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

function createMockMediaQueryList(
  matches: boolean,
  onAddEventListener?: (handler: (event: MediaQueryListEvent) => void) => void,
): MediaQueryList {
  const target: Partial<MediaQueryList> = {
    matches,
    media: '(prefers-reduced-motion: reduce)',
    onchange: null,
    addEventListener: ((_type: string, listener: EventListenerOrEventListenerObject) => {
      if (typeof listener === 'function') {
        onAddEventListener?.(listener as (event: MediaQueryListEvent) => void)
      }
    }) as MediaQueryList['addEventListener'],
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }
  return target as MediaQueryList
}

describe('usePrefersReducedMotion', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns false when the media query does not match', () => {
    const { result } = renderHook(() => usePrefersReducedMotion())
    expect(result.current).toBe(false)
  })

  it('returns true when the media query matches on mount', () => {
    vi.spyOn(window, 'matchMedia').mockImplementation(() => createMockMediaQueryList(true))

    const { result } = renderHook(() => usePrefersReducedMotion())
    expect(result.current).toBe(true)
  })

  it('updates when the media query change event fires', () => {
    let changeHandler: ((event: MediaQueryListEvent) => void) | null = null

    vi.spyOn(window, 'matchMedia').mockImplementation(() =>
      createMockMediaQueryList(false, (handler) => {
        changeHandler = handler
      }),
    )

    const { result } = renderHook(() => usePrefersReducedMotion())
    expect(result.current).toBe(false)

    act(() => {
      changeHandler?.({ matches: true } as MediaQueryListEvent)
    })

    expect(result.current).toBe(true)
  })
})
