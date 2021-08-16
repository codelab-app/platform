import { Tree } from '@codelab/shared/abstract/core'
import { ElementFragment } from '@codelab/shared/codegen/graphql'
import { useCallback } from 'react'
import { useSetBuilder } from './useBuilder'

/**
 * RenderHandlers in the context of Page elements
 */
export const useBuilderHandlers = (tree: Tree<ElementFragment>) => {
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

      setHoveringElement(tree.getNodeById(id))
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
