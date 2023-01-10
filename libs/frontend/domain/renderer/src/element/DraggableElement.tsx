import type {
  BuilderDropData,
  IElement,
  IPropData,
} from '@codelab/frontend/abstract/core'
import { BuilderDndType, DragPosition } from '@codelab/frontend/abstract/core'
import type { Nullable } from '@codelab/shared/abstract/types'
import { useDraggable, useDroppable } from '@dnd-kit/core'
import React, { useEffect } from 'react'
import { calcDragPosition, useElementLayout } from './draggableElement.util'
import { ElementDragOverlay } from './ElementDragOverlay'

export interface DraggableElementProps {
  element: IElement
  makeRenderedElements: (
    props?: IPropData,
  ) => React.ReactElement | Array<React.ReactElement>
}

export const DraggableElement = ({
  element,
  makeRenderedElements,
}: DraggableElementProps) => {
  const droppableNodeRef = React.useRef<Nullable<HTMLElement>>(null)
  const { relativeY } = useElementLayout(droppableNodeRef.current)

  // Create a draggable for the element
  const {
    attributes: draggableAttrs,
    listeners: draggableListeners,
    setNodeRef: draggableNodeRefSetter,
  } = useDraggable({
    id: element.id,
    data: {
      type: BuilderDndType.MoveElement,
      overlayRenderer: () => ElementDragOverlay(renderedChildren),
    },
  })

  // Create a droppable for the element
  const {
    setNodeRef: droppableNodeRefSetter,
    isOver,
    over,
  } = useDroppable({ id: element.id })

  useEffect(() => {
    // This could be improved
    setTimeout(() => {
      const htmlElement = document.querySelector(
        `[data-element-id="${element.id}"]`,
      )

      setDraggableAndDroppableNodeRef(htmlElement as HTMLElement)
    }, 2000)
  }, [])

  const dragPosition = isOver
    ? calcDragPosition(relativeY ?? 0, over?.rect.height ?? 0)
    : undefined

  // Set dragPosition for DragEndEvent
  if (isOver && over) {
    const dragData: BuilderDropData = {
      dragPosition,
    }

    over.data.current = {
      ...over.data.current,
      ...dragData,
    }
  }

  // Set node ref for both draggable and droppable element and mouse hooks
  const setDraggableAndDroppableNodeRef = (ref: Nullable<HTMLElement>) => {
    draggableNodeRefSetter(ref)
    droppableNodeRefSetter(ref)
    droppableNodeRef.current = ref
  }

  const indicatorStyle = {
    boxShadow:
      dragPosition === DragPosition.After
        ? '0px 5px 0px cyan'
        : '0px -5px 0px cyan',
  }

  const renderedChildren = makeRenderedElements({
    ...draggableAttrs,
    ...draggableListeners,
    ...(isOver ? { style: indicatorStyle } : {}),
  })

  return Array.isArray(renderedChildren) ? (
    <>{renderedChildren.map((child) => child)}</>
  ) : (
    renderedChildren
  )
}
