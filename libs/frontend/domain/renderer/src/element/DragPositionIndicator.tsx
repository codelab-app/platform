import { DragPosition } from '@codelab/shared/abstract/core'
import React from 'react'

export interface DragPositionIndicatorProps {
  dragPosition?: DragPosition
}

export const DragPositionIndicator = ({
  dragPosition,
}: DragPositionIndicatorProps) => {
  const classes = () => {
    if (dragPosition === DragPosition.Before) {
      return 'dragged before'
    } else if (dragPosition === DragPosition.After) {
      return 'dragged after'
    }

    return ''
  }

  // TODO: refactor -> remove inline css and refactor class
  return (
    <div className={classes()} tw="absolute inset-0">
      <style jsx>{`
        .dragged::before {
          content: 'drag here';
          position: absolute;
          text-align: center;
          left: 0;
          right: 0;
          height: 8px;
          background: cyan;
          border-radius: 6px;
          z-index: 1;
        }
        .dragged.after::before {
          bottom: 0;
        }
        .dragged.before::before {
          top: 0;
        }
      `}</style>
    </div>
  )
}
