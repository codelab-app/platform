import type {
  BuilderDragData,
  BuilderDropData,
  IElement,
  IElementService,
  IElementTree,
} from '@codelab/frontend/abstract/core'
import { DragPosition } from '@codelab/frontend/abstract/core'
import type { Maybe, Nullable } from '@codelab/shared/abstract/types'
import type { DragEndEvent } from '@dnd-kit/core'

export interface UseDndDropHandler {
  handleCreateElement: (event: DragEndEvent) => Promise<void>
  handleMoveElement: (event: DragEndEvent) => Promise<void>
}

export const useDndDropHandler = (
  elementService: IElementService,
  elementTree: Maybe<IElementTree>,
): UseDndDropHandler => {
  const handleCreateElement = async (event: DragEndEvent) => {
    const targetElementId = event.over?.id.toString()
    const data = event.active.data.current as Maybe<BuilderDragData>
    const overData = event.over?.data.current as Maybe<BuilderDropData>
    const dragPosition = overData?.dragPosition
    const createElementInput = data?.createElementInput

    if (!elementTree) {
      console.error('Element Tree is missing')

      return
    }

    if (!targetElementId || !createElementInput) {
      return
    }

    const targetElement = elementService.element(targetElementId)

    if (!targetElement || !dragPosition) {
      return
    }

    // for not mutating the actual input from the components tab
    const createElementDto = {
      ...createElementInput,
    }

    let newElement: Nullable<IElement> = null

    if (dragPosition === DragPosition.After) {
      createElementDto.prevSiblingId = targetElement.id
      newElement = await elementService.createElementAsNextSibling(
        createElementDto,
      )
    }

    if (dragPosition === DragPosition.Before) {
      if (targetElement.prevSibling) {
        createElementDto.prevSiblingId = targetElement.prevSibling.id
        newElement = await elementService.createElementAsNextSibling(
          createElementDto,
        )
      }

      if (!targetElement.prevSibling && targetElement.parentElement?.id) {
        createElementDto.parentElementId = targetElement.parentElement.id
        newElement = await elementService.createElementAsFirstChild(
          createElementDto,
        )
      }
    }

    if (dragPosition === DragPosition.Inside) {
      createElementDto.parentElementId = targetElement.id
      newElement = await elementService.createElementAsFirstChild(
        createElementDto,
      )
    }

    if (newElement) {
      elementTree.addElements([newElement])
    }
  }

  const handleMoveElement = async (event: DragEndEvent) => {
    const draggedElementId = event.active.id.toString()
    const targetElementId = event.over?.id.toString()
    const dragPosition = event.over?.data.current?.dragPosition

    if (!targetElementId || targetElementId === draggedElementId) {
      return
    }

    const targetElement = elementService.element(targetElementId)

    if (!targetElement || !dragPosition) {
      return
    }

    if (dragPosition === DragPosition.After) {
      return await elementService.moveElementAsNextSibling({
        elementId: draggedElementId,
        targetElementId,
      })
    }

    if (dragPosition === DragPosition.Before) {
      if (
        targetElement.prevSibling &&
        draggedElementId !== targetElement.prevSibling.id
      ) {
        return await elementService.moveElementAsNextSibling({
          elementId: draggedElementId,
          targetElementId: targetElement.prevSibling.id,
        })
      }

      if (!targetElement.prevSibling && targetElement.parentElement?.id) {
        return await elementService.moveElementAsFirstChild({
          elementId: draggedElementId,
          parentElementId: targetElement.parentElement.id,
        })
      }
    }

    if (dragPosition === DragPosition.Inside) {
      return await elementService.moveElementAsFirstChild({
        elementId: draggedElementId,
        parentElementId: targetElement.id,
      })
    }
  }

  return {
    handleCreateElement,
    handleMoveElement,
  }
}
