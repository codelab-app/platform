import { IBuilderService, IElementService } from '@codelab/shared/abstract/core'
import { TreeProps } from 'antd/lib/tree'

export type UseElementTreeDropProps = Pick<
  IElementService,
  'elementTree' | 'moveElement'
>

/**
 * Provides a handler for Antd tree onDrop for moving elements
 * This can be optimized to be handled in the API
 * It is also buggy, because it doesn't handle the case where the two nodes have the same order
 */
export const useElementTreeDrop = ({
  elementTree,
  moveElement,
}: UseElementTreeDropProps) => {
  // const [moveElement, { isLoading }] = useMoveElementsMutation()

  const handleDrop: TreeProps['onDrop'] = (info) => {
    console.log(info)

    const dragNodeId = info.dragNode.key.toString()
    const dropNodeId = info.node.key.toString()

    console.log(dragNodeId, dropNodeId)

    if (info.dropToGap) {
      // Switch spots with the element next to the drop indicator
      const dropElement = elementTree.element(dropNodeId)
      const dropNodeParentId = dropElement?.parentElement?.id
      const dropElementOrder = dropElement?.orderInParent ?? 0
      const dragElement = elementTree.element(dragNodeId)
      const originalDragElementOrder = dragElement?.orderInParent ?? 0

      if (dropNodeParentId) {
        const order =
          dropElementOrder === originalDragElementOrder
            ? dropElementOrder + 1
            : dropElementOrder

        return moveElement(dragNodeId, {
          parentElementId: dropNodeParentId,
          order,
        })
      }
    } else {
      // FIXME
      // Move the dragged element as a child to the dropped element
      // This is buggy, since e.dropPosition does not match our ordering system
      // it causes issues when moving elements up
      return moveElement(dragNodeId, {
        parentElementId: dropNodeId,
        order: info.dropPosition,
      })
    }

    return void 0
  }

  return {
    handleDrop,
    // isLoading,
    isMoving: false,
  }
}
