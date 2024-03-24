import { observer } from 'mobx-react-lite'
import type { PropsWithChildren, RefObject } from 'react'
import React, { useEffect, useState } from 'react'
import { useCui } from '../../core'
import { useCuiSidebarPopover } from './cui-sidebar-popover.hook'

export interface CuiSidebarPopoverLayoutProps {
  popoverAnchorRef: RefObject<HTMLDivElement>
}

export const CuiSidebarPopoverLayout = observer(
  ({
    children,
    popoverAnchorRef,
  }: PropsWithChildren<CuiSidebarPopoverLayoutProps>) => {
    const { left, popover, top } = useCuiSidebarPopover({ popoverAnchorRef })

    return (
      <div
        className="w-1/5"
        style={{
          display: popover.isAnyPopoverOpen() ? 'flex' : 'none',
          inset: `${top}px 0px 0px ${left}px`,
          position: 'fixed',
          zIndex: 1000,
        }}
      >
        {children}
      </div>
    )
  },
)
