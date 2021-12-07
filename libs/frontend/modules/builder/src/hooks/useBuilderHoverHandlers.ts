import { ElementTree } from '@codelab/shared/core'
import { useCallback } from 'react'
import { useBuilderDispatch } from './useBuilderDispatch'

/**
 * Provides mouseEnter and mouseLeave handlers for builder elements, connecting
 * them to the builder redux state for hovering elements
 */
export const useBuilderHoverHandlers = (tree: ElementTree) => {
  const { hoverElement } = useBuilderDispatch()

  const handleMouseEnter = useCallback(
    (e: MouseEvent) => {
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
    [hoverElement, tree],
  )

  const handleMouseLeave = useCallback(() => {
    hoverElement({ elementId: undefined })
  }, [hoverElement])

  return {
    handleMouseEnter,
    handleMouseLeave,
  }
}
