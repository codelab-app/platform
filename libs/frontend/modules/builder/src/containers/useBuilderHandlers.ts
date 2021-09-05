import {
  ElementTreeGraphql,
  isElement,
} from '@codelab/frontend/modules/element'
import { useCallback } from 'react'
import { useSetBuilder } from './useBuilder'

export const useBuilderHandlers = (tree: ElementTreeGraphql) => {
  // Use setters only, because we don't want to re-render this every time the hover/selected element is changed
  const { setHoveringElement } = useSetBuilder()

  const handleMouseEnter = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement

      if (!target) {
        setHoveringElement(undefined)

        return
      }

      const id = target.dataset.id
      const componentId = target.dataset.componentId

      if (!id) {
        return
      }

      // Don't allow selection of elements withing a componentId
      if (componentId) {
        return
      }

      const element = tree.getVertex(id, isElement)

      if (element && isElement(element)) {
        setHoveringElement(element)
      } else {
        setHoveringElement(undefined)
      }
    },
    [setHoveringElement, tree],
  )

  const handleMouseLeave = useCallback(
    () => setHoveringElement(undefined),
    [setHoveringElement],
  )

  return {
    handleMouseEnter,
    handleMouseLeave,
  }
}
