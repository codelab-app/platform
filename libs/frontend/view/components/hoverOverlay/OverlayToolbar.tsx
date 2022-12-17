import { useScroll } from '@codelab/frontend/shared/utils'
import type { CSSProperties, RefObject } from 'react'
import React from 'react'
import tw from 'twin.macro'
import useResizeObserver from 'use-resize-observer/polyfilled'

interface OverlayToolbarProps {
  children?: React.ReactNode
  containerProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
  toolbarProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
  overlayElement: HTMLElement | React.RefObject<HTMLElement>
}

/**
 * This is the overlay container that wraps elements in our builder view.
 *
 * Preview mode: Toggle whether listeners are passed down
 */
export const OverlayToolbar = ({
  children: content,
  overlayElement,
  containerProps: { className: containerClassName, style: containerStyle } = {},
  toolbarProps: { style: toolbarStyle, ...toolbarProps } = {},
}: OverlayToolbarProps) => {
  const element = Object.hasOwnProperty.call(overlayElement, 'current')
    ? (overlayElement as RefObject<HTMLElement>).current
    : (overlayElement as HTMLElement)

  // Make sure we re-render when the element changes its size and when we scroll
  // But we don't actually care about the values, we take what we need from getBoundingClientRect
  useResizeObserver({ ref: element })
  useScroll()

  // This is not very good for performance, if we can find a way to track movement with
  // IntersectionObserver and only update the rect then, it would be much better
  const rect = element?.getBoundingClientRect()

  const style: CSSProperties =
    element && rect
      ? {
          pointerEvents: 'none',
          position: 'fixed',
          width: `${rect.width}px`,
          height: `${rect.height}px`,
          bottom: `${rect.bottom}px`,
          left: `${rect.left}px`,
          top: `${rect.top}px`,
          right: `${rect.right}px`,
          border: '2px solid rgb(41, 205, 255)',
          ...(containerStyle || {}),
        }
      : {}

  return (
    <div
      className={`overlay-toolbar ${containerClassName || ''}`}
      css={tw`z-50`}
      style={style}
    >
      {element && content && (
        <div
          style={{
            pointerEvents: 'auto',
            position: 'absolute',
            bottom: '100%',
            backgroundColor: 'rgb(41, 205, 255)',
            padding: '0.1rem 0.3rem 0.1rem 0.3rem',
            marginLeft: '-2px',
            fontSize: '0.8rem',
            color: 'white',
            ...(toolbarStyle || {}),
          }}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...toolbarProps}
        >
          {content}
        </div>
      )}
    </div>
  )
}
