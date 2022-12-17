import type { BuilderDragData } from '@codelab/frontend/abstract/core'
import { BuilderDndType } from '@codelab/frontend/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type {
  CollisionDetection,
  Data,
  DroppableContainer,
} from '@dnd-kit/core'
import { rectIntersection } from '@dnd-kit/core'
import { calcDropPosition } from './calcDropPosition'
import { closestCenterHeight } from './closestCenterHeight'

// There is an issue with collision detection where it doesn't recognize the targets
// properly if the container is scrolled https://github.com/clauderic/dnd-kit/pull/518
export const builderCollisionDetection: CollisionDetection = (props) => {
  const { droppableContainers } = props
  const containersById: Record<string, DroppableContainer> = {}

  const containersByType: Record<BuilderDndType, Array<DroppableContainer>> = {
    [BuilderDndType.CreateElement]: [],
  }

  // Build a lookup cache
  for (const container of droppableContainers) {
    containersById[container.id] = container

    const data = container.data.current as Maybe<BuilderDragData>

    if (data?.type) {
      containersByType[data.type].push(container)
    }
  }

  const elementContainers = containersByType.CreateElement

  // get intersected rects
  const rectIntersectingContainerIds = rectIntersection({
    ...props,
    droppableContainers: elementContainers,
  }).map((collision) => collision.id)

  const rectIntersectingContainers = elementContainers.filter((container) =>
    rectIntersectingContainerIds.includes(container.id),
  )

  // sort rects by distance between rect and center y axis (middle of target rect height)
  const elementsSortedByIntersectY = closestCenterHeight({
    ...props,
    droppableContainers: rectIntersectingContainers,
  })

  if (elementsSortedByIntersectY[0]?.data) {
    const el0 = elementsSortedByIntersectY[0]

    const { droppableContainer, collisionRect } = el0.data as Data

    /**
Given rect width
| x% = add as descendant |  y% = add as children |
Check for interected rect
 */
    ;(el0.data as Data)['dropPosition'] = calcDropPosition(
      collisionRect,
      droppableContainer.rect.current,
    )
  }

  return elementsSortedByIntersectY
}
