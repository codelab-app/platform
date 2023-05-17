import { isServer } from '@codelab/shared/config'
import React from 'react'
import type { OverlayProps } from './Overlay.Interface'
import { OverlayToolbar } from './OverlayToolbar'

export const ClickOverlay = ({
  content,
  getOverlayElement,
  nodeId,
}: OverlayProps) => {
  if (!nodeId || isServer) {
    return null
  }

  const element = getOverlayElement(nodeId)

  if (!element) {
    return null
  }

  const elementRect = element.getBoundingClientRect()

  return (
    <OverlayToolbar
      containerProps={{
        style: {
          border: '1px solid rgb(7, 62, 78)',
          maxHeight: '765px',
          top: `${elementRect.height > 765 ? 155 : elementRect.top}px`,
        },
      }}
      overlayElement={element}
      toolbarProps={{
        style: {
          background: 'rgb(7, 62, 78)',
          color: 'rgb(255, 255, 255)',
        },
      }}
    >
      {content}
    </OverlayToolbar>
  )
}
