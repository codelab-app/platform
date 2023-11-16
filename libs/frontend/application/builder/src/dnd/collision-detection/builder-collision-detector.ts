import type {
  CollisionDetection,
  DroppableContainer,
  UniqueIdentifier,
} from '@dnd-kit/core'
import type { Point, Rect } from '../geometry'
import { findDistance, isAboveLine, Rectangle } from '../geometry'
import type { BuilderCollision } from './builder-collision.interface'
import type { BuilderDroppableContainer } from './builder-collision-node.interface'

export class BuilderCollisionDetector {
  public detectCollisions = ({
    active,
    droppableContainers,
    pointerCoordinates,
  }: Parameters<CollisionDetection>[0]): Array<BuilderCollision> => {
    if (!pointerCoordinates) {
      return []
    }

    const builderDroppableContainers =
      this.makeBuilderDroppableContainers(droppableContainers)

    const eligibleDroppableContainers = builderDroppableContainers.filter(
      (container) => {
        return (
          !container.ancestors.includes(active.id) && active.id !== container.id
        )
      },
    )

    const shrunkDroppableContainers = this.shrinkContainersByLevel(
      eligibleDroppableContainers,
    )

    const collisionId = this.findNearestBoundingBox(
      pointerCoordinates,
      shrunkDroppableContainers,
    )

    // if id has children, find before and after
    const childrenIds = builderDroppableContainers.find(
      (hid) => hid.id === collisionId,
    )?.children

    const children = builderDroppableContainers.filter((droppableContainer) => {
      return childrenIds?.includes(droppableContainer.id)
    })

    const sblings = this.findPotentialSblings(pointerCoordinates, children)

    return !collisionId
      ? []
      : [
          {
            data: {
              after: sblings?.after?.id,
              before: sblings?.before?.id,
            },
            id: collisionId,
          },
        ]
  }

  private makeBuilderDroppableContainers(
    droppableContainers: Array<DroppableContainer>,
  ) {
    const builderDroppableContainer: Array<BuilderDroppableContainer> = []

    droppableContainers.forEach((droppable) => {
      const parentId = droppable.data.current?.parentId || ''

      builderDroppableContainer.push({
        ancestors: [],
        children: [],
        id: droppable.id,
        parentId,
        rect: droppable.rect.current || Rectangle.zeroRect(),
      })
    })

    builderDroppableContainer.forEach((hNode) => {
      const parent = builderDroppableContainer.find(
        (node) => node.id === hNode.parentId,
      )

      if (parent) {
        parent.children.push(hNode.id)
      }
    })

    builderDroppableContainer.forEach((hNode) => {
      let level = 0

      let parent = builderDroppableContainer.find(
        (node) => node.id === hNode.parentId,
      )

      while (parent) {
        level += 1

        hNode.ancestors.push(parent.id)

        parent = builderDroppableContainer.find(
          (node) => node.id === parent?.parentId,
        )
      }

      hNode.level = level
    })

    return builderDroppableContainer
  }

  private findNearestBoundingBox(
    point: Point,
    hierarchy: Array<BuilderDroppableContainer>,
  ): UniqueIdentifier | undefined {
    let foundRect

    for (const droppable of hierarchy) {
      const droppableLevel = droppable.level || 0

      if (Rectangle.contains(droppable.rect, point)) {
        if (!foundRect || droppableLevel > foundRect.level!) {
          foundRect = droppable
        }
      }
    }

    return foundRect?.id
  }

  private shrinkContainersByLevel(
    containers: Array<BuilderDroppableContainer>,
  ) {
    const shrinkedContainers = containers.map((container) => {
      const shrinkedRect = Rectangle.shrink(
        container.rect,
        container.level || 0,
      )

      return {
        ...container,
        rect: shrinkedRect,
      }
    })

    return shrinkedContainers
  }

  /**
   * whether the point is before or after the rectangle.
   * above and to the left of the rectangle is before, otherwise is after.
   * @param point
   * @param rect
   * @returns
   */
  private isBefore(point: Point, rect: Rect) {
    const linePoint1 = {
      x: rect.left,
      y: rect.bottom,
    }

    const linePoint2 = {
      x: rect.right,
      y: rect.top,
    }

    return isAboveLine(point, [linePoint1, linePoint2])
  }

  private findPotentialSblings(
    pointer: Point,
    children: Array<BuilderDroppableContainer>,
  ) {
    const closestChild = this.findClosestDroppable(pointer, children)

    if (!closestChild) {
      return null
    }

    const isBeforeChild = this.isBefore(pointer, closestChild.rect)

    return {
      after: isBeforeChild ? undefined : closestChild,
      before: isBeforeChild ? closestChild : undefined,
    }
  }

  private findClosestDroppable(
    point: Point,
    droppables: Array<BuilderDroppableContainer>,
  ): BuilderDroppableContainer | undefined {
    let foundRect
    let smallestDistance

    for (const droppable of droppables) {
      const { rect } = droppable
      const center = Rectangle.center(rect)
      const distance = findDistance(center, point)

      if (!smallestDistance || distance < smallestDistance) {
        foundRect = droppable
        smallestDistance = distance
      }
    }

    return foundRect
  }
}
