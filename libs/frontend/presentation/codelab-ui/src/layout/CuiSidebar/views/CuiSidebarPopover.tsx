import type { ReactNode } from 'react'

import { CuiSidebarPopoverLayout } from '../../CuiSidebarPopover'

interface CuiSidebarPopoverProps {
  popover?: ReactNode
  sidebarRef: React.RefObject<HTMLDivElement | null>
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
