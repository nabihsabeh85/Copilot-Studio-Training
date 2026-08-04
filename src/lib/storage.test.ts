import { describe, expect, it } from 'vitest'
import { createDefaultState, loadState, migrateState, resetState, saveState } from './storage'
import { STORAGE_KEY } from '../content/types'

describe('storage migration & reset', () => {
  it('defaults theme to light and persists dark mode', () => {
    const state = createDefaultState()
    expect(state.theme).toBe('light')
    state.theme = 'dark'
    saveState(state, localStorage)
    const loaded = loadState(localStorage)
    expect(loaded.theme).toBe('dark')
    expect(document.documentElement.dataset.theme).toBe('dark')
  })

  it('preserves theme and free roam when resetting progress', () => {
    const state = createDefaultState()
    state.theme = 'dark'
    state.freeRoam = true
    state.modules['1']!.completed = true
    saveState(state, localStorage)
    const fresh = resetState(localStorage)
    expect(fresh.modules['1']?.completed).toBe(false)
    expect(fresh.theme).toBe('dark')
    expect(fresh.freeRoam).toBe(true)
  })

  it('migrates missing theme to light', () => {
    const migrated = migrateState({
      version: 1,
      freeRoam: false,
      modules: {},
    })
    expect(migrated.theme).toBe('light')
  })

  it('creates a default v1 state with 10 modules', () => {
    const state = createDefaultState()
    expect(state.version).toBe(1)
    expect(state.freeRoam).toBe(false)
    expect(Object.keys(state.modules)).toHaveLength(10)
    expect(state.modules['1']?.completed).toBe(false)
  })

  it('loads empty storage as default state', () => {
    const state = loadState(localStorage)
    expect(state.version).toBe(1)
    expect(state.notice).toBeUndefined()
  })

  it('persists and reloads state', () => {
    const state = createDefaultState()
    state.freeRoam = true
    state.modules['2'] = {
      ...state.modules['2']!,
      completed: true,
      quizBestScore: 5,
      quizAttempts: 2,
    }
    saveState(state, localStorage)
    const loaded = loadState(localStorage)
    expect(loaded.freeRoam).toBe(true)
    expect(loaded.modules['2']?.completed).toBe(true)
    expect(loaded.modules['2']?.quizBestScore).toBe(5)
  })

  it('resets progress in storage', () => {
    const state = createDefaultState()
    state.modules['1']!.completed = true
    saveState(state, localStorage)
    const fresh = resetState(localStorage)
    expect(fresh.modules['1']?.completed).toBe(false)
    expect(localStorage.getItem(STORAGE_KEY)).toBeTruthy()
  })

  it('resets corrupted JSON with a notice', () => {
    localStorage.setItem(STORAGE_KEY, '{not-json')
    const state = loadState(localStorage)
    expect(state.version).toBe(1)
    expect(state.notice).toMatch(/unreadable|reset/i)
  })

  it('migrates unversioned but shaped payloads into v1', () => {
    const migrated = migrateState({
      freeRoam: true,
      modules: {
        '1': { completed: true, quizBestScore: 4, quizAttempts: 1 },
      },
    })
    expect(migrated.version).toBe(1)
    expect(migrated.freeRoam).toBe(true)
    expect(migrated.modules['1']?.completed).toBe(true)
    expect(migrated.modules['3']?.completed).toBe(false)
  })

  it('resets unsupported future versions with notice', () => {
    const migrated = migrateState({ version: 99, modules: {} })
    expect(migrated.version).toBe(1)
    expect(migrated.migratedFrom).toBe('99')
    expect(migrated.notice).toMatch(/older format|reset/i)
  })

  it('clamps invalid quiz scores during coerce', () => {
    const migrated = migrateState({
      version: 1,
      modules: {
        '1': { quizBestScore: 99, quizAttempts: -3, notes: 123 },
      },
    })
    expect(migrated.modules['1']?.quizBestScore).toBe(5)
    expect(migrated.modules['1']?.quizAttempts).toBe(0)
    expect(migrated.modules['1']?.notes).toBe('')
  })
})
