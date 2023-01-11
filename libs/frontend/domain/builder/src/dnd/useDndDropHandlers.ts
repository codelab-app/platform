import type {
  BuilderDragData,
  BuilderDropData,
  ICreateElementDTO,
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

    const createElementDto: ICreateElementDTO = {
      ...createElementInput,
      parentElementId:
        dragPosition === DragPosition.Inside
          ? targetElement.id
          : targetElement.parentElement?.id,
    }

    let newElement: Nullable<IElement> = null

    if (dragPosition === DragPosition.After) {
      createElementDto.prevSiblingId = targetElement.id
      newElement = await elementService.createElementAsNextSibling(
        createElementDto,
      )
    } else if (
      dragPosition === DragPosition.Before &&
      targetElement.prevSibling
    ) {
      createElementDto.prevSiblingId = targetElement.prevSibling.id
      newElement = await elementService.createElementAsNextSibling(
        createElementDto,
      )
    } else if (dragPosition === DragPosition.Inside) {
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
      await elementService.moveElementAsNextSibling({
        elementId: draggedElementId,
        targetElementId,
      })
    } else if (
      dragPosition === DragPosition.Before &&
      targetElement.prevSibling &&
      draggedElementId !== targetElement.prevSibling.id
    ) {
      await elementService.moveElementAsNextSibling({
        elementId: draggedElementId,
        targetElementId: targetElement.prevSibling.id,
      })
    } else if (dragPosition === DragPosition.Inside) {
      await elementService.moveElementAsFirstChild({
        elementId: draggedElementId,
        parentElementId: targetElement.parentId!,
      })
    }
  }

  return {
    handleCreateElement,
    handleMoveElement,
  }
}
