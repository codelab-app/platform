import type { ReactNode, RefObject } from 'react'
import React, { useEffect, useState } from 'react'
import type { CuiSidebarToolbarProps } from '../../views'
import { CuiSidebarPopoverHeader } from './CuiSidebarPopoverHeader'

export interface CuiSidebarPopoverProps {
  content: ReactNode
  label: string
  open: boolean
  originRef: RefObject<HTMLElement | null>
  toolbar?: CuiSidebarToolbarProps
}

export const CuiSidebarPopover = ({
  content,
  label,
  open,
  originRef,
  toolbar,
}: CuiSidebarPopoverProps) => {
  const [top, setTop] = useState(0)
  const [left, setLeft] = useState(0)

  useEffect(() => {
    const origin = originRef.current

    if (!origin) {
      return
    }

    const { right: originLeft, top: originTop } = origin.getBoundingClientRect()

    setTop(originTop)
    setLeft(originLeft + 5)

    // Create a new ResizeObserver instance and provide a callback function
    const observer = new ResizeObserver(() => {
      const { right: newOriginLeft, top: newOriginTop } =
        origin.getBoundingClientRect()

      setTop(newOriginTop)
      setLeft(newOriginLeft + 5)
    })

    // Start observing the element
    observer.observe(origin)

    return () => {
      observer.unobserve(origin)
    }
  }, [originRef])

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
        display: open ? 'flex' : 'none',
        inset: `${top}px 0px 0px ${left}px`,
        position: 'absolute',
        zIndex: 1000,
      }}
    >
      <CuiSidebarPopoverHeader label={label} toolbar={toolbar} />
      <div
        className="
        box-border
        flex
        h-full
        grow
        flex-col
        justify-start
        overflow-y-auto
        overflow-x-hidden
        bg-white
        p-2
        align-middle
      "
      >
        {content}
      </div>
    </div>
  )
}
