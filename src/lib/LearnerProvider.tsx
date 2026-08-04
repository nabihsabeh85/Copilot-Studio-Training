import { useCallback, useMemo, useState, useEffect, type ReactNode } from 'react'
import type { LearnerState, ModuleProgress, ThemeMode } from '../content/types'
import { applyTheme, clearNotice, loadState, resetState, saveState } from './storage'
import { getModuleProgress } from './progress'
import { LearnerContext, type LearnerContextValue } from './learnerContextValue'

export function LearnerProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<LearnerState>(() => loadState())

  useEffect(() => {
    saveState(state)
  }, [state])

  useEffect(() => {
    applyTheme(state.theme)
  }, [state.theme])

  const setFreeRoam = useCallback((value: boolean) => {
    setState((prev) => ({ ...prev, freeRoam: value }))
  }, [])

  const setTheme = useCallback((value: ThemeMode) => {
    setState((prev) => ({ ...prev, theme: value, themeChosen: true }))
  }, [])

  const updateModule = useCallback((moduleId: number, patch: Partial<ModuleProgress>) => {
    setState((prev) => {
      const key = String(moduleId)
      const current = getModuleProgress(prev, moduleId)
      return {
        ...prev,
        modules: {
          ...prev.modules,
          [key]: { ...current, ...patch },
        },
      }
    })
  }, [])

  const resetProgress = useCallback(() => {
    setState(resetState())
  }, [])

  const dismissNotice = useCallback(() => {
    setState((prev) => clearNotice(prev))
  }, [])

  const value = useMemo<LearnerContextValue>(
    () => ({
      state,
      setFreeRoam,
      setTheme,
      updateModule,
      resetProgress,
      dismissNotice,
    }),
    [state, setFreeRoam, setTheme, updateModule, resetProgress, dismissNotice],
  )

  return <LearnerContext.Provider value={value}>{children}</LearnerContext.Provider>
}
