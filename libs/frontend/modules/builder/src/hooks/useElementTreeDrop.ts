import { IElementService, IElementTree } from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import { TreeProps } from 'antd/lib/tree'

export type UseElementTreeDropProps = {
  elementTree: Nullable<IElementTree>
  elementService: IElementService
}

/**
 * Provides a handler for Antd tree onDrop for moving elements
 * This can be optimized to be handled in the API
 * It is also buggy, because it doesn't handle the case where the two nodes have the same order
 */
export const useElementTreeDrop = (
  elementTree: Nullable<IElementTree>,
  elementService: IElementService,
) => {
  const handleDrop: TreeProps['onDrop'] = (info) => {
    const dragNodeId = info.dragNode.key.toString()
    const dropNodeId = info.node.key.toString()
    const isRootNode = info.node.pos === '0-0'

    // not outside of body
    if (info.dropToGap && !isRootNode) {
      elementService.moveElementNextTo(dragNodeId, dropNodeId)

      return
    }

    if (!info.dropToGap) {
      elementService.moveAsRoot(dragNodeId, dropNodeId)
    }

    // drop to gap + isRootNode = move element outside of body
  }

  return {
    handleDrop,
    // isLoading,
    isMoving: false,
  }
}
