/** Calculates the magnitude of a vector */
export const magnitude = (v: { x: number; y: number } | null | undefined) =>
  v ? Math.sqrt(v.x * v.x + v.y * v.y) : 0
