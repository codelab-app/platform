import type { CSSProperties } from 'react'
import React, { useEffect, useMemo, useState } from 'react'
import type { DragDropOverlayProps } from './overlay.interface'
import { DragPosition } from '@codelab/frontend/abstract/domain'

export const DragDropOverlay = ({
  element,
  position,
  renderContainer,
}: DragDropOverlayProps) => {
  const [containerRect, setContainerRect] = useState(() =>
    renderContainer.getBoundingClientRect(),
  )

  const [rect, setRect] = useState(() => element.getBoundingClientRect())

  useEffect(() => {
    setRect(element.getBoundingClientRect())
    setContainerRect(renderContainer.getBoundingClientRect())
  }, [element, renderContainer])

  const rootStyle: CSSProperties = useMemo(
    () => ({
      backgroundColor:
        position === DragPosition.Inside ? '#91caff77' : 'transparent',
      borderBottomWidth: position === DragPosition.Bottom ? '10px' : '0',
      borderColor: '#91caff',
      borderLeftWidth: position === DragPosition.Before ? '10px' : '0',
      borderRightWidth: position === DragPosition.After ? '10px' : '0',
      borderStyle: 'solid',
      borderTopWidth: position === DragPosition.Top ? '10px' : '0',
      bottom: `${rect.bottom}px`,
      height: `${rect.height}px`,
      left: `${rect.left - containerRect.left}px`,
      pointerEvents: 'none',
      position: 'fixed',
      right: `${rect.right}px`,
      top: `${rect.top - containerRect.top}px`,
      width: `${rect.width}px`,
      zIndex: 2,
    }),
    [containerRect, rect, position],
  )

  return <div style={rootStyle}></div>
}
