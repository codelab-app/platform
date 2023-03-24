import type {
  BuilderDragData,
  BuilderDropData,
  IElementService,
  IElementTree,
} from '@codelab/frontend/abstract/core'
import { DragPosition } from '@codelab/frontend/abstract/core'
import {
  makeAutoIncrementedName,
  useRequiredParentValidator,
} from '@codelab/frontend/domain/element'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { DragEndEvent } from '@dnd-kit/core'

export interface UseDndDropHandler {
  handleCreateElement(event: DragEndEvent): Promise<void>
  handleMoveElement(event: DragEndEvent): Promise<void>
}

export const useDndDropHandler = (
  elementService: IElementService,
  elementTree: Maybe<IElementTree>,
): UseDndDropHandler => {
  const { validateParentForCreate, validateParentForMove } =
    useRequiredParentValidator()

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

    if (!dragPosition) {
      console.error('Drag position is required')

      return
    }

    // for not mutating the actual input from the components tab
    const createElementDTO = {
      ...createElementInput,
      name: makeAutoIncrementedName(
        elementTree.elements.map((element) => element.name),
        createElementInput.name,
      ),
    }

    const parentId =
      dragPosition === DragPosition.Inside
        ? targetElement.id
        : targetElement.parent?.id

    if (!validateParentForCreate(createElementDTO.renderType?.id, parentId)) {
      return
    }

    // create the new element after the target element
    if (dragPosition === DragPosition.After && createElementDTO.prevSibling) {
      createElementDTO.prevSibling.id = targetElement.id
      await elementService.createElementAsNextSibling(createElementDTO)
    }

    // create the new element before the target element
    if (dragPosition === DragPosition.Before) {
      // if theres an element before the target, create the new element next to that
      if (targetElement.prevSibling && createElementDTO.prevSibling) {
        createElementDTO.prevSibling.id = targetElement.prevSibling.id
        await elementService.createElementAsNextSibling(createElementDTO)
      }

      // if theres no element before the target, create the new element
      // as the first child of the target's parent element
      if (!targetElement.prevSibling && targetElement.parent?.id) {
        createElementDTO.parentElement = targetElement.parent
        await elementService.createElementAsFirstChild(createElementDTO)
      }
    }

    // create the new element inside the target element as a first child
    if (dragPosition === DragPosition.Inside) {
      createElementDTO.parentElement = targetElement
      await elementService.createElementAsFirstChild(createElementDTO)
    }
  }

  const handleMoveElement = async (event: DragEndEvent) => {
    const draggedElement = { id: event.active.id.toString() }
    const targetElementId = event.over?.id.toString()
    const dragPosition = event.over?.data.current?.dragPosition

    if (!targetElementId || targetElementId === draggedElement.id) {
      return
    }

    const targetElement = elementService.element(targetElementId)

    if (!dragPosition) {
      console.error('Drag position is required')

      return
    }

    const parentId =
      dragPosition === DragPosition.Inside
        ? targetElement.id
        : targetElement.parent?.id

    if (!validateParentForMove(draggedElement.id, parentId)) {
      return
    }

    // move the dragged element after the target element
    if (dragPosition === DragPosition.After) {
      return await elementService.moveElementAsNextSibling({
        element: draggedElement,
        targetElement,
      })
    }

    // move the dragged element before the target element
    if (dragPosition === DragPosition.Before) {
      // if theres an element before the target, move the dragged element next to that
      if (
        targetElement.prevSibling &&
        draggedElement.id !== targetElement.prevSibling.id
      ) {
        return await elementService.moveElementAsNextSibling({
          element: draggedElement,
          targetElement: targetElement.prevSibling,
        })
      }

      // if theres no element before the target, move the dragged element
      // as the first child of the target's parent element
      if (!targetElement.prevSibling && targetElement.parent?.getRefId()) {
        return await elementService.moveElementAsFirstChild({
          element: draggedElement,
          parentElement: targetElement.parent,
        })
      }
    }

    // move the dragged element inside the target element as a first child
    if (dragPosition === DragPosition.Inside) {
      return await elementService.moveElementAsFirstChild({
        element: draggedElement,
        parentElement: targetElement,
      })
    }
  }

  return {
    handleCreateElement,
    handleMoveElement,
  }
}
