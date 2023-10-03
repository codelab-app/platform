import React from 'react'

export const ElementDragOverlay = (
  children: Array<React.ReactElement> | React.ReactElement,
) => {
  return React.createElement('div', {
    children,
    style: {
      opacity: 0.3,
    },
  })
}
