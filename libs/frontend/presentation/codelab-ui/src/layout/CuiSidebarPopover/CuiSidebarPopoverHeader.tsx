import { Typography } from 'antd'
import React from 'react'
import type { CuiPopoverToolbarProps } from '../../views'
import { CuiPopoverToolbar } from '../../views'

interface CuiSidebarPopoverHeaderProps {
  label: string
  toolbar?: CuiPopoverToolbarProps
}

export const CuiSidebarPopoverHeader = ({
  label,
  toolbar,
}: CuiSidebarPopoverHeaderProps) => {
  return (
    <div
      className="
      flex
      h-10
      w-full
      flex-row
      items-center
      justify-between
      border-0
      border-b-2
      border-solid
      border-gray-300
      bg-neutral-100
    "
    >
      <Typography className="pl-4">{label}</Typography>
      {toolbar && (
        <div className="max-w-lg">
          {
            // eslint-disable-next-line react/jsx-props-no-spreading
            <CuiPopoverToolbar {...toolbar} />
          }
        </div>
      )}
    </div>
  )
}
