import { ElementTree } from '@codelab/shared/core'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { builderActions } from '../store'

/**
 * Provides mouseEnter and mouseLeave handlers for builder elements, connecting
 * them to the builder redux state for hovering elements
 */
export const useBuilderHoverHandlers = (tree: ElementTree) => {
  const dispatch = useDispatch()

  const handleMouseEnter = useCallback(
    (e: MouseEvent) => {
      const target = e.target as HTMLElement

      if (!target) {
        dispatch(builderActions.hoverElement({ elementId: undefined }))

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
        dispatch(builderActions.hoverElement({ elementId }))
      } else {
        dispatch(builderActions.hoverElement({ elementId: undefined }))
      }
    },
    [dispatch, tree],
  )

  const handleMouseLeave = useCallback(() => {
    dispatch(builderActions.hoverElement({ elementId: undefined }))
  }, [dispatch])

  return {
    handleMouseEnter,
    handleMouseLeave,
  }
}
