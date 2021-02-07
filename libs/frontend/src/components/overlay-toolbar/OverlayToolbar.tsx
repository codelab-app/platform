import React, { CSSProperties, RefObject } from 'react'
import { useRecoilState } from 'recoil'
import useResizeObserver from 'use-resize-observer/polyfilled'
import { useScroll } from '../../utils/useScroll'
import { overlayToolbarState } from './overlayToolbarState'

interface Props<TMD> {
  content?: React.ReactNode | ((metadata: TMD) => React.ReactElement)
  overlayId: string
  containerProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
  toolbarProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
}

export const OverlayToolbar = <TMD extends any>({
  content,
  overlayId,
  containerProps: {
    className: containerClassName,
    style: containerStyle,
    ...containerProps
  } = {},
  toolbarProps: { style: toolbarStyle, ...toolbarProps } = {},
}: Props<TMD>) => {
  const [{ overlayElement, metadata }] = useRecoilState(
    overlayToolbarState(overlayId),
  )

  let element: HTMLElement | null | undefined

  if (overlayElement) {
    if (Object.hasOwnProperty.call(overlayElement, 'current')) {
      element = (overlayElement as RefObject<HTMLElement>).current
    } else {
      element = overlayElement as HTMLElement
    }
  }

  // Make sure we re-render when the element changes its size and when we scroll
  // But we don't actually care about the values, we take what we nee from getBoundingClientRect
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

  let contentElement

  if (content) {
    if (typeof content === 'function') {
      contentElement = content(metadata)
    } else {
      contentElement = content
    }
  }

  return (
    <div
      className={`overlay-toolbar ${containerClassName || ''}`}
      style={style}
      {...containerProps}
    >
      {element && contentElement && (
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
          {...toolbarProps}
        >
          {contentElement}
        </div>
      )}
    </div>
  )
}
