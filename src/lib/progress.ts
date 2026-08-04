import type { LearnerState, ModuleProgress, ModuleStatus } from '../content/types'
import { MODULE_COUNT, PASSING_SCORE } from '../content/types'

export function getModuleProgress(state: LearnerState, moduleId: number): ModuleProgress {
  return (
    state.modules[String(moduleId)] ?? {
      checklist: {},
      buildSteps: {},
      tryItDone: false,
      notes: '',
      quizBestScore: 0,
      quizAttempts: 0,
      completed: false,
    }
  )
}

/** Module N unlocks when free roam is on, or N === 1, or module N-1 is complete. */
export function isModuleUnlocked(state: LearnerState, moduleId: number): boolean {
  if (state.freeRoam) return true
  if (moduleId <= 1) return true
  return getModuleProgress(state, moduleId - 1).completed
}

export function getModuleStatus(state: LearnerState, moduleId: number): ModuleStatus {
  const progress = getModuleProgress(state, moduleId)
  if (progress.completed) return 'complete'
  if (!isModuleUnlocked(state, moduleId)) return 'locked'

  const hasActivity =
    progress.tryItDone ||
    progress.quizAttempts > 0 ||
    Object.values(progress.buildSteps).some(Boolean) ||
    Object.values(progress.checklist).some(Boolean) ||
    progress.notes.trim().length > 0

  return hasActivity ? 'in-progress' : 'available'
}

export function isQuizPassed(progress: ModuleProgress): boolean {
  return progress.quizBestScore >= PASSING_SCORE
}

export function areChecklistItemsComplete(
  progress: ModuleProgress,
  checklistIds: string[],
): boolean {
  return checklistIds.every((id) => progress.checklist[id] === true)
}

export function areBuildStepsComplete(progress: ModuleProgress, stepIds: string[]): boolean {
  return stepIds.every((id) => progress.buildSteps[id] === true)
}

export function canMarkModuleComplete(
  progress: ModuleProgress,
  options: { checklistIds: string[]; requireTryIt: boolean },
): { ready: boolean; remaining: string[] } {
  const remaining: string[] = []

  if (!isQuizPassed(progress)) {
    remaining.push('Pass the knowledge check (4 of 5)')
  }

  for (const id of options.checklistIds) {
    if (!progress.checklist[id]) {
      remaining.push(`Complete checklist item: ${id}`)
    }
  }

  if (options.requireTryIt && !progress.tryItDone) {
    remaining.push('Mark the Try it exercise as done')
  }

  return { ready: remaining.length === 0, remaining }
}

export function countCompletedModules(state: LearnerState): number {
  let count = 0
  for (let i = 1; i <= MODULE_COUNT; i += 1) {
    if (getModuleProgress(state, i).completed) count += 1
  }
  return count
}

export function overallCompletionRatio(state: LearnerState): number {
  return countCompletedModules(state) / MODULE_COUNT
}

export function quizAverage(state: LearnerState): number | null {
  const scores: number[] = []
  for (let i = 1; i <= MODULE_COUNT; i += 1) {
    const p = getModuleProgress(state, i)
    if (p.quizAttempts > 0) scores.push(p.quizBestScore)
  }
  if (scores.length === 0) return null
  return scores.reduce((a, b) => a + b, 0) / scores.length
}

export function findResumeModuleId(state: LearnerState): number {
  for (let i = 1; i <= MODULE_COUNT; i += 1) {
    const status = getModuleStatus(state, i)
    if (status === 'in-progress' || status === 'available') return i
  }
  // All complete → last module
  return MODULE_COUNT
}

export function scoreOrderQuestion(learnerOrder: number[], correctOrder: number[]): boolean {
  if (learnerOrder.length !== correctOrder.length) return false
  return learnerOrder.every((value, index) => value === correctOrder[index])
}

export function scoreQuizAnswers(answers: Array<{ correct: boolean }>): {
  score: number
  passed: boolean
} {
  const score = answers.filter((a) => a.correct).length
  return { score, passed: score >= PASSING_SCORE }
}
