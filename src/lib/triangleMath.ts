/** Pure geometry helpers for the draggable trade-off dot in Fig7ModelTriangle. */

export interface Point {
  x: number
  y: number
}

/** Barycentric weights relative to a triangle's three vertices (a, b, c). Each sums to 1. */
export interface BarycentricWeights {
  a: number
  b: number
  c: number
}

/** Converts a point to barycentric coordinates relative to triangle (a, b, c). */
export function toBarycentric(p: Point, a: Point, b: Point, c: Point): BarycentricWeights {
  const v0 = { x: b.x - a.x, y: b.y - a.y }
  const v1 = { x: c.x - a.x, y: c.y - a.y }
  const v2 = { x: p.x - a.x, y: p.y - a.y }

  const d00 = v0.x * v0.x + v0.y * v0.y
  const d01 = v0.x * v1.x + v0.y * v1.y
  const d11 = v1.x * v1.x + v1.y * v1.y
  const d20 = v2.x * v0.x + v2.y * v0.y
  const d21 = v2.x * v1.x + v2.y * v1.y

  const denom = d00 * d11 - d01 * d01
  if (denom === 0) return { a: 1, b: 0, c: 0 }

  const wB = (d11 * d20 - d01 * d21) / denom
  const wC = (d00 * d21 - d01 * d20) / denom
  const wA = 1 - wB - wC

  return { a: wA, b: wB, c: wC }
}

/** Rebuilds a cartesian point from barycentric weights and the triangle's vertices. */
export function fromBarycentric(weights: BarycentricWeights, a: Point, b: Point, c: Point): Point {
  return {
    x: weights.a * a.x + weights.b * b.x + weights.c * c.x,
    y: weights.a * a.y + weights.b * b.y + weights.c * c.y,
  }
}

/**
 * Clamps a point to (roughly) inside the triangle (a, b, c) by clamping negative
 * barycentric weights to zero, renormalizing, then rebuilding the cartesian point.
 * Returns both the clamped point and its (non-negative, normalized) weights.
 */
export function clampToTriangle(
  p: Point,
  a: Point,
  b: Point,
  c: Point,
): { point: Point; weights: BarycentricWeights } {
  const raw = toBarycentric(p, a, b, c)
  const clampedA = Math.max(0, raw.a)
  const clampedB = Math.max(0, raw.b)
  const clampedC = Math.max(0, raw.c)
  const total = clampedA + clampedB + clampedC

  const weights =
    total === 0
      ? { a: 1 / 3, b: 1 / 3, c: 1 / 3 }
      : { a: clampedA / total, b: clampedB / total, c: clampedC / total }

  return { point: fromBarycentric(weights, a, b, c), weights }
}

/**
 * Names the kind of agent implied by a trade-off position. `weights.a` is reasoning
 * depth, `weights.b` is speed, `weights.c` is cost efficiency (each 0..1, summing to 1).
 */
export function describeTradeoff(weights: BarycentricWeights): string {
  const { a: reasoning, b: speed, c: cost } = weights

  if (reasoning >= 0.55) {
    return 'a deep-reasoning agent, like a research or complex-analysis assistant'
  }
  if (speed >= 0.4 && cost >= 0.4) {
    return 'a high-volume FAQ agent'
  }
  if (speed === Math.max(reasoning, speed, cost) && speed >= 0.45) {
    return 'a quick, always-responsive helper for simple asks'
  }
  if (cost === Math.max(reasoning, speed, cost) && cost >= 0.45) {
    return 'a budget-conscious agent for lower-stakes, high-volume tasks'
  }
  return 'a balanced, general-purpose agent'
}
