import {
  BuilderDragData,
  BuilderDropData,
  DragPosition,
  ICreateElementDTO,
  IElementService,
  IElementTree,
} from '@codelab/shared/abstract/core'
import { Maybe } from '@codelab/shared/abstract/types'
import { DragEndEvent } from '@dnd-kit/core'

export interface UseDndDropHandler {
  handleCreateElement: (event: DragEndEvent) => Promise<void>
  handleMoveElement: (event: DragEndEvent) => Promise<void>
}

export const useDndDropHandler = (
  elementService: IElementService,
  elementTree: Maybe<IElementTree>,
): UseDndDropHandler => {
  const handleCreateElement = async (event: DragEndEvent) => {
    const targetElementId = event.over?.id?.toString()
    const data = event.active.data.current as Maybe<BuilderDragData>
    const overData = event.over?.data.current as Maybe<BuilderDropData>
    const dragPosition = overData?.dragPosition
    const createElementInput = data?.createElementInput

    if (!targetElementId || !createElementInput) {
      return
    }

    const targetElement = elementService.element(targetElementId)

    if (!targetElement || !dragPosition) {
      return
    }

    const createElementDto: ICreateElementDTO = {
      ...createElementInput,
      parentElementId: targetElement?.parentElement?.id,
    }

    if (!elementTree) {
      console.error('Element Tree is missing')

      return
    }

    let newElement

    // targetElement->[newElement]
    if (dragPosition === DragPosition.After) {
      createElementDto.prevSiblingId = targetElement.id
      newElement = await elementService.createElementAsNextSibling(
        createElementDto,
      )
    } else {
      // targetElementPrev->[newElement]->targetElement
      if (targetElement.prevSibling) {
        createElementDto.prevSiblingId = targetElement.prevSibling.id
        newElement = await elementService.createElementAsNextSibling(
          createElementDto,
        )
      } else {
        // parent->[newElement]->targetElement
        createElementDto.parentElementId = targetElement.parentElement?.id
        newElement = await elementService.createElementAsFirstChild(
          createElementDto,
        )
      }
    }

    elementTree.addElements([newElement])
  }

  const handleMoveElement = async (event: DragEndEvent) => {
    const draggedElementId = event.active.id.toString()
    const targetElementId = event.over?.id?.toString()
    const dragPosition = event.over?.data.current?.dragPosition

    if (!targetElementId || targetElementId === draggedElementId) {
      return
    }

    const targetElement = elementService.element(targetElementId)

    if (!targetElement || !dragPosition) {
      return
    }

    // targetElement->[draggedElement]
    if (dragPosition === DragPosition.After) {
      await elementService.moveElementAsNextSibling({
        elementId: draggedElementId,
        targetElementId,
      })
    } else {
      // targetElementPrev->[draggedElement]->targetElement
      if (targetElement.prevSibling) {
        await elementService.moveElementAsNextSibling({
          elementId: draggedElementId,
          targetElementId: targetElement.prevSibling.id,
        })
      } else {
        // parent->[draggedElement]->targetElement
        await elementService.moveElementAsFirstChild({
          elementId: draggedElementId,
          parentElementId: targetElement.parentId!,
        })
      }
    }
  }

  return {
    handleCreateElement,
    handleMoveElement,
  }
}
