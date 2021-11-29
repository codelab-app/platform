import React from 'react'
import { querySelectorRenderedElement } from '../../renderer'
import { OverlayToolbar } from './OverlayToolbar'

interface Props {
  nodeId?: string
  content?: React.ReactNode
}

export const HoverOverlay = ({ nodeId, content }: Props) => {
  if (!nodeId || !document) {
    return null
  }

  const element = querySelectorRenderedElement(nodeId)

  if (!element) {
    return null
  }

  return (
    <OverlayToolbar
      overlayElement={element}
      containerProps={{
        style: {
          border: '1px solid rgb(41, 205, 255)',
        },
      }}
      toolbarProps={{
        style: {
          background: 'transparent',
          color: 'rgb(41, 205, 255)',
        },
      }}
      content={<div>{content}</div>}
    />
  )
}
