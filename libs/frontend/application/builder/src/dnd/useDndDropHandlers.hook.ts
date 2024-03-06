import type {
  BuilderDragData,
  IElementService,
  IRendererService,
} from '@codelab/frontend/abstract/application'
import { ROOT_RENDER_CONTAINER_ID } from '@codelab/frontend/abstract/domain'
import type { CollisionData } from '@codelab/frontend/application/dnd'
import { useRequiredParentValidator } from '@codelab/frontend/application/element'
import { makeAutoIncrementedName } from '@codelab/frontend/domain/element'
import type {
  ICreateElementDto,
  IElementDto,
} from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { DragEndEvent } from '@dnd-kit/core'
import { v4 } from 'uuid'

export interface UseDndDropHandler {
  handleCreateElement(event: DragEndEvent): Promise<void>
  handleMoveElement(event: DragEndEvent): Promise<void>
}

export const useDndDropHandler = (
  elementService: IElementService,
  rendererService: IRendererService,
): UseDndDropHandler => {
  const { validateParentForCreate, validateParentForMove } =
    useRequiredParentValidator()

  const handleCreateElement = async (event: DragEndEvent) => {
    const collisionData = event.collisions?.[0]?.data as Maybe<CollisionData>
    const data = event.active.data.current as Maybe<BuilderDragData>
    const activeElementTree = rendererService.activeElementTree

    const prevSiblingId =
      collisionData?.childDroppableBeforePointer as Maybe<string>

    const nextSiblingId =
      collisionData?.childDroppableAfterPointer as Maybe<string>

    const dropTargetId = event.over?.id.toString()
    const renderType = data?.elementRenderType

    const parentElementId =
      dropTargetId === ROOT_RENDER_CONTAINER_ID
        ? activeElementTree?.rootElement.current.id
        : dropTargetId

    if (
      !activeElementTree ||
      !parentElementId ||
      !renderType ||
      !collisionData ||
      !data.name ||
      !validateParentForCreate(renderType.id, parentElementId)
    ) {
      return
    }

    const parentElement = elementService.element(parentElementId)

    const createElementDto: ICreateElementDto = {
      closestContainerNode: {
        id: parentElement.closestContainerNode.id,
      },
      id: v4(),
      name: makeAutoIncrementedName(
        activeElementTree.elements.map((element) => element.name),
        data.name,
      ),
      nextSibling: nextSiblingId
        ? {
            id: nextSiblingId,
          }
        : undefined,
      parentElement: {
        id: parentElement.id,
      },
      prevSibling: prevSiblingId
        ? {
            id: prevSiblingId,
          }
        : undefined,
      props: {
        data: '{}',
        id: v4(),
      },
      renderType,
    }

    await elementService.createElement(createElementDto)
  }

  const handleMoveElement = async (event: DragEndEvent) => {
    const draggedElementId = event.active.id.toString()
    const collisionData = event.collisions?.[0]?.data as Maybe<CollisionData>
    const activeElementTree = rendererService.activeElementTree

    const prevSiblingId =
      collisionData?.childDroppableBeforePointer as Maybe<string>

    const nextSiblingId =
      collisionData?.childDroppableAfterPointer as Maybe<string>

    const dropTargetId = event.over?.id.toString()

    const parentElementId =
      dropTargetId === ROOT_RENDER_CONTAINER_ID
        ? activeElementTree?.rootElement.current.id
        : dropTargetId

    const draggedElement = elementService.element(draggedElementId)

    if (
      !parentElementId ||
      !collisionData ||
      prevSiblingId === draggedElementId ||
      nextSiblingId === draggedElementId ||
      !validateParentForMove(draggedElementId, parentElementId)
    ) {
      return
    }

    const prevSibling = prevSiblingId && elementService.element(prevSiblingId)
    const nextSibling = nextSiblingId && elementService.element(nextSiblingId)
    const parentElement = elementService.element(parentElementId)

    if (prevSibling && draggedElement.prevSibling?.id !== prevSiblingId) {
      return await elementService.move({
        element: draggedElement,
        prevSibling,
      })
    }

    if (nextSibling && draggedElement.nextSibling?.id !== nextSiblingId) {
      return await elementService.move({
        element: draggedElement,
        nextSibling,
      })
    }

    if (draggedElement.closestParentElement?.id !== parentElementId) {
      return await elementService.move({
        element: draggedElement,
        parentElement,
      })
    }
  }

  return {
    handleCreateElement,
    handleMoveElement,
  }
}
