import { ElementStore } from '@codelab/frontend/modules/element'
import { MouseEvent, useCallback } from 'react'
import { useBuilderDnd } from '../dnd'
import { useBuilderDispatch } from './useBuilderDispatch'

/**
 * Provides mouseEnter and mouseLeave handlers for builder elements, connecting
 * them to the builder redux state for hovering elements
 */
export const useBuilderHoverHandlers = (store: ElementStore) => {
  const { hoverElement } = useBuilderDispatch()
  const { currentlyDragging } = useBuilderDnd(store)

  const handleMouseOver = useCallback(
    (e: MouseEvent) => {
      if (currentlyDragging) {
        return
      }

      const target = e.target as HTMLElement

      if (!target) {
        hoverElement({ elementId: undefined })

        return
      }

      const elementId = target.dataset['id']
      const componentId = target.dataset['componentId']

      if (!elementId) {
        return
      }

      // Don't allow selection of elements withing a componentId
      if (componentId) {
        return
      }

      const element = store.elementTree.element(elementId)

      if (element) {
        hoverElement({ elementId })
      } else {
        hoverElement({ elementId: undefined })
      }
    },
    [currentlyDragging, hoverElement, store.elementTree],
  )

  const handleMouseLeave = useCallback(() => {
    hoverElement({ elementId: undefined })
  }, [hoverElement])

  return {
    handleMouseOver,
    handleMouseLeave,
  }
}
