import { ElementStore } from '@codelab/frontend/modules/element'
import { MouseEvent, useCallback } from 'react'
import { BuilderService } from '../store'

/**
 * Provides mouseEnter and mouseLeave handlers for builder elements, connecting
 * them to the builder state for hovering elements
 */
export const useBuilderHoverHandlers = (store: ElementStore) => {
  const { hoverElement } = useBuilderDispatch()
  const { currentlyDragging } = useBuilderDnd(store)

  const handleMouseOver = useCallback(
    (e: MouseEvent) => {
      if (builderService.currentDragData) {
        return
      }

      const target = e.target as HTMLElement

      if (!target) {
        builderService.setHoveredElement(null)

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
        builderService.setHoveredElement(null)
      }
    },
    [currentlyDragging, hoverElement, store.elementTree],
  )

  const handleMouseLeave = useCallback(() => {
    builderService.setHoveredElement(null)
  }, [builderService])

  return {
    handleMouseOver,
    handleMouseLeave,
  }
}
