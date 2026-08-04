import { describe, expect, it } from 'vitest'
import { createDefaultState } from './storage'
import {
  canMarkModuleComplete,
  findResumeModuleId,
  getModuleStatus,
  isModuleUnlocked,
  overallCompletionRatio,
  quizAverage,
  scoreOrderQuestion,
  scoreQuizAnswers,
} from './progress'

describe('module gating', () => {
  it('unlocks module 1 by default and locks module 2', () => {
    const state = createDefaultState()
    expect(isModuleUnlocked(state, 1)).toBe(true)
    expect(isModuleUnlocked(state, 2)).toBe(false)
    expect(getModuleStatus(state, 2)).toBe('locked')
  })

  it('unlocks next module when previous is complete', () => {
    const state = createDefaultState()
    state.modules['1']!.completed = true
    expect(isModuleUnlocked(state, 2)).toBe(true)
    expect(getModuleStatus(state, 2)).toBe('available')
  })

  it('unlocks everything when free roam is on', () => {
    const state = createDefaultState()
    state.freeRoam = true
    expect(isModuleUnlocked(state, 10)).toBe(true)
    expect(getModuleStatus(state, 10)).toBe('available')
  })

  it('marks in-progress when learner has activity', () => {
    const state = createDefaultState()
    state.modules['1']!.tryItDone = true
    expect(getModuleStatus(state, 1)).toBe('in-progress')
  })
})

describe('progress computation', () => {
  it('computes overall completion ratio', () => {
    const state = createDefaultState()
    state.modules['1']!.completed = true
    state.modules['2']!.completed = true
    expect(overallCompletionRatio(state)).toBe(0.2)
  })

  it('averages quiz scores only for attempted modules', () => {
    const state = createDefaultState()
    state.modules['1']!.quizAttempts = 1
    state.modules['1']!.quizBestScore = 5
    state.modules['2']!.quizAttempts = 2
    state.modules['2']!.quizBestScore = 3
    expect(quizAverage(state)).toBe(4)
  })

  it('finds resume module as first incomplete unlocked module', () => {
    const state = createDefaultState()
    state.modules['1']!.completed = true
    expect(findResumeModuleId(state)).toBe(2)
  })

  it('requires quiz pass and checklist for mark-complete', () => {
    const state = createDefaultState()
    const progress = state.modules['1']!
    progress.quizBestScore = 4
    progress.checklist = { a: true, b: false }
    progress.tryItDone = true
    const result = canMarkModuleComplete(progress, {
      checklistIds: ['a', 'b'],
      requireTryIt: true,
    })
    expect(result.ready).toBe(false)
    expect(result.remaining.some((r) => r.includes('b'))).toBe(true)
  })
})

describe('quiz scoring', () => {
  it('scores reorder questions by exact sequence', () => {
    expect(scoreOrderQuestion([0, 1, 2], [0, 1, 2])).toBe(true)
    expect(scoreOrderQuestion([2, 1, 0], [0, 1, 2])).toBe(false)
  })

  it('requires 4 of 5 to pass', () => {
    expect(
      scoreQuizAnswers([
        { correct: true },
        { correct: true },
        { correct: true },
        { correct: true },
        { correct: false },
      ]),
    ).toEqual({ score: 4, passed: true })
    expect(
      scoreQuizAnswers([
        { correct: true },
        { correct: true },
        { correct: true },
        { correct: false },
        { correct: false },
      ]),
    ).toEqual({ score: 3, passed: false })
  })
})
