import React from 'react'
import { OverlayProps } from './overlay.interface'
// import { queryRenderedElementById } from '../../renderer'
import { OverlayToolbar } from './OverlayToolbar'

export const HoverOverlay = ({
  nodeId,
  content,
  getOverlayElement,
}: OverlayProps) => {
  if (!nodeId || !document) {
    return null
  }

  const element = getOverlayElement(nodeId)

  if (!element) {
    return null
  }

  return (
    <OverlayToolbar
      containerProps={{
        style: {
          border: '1px solid rgb(41, 205, 255)',
        },
      }}
      overlayElement={element}
      toolbarProps={{
        style: {
          background: 'transparent',
          color: 'rgb(41, 205, 255)',
        },
      }}
    >
      <div>{content}</div>
    </OverlayToolbar>
  )
}
