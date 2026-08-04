import { describe, expect, it } from 'vitest'
import { searchModules, SEARCH_SECTION_ANCHORS } from './searchIndex'

describe('searchModules', () => {
  it('returns no results for an empty query', () => {
    expect(searchModules('')).toEqual([])
    expect(searchModules('   ')).toEqual([])
  })

  it('finds a module by a concept keyword', () => {
    const results = searchModules('citation')
    expect(results.length).toBeGreaterThan(0)
    expect(results.some((r) => r.moduleId === 3)).toBe(true)
  })

  it('finds a module by title', () => {
    const results = searchModules('publishing')
    expect(results.some((r) => r.moduleId === 10)).toBe(true)
  })

  it('finds build step content', () => {
    const results = searchModules('environment picker')
    expect(results.some((r) => r.section === 'build' && r.moduleId === 2)).toBe(true)
  })

  it('includes a snippet around the match', () => {
    const results = searchModules('citation')
    for (const result of results) {
      expect(result.snippet.length).toBeGreaterThan(0)
    }
  })

  it('deduplicates results across indexed fields', () => {
    const results = searchModules('publish')
    const ids = results.map((r) => r.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('only defines anchors for sections that exist on the module page', () => {
    for (const anchor of Object.values(SEARCH_SECTION_ANCHORS)) {
      expect(['concept', 'build', 'watch-out', 'try-it']).toContain(anchor)
    }
  })
})
