import type { Line } from './line'
import type { Point } from './point'

export const isAboveLine = (point: Point, line: Line) => {
  const [start, end] = line
  const { x, y } = point
  const slope = (end.y - start.y) / (end.x - start.x)
  const yIntercept = start.y - slope * start.x

  return y < slope * x + yIntercept
}
