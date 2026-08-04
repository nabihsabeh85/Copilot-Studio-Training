# Agent Academy

Interactive, self-paced training site that teaches non-technical business users how to build agents in **Microsoft Copilot Studio**. Course content is sourced from `copilot-studio-training-guide.html` in the repo root.

Progress, quiz scores, checklists, and notes persist in the browser under `localStorage` key `agent-academy-v1`. No backend or auth required — the static build runs fully offline after first load (fonts fall back to Segoe UI if Google Fonts is unavailable).

## Live site (GitHub Pages)

**https://nabihsabeh85.github.io/Copilot-Studio-Training/**

Deploys automatically on every push to `main` via `.github/workflows/deploy-pages.yml`.

Local GitHub Pages build preview:

```bash
npm run build:pages && npx serve dist
```


## Stack

- React + TypeScript + Vite
- Tailwind CSS (custom design tokens)
- React Router v6/v7
- FlexSearch (client-side full-text search)
- Vitest + Testing Library

## Local development

```bash
npm install
npm run dev
```

Open the URL Vite prints (default `http://localhost:5173`).

### Quality gates

```bash
npm run lint
npm run test
npm run build
```

Preview the production build:

```bash
npm run build && npm run preview
```

## Editing content

**Only edit files under `src/content/`.** Do not hardcode course copy in components.

| File | Purpose |
|---|---|
| `modules.ts` | All 10 modules (why, concept, build steps, watch-outs, try it, screenshots, checklists) |
| `quizzes.ts` | 5 questions per module (50 total) |
| `glossary.ts` | Key terms + plain-language definitions |
| `links.ts` | House rules + Keep learning links |
| `moduleNav.ts` | Sidebar/journey titles |

The original guide `copilot-studio-training-guide.html` remains the wording source of truth. Where structure/behavior differ from the static HTML, the interactive app brief wins.

## Adding real screenshots

Screenshot slots render placeholders until image files are present.

1. Capture UI from your Dev tenant (so learners see the real portal).
2. Drop files into `public/screenshots/` using this name pattern:

```
public/screenshots/{moduleId}-{n}.png
```

Examples:

- `public/screenshots/1-1.png` — Module 1, first slot
- `public/screenshots/3-1.png` and `3-2.png` — Module 3 has two slots
- `public/screenshots/7-1.png` and `7-2.png` — Module 7 has two slots

Annotation captions already live in each module’s `screenshotSlots` in `modules.ts`.

## Deploying the static build

```bash
npm run build
```

Deploy the `dist/` folder to any static host:

- Azure Static Web Apps
- IIS / static file share
- SharePoint (upload or embed the hosted URL)
- GitHub Pages / Netlify / any CDN

No server-side code, API, or environment variables are required.

### Shareable module URLs

Facilitators can deep-link learners to a module, e.g. `/module/3`.

## Learner features

- Sequential module gating (unlock next when previous is complete)
- **Free roam** toggle in Settings (unlocks reading everywhere; quizzes stay disabled while locked unless free roam is on — locked modules still show content with a banner)
- Knowledge checks (pass 4 of 5, unlimited retakes with shuffle)
- Hands-on Build it steppers + Try it checkboxes
- Interactive diagrams (keyboard accessible, respects `prefers-reduced-motion`)
- Search (`Ctrl/Cmd+K`)
- Glossary, cheat sheet (print-friendly), resources, progress + badges
- Per-module notes and print summary
- Reset progress from My progress (with confirm)

## Project layout

```
src/
  content/          Course data (edit here)
  components/
    diagrams/       Interactive SVG figures
    module/         Module page sections (quiz, stepper, …)
    layout/         Shell, sidebar, search
    ui/             Callouts, badges, tables
  pages/            Route pages
  lib/              Storage, progress, quiz, search
  hooks/            Reduced-motion helper
public/
  screenshots/      Optional real UI captures
copilot-studio-training-guide.html   Source guide
```

## Browser support

Current Edge and Chrome. Usable at 1366×768 and mobile ~390px width.
