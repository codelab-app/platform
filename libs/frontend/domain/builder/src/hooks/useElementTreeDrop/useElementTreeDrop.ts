import type {
  IBuilderDataNode,
  IElementService,
  IElementTree,
} from '@codelab/frontend/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import type { TreeProps } from 'antd/lib/tree'
import {
  shouldMoveElementAsFirstChild,
  shouldMoveElementAsNextSibling,
} from './utilts'

export interface UseElementTreeDropProps {
  elementTree: Nullable<IElementTree>
  elementService: IElementService
}

/**
 * Provides a handler for Antd tree onDrop for moving elements
 * This can be optimized by batching data changes in the API
 */
export const useElementTreeDrop = (elementService: IElementService) => {
  const handleDrop: TreeProps<IBuilderDataNode>['onDrop'] = async (info) => {
    const dragElementId = info.dragNode.key.toString()
    const dropElementId = info.node.key.toString()
    const dragRootId = info.dragNode.rootKey?.toString()
    const dropRootId = info.node.rootKey?.toString()

    // check if the dropNode lives in a different component
    // move the element into the other component
    if (dragRootId !== dropRootId) {
      if (dragElementId === dragRootId) {
        // We can't move the root because the drag component
        // can't stay without a root element
        return
      }

      void elementService.moveElementToAnotherTree({
        elementId: dragElementId,
        targetElementId: dropElementId,
        dropPosition: info.dropPosition,
      })

      return
    }

    if (shouldMoveElementAsFirstChild(info)) {
      void elementService.moveElementAsFirstChild({
        elementId: dragElementId,
        parentElementId: dropElementId,
      })

      return
    }

    if (shouldMoveElementAsNextSibling(info)) {
      void elementService.moveElementAsNextSibling({
        elementId: dragElementId,
        targetElementId: dropElementId,
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
