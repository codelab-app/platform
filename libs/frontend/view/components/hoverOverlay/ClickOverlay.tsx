import { isServer } from '@codelab/shared/config'
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

  return <OverlayToolbar overlayElement={element}>{content}</OverlayToolbar>
}
