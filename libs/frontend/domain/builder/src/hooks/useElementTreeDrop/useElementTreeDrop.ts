import {
  IBuilderDataNode,
  IElementService,
  IElementTree,
} from '@codelab/frontend/abstract/core'
import { Element } from '@codelab/frontend/domain/element'
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
  const handleDrop: TreeProps<IBuilderDataNode>['onDrop'] = async (info) => {
    const dragNodeId = info.dragNode.key.toString()
    const dropNodeId = info.node.key.toString()
    // Check if the dropNode lives at a different component
    // If so, we need to deep clone the element into the other component
    const dropElement = elementService.element(dropNodeId)
    const dragElement = elementService.element(dragNodeId)

    if (dropElement && dragElement) {
      const dragTree = Element.getElementTree(dragElement)
      const dropTree = Element.getElementTree(dropElement)
      const dragRoot = dragTree?._root
      const dropRoot = dropTree?._root

      if (dropRoot && dragRoot) {
        // If the root is not the same as the drop element, we need to clone the element or do we?
        if (dropRoot.id !== dragRoot.id) {
          if (dragElement.id === dragRoot.id) {
            // If we are dragging the root, we need to clone the entire tree
            return
          }

          await elementService.detachElementFromElementTree(dragElement.id)
          dragTree.removeElements([dragElement, ...dragElement.descendants])

          if (dropElement.children.length === 0) {
            await elementService.attachElementAsFirstChild({
              elementId: dragElement.id,
              parentElementId: dropElement.id,
            })
          } else {
            await elementService.attachElementAsNextSibling({
              elementId: dragElement.id,
              targetElementId: dropElement.children[0].id,
            })
          }

          dropTree.addElements([dragElement, ...dragElement.descendants])

          return
        }
      }
    }

    if (shouldMoveElementAsFirstChild(info)) {
      void elementService.moveElementAsFirstChild({
        elementId: dragNodeId,
        parentElementId: dropNodeId,
      })

      return
    }

    if (shouldMoveElementAsNextSibling(info)) {
      void elementService.moveElementAsNextSibling({
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
