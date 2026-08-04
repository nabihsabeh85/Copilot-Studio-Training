import { Routes, Route } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell'
import { HomePage } from './pages/HomePage'
import { ModulePage } from './pages/ModulePage'
import { GlossaryPage } from './pages/GlossaryPage'
import { CheatSheetPage } from './pages/CheatSheetPage'
import { ProgressPage } from './pages/ProgressPage'
import { ResourcesPage } from './pages/ResourcesPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { LearnerProvider } from './lib/LearnerProvider'

export default function App() {
  return (
    <LearnerProvider>
      <Routes>
        <Route element={<AppShell />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/module/:id" element={<ModulePage />} />
          <Route path="/glossary" element={<GlossaryPage />} />
          <Route path="/cheatsheet" element={<CheatSheetPage />} />
          <Route path="/progress" element={<ProgressPage />} />
          <Route path="/resources" element={<ResourcesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </LearnerProvider>
  )
}
