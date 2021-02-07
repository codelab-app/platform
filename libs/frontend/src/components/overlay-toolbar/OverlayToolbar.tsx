import React, { CSSProperties, RefObject } from 'react'
import { useRecoilState } from 'recoil'
import useResizeObserver from 'use-resize-observer/polyfilled'
import { useScroll } from '../../utils/useScroll'
import { overlayToolbarState } from './overlayToolbarState'

interface OverlayToolbarProps<TMetaData> {
  content?: React.ReactNode | ((metadata: TMetaData) => React.ReactElement)
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

export const OverlayToolbar = <TMetaData extends any>({
  content,
  overlayId,
  containerProps: {
    className: containerClassName,
    style: containerStyle,
    ...containerProps
  } = {},
  toolbarProps: { style: toolbarStyle, ...toolbarProps } = {},
}: OverlayToolbarProps<TMetaData>) => {
  const [{ overlayElement, metadata }] = useRecoilState(
    overlayToolbarState(overlayId),
  )

  let element: HTMLElement | null | undefined

  console.log(overlayElement)

  if (overlayElement) {
    element = Object.hasOwnProperty.call(overlayElement, 'current')
      ? (overlayElement as RefObject<HTMLElement>).current
      : (overlayElement as HTMLElement)
  }

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

  let contentElement

  if (content) {
    contentElement = typeof content === 'function' ? content(metadata) : content
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
