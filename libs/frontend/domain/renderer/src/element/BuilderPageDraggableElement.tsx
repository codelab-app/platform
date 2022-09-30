import {
  BuilderDndType,
  BuilderDropData,
  DragPosition,
  IElement,
} from '@codelab/shared/abstract/core'
import { useDraggable, useDroppable } from '@dnd-kit/core'
import React from 'react'
import { useMouse } from 'react-use'
import { DragPositionIndicator } from './DragPositionIndicator'

export interface SortableItemProps {
  element: IElement
  children: React.ReactElement | Array<React.ReactElement>
}

export const BuilderPageDraggableElement = ({
  element,
  children,
}: SortableItemProps) => {
  const droppableNodeRef = React.useRef<any>(null)
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
      overlayRenderer: () => <div tw="opacity-40">{children}</div>,
    },
  })

  // Create a droppable for the element
  const {
    setNodeRef: droppableNodeRefSetter,
    isOver,
    over,
  } = useDroppable({ id: element.id })

  const calcDragPosition = () => {
    if (!isOver) {
      return undefined
    }

    if (elY < elH / 2) {
      return DragPosition.Before
    }

    return DragPosition.After
  }

  if (isOver && over) {
    const dragData: BuilderDropData = {
      dragPosition: elY < elH / 2 ? DragPosition.Before : DragPosition.After,
    }

    over.data.current = {
      ...over.data.current,
      ...dragData,
    }
  }

  // Set node ref for both draggable element and mouse hook
  const setDroppableNodeRef = (ref: any) => {
    droppableNodeRefSetter(ref)
    droppableNodeRef.current = ref
  }

  return (
    <div ref={setDroppableNodeRef} tw="relative">
      <DragPositionIndicator dragPosition={calcDragPosition()} />
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
