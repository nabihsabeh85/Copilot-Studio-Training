/**
 * Client-side search index over module content, built with FlexSearch.
 * Indexes titles, why-it-matters, concept text, build steps, watch outs, try it, and checklists.
 */
import { Document } from 'flexsearch'
import type { DocumentValue } from 'flexsearch'
import { modules } from '../content/modules'
import type { ConceptBlock, InlineToken, Module } from '../content/types'

export type SearchSection = 'why' | 'concept' | 'build' | 'watch-out' | 'try-it' | 'checklist'

export const SEARCH_SECTION_LABELS: Record<SearchSection, string> = {
  why: 'Why it matters',
  concept: 'In plain words',
  build: 'Build it',
  'watch-out': 'Watch out',
  'try-it': 'Try it',
  checklist: 'Checklist',
}

/** Sections with a matching `id` on the module page; others link to the module top. */
export const SEARCH_SECTION_ANCHORS: Partial<Record<SearchSection, string>> = {
  concept: 'concept',
  build: 'build',
  'watch-out': 'watch-out',
  'try-it': 'try-it',
}

export interface SearchRecord {
  id: string
  moduleId: number
  moduleTitle: string
  section: SearchSection
  sectionLabel: string
  text: string
  [key: string]: DocumentValue | DocumentValue[]
}

export interface SearchResult extends SearchRecord {
  snippet: string
}

function tokensToText(tokens: InlineToken[]): string {
  return tokens.map((token) => token.text).join(' ')
}

function conceptBlockToText(block: ConceptBlock): string {
  if (block.type === 'paragraph') return tokensToText(block.tokens)
  if (block.type === 'list') return block.items.map(tokensToText).join('. ')
  return [block.caption ?? '', ...block.headers, ...block.rows.flat()].filter(Boolean).join(' ')
}

function recordsForModule(mod: Module): SearchRecord[] {
  const records: SearchRecord[] = []

  const push = (section: SearchSection, text: string, suffix: string) => {
    const trimmed = text.trim()
    if (!trimmed) return
    records.push({
      id: `m${mod.id}-${section}-${suffix}`,
      moduleId: mod.id,
      moduleTitle: mod.title,
      section,
      sectionLabel: SEARCH_SECTION_LABELS[section],
      text: trimmed,
    })
  }

  push('why', mod.whyItMatters, 'main')
  mod.concept.forEach((block, i) => push('concept', conceptBlockToText(block), String(i)))
  mod.buildSteps.forEach((step) => push('build', tokensToText(step.tokens), step.id))
  mod.watchOuts.forEach((item, i) => push('watch-out', item, String(i)))
  push('try-it', mod.tryIt, 'main')
  mod.checklist.forEach((item, i) => push('checklist', item, String(i)))

  return records
}

function buildSnippet(text: string, query: string): string {
  const maxLength = 160
  const q = query.trim().toLowerCase()
  if (!q) return text.length > maxLength ? `${text.slice(0, maxLength)}…` : text

  const idx = text.toLowerCase().indexOf(q)
  if (idx === -1) return text.length > maxLength ? `${text.slice(0, maxLength)}…` : text

  const start = Math.max(0, idx - 50)
  const end = Math.min(text.length, idx + q.length + 90)
  const prefix = start > 0 ? '…' : ''
  const suffix = end < text.length ? '…' : ''
  return `${prefix}${text.slice(start, end)}${suffix}`
}

const searchDocument = new Document<SearchRecord>({
  document: {
    id: 'id',
    index: ['text', 'moduleTitle'],
    store: true,
  },
  tokenize: 'forward',
  context: true,
})

const recordsById = new Map<string, SearchRecord>()

for (const mod of modules) {
  for (const record of recordsForModule(mod)) {
    searchDocument.add(record)
    recordsById.set(record.id, record)
  }
}

export function searchModules(query: string, limit = 20): SearchResult[] {
  const trimmed = query.trim()
  if (!trimmed) return []

  const fieldResults = searchDocument.search(trimmed, { limit, enrich: true })

  const seen = new Set<string>()
  const results: SearchResult[] = []

  for (const fieldResult of fieldResults) {
    for (const item of fieldResult.result) {
      const id = String(item.id)
      if (seen.has(id)) continue
      seen.add(id)
      const record = item.doc ?? recordsById.get(id)
      if (!record) continue
      results.push({ ...record, snippet: buildSnippet(record.text, trimmed) })
    }
  }

  return results.slice(0, limit)
}
