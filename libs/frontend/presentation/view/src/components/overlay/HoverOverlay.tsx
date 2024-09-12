import type { CSSProperties } from 'react'
import { useEffect, useMemo, useState } from 'react'
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
      borderRadius: '3px',
      bottom: `${rect.bottom}px`,

      height: `${rect.height}px`,
      left: `${rect.left - containerRect.left}px`,
      outline: '2px solid #43669A',
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
