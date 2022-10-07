import {
  BuilderDndType,
  BuilderDropData,
  IElement,
} from '@codelab/shared/abstract/core'
import { Nullable } from '@codelab/shared/abstract/types'
import { useDraggable, useDroppable } from '@dnd-kit/core'
import React from 'react'
import { useMouse } from 'react-use'
import { calcDragPosition } from './draggableElement.util'
import { DraggedElementOverlay } from './DraggedElementOverlay'
import { DragPositionIndicator } from './DragPositionIndicator'

export interface DraggableElementProps {
  element: IElement
  children: React.ReactElement | Array<React.ReactElement>
}

export const DraggableElement = ({
  element,
  children,
}: DraggableElementProps) => {
  const droppableNodeRef = React.useRef<Nullable<HTMLElement>>(null)
  const { elY, elH } = useMouse(droppableNodeRef)

  // Create a draggable for the element
  const {
    attributes: draggableAttrs,
    listeners: draggableListeners,
    setNodeRef: draggableNodeRefSetter,
  } = useDraggable({
    id: element.id,
    data: {
      type: BuilderDndType.MoveElement,
      overlayRenderer: () => DraggedElementOverlay(children),
    },
  })

  // Create a droppable for the element
  const {
    setNodeRef: droppableNodeRefSetter,
    isOver,
    over,
  } = useDroppable({ id: element.id })

  // Set dragPosition for DragEndEvent
  if (isOver && over) {
    const dragData: BuilderDropData = {
      dragPosition: calcDragPosition(isOver, elY, elH),
    }

    over.data.current = {
      ...over.data.current,
      ...dragData,
    }
  }

  // Set node ref for both draggable element and mouse hook
  const setDroppableNodeRef = (ref: Nullable<HTMLElement>) => {
    droppableNodeRefSetter(ref)
    droppableNodeRef.current = ref
  }

  return (
    <div ref={setDroppableNodeRef} style={{ position: 'relative' }}>
      <DragPositionIndicator
        dragPosition={calcDragPosition(isOver, elY, elH)}
      />
      <div
        ref={draggableNodeRefSetter}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...draggableAttrs}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...draggableListeners}
      >
        {children}
      </div>
    </div>
  )
}
