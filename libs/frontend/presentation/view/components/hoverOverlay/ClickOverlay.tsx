import { useScroll } from '@codelab/frontend/shared/utils'
import React from 'react'
import useResizeObserver from 'use-resize-observer/polyfilled'
import type { OverlayProps } from './overlay.interface'
import { OverlayToolbar } from './OverlayToolbar'

export const ClickOverlay = ({
  content,
  element,
  renderContainerRef,
}: OverlayProps) => {
  // Make sure we re-render overlay when:
  // - element is resized
  // - the page is resized
  // - the content is scrolled
  useResizeObserver({ ref: element })
  useResizeObserver({ ref: renderContainerRef.current })
  useScroll()

  const elementRect = element.getBoundingClientRect()

  return (
    <OverlayToolbar
      containerProps={{
        style: {
          border: '1px solid rgb(7, 62, 78)',
          maxHeight: '765px',
          top: `${elementRect.height > 765 ? 155 : elementRect.top}px`,
        },
      }}
      overlayElement={element}
      toolbarProps={{
        style: {
          background: 'rgb(7, 62, 78)',
          color: 'rgb(255, 255, 255)',
        },
      }}
    >
      {content}
    </OverlayToolbar>
  )
}
