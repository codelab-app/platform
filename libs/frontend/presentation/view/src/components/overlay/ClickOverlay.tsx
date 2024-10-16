import type { CSSProperties } from 'react'

import { useScroll, useScrollIntoView } from '@codelab/frontend/shared/utils'
import { useEffect, useMemo, useState } from 'react'
import { useDebounce } from 'react-use'
import useResizeObserver from 'use-resize-observer/polyfilled'

import type { OverlayProps } from './overlay.interface'

const TOOLBAR_HEIGHT = 30

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

  const containerObserver = useResizeObserver({ ref: renderContainer })
  const elementObserver = useResizeObserver({ ref: element })

  useScrollIntoView(element, renderContainer)
  useScroll()

  const [containerRect, setContainerRect] = useState(() =>
    renderContainer.getBoundingClientRect(),
  )

  const [rect, setRect] = useState(() => element.getBoundingClientRect())

  useEffect(() => {
    setRect(element.getBoundingClientRect())
    setContainerRect(renderContainer.getBoundingClientRect())
  }, [
    element,
    renderContainer,
    elementObserver.height,
    elementObserver.width,
    containerObserver.height,
    containerObserver.width,
    ...dependencies,
  ])

  useDebounce(
    () => {
      setRect(element.getBoundingClientRect())
      setContainerRect(renderContainer.getBoundingClientRect())
    },
    180,
    dependencies,
  )

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
      zIndex: 3,
    }),
    [containerRect, rect],
  )

  const isToolbarVisible = rect.top - containerRect.top > TOOLBAR_HEIGHT

  const toolbarStyle: CSSProperties = useMemo(() => {
    // align toolbar top if there is enough screen space,
    // otherwise align toolbar under the element
    const styleName = isToolbarVisible ? 'bottom' : 'top'

    return {
      alignItems: 'center',
      backgroundColor: '#43669A',
      borderRadius: isToolbarVisible ? '12px 12px 12px 0' : '0 12px 12px 12px',
      color: 'rgb(255, 255, 255)',
      display: 'flex',
      fontSize: '0.8rem',
      height: TOOLBAR_HEIGHT,
      justifyContent: 'center',
      marginLeft: '-2px',
      padding: '0.1rem 0.3rem 0.1rem 0.3rem',
      pointerEvents: 'auto',
      position: 'absolute',
      [styleName]: '100%',
    }
  }, [isToolbarVisible])

  return (
    <div id="builder-click-overlay" style={rootStyle}>
      {content && <div style={toolbarStyle}>{content}</div>}
    </div>
  )
}
