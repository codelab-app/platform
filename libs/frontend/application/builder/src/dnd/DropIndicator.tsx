import { useDndContext } from '@dnd-kit/core'
import type React from 'react'
import type { BuilderCollision } from './collision-detection'

const DROP_INDICATOR_ID = '__drop__indicator__'

const makeDropIndicatorDiv = () => {
  const dropIndicator = document.createElement('div')

  dropIndicator.id = DROP_INDICATOR_ID
  dropIndicator.style.outline = '3px solid #439A56'

  return dropIndicator
}

export const DropIndicator = () => {
  const { collisions, droppableContainers } = useDndContext()
  const collision = collisions?.[0] as BuilderCollision | undefined

  // remove the highlight div if already exist
  document.getElementById(DROP_INDICATOR_ID)?.remove()

  if (!collision) {
    return null
  }

  const {
    data: { after, before },
  } = collision

  const dropIndicator = makeDropIndicatorDiv()
  const beforeElement = droppableContainers.get(before)?.node.current
  const afterElement = droppableContainers.get(after)?.node.current

  const parentElement =
    beforeElement?.parentElement || afterElement?.parentElement

  if (parentElement && beforeElement) {
    parentElement.insertBefore(dropIndicator, beforeElement)
  }

  if (parentElement && afterElement) {
    parentElement.insertBefore(dropIndicator, afterElement.nextSibling)
  }

  return null
}
