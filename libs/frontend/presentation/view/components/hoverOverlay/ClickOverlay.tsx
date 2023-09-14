import { useScroll, useScrollIntoView } from '@codelab/frontend/shared/utils'
import { useDebouncedEffect } from '@react-hookz/web'
import type { CSSProperties } from 'react'
import React, { useEffect, useMemo, useState } from 'react'
import useResizeObserver from 'use-resize-observer/polyfilled'
import type { OverlayProps } from './overlay.interface'

const TOOLBAR_HEIGHT = 20

export const ClickOverlay = ({
  content,
  dependencies,
  element,
  renderContainer,
}: OverlayProps) => {
  // Make sure we re-render overlay when:
  // - element is resized
  // - the page is resized
  // - the content is scrolled
  // - element css is updated, especially height, width, margin, padding
  // - element props is updated (some props may affect size and position when using 'auto')
  // - element order is changed (or element parent is changed)
  // - screen breakpoint is changed

  const { height, width } = useResizeObserver({ ref: renderContainer })
  useScrollIntoView(element, renderContainer)
  useScroll()

  const [containerRect, setContainerRect] = useState(() =>
    renderContainer.getBoundingClientRect(),
  )

  const [rect, setRect] = useState(() => element.getBoundingClientRect())

  useEffect(() => {
    setRect(element.getBoundingClientRect())
    setContainerRect(renderContainer.getBoundingClientRect())
  }, [element, renderContainer, height, width, ...dependencies])

  useDebouncedEffect(
    () => {
      setRect(element.getBoundingClientRect())
      setContainerRect(renderContainer.getBoundingClientRect())
    },
    dependencies,
    180,
  )

  const rootStyle: CSSProperties = useMemo(
    () => ({
      border: '1px solid rgb(7, 62, 78)',
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

  const isToolbarVisible = rect.top - containerRect.top > TOOLBAR_HEIGHT

  const toolbarStyle: CSSProperties = useMemo(() => {
    // align toolbar top if there is enough screen space,
    // otherwise align toolbar under the element
    const styleName = isToolbarVisible ? 'bottom' : 'top'

    return {
      backgroundColor: 'rgb(7, 62, 78)',
      color: 'rgb(255, 255, 255)',
      fontSize: '0.8rem',
      marginLeft: '-2px',
      padding: '0.1rem 0.3rem 0.1rem 0.3rem',
      pointerEvents: 'auto',
      position: 'absolute',
      [styleName]: '100%',
    }
  }, [isToolbarVisible])

  return (
    <div style={rootStyle}>
      {content && <div style={toolbarStyle}>{content}</div>}
    </div>
  )
}
