import { describe, expect, it } from 'vitest'
import type { QuizQuestion } from '../content/types'
import { scoreOrderQuestion } from './progress'
import { shuffleArray, shuffleQuiz } from './quiz'

/** Deterministic "rng" that cycles through a fixed sequence of [0,1) values. */
function sequenceRng(values: number[]): () => number {
  let i = 0
  return () => {
    const v = values[i % values.length]!
    i += 1
    return v
  }
}

describe('shuffleArray', () => {
  it('returns a permutation containing the same elements', () => {
    const input = [1, 2, 3, 4, 5]
    const result = shuffleArray(input, sequenceRng([0.9, 0.1, 0.5, 0.2, 0.7]))
    expect(result).toHaveLength(input.length)
    expect([...result].sort()).toEqual([...input].sort())
  })

  it('does not mutate the input array', () => {
    const input = [1, 2, 3]
    const copy = [...input]
    shuffleArray(input, sequenceRng([0.5, 0.5]))
    expect(input).toEqual(copy)
  })

  it('is deterministic for a given rng sequence', () => {
    const a = shuffleArray([1, 2, 3, 4], sequenceRng([0.1, 0.2, 0.9]))
    const b = shuffleArray([1, 2, 3, 4], sequenceRng([0.1, 0.2, 0.9]))
    expect(a).toEqual(b)
  })
})

describe('shuffleQuiz', () => {
  const questions: QuizQuestion[] = [
    {
      id: 'mc-1',
      type: 'multiple-choice',
      prompt: 'Pick the right one',
      options: ['A', 'B', 'C', 'D'],
      correctIndex: 2,
      explanation: 'C is correct.',
    },
    {
      id: 'tf-1',
      type: 'true-false',
      prompt: 'Is this true?',
      correct: true,
      explanation: 'Yes.',
    },
    {
      id: 'order-1',
      type: 'order',
      prompt: 'Put these in order',
      steps: ['First', 'Second', 'Third'],
      correctOrder: [0, 1, 2],
      explanation: 'First, then second, then third.',
    },
  ]

  it('preserves the same set of question ids after shuffling', () => {
    const shuffled = shuffleQuiz(questions, sequenceRng([0.9, 0.1, 0.4, 0.6, 0.2, 0.8]))
    expect(shuffled.map((q) => q.id).sort()).toEqual(questions.map((q) => q.id).sort())
  })

  it('remaps correctIndex so the correct option text is unchanged after shuffling options', () => {
    const shuffled = shuffleQuiz(questions, sequenceRng([0.99, 0.01, 0.5, 0.5]))
    const mc = shuffled.find((q) => q.type === 'multiple-choice')
    expect(mc).toBeDefined()
    if (mc?.type === 'multiple-choice') {
      expect(mc.options[mc.correctIndex]).toBe('C')
    }
  })

  it('leaves true-false questions unchanged', () => {
    const shuffled = shuffleQuiz(questions, sequenceRng([0.9, 0.1, 0.5]))
    const tf = shuffled.find((q) => q.type === 'true-false')
    expect(tf).toEqual(questions[1])
  })

  it('shuffles order-question steps but keeps originalIndices as a valid mapping back to steps', () => {
    const shuffled = shuffleQuiz(questions, sequenceRng([0.9, 0.1, 0.5, 0.99]))
    const order = shuffled.find((q) => q.type === 'order')
    expect(order).toBeDefined()
    if (order?.type === 'order') {
      const original = questions.find((q) => q.id === 'order-1')
      if (original?.type === 'order') {
        // Every displayed label must match steps[originalIndices[i]] from the source question.
        order.steps.forEach((label, i) => {
          expect(label).toBe(original.steps[order.originalIndices[i]!])
        })
        // A learner who leaves the (possibly shuffled) order untouched is scored against
        // correctOrder using the originalIndices mapping.
        const isCorrect = scoreOrderQuestion(order.originalIndices, original.correctOrder)
        expect(isCorrect).toBe(order.originalIndices.every((v, i) => v === i))
      }
    }
  })
})
