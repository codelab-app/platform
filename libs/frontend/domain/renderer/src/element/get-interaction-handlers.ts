import type { IBuilderService, IElement } from '@codelab/frontend/abstract/core'
import type { MouseEvent } from 'react'

/**
 * Provides interactions handlers for builder elements like selecting and hovering.
 */
export const getInteractionHandlers = (
  builderService: IBuilderService,
  element: IElement,
) => {
  const handleClick = (event: MouseEvent) => {
    event.stopPropagation()

    builderService.selectElementNode(element)
  }

  const handleMouseMove = (event: MouseEvent) => {
    event.stopPropagation()

    // To prevent continuous re-rendering when the mouse moves over the same element
    if (builderService.hoveredNode?.id === element.id) {
      return
    }

    builderService.hoverElementNode(element)
  }

  const handleMouseLeave = (event: MouseEvent) => {
    event.stopPropagation()

    builderService.hoverElementNode(null)
  }

  if (element.parentComponent) {
    // if an element is part of a component then don't make it interactive
    return {}
  }

  return {
    onClick: handleClick,
    onMouseLeave: handleMouseLeave,
    onMouseMove: handleMouseMove,
  }
}
