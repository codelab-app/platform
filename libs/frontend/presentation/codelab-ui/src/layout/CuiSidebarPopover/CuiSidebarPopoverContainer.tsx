import { observer } from 'mobx-react-lite'
import type { PropsWithChildren, RefObject } from 'react'
import React, { useEffect, useState } from 'react'
import { useCui } from '../../core'

export interface CuiSidebarPopoverContainerProps {
  anchorRef: RefObject<HTMLElement | null>
}

export const CuiSidebarPopoverContainer = observer(
  ({
    anchorRef,
    children,
  }: PropsWithChildren<CuiSidebarPopoverContainerProps>) => {
    const { popover } = useCui()
    const [top, setTop] = useState(0)
    const [left, setLeft] = useState(0)

    useEffect(() => {
      const anchor = anchorRef.current

      if (!anchor) {
        return
      }

      const { right: anchorLeft, top: anchorTop } =
        anchor.getBoundingClientRect()

      setTop(anchorTop)
      setLeft(anchorLeft + 3)

      // Create a new ResizeObserver instance and provide a callback function
      const resizeObserver = new ResizeObserver(() => {
        const { right: newAchnorLeft, top: newAnchorTop } =
          anchor.getBoundingClientRect()

        setTop(newAnchorTop)
        setLeft(newAchnorLeft + 3)
      })

      // Start observing the element
      resizeObserver.observe(anchor)

      return () => {
        resizeObserver.unobserve(anchor)
      }
    }, [anchorRef])

    return (
      <div
        className="
      w-1/5
      flex-col
      justify-start
      border-0
      border-r-2
      border-solid
      border-gray-300
      bg-white
      "
        style={{
          display: popover.isAnyPopoverOpen() ? 'flex' : 'none',
          inset: `${top}px 0px 0px ${left}px`,
          position: 'absolute',
          zIndex: 1000,
        }}
      >
        {children}
      </div>
    )
  },
)
