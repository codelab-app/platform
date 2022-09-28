import React from 'react'

export const DraggedElementOverlay = (children: any) => {
  return React.createElement('div', {
    children,
    style: {
      opacity: 0.5,
    },
  })
}
