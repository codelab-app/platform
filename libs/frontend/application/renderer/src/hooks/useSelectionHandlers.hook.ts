import type { IRuntimeElementModel } from '@codelab/frontend/abstract/application'
import { RendererType } from '@codelab/frontend/abstract/application'
import { type MouseEvent, useCallback } from 'react'

/**
 * Provides interactions handlers for builder elements like selecting and hovering.
 */
let lastEditedElement: IRuntimeElementModel | undefined

export const useSelectionHandlers = (
  runtimeElement: IRuntimeElementModel,
  rendererType: RendererType,
  handleClickCb: (runtimeElement: IRuntimeElementModel) => void,
  handleHoverCb: (runtimeElement: IRuntimeElementModel | null) => void,
) => {
  const handleClick = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation()

      if (
        lastEditedElement &&
        lastEditedElement.compositeKey !== runtimeElement.compositeKey
      ) {
        lastEditedElement.element.current.setIsTextContentEditable(false)
      }

      handleClickCb(runtimeElement)
      // builderService.selectElementNode(runtimeElement)
    },
    [handleClickCb, runtimeElement],
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

      handleHoverCb(runtimeElement)

      /**
       * // To prevent continuous re-rendering when the mouse moves over the same element
      if (
        builderService.hoveredNode?.current.compositeKey ===
        runtimeElement.compositeKey
      ) {
        return
      }

      builderService.hoverElementNode(runtimeElement)
       */
    },
    [handleHoverCb, runtimeElement],
  )

  const handleMouseLeave = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation()

      handleHoverCb(null)

      //  builderService.hoverElementNode(null)
    },
    [handleHoverCb],
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
