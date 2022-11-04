import React from 'react'

export const ElementDragOverlay = (
  children: React.ReactElement | Array<React.ReactElement>,
) => {
  return React.createElement('div', {
    children,
    style: {
      opacity: 0.3,
    },
  })
}
