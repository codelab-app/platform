import { RendererType } from '@codelab/frontend/abstract/application'
import type { IElementModel } from '@codelab/frontend/abstract/domain'
import { useStore } from '@codelab/frontend/application/shared/store'
import { type MouseEvent, useCallback } from 'react'

/**
 * Provides interactions handlers for builder elements like selecting and hovering.
 */
let lastEditedElement: IElementModel | undefined

export const useSelectionHandlers = (
  element: IElementModel,
  rendererType: RendererType,
) => {
  const { builderService } = useStore()

  const handleClick = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation()

      if (lastEditedElement && lastEditedElement.id !== element.id) {
        lastEditedElement.setIsTextContentEditable(false)
      }

      builderService.selectElementNode(element)
    },
    [builderService, element],
  )

  const handleDoubleClick = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation()

      element.setIsTextContentEditable(true)
      lastEditedElement = element
    },
    [element],
  )

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation()

      // To prevent continuous re-rendering when the mouse moves over the same element
      if (builderService.hoveredNode?.id === element.id) {
        return
      }

      builderService.hoverElementNode(element)
    },
    [builderService, element],
  )

  const handleMouseLeave = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation()

      builderService.hoverElementNode(null)
    },
    [builderService],
  )

  if (
    element.parentComponent ||
    (rendererType !== RendererType.PageBuilder &&
      rendererType !== RendererType.ComponentBuilder)
  ) {
    // if an element is part of a component
    // or we're not in the builder mode
    // then don't make it selectable or hoverable
    return {}
  }

  return {
    onClick: handleClick,
    onDoubleClick: handleDoubleClick,
    onMouseLeave: handleMouseLeave,
    onMouseMove: handleMouseMove,
  }
}
