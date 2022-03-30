import { elementRef, ElementTree } from '@codelab/frontend/modules/element'
import { MouseEvent, useCallback } from 'react'
import { BuilderService } from '../store/BuilderService'

/**
 * Provides mouseEnter and mouseLeave handlers for builder elements, connecting
 * them to the builder state for hovering elements
 */
export const useBuilderHoverHandlers = (
  builderService: BuilderService,
  elementTree: ElementTree,
) => {
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

      const element = elementTree.element(elementId)

      if (element) {
        builderService.setHoveredElement(elementRef(element))
      } else {
        builderService.setHoveredElement(null)
      }
    },
    [builderService, elementTree],
  )

  const handleMouseLeave = useCallback(() => {
    builderService.setHoveredElement(null)
  }, [builderService])

  return {
    handleMouseOver,
    handleMouseLeave,
  }
}
