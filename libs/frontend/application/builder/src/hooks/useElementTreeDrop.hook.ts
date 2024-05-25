import type {
  IElementService,
  IElementTreeViewDataNode,
} from '@codelab/frontend/abstract/application'
import type { IElementTree } from '@codelab/frontend/abstract/domain'
import { notify } from '@codelab/frontend/shared/utils'
import { useRequiredParentValidator } from '@codelab/frontend-application-element/validation'
import { useStore } from '@codelab/frontend-application-shared-store/provider'
import type { Nullable } from '@codelab/shared/abstract/types'
import type { TreeProps } from 'antd/lib/tree'
import {
  shouldMoveElementAsFirstChild,
  shouldMoveElementAsNextSibling,
} from './useElementTreeDrop.utils.hook'

export interface UseElementTreeDropProps {
  elementService: IElementService
  elementTree: Nullable<IElementTree>
}

/**
 * Provides a handler for Antd tree onDrop for moving elements
 * This can be optimized by batching data changes in the API
 */
export const useElementTreeDrop = () => {
  const { elementService, runtimeElementService } = useStore()
  const { validateParentForMove } = useRequiredParentValidator()

  const handleDrop: TreeProps<IElementTreeViewDataNode>['onDrop'] = async (
    info,
  ) => {
    const runtimeDraggedElement = runtimeElementService.runtimeElement(
      info.dragNode.key.toString(),
    )

    const runtimeDropElement = runtimeElementService.runtimeElement(
      info.node.key.toString(),
    )

    const draggedElement = runtimeDraggedElement.element.current
    const draggedRootId = info.dragNode.rootKey?.toString()
    const dropElement = runtimeDropElement.element.current
    const dropRootId = info.node.rootKey?.toString()

    // check if the dropNode lives in a different component
    // move the element into the other component
    if (draggedRootId !== dropRootId) {
      if (draggedElement.id === draggedRootId) {
        // We can't move the root because the drag component
        // can't stay without a root element
        return
      }

      notify({
        description: 'Element can only be moved within the same component',
        title: 'Cannot move element',
        type: 'info',
      })

      return
    }

    if (!validateParentForMove(draggedElement.id, dropElement.id)) {
      return
    }

    if (shouldMoveElementAsFirstChild(info)) {
      void elementService.move({
        element: draggedElement,
        parentElement: dropElement,
      })

      return
    }

    if (shouldMoveElementAsNextSibling(info)) {
      void elementService.move({
        element: draggedElement,
        prevSibling: dropElement,
      })
    }

    // drop at the beginning of parent body
    // drop to gap + isRootNode = move element outside of body
  }

  return {
    handleDrop,
    // isLoading,
    isMoving: false,
  }
}
