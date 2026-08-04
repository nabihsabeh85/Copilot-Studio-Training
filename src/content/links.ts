/**
 * House rules and keep-learning links, transcribed verbatim from
 * `src/content/_extracted.json` (source: `copilot-studio-training-guide.html`).
 */
import type { LinkItem, Module } from './types'

export interface HouseRule {
  title: string
  body: string
}

export const houseRules: HouseRule[] = [
  {
    title: 'One agent, built progressively',
    body: "Every module adds a layer to the same practice agent. By Module 10 you've published something real.",
  },
  {
    title: 'Environments come first',
    body: "Always confirm you're in Dev before touching anything. It's the check that prevents the most painful mistakes.",
  },
  {
    title: 'Descriptions are a skill',
    body: 'The agent routes by reading your descriptions of knowledge, tools, topics, and child agents. Write them like you mean it.',
  },
  {
    title: 'Nothing ships untested',
    body: 'Evaluation before publishing, every time. A 10-question test set is the minimum bar.',
  },
  {
    title: 'Preview means not for production',
    body: 'Preview and experimental features are for exploring. If it has a preview tag, it stays out of anything real.',
  },
  {
    title: 'Ask early, ask often',
    body: 'Post questions in the shared FAQ. Your question improves the course for the next cohort.',
  },
]

export interface KeepLearningLink extends LinkItem {
  note: string
}

export const keepLearning: KeepLearningLink[] = [
  {
    url: 'https://aka.ms/agent-academy',
    label: 'Copilot Studio Agent Academy',
    note: 'free curated lessons from Microsoft',
  },
  {
    url: 'https://aka.ms/nextAgIAD',
    label: 'Agent in a Day',
    note: 'free instructor-led workshop',
  },
  {
    url: 'https://learn.microsoft.com/en-us/training/browse/?terms=copilot%20studio&products=ms-copilot',
    label: 'Microsoft Learn training modules',
    note: '',
  },
  {
    url: 'https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/',
    label: 'Implementation guidance',
    note: '',
  },
  {
    url: 'https://adoption.microsoft.com/ai-agents/copilot-studio/#scenarios',
    label: 'Scenario library',
    note: 'downloadable example agents',
  },
]

export interface ModuleGoDeeper {
  moduleId: number
  slug: string
  title: string
  links: LinkItem[]
}

/** Flattens each module's `goDeeper` links, grouped by module, for the Resources page. */
export function flattenGoDeeperByModule(modules: Module[]): ModuleGoDeeper[] {
  return modules.map((m) => ({
    moduleId: m.id,
    slug: m.slug,
    title: m.title,
    links: m.goDeeper,
  }))
}

/** All `goDeeper` links across every module, deduplicated by URL. */
export function allGoDeeperLinks(modules: Module[]): LinkItem[] {
  const seen = new Set<string>()
  const result: LinkItem[] = []
  for (const m of modules) {
    for (const link of m.goDeeper) {
      if (!seen.has(link.url)) {
        seen.add(link.url)
        result.push(link)
      }
    }
  }
  return result
}
