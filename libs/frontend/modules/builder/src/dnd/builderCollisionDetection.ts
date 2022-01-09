import { Maybe, Nullable } from '@codelab/shared/abstract/types'
import {
  closestCorners,
  CollisionDetection,
  DroppableContainer,
  rectIntersection,
} from '@dnd-kit/core'
import { BuilderDndType } from './BuilderDndType'
import { BuilderDragData } from './BuilderDragData'
import { BuilderDropId } from './BuilderDropId'

// There is an issue with collision detection where it doesn't recognize the targets
// properly if the container is scrolled https://github.com/clauderic/dnd-kit/pull/518
export const builderCollisionDetection: CollisionDetection = (props) => {
  const { droppableContainers } = props
  const containersById: Record<string, DroppableContainer> = {}

  const containersByType: Record<BuilderDndType, Array<DroppableContainer>> = {
    [BuilderDndType.CreateElement]: [],
  }

  const isRectIntersectingWith = (withContainer: DroppableContainer) =>
    rectIntersection({
      ...props,
      droppableContainers: [withContainer],
    })

  // Build a lookup cache
  for (const container of droppableContainers) {
    containersById[container.id] = container

    const data = container.data.current as Maybe<BuilderDragData>

    if (data?.type) {
      containersByType[data.type].push(container)
    }
  }

  const toolbox = containersById[BuilderDropId.Toolbox]

  if (toolbox) {
    const isIntersectingToolbox = isRectIntersectingWith(toolbox)

    if (isIntersectingToolbox) {
      return isIntersectingToolbox
    }
  }

  const elementContainers = containersByType.CreateElement.filter(
    (c) => c.id !== BuilderDropId.BuilderRoot,
  )

  const builder = containersById[BuilderDropId.BuilderRoot]

  const rectIntersectBuilder: Nullable<string> = builder
    ? isRectIntersectingWith(builder)
    : null

  if (!rectIntersectBuilder) {
    // Remove all 'CreateElement' containers, i.e. rendered elements
    // if we are not intersecting with the builder
    return closestCorners({
      ...props,
      droppableContainers: droppableContainers.filter((c) => {
        const cData = c.data.current as Maybe<BuilderDragData>

        return !(cData && cData.type === BuilderDndType.CreateElement)
      }),
    })
  }

  const rectIntersectingElements = elementContainers.filter((c) =>
    isRectIntersectingWith(c),
  )

  const elementIntersect = closestCorners({
    ...props,
    droppableContainers: rectIntersectingElements,
  })

  return elementIntersect ?? rectIntersectBuilder
}
