import type { CSSProperties } from 'react'

import { useEffect, useMemo, useState } from 'react'
import useResizeObserver from 'use-resize-observer/polyfilled'

import type { MarginPaddingOverlayProps } from '../overlay.interface'
import type { ISpacingValues } from './shared'

import { Margins } from './Margins'
import { Paddings } from './Paddings'

export const MarginPaddingOverlay = ({
  element,
  renderContainer,
}: MarginPaddingOverlayProps) => {
  const [containerRect, setContainerRect] = useState(() =>
    renderContainer.getBoundingClientRect(),
  )

  const elementObserver = useResizeObserver({ ref: element })
  const [rect, setRect] = useState(() => element.getBoundingClientRect())
  const [margins, setMargins] = useState<ISpacingValues | null>(null)
  const [paddings, setPaddings] = useState<ISpacingValues | null>(null)

  useEffect(() => {
    setRect(element.getBoundingClientRect())
    setContainerRect(renderContainer.getBoundingClientRect())

    const {
      marginBottom,
      marginLeft,
      marginRight,
      marginTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
      paddingTop,
    } = window.getComputedStyle(element)

    setMargins({
      $bottom: marginBottom,
      $left: marginLeft,
      $right: marginRight,
      $top: marginTop,
    })

    setPaddings({
      $bottom: paddingBottom,
      $left: paddingLeft,
      $right: paddingRight,
      $top: paddingTop,
    })
  }, [element, renderContainer, elementObserver.height])

  const rootStyle: CSSProperties = useMemo(
    () => ({
      border: '0px solid blue',
      bottom: `${rect.bottom}px`,
      height: `${rect.height}px`,
      left: `${rect.left - containerRect.left}px`,
      pointerEvents: 'none',
      position: 'absolute',
      right: `${rect.right}px`,
      top: `${rect.top - containerRect.top}px`,
      width: `${rect.width}px`,
      zIndex: 2,
    }),
    [containerRect, rect],
  )

  if (!margins || !paddings) {
    return null
  }

  return (
    <div style={rootStyle}>
      <Margins values={margins} />
      <Paddings values={paddings} />
    </div>
  )
}
