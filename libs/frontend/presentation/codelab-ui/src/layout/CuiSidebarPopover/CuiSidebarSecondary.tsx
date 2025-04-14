'use client'

import type { PropsWithChildren } from 'react'

import { getUiDataLabel } from '@codelab/frontend/abstract/types'

import type { CuiSidebarPopoverProps } from './CuiSidebarPopover'

import { CuiSidebarPopoverHeader } from './CuiSidebarPopoverHeader'

/**
 * Gradual migration from `CuiSidebarPopover`, this is a route based popover
 */
export const CuiSidebarSecondary = ({
  children,
  id,
  toolbar,
}: PropsWithChildren<CuiSidebarPopoverProps>) => {
  const label = getUiDataLabel(id)

  return (
    <div
      aria-label={label}
      className={`
        flex w-full grow
        flex-col justify-start border-0
        border-r-2 border-solid border-gray-300
        bg-white
      `}
      data-testid={id}
      role="dialog"
    >
      <CuiSidebarPopoverHeader label={label} toolbar={toolbar} />
      <div
        className={`
          box-border flex grow
          flex-col justify-start overflow-y-auto
          overflow-x-hidden bg-white p-2
          align-middle
        `}
      >
        {children}
      </div>
    </div>
  )
}
