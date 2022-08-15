import { IElementService, IElementTree } from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import { TreeProps } from 'antd/lib/tree'
import {
  shouldMoveElementAsNextSibling,
  shouldMoveElementAsSubRoot,
} from './utilts'

export type UseElementTreeDropProps = {
  elementTree: Nullable<IElementTree>
  elementService: IElementService
}

/**
 * Provides a handler for Antd tree onDrop for moving elements
 * This can be optimized to be handled in the API
 * It is also buggy, because it doesn't handle the case where the two nodes have the same order
 */
export const useElementTreeDrop = (elementService: IElementService) => {
  const handleDrop: TreeProps['onDrop'] = (info) => {
    const dragNodeId = info.dragNode.key.toString()
    const dropNodeId = info.node.key.toString()

    if (shouldMoveElementAsSubRoot(info)) {
      elementService.moveElementAsSubRoot({
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
