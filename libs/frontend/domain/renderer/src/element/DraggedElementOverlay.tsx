import React from 'react'

export const DraggedElementOverlay = (
  children: React.ReactElement | Array<React.ReactElement>,
) => {
  return React.createElement('div', {
    children,
    style: {
      opacity: 0.5,
    },
  })
}
