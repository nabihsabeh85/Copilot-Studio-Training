import type { QuizQuestion } from '../content/types'

export type ShuffledQuizQuestion =
  | (Extract<QuizQuestion, { type: 'multiple-choice' }> & { type: 'multiple-choice' })
  | Extract<QuizQuestion, { type: 'true-false' }>
  | (Omit<Extract<QuizQuestion, { type: 'order' }>, 'steps'> & {
      steps: string[]
      /** originalIndices[i] is the index into the *original* question's `steps` array
       *  for the item currently displayed at position i. */
      originalIndices: number[]
    })

/** Fisher–Yates shuffle. Accepts a pluggable RNG so behavior is testable/deterministic. */
export function shuffleArray<T>(items: T[], rng: () => number = Math.random): T[] {
  const result = [...items]
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1))
    const tmp = result[i]
    result[i] = result[j]!
    result[j] = tmp!
  }
  return result
}

/** Returns a shuffled permutation of indices [0, count). */
function shuffledIndices(count: number, rng: () => number): number[] {
  return shuffleArray(
    Array.from({ length: count }, (_, i) => i),
    rng,
  )
}

/**
 * Shuffle question order, and within each question:
 * - multiple-choice: shuffle option order (correctIndex remapped)
 * - order: shuffle the displayed step order (correctOrder stays relative to original steps)
 * - true-false: unchanged
 */
export function shuffleQuiz(
  questions: QuizQuestion[],
  rng: () => number = Math.random,
): ShuffledQuizQuestion[] {
  const questionOrder = shuffledIndices(questions.length, rng)
  return questionOrder.map((qIndex) => {
    const q = questions[qIndex]!

    if (q.type === 'multiple-choice') {
      const optionOrder = shuffledIndices(q.options.length, rng)
      return {
        ...q,
        options: optionOrder.map((i) => q.options[i]!),
        correctIndex: optionOrder.indexOf(q.correctIndex),
      }
    }

    if (q.type === 'order') {
      const originalIndices = shuffledIndices(q.steps.length, rng)
      return {
        ...q,
        steps: originalIndices.map((i) => q.steps[i]!),
        originalIndices,
      }
    }

    return q
  })
}
