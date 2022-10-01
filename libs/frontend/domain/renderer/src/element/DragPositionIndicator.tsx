import { DragPosition } from '@codelab/shared/abstract/core'
import React from 'react'

export interface DragPositionIndicatorProps {
  dragPosition?: DragPosition
}

export const DragPositionIndicator = ({
  dragPosition,
}: DragPositionIndicatorProps) => {
  return (
    <div
      style={{
        display: dragPosition !== undefined ? 'block' : 'none',
        position: 'absolute',
        background: 'cyan',
        height: '8px',
        width: '100%',
        zIndex: 1,
        top: dragPosition === DragPosition.Before ? 0 : 'auto',
        bottom: dragPosition === DragPosition.After ? 0 : 'auto',
      }}
    ></div>
  )
}
