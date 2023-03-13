import type { CollisionDescriptor, CollisionDetection } from '@dnd-kit/core'

/**
 * Returns the coordinates of the center of a given ClientRect
 */
interface ClientRect {
  width: number
  height: number
  top: number
  left: number
  right: number
  bottom: number
}

const distanceBetween = (y1: number, y2: number) => Math.abs(y1 - y2)
const centerYOfRectangle = (rect: ClientRect) => rect.top + rect.height * 0.5

const sortCollisionsAsc = (
  { data: { value: a } }: CollisionDescriptor,
  { data: { value: b } }: CollisionDescriptor,
) => a - b

/**
 * Returns the closest rectangles from an array of rectangles to the center of a given
 * rectangle.
 */
export const closestCenterHeight: CollisionDetection = ({
  collisionRect,
  droppableContainers,
  droppableRects,
}) => {
  const centerCollisionRect = centerYOfRectangle(collisionRect)
  const collisions: Array<CollisionDescriptor> = []

  for (const droppableContainer of droppableContainers) {
    const { id } = droppableContainer
    const droppableRect = droppableRects.get(id)

    if (droppableRect) {
      const distOnYAxisBetween = distanceBetween(
        centerYOfRectangle(droppableRect),
        centerCollisionRect,
      )

      collisions.push({
        data: { collisionRect, droppableContainer, value: distOnYAxisBetween },
        id,
      })
    }
  }

  return collisions.sort(sortCollisionsAsc)
}
