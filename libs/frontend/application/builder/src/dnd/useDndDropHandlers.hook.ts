import { DragPosition } from '@codelab/frontend/abstract/domain'
import { useRequiredParentValidator } from '@codelab/frontend/application/element'
import { useStore } from '@codelab/frontend/application/shared/store'
import { makeAutoIncrementedName } from '@codelab/frontend/domain/element'
import {
  IElementDTO,
  IElementRenderTypeKind,
} from '@codelab/shared/abstract/core'
import { v4 } from 'uuid'

export interface UseDndDropHandler {
  handleCreateElement(): Promise<void>
  handleMoveElement(): Promise<void>
}

export const useDndDropHandler = (): UseDndDropHandler => {
  const { validateParentForCreate, validateParentForMove } =
    useRequiredParentValidator()

  const { elementService, builderService } = useStore()
  const elementTree = builderService.activeElementTree

  const handleCreateElement = async () => {
    const targetElement = builderService.dragDropData?.target?.current
    const sourceElement = builderService.dragDropData?.source?.current

    const dragPosition = builderService.dragDropData?.dragPosition

    if (!elementTree) {
      console.error('Element Tree is missing')

      return
    }

    if (!targetElement || !sourceElement) {
      return
    }

    const createElementDTO: IElementDTO = {
      id: v4(),
      name: makeAutoIncrementedName(
        elementTree.elements.map((element) => element.name),
        sourceElement.name,
      ),
      closestContainerNode: { id: '' },
      parentComponent: { id: '' },
      prevSibling: { id: '' },
      nextSibling: { id: '' },
      props: {
        data: '{}',
        id: v4(),
      },
      renderType: {
        __typename: IElementRenderTypeKind.Atom,
        id: sourceElement.renderType.id,
      },
    }

    const parentId =
      dragPosition === DragPosition.Inside
        ? targetElement.id
        : targetElement.parentElement?.id

    if (!validateParentForCreate(sourceElement.renderType.id, parentId)) {
      return
    }

    // create the new element after the target element
    if (
      (dragPosition === DragPosition.After ||
        dragPosition === DragPosition.Bottom) &&
      createElementDTO.prevSibling
    ) {
      createElementDTO.prevSibling.id = targetElement.id
    }

    // create the new element before the target element
    if (
      dragPosition === DragPosition.Before ||
      dragPosition === DragPosition.Top
    ) {
      // if theres an element before the target, create the new element next to that
      if (targetElement.prevSibling && createElementDTO.prevSibling) {
        createElementDTO.prevSibling.id = targetElement.prevSibling.id
      }

      // if theres no element before the target, create the new element
      // as the first child of the target's parent element
      if (!targetElement.prevSibling && targetElement.parentElement?.id) {
        createElementDTO.parentElement = targetElement.parentElement
      }
    }

    // create the new element inside the target element as a first child
    if (dragPosition === DragPosition.Inside) {
      createElementDTO.parentElement = targetElement
    }

    await elementService.createElement(createElementDTO)
  }

  const handleMoveElement = async () => {
    const sourceElement = builderService.dragDropData?.source?.current
    const targetElement = builderService.dragDropData?.target?.current
    const dragPosition = builderService.dragDropData?.dragPosition

    if (
      !targetElement ||
      !sourceElement ||
      targetElement?.id === sourceElement?.id
    ) {
      return
    }

    const parentId =
      dragPosition === DragPosition.Inside
        ? targetElement.id
        : targetElement.parentElement?.id

    if (
      dragPosition === DragPosition.Inside &&
      !validateParentForMove(sourceElement?.id, parentId)
    ) {
      return
    }

    // move the dragged element after the target element
    if (
      dragPosition === DragPosition.After ||
      dragPosition === DragPosition.Bottom
    ) {
      return await elementService.move({
        element: sourceElement,
        prevSibling: targetElement,
      })
    }

    // move the dragged element before the target element
    if (
      dragPosition === DragPosition.Before ||
      dragPosition === DragPosition.Top
    ) {
      return await elementService.move({
        element: sourceElement,
        nextSibling: targetElement,
      })
    }

    // move the dragged element inside the target element as a first child
    return await elementService.move({
      element: sourceElement,
      parentElement: targetElement,
    })
  }

  return {
    handleCreateElement,
    handleMoveElement,
  }
}
