import { NodeA } from '@codelab/frontend/shared'
import React from 'react'
import { OverlayToolbar } from '..'

export const DROP_OVERLAY_ID = 'dropOverlay'

export const DropOverlay = () => {
  return (
    <OverlayToolbar<NodeA>
      overlayId={DROP_OVERLAY_ID}
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
        return <div style={{ textAlign: 'center' }}>Drop here</div>
      }}
    />
  )
}
