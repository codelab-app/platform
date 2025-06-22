import type {
  IElementService,
  IElementTreeViewDataNode,
} from '@codelab/frontend-abstract-application'
import type { IElementTree } from '@codelab/frontend-abstract-domain'
import type { Nullable } from '@codelab/shared-abstract-types'
import type { TreeProps } from 'antd/lib/tree'

import { useInfoNotify } from '@codelab/frontend-infra-context'
import { useElementService } from '@codelab/frontend-application-element/services'
import { useRequiredParentValidator } from '@codelab/frontend-application-element/validation'
import { useApplicationStore } from '@codelab/frontend-infra-mobx-context'
import { useAsyncHandler } from '@codelab/frontend-presentation-components-form'

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
  const elementService = useElementService()
  const { runtimeElementService } = useApplicationStore()
  const { validateParentForMove } = useRequiredParentValidator()

  const onInfo = useInfoNotify({
    description: 'Element can only be moved within the same component',
    title: 'Cannot move element',
  })

  const asyncHandler = useAsyncHandler()

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

      void onInfo()

      return
    }

    if (!validateParentForMove(draggedElement.id, dropElement.id)) {
      return
    }

    if (shouldMoveElementAsFirstChild(info)) {
      const move = asyncHandler(() =>
        elementService.move({
          element: draggedElement,
          parentElement: dropElement,
        }),
      )

      void move()

      return
    }

    if (shouldMoveElementAsNextSibling(info)) {
      const move = asyncHandler(() =>
        elementService.move({
          element: draggedElement,
          prevSibling: dropElement,
        }),
      )

      void move()
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
