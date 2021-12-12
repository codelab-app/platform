import { ElementTree } from '@codelab/shared/core'
import { MouseEvent, useCallback } from 'react'
import { useBuilderDnd } from '../dnd'
import { useBuilderDispatch } from './useBuilderDispatch'

/**
 * Provides mouseEnter and mouseLeave handlers for builder elements, connecting
 * them to the builder redux state for hovering elements
 */
export const useBuilderHoverHandlers = (tree: ElementTree) => {
  const { hoverElement } = useBuilderDispatch()
  const { currentlyDragging } = useBuilderDnd()

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

      const elementId = target.dataset.id
      const componentId = target.dataset.componentId

      if (!elementId) {
        return
      }

      // Don't allow selection of elements withing a componentId
      if (componentId) {
        return
      }

      const element = tree.getVertex(elementId, ElementTree.isElement)

      if (element && ElementTree.isElement(element)) {
        hoverElement({ elementId })
      } else {
        hoverElement({ elementId: undefined })
      }
    },
    [currentlyDragging, hoverElement, tree],
  )

  const handleMouseLeave = useCallback(() => {
    hoverElement({ elementId: undefined })
  }, [hoverElement])

  return {
    handleMouseOver,
    handleMouseLeave,
  }
}
