import { IElementService } from '@codelab/frontend/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import {
  Active,
  DragEndEvent,
  DragMoveEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { useState } from 'react'

export interface UseBuilderPageDndProps {
  elementService: IElementService
}

export const useBuilderPageDnd = (elementService: IElementService) => {
  const [draggedElement, setDraggedLement] = useState<Nullable<Active>>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    }),
  )

  const handleDragStart = (event: DragStartEvent) => {
    setDraggedLement(event.active)
  }

  const handleDragMove = (event: DragMoveEvent) => {
    console.log('handleDragMove', event)
  }

  const handleDrop = async (event: DragEndEvent) => {
    console.log('onDragEnd', event)

    const draggedElementId = event.active.id
    const targetElementId = event.over?.id

    setDraggedLement(null)

    if (
      !draggedElementId ||
      !targetElementId ||
      draggedElementId === targetElementId
    ) {
      return
    }

    console.log('element: ', draggedElementId, 'target: ', targetElementId)

    await elementService.handleElementDrop({
      droppedElementId: draggedElementId.toString(),
      targetElementId: targetElementId.toString(),
      // TODO: to be implemented
      //   dropPosition: DropPosition.After,
    })
  }

  return {
    sensors,
    handleDrop,
    handleDragStart,
    handleDragMove,
    draggedElement,
    setDraggedLement,
  }
}
