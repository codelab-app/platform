import type { BuilderDropData, IElement } from '@codelab/frontend/abstract/core'
import { BuilderDndType } from '@codelab/frontend/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import { useDraggable, useDroppable } from '@dnd-kit/core'
import React from 'react'
import { calcDragPosition, useElementLayout } from './draggableElement.util'
import { DragPositionIndicator } from './DragPositionIndicator'
import { ElementDragOverlay } from './ElementDragOverlay'

export interface DraggableElementProps {
  element: IElement
  children: React.ReactElement | Array<React.ReactElement>
}

export const DraggableElement = ({
  element,
  children,
}: DraggableElementProps) => {
  const droppableNodeRef = React.useRef<Nullable<HTMLElement>>(null)
  const elLayout = useElementLayout(droppableNodeRef)

  // Create a draggable for the element
  const {
    attributes: draggableAttrs,
    listeners: draggableListeners,
    setNodeRef: draggableNodeRefSetter,
  } = useDraggable({
    id: element.id,
    data: {
      type: BuilderDndType.MoveElement,
      overlayRenderer: () => ElementDragOverlay(children),
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
      dragPosition: calcDragPosition(
        isOver,
        elLayout.current.relativeMousePosition?.y ?? 0,
        elLayout.current.size?.h ?? 0,
      ),
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
        dragPosition={calcDragPosition(
          isOver,
          elLayout.current.relativeMousePosition?.y ?? 0,
          elLayout.current.size?.h ?? 0,
        )}
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
