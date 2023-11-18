import type {
  BuilderDragData,
  BuilderDropData,
  IElementService,
} from '@codelab/frontend/abstract/application'
import type { IElementTree } from '@codelab/frontend/abstract/domain'
import { type CollisionData } from '@codelab/frontend/application/dnd'
import { useRequiredParentValidator } from '@codelab/frontend/application/element'
import { makeAutoIncrementedName } from '@codelab/frontend/domain/element'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { DragEndEvent } from '@dnd-kit/core'
import { DropLocation } from './drop-location'

const getDropLocation = (collisionData: CollisionData) => {
  if (collisionData.childDroppableBeforePointer) {
    return DropLocation.Before
  }

  if (collisionData.childDroppableAfterPointer) {
    return DropLocation.After
  }

  return DropLocation.Inside
}

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
    const collisionData = event.collisions?.[0]?.data as Maybe<CollisionData>
    const createElementInput = data?.createElementInput

    if (!elementTree) {
      console.error('Element Tree is missing')

      return
    }

    if (!targetElementId || !createElementInput || !collisionData) {
      return
    }

    const dropPosition = getDropLocation(collisionData)
    const targetElement = elementService.element(targetElementId)

    // for not mutating the actual input from the components tab
    const createElementDTO = {
      ...createElementInput,
      name: makeAutoIncrementedName(
        elementTree.elements.map((element) => element.name),
        createElementInput.name,
      ),
    }

    const parentId =
      dropPosition === DropLocation.Inside
        ? targetElement.id
        : targetElement.parentElement?.id

    if (!validateParentForCreate(createElementDTO.renderType.id, parentId)) {
      return
    }

    // create the new element after the target element
    if (dropPosition === DropLocation.After && createElementDTO.prevSibling) {
      createElementDTO.prevSibling.id = targetElement.id
    }

    // create the new element before the target element
    if (dropPosition === DropLocation.Before) {
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
    if (dropPosition === DropLocation.Inside) {
      createElementDTO.parentElement = targetElement
    }

    await elementService.createElement(createElementDTO)
  }

  const handleMoveElement = async (event: DragEndEvent) => {
    const draggedElementId = event.active.id.toString()
    const draggedElement = elementService.element(draggedElementId)
    const dropElementId = event.over?.id.toString()
    const collisionData = event.collisions?.[0]?.data as Maybe<CollisionData>

    if (
      !dropElementId ||
      dropElementId === draggedElement.id ||
      !collisionData
    ) {
      return
    }

    const dropPosition = getDropLocation(collisionData)
    const targetElement = elementService.element(dropElementId)

    const parentId =
      dropPosition === DropLocation.Inside
        ? targetElement.id
        : targetElement.parentElement?.id

    if (!validateParentForMove(draggedElement.id, parentId)) {
      return
    }

    // move the dragged element after the target element
    if (dropPosition === DropLocation.After) {
      return await elementService.move({
        element: draggedElement,
        prevSibling: targetElement,
      })
    }

    // move the dragged element before the target element
    if (dropPosition === DropLocation.Before) {
      return await elementService.move({
        element: draggedElement,
        nextSibling: targetElement,
      })
    }

    // move the dragged element inside the target element as a first child
    return await elementService.move({
      element: draggedElement,
      parentElement: targetElement,
    })
  }

  return {
    handleCreateElement,
    handleMoveElement,
  }
}
