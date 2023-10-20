import type { CSSProperties } from 'react'
import React, { useEffect, useMemo, useState } from 'react'
import type { DragDropOverlayProps } from './overlay.interface'

export const DragDropOverlay = ({
  dropPosition,
  element,
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
      backgroundColor: dropPosition === 'inside' ? '#91caff77' : 'transparent',
      borderBottomWidth: dropPosition === 'bottom' ? '10px' : '0',
      borderColor: '#91caff',
      borderLeftWidth: dropPosition === 'left' ? '10px' : '0',
      borderRightWidth: dropPosition === 'right' ? '10px' : '0',
      borderStyle: 'solid',
      borderTopWidth: dropPosition === 'top' ? '10px' : '0',
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
    [containerRect, rect, dropPosition],
  )

  return <div style={rootStyle}></div>
}
