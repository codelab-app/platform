import { DragPosition } from '@codelab/shared/abstract/core'
import React from 'react'

export interface DragPositionIndicatorProps {
  dragPosition?: DragPosition
}

export const DragPositionIndicator = ({
  dragPosition,
}: DragPositionIndicatorProps) => {
  // TODO: refactor -> remove inline css and refactor class
  return (
    <div
      className={
        dragPosition === DragPosition.Before
          ? 'before'
          : dragPosition === DragPosition.After
          ? 'after'
          : ''
      }
      tw="absolute inset-0"
    >
      {/* <span
        style={{
          // display: dragPosition === undefined ? 'none' : 'inline-block',
          position: 'absolute',
          top: 0,
          left: 0,
          background: 'red',
          zIndex: 1,
        }}
      >
        drag here
      </span> */}

      <style jsx>{`
        .before:before {
          content: 'drag here';
          position: absolute;
          text-align: center;
          top: 0;
          left: 0;
          right: 0;
          height: 8px;
          background: cyan;
          border-radius: 6px;
          z-index: 1;
        }
        .after:after {
          content: 'drag here';
          text-align: center;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 8px;
          background: cyan;
          border-radius: 6px;
          z-index: 1;
        }
      `}</style>
    </div>
  )
}
