<<<<<<< HEAD
import { useMoveElementsMutation } from '@codelab/frontend/modules/element'
=======
import { useUpdateElementsMutation } from '@codelab/frontend/modules/element'
>>>>>>> 651de063 (feat: move and duplicate element)
import { ElementTree } from '@codelab/shared/core'
import { TreeProps } from 'antd/lib/tree'

/**
 * Provides a handler for Antd tree onDrop for moving elements
 * This can be optimized to be handled in the API
 * It is also buggy, because it doesn't handle the case where the two nodes have the same order
 */
export const useElementTreeDrop = (tree: ElementTree) => {
<<<<<<< HEAD
  const [moveElement, { isLoading }] = useMoveElementsMutation()
=======
  const [moveElement, { isLoading }] = useUpdateElementsMutation()
>>>>>>> 651de063 (feat: move and duplicate element)

  const handleDrop: TreeProps['onDrop'] = (e) => {
    const dragNodeId = (e.dragNode as any).id
    const dropNodeId = (e.node as any).id

    if (e.dropToGap) {
      // Switch spots with the element next to the drop indicator
      const dropNodeParentId = tree.getParentOf(dropNodeId)?.id
      const dropElementOrder = tree.getOrderInParent(dropNodeId)
      const originalDragElementOrder = tree.getOrderInParent(dragNodeId)

      if (dropNodeParentId) {
<<<<<<< HEAD
        const order =
          dropElementOrder === originalDragElementOrder
            ? dropElementOrder + 1
            : dropElementOrder

        console.log(order)

=======
>>>>>>> 651de063 (feat: move and duplicate element)
        moveElement({
          variables: {
            where: { id: dragNodeId },
            update: {
              parentElement: {
                disconnect: { where: {} },
                connect: {
<<<<<<< HEAD
                  edge: { order },
=======
                  edge: {
                    order:
                      dropElementOrder === originalDragElementOrder
                        ? dropElementOrder + 1
                        : dropElementOrder,
                  },
>>>>>>> 651de063 (feat: move and duplicate element)
                  where: { node: { id: dropNodeParentId } },
                },
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
          where: { id: dragNodeId },
          update: {
            parentElement: {
              disconnect: { where: {} },
              connect: {
                edge: { order: e.dropPosition },
                where: { node: { id: dropNodeId } },
              },
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
