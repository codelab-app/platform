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

    if (!targetElement) {
      console.error('Target element not found')

      return
    }

    if (!dragPosition) {
      console.error('Drag position is required')

      return
    }

    // for not mutating the actual input from the components tab
    const createElementDto = {
      ...createElementInput,
    }

    let newElement: Nullable<IElement> = null

    // create the new element after the target element
    if (dragPosition === DragPosition.After) {
      createElementDto.prevSiblingId = targetElement.id
      newElement = await elementService.createElementAsNextSibling(
        createElementDto,
      )
    }

    // create the new element before the target element
    if (dragPosition === DragPosition.Before) {
      // if theres an element before the target, create the new element next to that
      if (targetElement.prevSibling) {
        createElementDto.prevSiblingId = targetElement.prevSibling.id
        newElement = await elementService.createElementAsNextSibling(
          createElementDto,
        )
      }

      // if theres no element before the target, create the new element
      // as the first child of the target's parent element
      if (!targetElement.prevSibling && targetElement.parentElement?.id) {
        createElementDto.parentElementId = targetElement.parentElement.id
        newElement = await elementService.createElementAsFirstChild(
          createElementDto,
        )
      }
    }

    // create the new element inside the target element as a first child
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

    if (!targetElement) {
      console.error('Target element not found')

      return
    }

    if (!dragPosition) {
      console.error('Drag position is required')

      return
    }

    // move the dragged element after the target element
    if (dragPosition === DragPosition.After) {
      return await elementService.moveElementAsNextSibling({
        elementId: draggedElementId,
        targetElementId,
      })
    }

    // move the dragged element before the target element
    if (dragPosition === DragPosition.Before) {
      // if theres an element before the target, move the dragged element next to that
      if (
        targetElement.prevSibling &&
        draggedElementId !== targetElement.prevSibling.id
      ) {
        return await elementService.moveElementAsNextSibling({
          elementId: draggedElementId,
          targetElementId: targetElement.prevSibling.id,
        })
      }

      // if theres no element before the target, move the dragged element
      // as the first child of the target's parent element
      if (!targetElement.prevSibling && targetElement.parentElement?.id) {
        return await elementService.moveElementAsFirstChild({
          elementId: draggedElementId,
          parentElementId: targetElement.parentElement.id,
        })
      }
    }

    // move the dragged element inside the target element as a first child
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
