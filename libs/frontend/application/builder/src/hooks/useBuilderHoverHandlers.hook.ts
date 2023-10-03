import type { IBuilderService } from '@codelab/frontend/abstract/core'
import { elementRef } from '@codelab/frontend/abstract/core'
import type { MouseEvent } from 'react'
import { useCallback } from 'react'

type UseBuilderHoverHandlersProps = Pick<
  IBuilderService,
  'currentDragData' | 'setHoveredNode'
>

/**
 * Provides mouseEnter and mouseLeave handlers for builder elements, connecting
 * them to the builder state for hovering elements
 */
export const useBuilderHoverHandlers = ({
  currentDragData,
  setHoveredNode,
}: UseBuilderHoverHandlersProps) => {
  const handleMouseOver = useCallback((event: MouseEvent) => {
    if (currentDragData) {
      return
    }

    const target = event.target as HTMLElement | undefined

    if (!target) {
      setHoveredNode(null)

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
      setHoveredNode(elementRef(elementId))
    } else {
      setHoveredNode(null)
    }
  }, [])

  const handleMouseLeave = useCallback(() => {
    setHoveredNode(null)
  }, [])

  return {
    handleMouseLeave,
    handleMouseOver,
  }
}
