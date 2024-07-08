'use client'

import { useEffect, useState } from 'react'
import { useCui } from '../../core'
import type { CuiSidebarPopoverLayoutProps } from './CuiSidebarPopoverLayout'

export const useCuiSidebarPopover = ({
  popoverAnchorRef,
}: CuiSidebarPopoverLayoutProps) => {
  const { popover } = useCui()
  const [top, setTop] = useState(0)
  const [left, setLeft] = useState(0)

  useEffect(() => {
    const anchor = popoverAnchorRef.current

    if (!anchor) {
      return
    }

    const { right: anchorLeft, top: anchorTop } = anchor.getBoundingClientRect()

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
  }, [popoverAnchorRef])

  return { left, popover, top }
}
