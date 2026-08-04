/** Shared content & progress types for Agent Academy */

export type DiagramId =
  'fig1' | 'fig2' | 'fig3' | 'fig4' | 'fig5' | 'fig6' | 'fig7' | 'fig8' | 'fig9' | 'fig10'

export type InlineToken =
  | { type: 'text'; text: string }
  | { type: 'kw'; text: string; termId?: string }
  | { type: 'ui'; text: string }

export type ConceptBlock =
  | { type: 'paragraph'; tokens: InlineToken[] }
  | { type: 'list'; items: InlineToken[][] }
  | {
      type: 'table'
      caption?: string
      headers: string[]
      rows: string[][]
    }

export interface BuildStep {
  id: string
  tokens: InlineToken[]
}

export interface ScreenshotSlot {
  id: string
  caption: string
  annotation: string
}

export interface LinkItem {
  label: string
  url: string
}

export type QuizQuestion =
  | {
      id: string
      type: 'multiple-choice'
      prompt: string
      options: string[]
      correctIndex: number
      explanation: string
    }
  | {
      id: string
      type: 'true-false'
      prompt: string
      correct: boolean
      explanation: string
    }
  | {
      id: string
      type: 'order'
      prompt: string
      steps: string[]
      correctOrder: number[]
      explanation: string
    }

export interface Module {
  id: number
  slug: string
  title: string
  whyItMatters: string
  estimatedMinutes: string
  badgeName: string
  concept: ConceptBlock[]
  diagram: DiagramId
  buildSteps: BuildStep[]
  watchOuts: string[]
  screenshotSlots: ScreenshotSlot[]
  tryIt: string
  goDeeper: LinkItem[]
  quiz: QuizQuestion[]
  checklist: string[]
}

export interface GlossaryTerm {
  id: string
  term: string
  definition: string
}

export type ModuleStatus = 'locked' | 'available' | 'in-progress' | 'complete'

export interface ModuleProgress {
  checklist: Record<string, boolean>
  buildSteps: Record<string, boolean>
  tryItDone: boolean
  notes: string
  quizBestScore: number
  quizAttempts: number
  completed: boolean
}

export type ThemeMode = 'light' | 'dark'

export interface LearnerState {
  version: 1
  freeRoam: boolean
  theme: ThemeMode
  modules: Record<string, ModuleProgress>
  migratedFrom?: string
  notice?: string
}

export const STORAGE_KEY = 'agent-academy-v1'
export const PASSING_SCORE = 4
export const MODULE_COUNT = 10
