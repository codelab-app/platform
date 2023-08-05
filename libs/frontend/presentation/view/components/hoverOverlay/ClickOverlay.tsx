import { useScroll, useScrollIntoView } from '@codelab/frontend/shared/utils'
import type { CSSProperties } from 'react'
import React, { useEffect, useState } from 'react'
import useResizeObserver from 'use-resize-observer/polyfilled'
import type { OverlayProps } from './overlay.interface'

export const ClickOverlay = ({
  content,
  element,
  renderContainer,
}: OverlayProps) => {
  // Make sure we re-render overlay when:
  // - element is resized
  // - the page is resized
  // - the content is scrolled
  useResizeObserver({ ref: element })
  useResizeObserver({ ref: renderContainer })
  useScrollIntoView(element, renderContainer)
  useScroll()

  const [containerRect, setContainerRect] = useState(() =>
    renderContainer.getBoundingClientRect(),
  )

  const [rect, setRect] = useState(() => element.getBoundingClientRect())

  useEffect(() => {
    setRect(element.getBoundingClientRect())
    setContainerRect(renderContainer.getBoundingClientRect())
  }, [element, renderContainer])

  const style: CSSProperties = {
    border: '1px solid rgb(7, 62, 78)',
    bottom: `${rect.bottom}px`,
    height: `${rect.height}px`,
    left: `${rect.left - containerRect.left}px`,
    pointerEvents: 'none',
    position: 'fixed',
    right: `${rect.right}px`,
    top: `${rect.top - containerRect.top}px`,
    width: `${rect.width}px`,
  }

  const isToolbarVisible = rect.top - containerRect.top > 0

  return (
    <div className="z-50" style={style}>
      {content && (
        <div
          style={{
            backgroundColor: 'rgb(7, 62, 78)',
            bottom: isToolbarVisible ? '100%' : '',
            color: 'rgb(255, 255, 255)',
            fontSize: '0.8rem',
            marginLeft: '-2px',
            padding: '0.1rem 0.3rem 0.1rem 0.3rem',
            pointerEvents: 'auto',
            position: 'absolute',
          }}
        >
          {content}
        </div>
      )}
    </div>
  )
}
