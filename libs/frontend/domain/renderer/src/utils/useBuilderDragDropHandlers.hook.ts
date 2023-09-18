import type {
  IBuilderService,
  IDropPosition,
  IElement,
  IElementService,
} from '@codelab/frontend/abstract/core'
import { RendererType } from '@codelab/frontend/abstract/core'
import { createDragImage } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { isDroppable } from './is-droppable'
import { queryRenderedElementById } from './query-rendered-element-by-id'

let dropElement: IElement | null
let dragElement: IElement | null
let dropPosition: IDropPosition

export const useBuilderDragDropHandlers = (
  builderService: IBuilderService,
  elementService: IElementService,
  element: IElement,
  rendererType: RendererType,
) => {
  const dragStartHandler = useCallback(
    (event: React.DragEvent<HTMLElement>) => {
      // we stop propogation because we only want the event to be triggered on currenty dragged element and not the parents
      event.stopPropagation()
      dragElement = element

      const target = event.target as HTMLElement
      // assign a specific class to the DOM element that is currently being dragged
      // so we can easily identify it later on
      target.classList.add('currently-dragged')
      // to provide a visual cue that the element is currently being dragged
      target.style.opacity = '0.2'

      // set drag image
      // drag image is something you see attaced to the pointer while dragging
      event.dataTransfer.setDragImage(createDragImage(element.name), 5, 5)
      builderService.hoverElementNode(null)
    },
    [builderService, element],
  )

  const dragOverHandler = useCallback(
    (event: React.DragEvent<HTMLElement>) => {
      event.preventDefault()
      // we stop propogation because we only want the event to be triggered on currenty dragged element and not the parents
      event.stopPropagation()

      dropElement = element

      const parentElement =
        queryRenderedElementById(element.closestParent?.id ?? '') ??
        document.getElementById('render-root')

      if (!parentElement) {
        return
      }

      if (
        dragElement?.id === dropElement.id ||
        isDescendantOfCurrentlyDraggedElement(event.target as HTMLElement)
      ) {
        // we don't allow an element to be dropped on itself or its descendant
        return
      }

      dropPosition = detectDropPosition(
        event,
        parentElement,
        isDroppable(element.atomName),
      )

      builderService.dragOverElementNode(element, dropPosition)
    },
    [builderService, element],
  )

  const dragEndHandler = useCallback(
    (event: React.DragEvent<HTMLElement>) => {
      event.preventDefault()
      event.stopPropagation()

      const target = event.target as HTMLElement
      target.classList.remove('currently-dragged')
      target.style.opacity = '1'
      builderService.dragOverElementNode(null, 'inside')

      if (dropPosition === 'right' || dropPosition === 'bottom') {
        void elementService.moveElementAsNextSibling({
          element: { id: dragElement?.id ?? '' },
          targetElement: { id: dropElement?.id ?? '' },
        })
      }

      if (dropPosition === 'left' || dropPosition === 'top') {
        if (dropElement?.prevSibling?.current) {
          void elementService.moveElementAsNextSibling({
            element: { id: dragElement?.id ?? '' },
            targetElement: { id: dropElement.prevSibling.current.id },
          })
        } else {
          void elementService.moveElementAsFirstChild({
            element: { id: dragElement?.id ?? '' },
            parentElement: { id: dropElement?.parent?.current.id ?? '' },
          })
        }
      }

      if (dropPosition === 'inside') {
        void elementService.moveElementAsFirstChild({
          element: { id: dragElement?.id ?? '' },
          parentElement: { id: dropElement?.id ?? '' },
        })
      }
    },
    [builderService, elementService],
  )

  if (
    rendererType !== RendererType.PageBuilder &&
    rendererType !== RendererType.ComponentBuilder
  ) {
    // only allow dragging and dropping in page or component builder mode
    return {}
  }

  return {
    draggable: true,
    onDragEnd: dragEndHandler,
    onDragOver: dragOverHandler,
    onDragStart: dragStartHandler,
  }
}

const detectDropPosition = (
  event: React.DragEvent<HTMLElement>,
  parent: HTMLElement,
  isElementDroppable: boolean,
) => {
  const target = event.target as HTMLElement
  const rect = target.getBoundingClientRect()
  const divider = 8
  const closeToRight = rect.right - event.clientX <= rect.width / divider
  const closeToBottom = rect.bottom - event.clientY <= rect.height / divider
  const closeToLeft = event.clientX - rect.left <= rect.width / divider
  const closeToTop = event.clientY - rect.top <= rect.height / divider
  const parentStyle = window.getComputedStyle(parent)
  const parentIsBlock = parentStyle.display === 'block'
  const parentIsInlineBlock = parentStyle.display === 'inline-block'

  const parentIsFlexRow =
    parentStyle.display === 'flex' && parentStyle.flexDirection === 'row'

  const parentIsFlexColumn =
    parentStyle.display === 'flex' && parentStyle.flexDirection === 'column'

  if ((closeToTop || closeToLeft) && (parentIsBlock || parentIsFlexColumn)) {
    return 'top'
  }

  if ((closeToTop || closeToLeft) && (parentIsInlineBlock || parentIsFlexRow)) {
    return 'left'
  }

  if (
    (closeToBottom || closeToRight) &&
    (parentIsBlock || parentIsFlexColumn)
  ) {
    return 'bottom'
  }

  if (
    (closeToBottom || closeToRight) &&
    (parentIsInlineBlock || parentIsFlexRow)
  ) {
    return 'right'
  }

  // use these 3 default positions if none of the above conditions match
  if (isElementDroppable) {
    return 'inside'
  } else if (parentIsFlexRow || parentIsInlineBlock) {
    return 'right'
  } else {
    return 'bottom'
  }
}

const isDescendantOfCurrentlyDraggedElement = (element: HTMLElement) => {
  return Boolean(element.closest(`.currently-dragged`))
}
