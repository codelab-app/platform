import { useDndContext } from '@dnd-kit/core'
import type { HierarchicalCollision } from '../collision-detection'

export const DROP_INDICATOR_ID = '__drop__indicator__'

const makeDropIndicatorDiv = () => {
  const dropIndicator = document.createElement('div')

  dropIndicator.id = DROP_INDICATOR_ID
  dropIndicator.style.outline = '3px solid #439A56'

  return dropIndicator
}

export const DropIndicator = () => {
  const { collisions, droppableContainers } = useDndContext()
  const collision = collisions?.[0] as HierarchicalCollision | undefined

  // remove the highlight div if already exist
  document.getElementById(DROP_INDICATOR_ID)?.remove()

  if (!collision) {
    return null
  }

  const {
    data: {
      childDroppableAfterPointer: after,
      childDroppableBeforePointer: before,
    },
  } = collision

  const dropIndicator = makeDropIndicatorDiv()
  const prevElement = droppableContainers.get(before)?.node.current
  const nextElement = droppableContainers.get(after)?.node.current
  const parentElement = prevElement?.parentElement || nextElement?.parentElement

  if (parentElement && prevElement) {
    /**
     * insert indicator after previous element
     */
    parentElement.insertBefore(dropIndicator, prevElement.nextSibling)
  }

  if (parentElement && nextElement) {
    /**
     * insert indicator before next element
     */
    parentElement.insertBefore(dropIndicator, nextElement)
  }

  return null
}
