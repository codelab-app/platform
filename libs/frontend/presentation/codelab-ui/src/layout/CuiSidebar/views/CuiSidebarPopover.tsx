import type { ReactNode } from 'react'
import React from 'react'
import { CuiSidebarPopoverLayout } from '../../CuiSidebarPopover'

interface CuiSidebarPopoverProps {
  popover?: ReactNode
  sidebarRef: React.RefObject<HTMLDivElement>
}

export const CuiSidebarPopover = ({
  popover,
  sidebarRef,
}: CuiSidebarPopoverProps) => {
  if (!popover) {
    return null
  }

  return (
    <CuiSidebarPopoverLayout popoverAnchorRef={sidebarRef}>
      {popover}
    </CuiSidebarPopoverLayout>
  )
}
