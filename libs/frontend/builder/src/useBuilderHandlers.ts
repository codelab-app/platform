import { useCallback } from 'react'
import { ElementTree } from './elementTree'
import { useSetBuilder } from './useBuilder'

/**
 * RenderHandlers in the context of Page elements
 */
export const useBuilderHandlers = (tree: ElementTree) => {
  // Use setters only, because we don't want to re-render this every time the hover/selected element is changed
  const { setHoveringElement } = useSetBuilder()

  const handleMouseEnter = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement

      if (!target) {
        setHoveringElement(null)

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

      setHoveringElement(tree.getElementById(id))
    },
    [setHoveringElement, tree],
  )

  const handleMouseLeave = useCallback(
    () => setHoveringElement(null),
    [setHoveringElement],
  )

  return {
    handleMouseEnter,
    handleMouseLeave,
  }
}
