import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { TopBar } from './TopBar'
import { SearchDialog } from './SearchDialog'
import { useLearner } from '../../lib/useLearner'
import { useHashHighlight } from '../../lib/useHashHighlight'

export function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { state, setFreeRoam, setTheme, dismissNotice } = useLearner()

  useHashHighlight()

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="min-h-screen bg-paper">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-pill focus:bg-violet focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>

      <TopBar
        onOpenSidebar={() => setSidebarOpen(true)}
        onOpenSettings={() => setSettingsOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
      />

      <div className="mx-auto flex max-w-[1400px]">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <main id="main-content" className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-8">
          {state.notice ? (
            <div
              role="status"
              className="mb-4 flex items-start justify-between gap-3 rounded-block border border-sun bg-sun-soft px-4 py-3 text-sm"
            >
              <p>{state.notice}</p>
              <button
                type="button"
                onClick={dismissNotice}
                className="shrink-0 font-mono text-xs uppercase tracking-wide text-muted hover:text-ink"
              >
                Dismiss
              </button>
            </div>
          ) : null}

          <Outlet />
        </main>
      </div>

      {settingsOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-4 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="settings-title"
          onClick={() => setSettingsOpen(false)}
        >
          <div
            className="w-full max-w-md rounded-card border border-line bg-card p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="settings-title" className="font-display text-xl font-bold">
              Settings
            </h2>
            <label className="mt-4 flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                className="mt-1 size-4 accent-violet"
                checked={state.freeRoam}
                onChange={(e) => setFreeRoam(e.target.checked)}
              />
              <span>
                <span className="font-display font-semibold">Free roam</span>
                <span className="mt-1 block text-sm text-muted">
                  Unlock all modules. Reading is never blocked; only quizzes stay disabled while a
                  module is locked.
                </span>
              </span>
            </label>
            <label className="mt-4 flex cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                className="mt-1 size-4 accent-violet"
                checked={state.theme === 'dark'}
                onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
              />
              <span>
                <span className="font-display font-semibold">Dark mode</span>
                <span className="mt-1 block text-sm text-muted">
                  Use a dark paper background. Your choice is saved with your progress in this
                  browser.
                </span>
              </span>
            </label>
            <button
              type="button"
              className="mt-6 rounded-pill border border-line px-4 py-2 text-sm hover:border-violet"
              onClick={() => setSettingsOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      ) : null}

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </div>
  )
}
