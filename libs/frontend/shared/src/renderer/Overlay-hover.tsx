import React from 'react'
import { OverlayToolbar } from '../components/overlay-toolbar/OverlayToolbar'
import { NodeA } from '../interfaces'

export const HOVER_OVERLAY_ID = 'hoverOverlay'

export const HoverOverlay = () => {
  return (
    <OverlayToolbar<NodeA>
      overlayId={HOVER_OVERLAY_ID}
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
      content={(n) => {
        return <div>{n?.type}</div>
      }}
    />
  )
}
