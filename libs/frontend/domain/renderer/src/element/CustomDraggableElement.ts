import { IElement, IElementService } from '@codelab/frontend/abstract/core'
import React, { Fragment } from 'react'

export interface DraggableElementProps {
  element: IElement
  elementService: IElementService
  children: any
}

export enum DropPosition {
  Before,
  After,
}

export const CustomDraggableElement = (props: DraggableElementProps) => {
  const { element, elementService, children } = props
  let dragType = DropPosition.After
  const [draggedOver, setDraggedOver] = React.useState(false)

  const onDragStart = (event: DragEvent) => {
    event.stopPropagation()

    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'copy'
      event.dataTransfer.effectAllowed = 'copy'
      event.dataTransfer.setData('draggedElementId', element.id)
      event.dataTransfer.setData('dragType', 'create')
    }
  }

  const onDrop = async (event: DragEvent) => {
    event.preventDefault()
    event.stopPropagation()

    const droppedElementId = event.dataTransfer?.getData(
      'draggedElementId',
    ) as string

    if (!droppedElementId) {
      return
    }

    // Element is not dropped on itself
    if (droppedElementId !== element.id) {
      await elementService.handleElementDrop({
        droppedElementId,
        targetElementId: element.id,
        // dropPosition: dragType,
      })
    }

    const targetElement = document.getElementById(element.id)

    if (targetElement) {
      targetElement.style.border = 'none'
      targetElement.style.border = '2px dahsed #e3e3e3'
    }
  }

  const onDragOver = (event: DragEvent) => {
    // event.preventDefault()
    event.stopPropagation()

    const targetElement = document.getElementById(element.id)
    setDraggedOver(true)

    if (targetElement) {
      const rect = targetElement.getBoundingClientRect()
      const dropOffsetOnTargetElement = event.clientY - rect.top

      targetElement.style.border = '2px dashed #e3e3e3'

      if (dropOffsetOnTargetElement <= targetElement.clientHeight / 2) {
        targetElement.style.borderTop = '5px dashed red'
        dragType = DropPosition.Before
      } else {
        targetElement.style.borderBottom = '5px dashed red'
        dragType = DropPosition.After
      }
    }
  }

  const onDragLeave = (event: DragEvent) => {
    event.preventDefault()
    event.stopPropagation()
    setDraggedOver(false)
    console.log('leave ====')

    const draggedOverElement = document.getElementById(element.id)

    if (draggedOverElement) {
      draggedOverElement.style.border = '2px dashed #e3e3e3'
    }
  }

  const onDragEnd = (event: DragEvent) => {
    event.preventDefault()
    event.stopPropagation()

    const draggedOverElement = document.getElementById(element.id)

    if (draggedOverElement) {
      draggedOverElement.style.border = '2px dashed #e3e3e3'
    }
  }

  const draggableWrapperComponent: any = React.createElement('div', {
    id: element.id,
    style: {
      border: draggedOver ? '4px solid #e3e3e3' : 'none',
      // transform:  'scale(0.8)' : 'scale(1)',
    },
    draggable: true,
    onDragStart,
    onDrop,
    onDragOver,
    onDragLeave,
    onDragEnd,
    children: Array.isArray(children)
      ? React.createElement(Fragment, {}, children)
      : children,
  })

  const isRootElement = !element.parentElement

  // TODO: refactor
  if (isRootElement) {
    return !isRootElement
      ? draggableWrapperComponent
      : Array.isArray(children)
      ? React.createElement(Fragment, {}, children)
      : children
  }

  return draggableWrapperComponent
}
