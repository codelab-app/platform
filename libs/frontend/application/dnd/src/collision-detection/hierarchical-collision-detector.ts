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

interface HierarchicalCollisionDetectorOptions {
  /**
   * The number of pixels to shrink the bounding box of each droppable container by.
   * @default 2
   */
  spacing?: number
}

export class HierarchicalCollisionDetector {
  options: HierarchicalCollisionDetectorOptions = {
    spacing: 2,
  }

  constructor(options?: HierarchicalCollisionDetectorOptions) {
    this.options = {
      ...this.options,
      ...options,
    }
  }

  public detectCollisions = ({
    active,
    droppableContainers,
    pointerCoordinates,
  }: Pick<
    Parameters<CollisionDetection>[0],
    'active' | 'droppableContainers' | 'pointerCoordinates'
  >): Array<HierarchicalCollision> => {
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

    const shrunkDroppableContainers = this.shrinkContainers(
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

  private shrinkContainers(containers: Array<HierarchicalDroppableContainer>) {
    const spacing = this.options.spacing

    // Shrink all containers except for the root by the same constant value
    const uniformallyShrunkContainers = containers.map((container) => {
      const shrunkRect =
        container.ancestors.length > 0
          ? Rectangle.shrink(container.rect, spacing || 0)
          : container.rect

      return {
        ...container,
        rect: shrunkRect,
      }
    })

    // shrink only containers that obacure their parents
    const shrunkContainers = uniformallyShrunkContainers.map(
      (shrunkContainer) => {
        const shrunkRect = shrunkContainer.rect

        const parent = uniformallyShrunkContainers.find(
          (potentialParent) => potentialParent.id === shrunkContainer.parentId,
        )

        const parentRect = parent?.rect

        if (parentRect && spacing) {
          const leftSpace = Math.abs(shrunkRect.left - parentRect.left)
          const rightSpace = Math.abs(shrunkRect.right - parentRect.right)
          const topSpace = Math.abs(shrunkRect.top - parentRect.top)
          const bottomSpace = Math.abs(shrunkRect.bottom - parentRect.bottom)
          const shrinkLeftBy = leftSpace < spacing ? spacing - leftSpace : 0
          const shrinkRightBy = rightSpace < spacing ? spacing - rightSpace : 0
          const shrinkTopBy = topSpace < spacing ? spacing - topSpace : 0

          const shrinkBottomBy =
            bottomSpace < spacing ? spacing - bottomSpace : 0

          shrunkRect.width = shrunkRect.width - shrinkLeftBy - shrinkRightBy
          shrunkRect.height = shrunkRect.height - shrinkTopBy - shrinkBottomBy
          shrunkRect.left = shrunkRect.left + shrinkLeftBy
          shrunkRect.right = shrunkRect.right - shrinkRightBy
          shrunkRect.top = shrunkRect.top + shrinkTopBy
          shrunkRect.bottom = shrunkRect.bottom - shrinkBottomBy
        }

        return {
          ...shrunkContainer,
          rect: shrunkRect,
        }
      },
    )

    return shrunkContainers
  }
}
