'use client'

import type { PropsWithChildren, RefObject } from 'react'

import { useCuiSidebarPopover } from './cui-sidebar-popover.hook'

export interface CuiSidebarPopoverLayoutProps {
  popoverAnchorRef: RefObject<HTMLDivElement | null>
}

export const CuiSidebarPopoverLayout = ({
  children,
  popoverAnchorRef,
}: PropsWithChildren<CuiSidebarPopoverLayoutProps>) => {
  const { left, popover, top } = useCuiSidebarPopover({ popoverAnchorRef })
  const borderWidth = 1

  return (
    <div
      className="w-1/5"
      style={{
        display: popover.isAnyPopoverOpen ? 'flex' : 'none',
        left: `${left}px`,
        position: 'absolute',
        top: `${top + borderWidth}px`,
        zIndex: 1000,
      }}
    >
      {children}
    </div>
  )
}
