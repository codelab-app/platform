import { CY_DATA } from '@codelab/frontend/application/shared/data'
import { observer } from 'mobx-react-lite'
import type { PropsWithChildren } from 'react'
import React from 'react'
import { useCui } from '../../core'
import type { CuiSidebarToolbarProps } from '../../views'
import { CuiSidebarPopoverHeader } from './CuiSidebarPopoverHeader'

export interface CuiSidebarPopoverProps {
  id: string
  label: string
  toolbar?: CuiSidebarToolbarProps
}

export const CuiSidebarPopover = observer(
  ({
    children,
    id,
    label,
    toolbar,
  }: PropsWithChildren<CuiSidebarPopoverProps>) => {
    const { popover: popoverStore } = useCui()
    const isOpen = popoverStore.isOpen(id)

    return isOpen ? (
      <div
        className="
        flex
        w-full
        flex-col
        justify-start
        border-0
        border-r-2
        border-solid
        border-gray-300
        bg-white
        "
        data-cy={CY_DATA.cuiPopover(label)}
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
          {children}
        </div>
      </div>
    ) : null
  },
)
