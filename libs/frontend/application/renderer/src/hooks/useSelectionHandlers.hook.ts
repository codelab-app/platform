import type { IRuntimeElementModel } from '@codelab/frontend/abstract/application'
import {
  RendererType,
  runtimeElementRef,
} from '@codelab/frontend/abstract/application'
import { useApplicationStore } from '@codelab/frontend-infra-mobx/context'
import { type MouseEvent, useCallback } from 'react'

/**
 * Provides interactions handlers for builder elements like selecting and hovering.
 */
let lastEditedElement: IRuntimeElementModel | undefined

export const useSelectionHandlers = (
  runtimeElement: IRuntimeElementModel,
  rendererType: RendererType,
) => {
  const { builderService } = useApplicationStore()

  const handleClick = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation()

      if (
        lastEditedElement &&
        lastEditedElement.compositeKey !== runtimeElement.compositeKey
      ) {
        lastEditedElement.element.current.setIsTextContentEditable(false)
      }

      builderService.selectElement(runtimeElement)
    },
    [builderService, runtimeElement],
  )

  const handleDoubleClick = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation()

      runtimeElement.element.current.setIsTextContentEditable(true)
      lastEditedElement = runtimeElement
    },
    [runtimeElement],
  )

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation()

      const hoveredNode = builderService.hoveredNode?.current

      // To prevent continuous re-rendering when the mouse moves over the same element
      if (hoveredNode?.compositeKey === runtimeElement.compositeKey) {
        return
      }

      builderService.setHoveredNode(runtimeElementRef(runtimeElement))
    },
    [builderService, runtimeElement],
  )

  const handleMouseLeave = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation()

      builderService.setHoveredNode(null)
    },
    [builderService],
  )

  if (
    runtimeElement.element.current.parentComponent ||
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
