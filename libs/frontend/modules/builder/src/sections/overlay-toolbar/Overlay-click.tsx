import React from 'react'
import { querySelectorRenderedElement } from '../../renderer'
import { OverlayToolbar } from './OverlayToolbar'

interface Props {
  nodeId?: string
  content?: React.ReactNode
}

export const ClickOverlay = ({ nodeId, content }: Props) => {
  if (!nodeId || !document) {
    return null
  }

  const element = querySelectorRenderedElement(nodeId)

  if (!element) {
    return null
  }

  return <OverlayToolbar overlayElement={element} content={content} />
}
