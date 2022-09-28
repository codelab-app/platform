import { IElement } from '@codelab/frontend/abstract/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import React from 'react'
import { DraggedElementOverlay } from './DraggedElementOverlay'
// import { SortableList } from './SortableList'

export interface SortableItemProps {
  element: IElement
  children: React.ReactElement | Array<React.ReactElement>
}

export const SortableItem = (props: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.element.id,
      data: {
        renderDragOverlay: () => DraggedElementOverlay(props.children),
      },
    })

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    border: '4px solid red',
  }

  //   if (Array.isArray(props.children)) {
  //     console.log('is array ==================')
  //     return SortableList({ element: props.element, children: props.children })
  //   }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {props.children}
    </div>
  )
}
