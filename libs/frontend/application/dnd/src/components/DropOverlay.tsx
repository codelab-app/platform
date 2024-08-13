import { useDndContext } from '@dnd-kit/core'
import React from 'react'
import { createPortal } from 'react-dom'
import { Rectangle } from '../geometry'

export const DROP_OVERLAY_ID = '__drop__overlay__'

export const DropOverlay = () => {
  const { active, over } = useDndContext()
  const currentRect = over?.rect || Rectangle.zeroRect()

  const style: React.CSSProperties = {
    background:
      'repeating-linear-gradient(45deg, #439A5620, #439A5620 0.5px, #ffffff00 2px, #ffffff00 4px)',
    borderRadius: '3px',
    display: over && active?.id !== over.id ? 'unset' : 'none',
    outline: '2px solid #439A56',
    position: 'absolute',
    zIndex: 998,
    ...currentRect,
  }

  return createPortal(<div id={DROP_OVERLAY_ID} style={style} />, document.body)
}
