import { elementRef } from '@codelab/frontend/modules/element'
import { IBuilderService } from '@codelab/shared/abstract/core'
import { MouseEvent, useCallback } from 'react'

type UseBuilderHoverHandlersProps = Pick<
  IBuilderService,
  'set_hoveredNode' | 'currentDragData'
>

/**
 * Provides mouseEnter and mouseLeave handlers for builder elements, connecting
 * them to the builder state for hovering elements
 */
export const useBuilderHoverHandlers = ({
  currentDragData,
  set_hoveredNode,
}: UseBuilderHoverHandlersProps) => {
  const handleMouseOver = useCallback((e: MouseEvent) => {
    if (currentDragData) {
      return
    }

    const target = e.target as HTMLElement

    if (!target) {
      set_hoveredNode(null)

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
      set_hoveredNode(elementRef(elementId))
    } else {
      set_hoveredNode(null)
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    set_hoveredNode(null)
  }, [])

  return {
    handleMouseOver,
    handleMouseLeave,
  }
}
