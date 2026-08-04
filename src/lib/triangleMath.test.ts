import { describe, expect, it } from 'vitest'
import {
  clampToTriangle,
  describeTradeoff,
  fromBarycentric,
  toBarycentric,
  type Point,
} from './triangleMath'

const A: Point = { x: 320, y: 30 } // reasoning depth
const B: Point = { x: 80, y: 190 } // speed
const C: Point = { x: 560, y: 190 } // cost efficiency

describe('toBarycentric / fromBarycentric', () => {
  it('gives weight 1 to the matching vertex', () => {
    expect(toBarycentric(A, A, B, C)).toEqual({ a: 1, b: 0, c: 0 })
    expect(toBarycentric(B, A, B, C).b).toBeCloseTo(1)
    expect(toBarycentric(C, A, B, C).c).toBeCloseTo(1)
  })

  it('gives roughly equal weights at the centroid', () => {
    const centroid = { x: (A.x + B.x + C.x) / 3, y: (A.y + B.y + C.y) / 3 }
    const weights = toBarycentric(centroid, A, B, C)
    expect(weights.a).toBeCloseTo(1 / 3, 5)
    expect(weights.b).toBeCloseTo(1 / 3, 5)
    expect(weights.c).toBeCloseTo(1 / 3, 5)
  })

  it('round-trips through fromBarycentric', () => {
    const p = { x: 300, y: 150 }
    const weights = toBarycentric(p, A, B, C)
    const rebuilt = fromBarycentric(weights, A, B, C)
    expect(rebuilt.x).toBeCloseTo(p.x, 5)
    expect(rebuilt.y).toBeCloseTo(p.y, 5)
  })
})

describe('clampToTriangle', () => {
  it('leaves points already inside the triangle unchanged', () => {
    const inside = { x: 320, y: 140 }
    const { point, weights } = clampToTriangle(inside, A, B, C)
    expect(point.x).toBeCloseTo(inside.x, 5)
    expect(point.y).toBeCloseTo(inside.y, 5)
    expect(weights.a + weights.b + weights.c).toBeCloseTo(1, 5)
    expect(weights.a).toBeGreaterThanOrEqual(0)
    expect(weights.b).toBeGreaterThanOrEqual(0)
    expect(weights.c).toBeGreaterThanOrEqual(0)
  })

  it('pulls far-outside points back with non-negative, normalized weights', () => {
    const farAway = { x: -500, y: -500 }
    const { weights } = clampToTriangle(farAway, A, B, C)
    expect(weights.a).toBeGreaterThanOrEqual(0)
    expect(weights.b).toBeGreaterThanOrEqual(0)
    expect(weights.c).toBeGreaterThanOrEqual(0)
    expect(weights.a + weights.b + weights.c).toBeCloseTo(1, 5)
  })

  it('clamps a point beyond a vertex toward that vertex', () => {
    const beyondSpeed = { x: 0, y: 400 }
    const { weights } = clampToTriangle(beyondSpeed, A, B, C)
    expect(weights.b).toBeGreaterThan(weights.a)
    expect(weights.b).toBeGreaterThan(weights.c)
  })
})

describe('describeTradeoff', () => {
  it('names a deep-reasoning agent near the reasoning vertex', () => {
    expect(describeTradeoff({ a: 0.8, b: 0.1, c: 0.1 })).toMatch(/reasoning/)
  })

  it('names a high-volume FAQ agent near speed + cost', () => {
    expect(describeTradeoff({ a: 0.1, b: 0.45, c: 0.45 })).toMatch(/FAQ/)
  })

  it('names a balanced agent near the centroid', () => {
    expect(describeTradeoff({ a: 1 / 3, b: 1 / 3, c: 1 / 3 })).toMatch(/balanced/)
  })
})
