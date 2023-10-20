import type { IDropPosition } from '@codelab/frontend/abstract/application'
import type {
  IAtomModel,
  IElementModel,
} from '@codelab/frontend/abstract/domain'
import { RendererType } from '@codelab/frontend/abstract/domain'
import { useStore } from '@codelab/frontend/application/shared/store'
import { createDragImage } from '@codelab/frontend/shared/utils'
import { useCallback } from 'react'
import { queryRenderedElementById } from './query-rendered-element-by-id'

let dropTargetElement: IElementModel | null
let draggedElement: IElementModel | null
let dropPosition: IDropPosition | 'forbidden'

export const useDragDropHandlers = (
  currentElement: IElementModel,
  rendererType: RendererType,
) => {
  const { atomService, builderService, elementService } = useStore()

  const dragStartHandler = useCallback(
    (event: React.DragEvent<HTMLElement>) => {
      // we stop propagation because we only want the event to be triggered on currently dragged element and not the parents
      event.stopPropagation()
      draggedElement = currentElement

      const target = event.target as HTMLElement
      // assign a specific class to the DOM element that is currently being dragged
      // so we can easily identify it later on
      target.classList.add('currently-dragged')
      // to provide a visual cue that the element is currently being dragged
      target.style.opacity = '0.2'

      // set drag image
      // drag image is something you see attached to the pointer while dragging
      event.dataTransfer.setDragImage(
        createDragImage(currentElement.name),
        5,
        5,
      )
      builderService.hoverElementNode(null)
    },
    [builderService, currentElement],
  )

  const dragOverHandler = useCallback(
    (event: React.DragEvent<HTMLElement>) => {
      event.preventDefault()
      // we stop propagation because we only want the event to be triggered on currently dragged element and not the parents
      event.stopPropagation()

      dropTargetElement = currentElement

      const parentElement =
        queryRenderedElementById(
          currentElement.closestParentElement?.id ?? '',
        ) ?? document.getElementById('render-root')

      if (!parentElement) {
        return
      }

      if (
        draggedElement?.id === dropTargetElement.id ||
        isDescendantOfCurrentlyDraggedElement(event.target as HTMLElement)
      ) {
        // we don't allow an element to be dropped on itself or its descendant
        dropPosition = 'forbidden'

        return
      }

      const dropTargetAtom = atomService.atomDomainService.atoms.get(
        dropTargetElement.renderType.id,
      )

      const draggedAtom = atomService.atomDomainService.atoms.get(
        draggedElement?.renderType.id ?? '',
      )

      dropPosition = detectDropPosition(
        event,
        parentElement,
        isDroppable(dropTargetAtom, draggedAtom),
      )

      builderService.dragOverElementNode(currentElement, dropPosition)
    },
    [builderService, atomService, currentElement],
  )

  const dragEndHandler = useCallback(
    (event: React.DragEvent<HTMLElement>) => {
      event.preventDefault()
      event.stopPropagation()

      const target = event.target as HTMLElement
      target.classList.remove('currently-dragged')
      target.style.opacity = '1'
      builderService.dragOverElementNode(null, 'inside')

      if (dropPosition === 'forbidden') {
        // we don't allow an element to be dropped on itself or its descendant
        return
      }

      // if (dropPosition === 'right' || dropPosition === 'bottom') {
      //   void moveElementService.moveElementAsNextSibling({
      //     element: { id: draggedElement?.id ?? '' },
      //     targetElement: { id: dropTargetElement?.id ?? '' },
      //   })
      // }

      // if (
      //   dropTargetElement?.prevSibling?.current.id !== draggedElement?.id &&
      //   (dropPosition === 'left' || dropPosition === 'top')
      // ) {
      //   if (dropTargetElement?.prevSibling?.current.id) {
      //     void moveElementService.moveElementAsNextSibling({
      //       element: { id: draggedElement?.id ?? '' },
      //       targetElement: { id: dropTargetElement.prevSibling.current.id },
      //     })
      //   } else {
      //     void moveElementService.moveElementAsFirstChild({
      //       element: { id: draggedElement?.id ?? '' },
      //       parentElement: {
      //         id: dropTargetElement?.parentElement?.current.id ?? '',
      //       },
      //     })
      //   }
      // }

      // if (dropPosition === 'inside') {
      //   void moveElementService.moveElementAsFirstChild({
      //     element: { id: draggedElement?.id ?? '' },
      //     parentElement: { id: dropTargetElement?.id ?? '' },
      //   })
      // }
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
  const target = findClosestDraggableElement(event.target as HTMLElement)
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

const isDroppable = (
  dropTargetAtom: IAtomModel | undefined,
  draggedAtom: IAtomModel | undefined,
) => {
  return true
  /**
   For now, all atoms are droppable.
   Basically, we will add a new field called "allowedChildren" to the atom schema.
   If the allowedChildren is empty, then any atoms can be dropped.
   If the allowedChildren has one or more atoms, then only those atoms can be dropped.
   We will implement the logic for this function later.
   Adding a new field to the schema in this PR would make the changes overwhelming
  */
}

const findClosestDraggableElement = (
  targetElement: HTMLElement,
): HTMLElement => {
  let draggableElement = targetElement as HTMLElement | null | undefined

  while (!draggableElement?.attributes.getNamedItem('draggable')?.value) {
    draggableElement = draggableElement?.parentElement
  }

  return draggableElement
}
