import { useMoveElementMutation } from '@codelab/frontend/modules/element'
import { ElementTree } from '@codelab/shared/core'
import { TreeProps } from 'antd/lib/tree'

/**
 * Provides a handler for Antd tree onDrop for moving elements
 * This can be optimized to be handled in the API
 * It is also buggy, because it doesn't handle the case where the two nodes have the same order
 */
export const useElementTreeDrop = (tree: ElementTree) => {
  const [moveElement, { isLoading }] = useMoveElementMutation()

  const handleDrop: TreeProps['onDrop'] = (e) => {
    const dragNodeId = (e.dragNode as any).id
    const dropNodeId = (e.node as any).id

    if (e.dropToGap) {
      // Switch spots with the element next to the drop indicator

      const dropNodeParentId = tree.getParentOf(dropNodeId)?.id
      const dropElementOrder = tree.getOrderInParent(dropNodeId)
      const originalDragElementOrder = tree.getOrderInParent(dragNodeId)

      if (dropNodeParentId) {
        moveElement({
          variables: {
            input: {
              elementId: dragNodeId,
              moveData: {
                parentElementId: dropNodeParentId,
                order:
                  dropElementOrder === originalDragElementOrder
                    ? dropElementOrder + 1
                    : dropElementOrder,
              },
            },
          },
        }).catch(console.error)

        moveElement({
          variables: {
            input: {
              elementId: dropNodeId,
              moveData: {
                parentElementId: dropNodeParentId,
                order: originalDragElementOrder,
              },
            },
          },
        }).catch(console.error)
      }
    } else {
      // FIXME
      // Move the dragged element as a child to the dropped element
      // This is buggy, since e.dropPosition does not match our ordering system
      // it causes issues when moving elements up
      return moveElement({
        variables: {
          input: {
            elementId: dragNodeId,
            moveData: {
              parentElementId: dropNodeId,
              order: e.dropPosition,
            },
          },
        },
      })
    }

    return void 0
  }

  return {
    handleDrop,
    isMoving: isLoading,
  }
}
