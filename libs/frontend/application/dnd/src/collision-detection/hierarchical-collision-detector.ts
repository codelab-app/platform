import type {
  CollisionDetection,
  DroppableContainer,
  UniqueIdentifier,
} from '@dnd-kit/core'
import type { Point, Rect } from '../geometry'
import { findDistance, isAboveLine, Rectangle } from '../geometry'
import type { WithInternalDropData } from '../internal-drop-data.interface'
import type { HierarchicalCollision } from './hierarchical-collision.interface'
import type { HierarchicalDroppableContainer } from './hierarchical-droppable-container.interface'

export class HierarchicalCollisionDetector {
  public detectCollisions = ({
    active,
    droppableContainers,
    pointerCoordinates,
  }: Parameters<CollisionDetection>[0]): Array<HierarchicalCollision> => {
    if (!pointerCoordinates) {
      return []
    }

    const hierarchicalDroppableContainers =
      this.makeHierarchicalDroppableContainers(droppableContainers)

    const eligibleDroppableContainers = hierarchicalDroppableContainers.filter(
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
    const childrenIds = hierarchicalDroppableContainers.find(
      (hid) => hid.id === collisionId,
    )?.children

    const children = hierarchicalDroppableContainers.filter(
      (droppableContainer) => {
        return childrenIds?.includes(droppableContainer.id)
      },
    )

    const sblings = this.findPotentialSblings(pointerCoordinates, children)

    return !collisionId
      ? []
      : [
          {
            data: {
              childDroppableAfterPointer: sblings?.after?.id,
              childDroppableBeforePointer: sblings?.before?.id,
            },
            id: collisionId,
          },
        ]
  }

  private makeHierarchicalDroppableContainers(
    droppableContainers: Array<DroppableContainer>,
  ) {
    const HierarchicalDroppableContainer: Array<HierarchicalDroppableContainer> =
      []

    droppableContainers.forEach((droppable) => {
      const dropData = droppable.data.current as
        | WithInternalDropData<unknown>
        | undefined

      const parentId =
        dropData?.internalUseOnlyDropData.hierarchy.parentId || ''

      HierarchicalDroppableContainer.push({
        ancestors: [],
        children: [],
        id: droppable.id,
        parentId,
        rect: droppable.rect.current || Rectangle.zeroRect(),
      })
    })

    HierarchicalDroppableContainer.forEach((hNode) => {
      const parent = HierarchicalDroppableContainer.find(
        (node) => node.id === hNode.parentId,
      )

      if (parent) {
        parent.children.push(hNode.id)
      }
    })

    HierarchicalDroppableContainer.forEach((hNode) => {
      let level = 0

      let parent = HierarchicalDroppableContainer.find(
        (node) => node.id === hNode.parentId,
      )

      while (parent) {
        level += 1

        hNode.ancestors.push(parent.id)

        parent = HierarchicalDroppableContainer.find(
          (node) => node.id === parent?.parentId,
        )
      }

      hNode.level = level
    })

    return HierarchicalDroppableContainer
  }

  private findNearestBoundingBox(
    point: Point,
    hierarchy: Array<HierarchicalDroppableContainer>,
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
    containers: Array<HierarchicalDroppableContainer>,
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
    children: Array<HierarchicalDroppableContainer>,
  ) {
    const closestChild = this.findClosestDroppable(pointer, children)

    if (!closestChild) {
      return null
    }

    const isBeforeChild = this.isBefore(pointer, closestChild.rect)

    return {
      after: isBeforeChild ? closestChild : undefined,
      before: isBeforeChild ? undefined : closestChild,
    }
  }

  private findClosestDroppable(
    point: Point,
    droppables: Array<HierarchicalDroppableContainer>,
  ): HierarchicalDroppableContainer | undefined {
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
