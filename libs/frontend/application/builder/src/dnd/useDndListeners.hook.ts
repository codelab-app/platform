import {
  type IElementModel,
  RendererType,
} from '@codelab/frontend/abstract/domain'
import { BuilderDndType } from '@codelab/frontend/abstract/domain'
import { queryRenderedElementById } from '@codelab/frontend/application/renderer'
import type { Nullable } from '@codelab/shared/abstract/types'
import { useDraggable, useDroppable } from '@dnd-kit/core'
import React, { useCallback, useEffect } from 'react'

let htmlElement: Nullable<HTMLElement>

export const useDndListeners = (
  element: IElementModel,
  rendererType: RendererType,
) => {
  // Create a draggable for the element
  const {
    attributes: draggableAttrs,
    listeners: draggableListeners,
    setNodeRef: draggableNodeRefSetter,
  } = useDraggable({
    data: {
      element,
      type: BuilderDndType.MoveElement,
    },
    id: element.id,
  })

  // Create a droppable for the element
  const { setNodeRef: droppableNodeRefSetter } = useDroppable({
    id: element.id,
  })

  // Set node ref for both draggable and droppable element and mouse hooks
  const setDraggableAndDroppableNodeRef = useCallback(
    (ref: Nullable<HTMLElement>) => {
      draggableNodeRefSetter(ref)
      droppableNodeRefSetter(ref)
    },
    [],
  )

  useEffect(() => {
    htmlElement = queryRenderedElementById(element.id)
    setDraggableAndDroppableNodeRef(htmlElement as HTMLElement)
  }, [element, setDraggableAndDroppableNodeRef])

  if (
    element.parentComponent ||
    (rendererType !== RendererType.PageBuilder &&
      rendererType !== RendererType.ComponentBuilder)
  ) {
    // if an element is part of a component
    // or we're not in the page or component builder mode
    // then don't make the element draggable or droppable
    return {}
  }

  return {
    ...draggableAttrs,
    ...draggableListeners,
  }
}
