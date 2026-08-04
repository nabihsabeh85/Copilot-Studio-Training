import { createContext } from 'react'
import type { LearnerState, ModuleProgress, ThemeMode } from '../content/types'

export interface LearnerContextValue {
  state: LearnerState
  setFreeRoam: (value: boolean) => void
  setTheme: (value: ThemeMode) => void
  updateModule: (moduleId: number, patch: Partial<ModuleProgress>) => void
  resetProgress: () => void
  dismissNotice: () => void
}

export const LearnerContext = createContext<LearnerContextValue | null>(null)
