import React from 'react'
import type { DraggableElementProps } from './DraggableElement'
import { DraggableElement } from './DraggableElement'

export const DraggableElementWrapper = ({
  element,
  makeRenderedElements,
}: DraggableElementProps) => {
  if (!element.parent) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{makeRenderedElements()}</>
  }

  return (
    <DraggableElement
      element={element}
      makeRenderedElements={makeRenderedElements}
    />
  )
}
