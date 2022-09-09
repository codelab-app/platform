import { IElementService, IElementTree } from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import { TreeProps } from 'antd/lib/tree'
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
  const handleDrop: TreeProps['onDrop'] = (info) => {
    const dragNodeId = info.dragNode.key.toString()
    const dropNodeId = info.node.key.toString()

    if (shouldMoveElementAsFirstChild(info)) {
      elementService.moveElementAsFirstChild({
        elementId: dragNodeId,
        parentElementId: dropNodeId,
      })

      return
    }

    if (shouldMoveElementAsNextSibling(info)) {
      elementService.moveElementAsNextSibling({
        elementId: dragNodeId,
        targetElementId: dropNodeId,
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
