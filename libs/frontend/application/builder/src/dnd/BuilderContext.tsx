import type { IElementModel } from '@codelab/frontend/abstract/domain'
import {
  DragPosition,
  ROOT_RENDER_CONTAINER_ID,
} from '@codelab/frontend/abstract/domain'
import { queryRenderedElementById } from '@codelab/frontend/application/renderer'
import { useStore } from '@codelab/frontend/application/shared/store'
import type {
  CollisionDetection,
  DragEndEvent,
  DragStartEvent,
} from '@dnd-kit/core'
import { DndContext, DragOverlay, pointerWithin } from '@dnd-kit/core'
import { snapCenterToCursor } from '@dnd-kit/modifiers'
import { observer } from 'mobx-react-lite'
import type { PropsWithChildren } from 'react'
import React, { useCallback, useMemo } from 'react'
import { useBuilderDnd } from './useBuilderDnd.hook'

/**
 * Provides the DnD context for the builder
 */

let dragPositionData: DragPositionData
let draggedHtmlElement: HTMLElement | null
const CURRENTLY_DRAGGED_CLASS = 'currently-dragged'

export const BuilderContext = observer<PropsWithChildren>(({ children }) => {
  const { onDragEnd, onDragStart, sensors } = useBuilderDnd()
  const { builderService, elementService } = useStore()

  const [draggedElement, setDraggedElement] =
    React.useState<IElementModel | null>(null)

  const autoScroll = useMemo(
    () => ({
      canScroll: (element: Element) => {
        const renderRoot = document.getElementById(ROOT_RENDER_CONTAINER_ID)

        return element.contains(renderRoot)
      },
    }),
    [],
  )

  const onDragStartHandler = useCallback(
    (event: DragStartEvent) => {
      setDraggedElement(elementService.element(event.active.id.toString()))

      draggedHtmlElement = queryRenderedElementById(event.active.id.toString())

      if (draggedHtmlElement) {
        // to provide a visual cue for currently dragged alement
        draggedHtmlElement.style.opacity = '0.5'
        // to tell which dom element is currently being dragged
        draggedHtmlElement.classList.add(CURRENTLY_DRAGGED_CLASS)
      }

      onDragStart(event)
    },
    [onDragStart, elementService],
  )

  const onDragEndHandler = useCallback(
    (event: DragEndEvent) => {
      if (draggedHtmlElement) {
        draggedHtmlElement.style.opacity = '1'
        draggedHtmlElement.classList.remove(CURRENTLY_DRAGGED_CLASS)
      }

      builderService.dragOverElementNode('', DragPosition.Inside)

      if (dragPositionData.dragPosition === DragPosition.NotAllowed) {
        return
      }

      onDragEnd(event, dragPositionData.dragPosition)
    },
    [onDragEnd, builderService],
  )

  const collisionDetection: CollisionDetection = useCallback(
    (args) => {
      const pointerX = args.pointerCoordinates?.x ?? 0
      const pointerY = args.pointerCoordinates?.y ?? 0
      const pointerWihthinResult = pointerWithin(args)
      const dropTargetId = pointerWihthinResult?.[0]?.id.toString() ?? ''
      const overRect = args.droppableRects.get(dropTargetId)

      if (!pointerX || !pointerY || !overRect) {
        return []
      }

      const offsetX = pointerX - overRect.left
      const offsetY = pointerY - overRect.top
      const dropTargetHtmlElement = queryRenderedElementById(dropTargetId)

      if (!isDescendantOfCurrentlyDraggedElement(dropTargetHtmlElement)) {
        dragPositionData = calcDragPosition({
          height: overRect.height,
          offsetX,
          offsetY,
          width: overRect.width,
        })
      } else {
        dragPositionData = {
          dragOverlayPosition: DragPosition.NotAllowed,
          dragPosition: DragPosition.NotAllowed,
        }
      }

      builderService.dragOverElementNode(
        dropTargetId,
        dragPositionData.dragOverlayPosition,
      )

      return pointerWihthinResult
    },
    [builderService],
  )

  return (
    <DndContext
      autoScroll={autoScroll}
      collisionDetection={collisionDetection}
      onDragEnd={onDragEndHandler}
      onDragStart={onDragStartHandler}
      sensors={sensors}
    >
      {children}
      <DragOverlay
        className="w-auto"
        dropAnimation={null}
        modifiers={[snapCenterToCursor]}
      >
        <div className="min-h-[20px] min-w-[70px] max-w-[120px] truncate rounded bg-white p-2 text-center text-[14px]">
          {draggedElement?.atomName}
        </div>
      </DragOverlay>
    </DndContext>
  )
})

BuilderContext.displayName = 'BuilderContext'

interface DragPositionData {
  dragOverlayPosition: DragPosition
  dragPosition: DragPosition
}

export const calcDragPosition = ({
  height,
  offsetX,
  offsetY,
  width,
}: {
  offsetX: number
  offsetY: number
  height: number | undefined
  width: number | undefined
}): DragPositionData => {
  if (!width || !height) {
    throw new Error('Missing width or height for calculating drag position')
  }

  if (offsetX < width * 0.3) {
    return {
      dragOverlayPosition: DragPosition.Before,
      dragPosition: DragPosition.Before,
    }
  }

  if (offsetY < height * 0.3) {
    return {
      dragOverlayPosition: DragPosition.Top,
      dragPosition: DragPosition.Before,
    }
  }

  if (offsetY > height * 0.7) {
    return {
      dragOverlayPosition: DragPosition.Bottom,
      dragPosition: DragPosition.After,
    }
  }

  if (offsetX > width * 0.7) {
    return {
      dragOverlayPosition: DragPosition.After,
      dragPosition: DragPosition.After,
    }
  }

  return {
    dragOverlayPosition: DragPosition.Inside,
    dragPosition: DragPosition.Inside,
  }
}

const isDescendantOfCurrentlyDraggedElement = (element: HTMLElement | null) => {
  return Boolean(element?.closest(`.${CURRENTLY_DRAGGED_CLASS}`))
}
