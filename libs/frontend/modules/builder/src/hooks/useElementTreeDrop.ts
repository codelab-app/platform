import { IElementService, IElementTree } from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import { TreeProps } from 'antd/lib/tree'

export type UseElementTreeDropProps = Pick<IElementService, 'moveElement'> & {
  elementTree: Nullable<IElementTree>
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

    if (info.dropToGap) {
      elementService.moveElementNextTo(dragNodeId, dropNodeId)

      return
    }

    elementService.moveElementInto(dragNodeId, dropNodeId)
  }

  return {
    handleDrop,
    // isLoading,
    isMoving: false,
  }
}
