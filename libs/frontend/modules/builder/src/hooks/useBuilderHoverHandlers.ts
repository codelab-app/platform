import { elementRef, ElementTree } from '@codelab/frontend/modules/element'
import { Nullable } from '@codelab/shared/abstract/types'
import { MouseEvent, useCallback } from 'react'
import { BuilderService } from '../store'

/**
 * Provides mouseEnter and mouseLeave handlers for builder elements, connecting
 * them to the builder state for hovering elements
 */
export const useBuilderHoverHandlers = (
  builderService: BuilderService,
  elementTree: Nullable<ElementTree>,
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

      if (elementId) {
        builderService.setHoveredElement(elementRef(elementId))
      } else {
        builderService.setHoveredElement(null)
      }
    },
    [builderService],
  )

  const handleMouseLeave = useCallback(() => {
    builderService.setHoveredElement(null)
  }, [builderService])

  return {
    handleMouseOver,
    handleMouseLeave,
  }
}
