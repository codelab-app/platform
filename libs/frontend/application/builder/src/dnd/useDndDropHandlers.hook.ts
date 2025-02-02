import type { CollisionData } from '@codelab/frontend-application-dnd/collision-detection'
import type { IElementDto } from '@codelab/shared/abstract/core'
import type { Maybe } from '@codelab/shared/abstract/types'
import type { DragEndEvent } from '@dnd-kit/core'

import { type BuilderDragData } from '@codelab/frontend/abstract/application'
import { ROOT_RENDER_CONTAINER_ID } from '@codelab/frontend/abstract/domain'
import { useElementService } from '@codelab/frontend-application-element/services'
import { useRequiredParentValidator } from '@codelab/frontend-application-element/validation'
import { makeAutoIncrementedName } from '@codelab/frontend-domain-element/use-cases/incremented-name'
import {
  useApplicationStore,
  useDomainStore,
} from '@codelab/frontend-infra-mobx/context'
import { v4 } from 'uuid'

export interface UseDndDropHandler {
  handleCreateElement(event: DragEndEvent): Promise<void>
  handleMoveElement(event: DragEndEvent): Promise<void>
}

export const useDndDropHandler = (): UseDndDropHandler => {
  const { rendererService, runtimeElementService } = useApplicationStore()
  const { elementDomainService } = useDomainStore()
  const elementService = useElementService()

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

    const parentElement = elementDomainService.element(parentElementId)

    const createElementDto: IElementDto = {
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

    await elementService.create(createElementDto)
  }

  const handleMoveElement = async (event: DragEndEvent) => {
    const draggedElementId = event.active.id.toString()
    const draggedElement = elementDomainService.element(draggedElementId)
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

    if (
      !parentElementId ||
      !collisionData ||
      prevSiblingId === draggedElementId ||
      nextSiblingId === draggedElementId ||
      !validateParentForMove(draggedElementId, parentElementId)
    ) {
      return
    }

    const prevSibling =
      prevSiblingId && elementDomainService.element(prevSiblingId)

    const nextSibling =
      nextSiblingId && elementDomainService.element(nextSiblingId)

    const parentElement = elementDomainService.element(parentElementId)

    if (prevSibling && draggedElement.prevSibling?.id !== prevSiblingId) {
      await elementService.move({
        element: draggedElement,
        prevSibling,
      })

      return
    }

    if (nextSibling && draggedElement.nextSibling?.id !== nextSiblingId) {
      await elementService.move({
        element: draggedElement,
        nextSibling,
      })

      return
    }

    if (draggedElement.closestParentElement?.id !== parentElementId) {
      await elementService.move({
        element: draggedElement,
        parentElement,
      })

      return
    }
  }

  return {
    handleCreateElement,
    handleMoveElement,
  }
}
