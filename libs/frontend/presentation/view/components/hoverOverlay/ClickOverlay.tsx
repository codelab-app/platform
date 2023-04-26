import { isServer } from '@codelab/shared/infra/config'
import React from 'react'
import type { OverlayProps } from './overlay.interface'
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

  return (
    <OverlayToolbar
      containerProps={{
        style: {
          border: '1px solid rgb(7, 62, 78)',
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
