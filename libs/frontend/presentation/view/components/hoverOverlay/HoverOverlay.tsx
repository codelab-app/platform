import type { CSSProperties } from 'react'
import React, { useEffect, useMemo, useState } from 'react'
import type { HoverOverlayProps } from './overlay.interface'

export const HoverOverlay = ({
  element,
  renderContainer,
}: HoverOverlayProps) => {
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
      border: '1px solid black',
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
    [containerRect, rect],
  )

  return <div style={rootStyle}></div>
}
