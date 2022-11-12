import React from 'react'
import { DraggableElement, SortableItemProps } from './DraggableElement'

export const DraggableElementWrapper = ({
  children,
  element,
}: SortableItemProps) => {
  if (!element.parentElement) {
    // eslint-disable-next-line react/jsx-no-useless-fragment
    return <>{children}</>
  }

  return Array.isArray(children) ? (
    <>
      {children.map((child) => (
        <DraggableElement children={child} element={element} key={child.key} />
      ))}
    </>
  ) : (
    <DraggableElement children={children} element={element} />
  )
}
