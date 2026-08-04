import type { LearnerState, ModuleProgress, ThemeMode } from '../content/types'
import { MODULE_COUNT, STORAGE_KEY } from '../content/types'

function coerceTheme(raw: unknown): ThemeMode {
  return raw === 'light' ? 'light' : 'dark'
}

/** Apply theme class/attribute for CSS variable overrides. */
export function applyTheme(theme: ThemeMode): void {
  if (typeof document === 'undefined') return
  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme
}

export function emptyModuleProgress(): ModuleProgress {
  return {
    checklist: {},
    buildSteps: {},
    tryItDone: false,
    notes: '',
    quizBestScore: 0,
    quizAttempts: 0,
    completed: false,
  }
}

export function createDefaultState(): LearnerState {
  const modules: Record<string, ModuleProgress> = {}
  for (let i = 1; i <= MODULE_COUNT; i += 1) {
    modules[String(i)] = emptyModuleProgress()
  }
  return {
    version: 1,
    freeRoam: false,
    theme: 'dark',
    modules,
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function coerceModuleProgress(raw: unknown): ModuleProgress {
  const base = emptyModuleProgress()
  if (!isRecord(raw)) return base

  return {
    checklist: isRecord(raw.checklist)
      ? Object.fromEntries(Object.entries(raw.checklist).map(([k, v]) => [k, Boolean(v)]))
      : {},
    buildSteps: isRecord(raw.buildSteps)
      ? Object.fromEntries(Object.entries(raw.buildSteps).map(([k, v]) => [k, Boolean(v)]))
      : {},
    tryItDone: Boolean(raw.tryItDone),
    notes: typeof raw.notes === 'string' ? raw.notes : '',
    quizBestScore:
      typeof raw.quizBestScore === 'number' && Number.isFinite(raw.quizBestScore)
        ? Math.max(0, Math.min(5, Math.floor(raw.quizBestScore)))
        : 0,
    quizAttempts:
      typeof raw.quizAttempts === 'number' && Number.isFinite(raw.quizAttempts)
        ? Math.max(0, Math.floor(raw.quizAttempts))
        : 0,
    completed: Boolean(raw.completed),
  }
}

/**
 * Migrate or sanitize unknown/legacy localStorage payloads into LearnerState v1.
 * Corrupted data is reset safely with a notice.
 */
export function migrateState(raw: unknown): LearnerState {
  if (raw == null) {
    return createDefaultState()
  }

  if (!isRecord(raw)) {
    return {
      ...createDefaultState(),
      notice: 'Saved progress was unreadable and has been reset.',
    }
  }

  // Future versions can branch here; for now only v1 (and unversioned → v1)
  if (raw.version != null && raw.version !== 1) {
    return {
      ...createDefaultState(),
      migratedFrom: String(raw.version),
      notice: 'Saved progress used an older format and was reset.',
    }
  }

  try {
    const modules: Record<string, ModuleProgress> = {}
    const rawModules = isRecord(raw.modules) ? raw.modules : {}

    for (let i = 1; i <= MODULE_COUNT; i += 1) {
      const key = String(i)
      modules[key] = coerceModuleProgress(rawModules[key])
    }

    return {
      version: 1,
      freeRoam: Boolean(raw.freeRoam),
      theme: coerceTheme(raw.theme),
      modules,
      ...(typeof raw.migratedFrom === 'string' ? { migratedFrom: raw.migratedFrom } : {}),
      ...(typeof raw.notice === 'string' ? { notice: raw.notice } : {}),
    }
  } catch {
    return {
      ...createDefaultState(),
      notice: 'Saved progress was corrupted and has been reset.',
    }
  }
}

export function loadState(storage: Storage = localStorage): LearnerState {
  try {
    const raw = storage.getItem(STORAGE_KEY)
    if (raw == null) {
      const fresh = createDefaultState()
      applyTheme(fresh.theme)
      return fresh
    }
    const state = migrateState(JSON.parse(raw) as unknown)
    applyTheme(state.theme)
    return state
  } catch {
    const fallback = {
      ...createDefaultState(),
      notice: 'Saved progress was unreadable and has been reset.',
    }
    applyTheme(fallback.theme)
    return fallback
  }
}

export function saveState(state: LearnerState, storage: Storage = localStorage): void {
  const toPersist: LearnerState = {
    version: 1,
    freeRoam: state.freeRoam,
    theme: state.theme,
    modules: state.modules,
  }
  storage.setItem(STORAGE_KEY, JSON.stringify(toPersist))
  applyTheme(state.theme)
}

export function resetState(storage: Storage = localStorage): LearnerState {
  const previous = loadState(storage)
  const fresh = createDefaultState()
  // Keep appearance preferences when clearing course progress
  fresh.theme = previous.theme
  fresh.freeRoam = previous.freeRoam
  saveState(fresh, storage)
  return fresh
}

export function clearNotice(state: LearnerState): LearnerState {
  const next = { ...state }
  delete next.notice
  delete next.migratedFrom
  return next
}
