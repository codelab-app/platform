import { Tooltip } from 'antd'
import React from 'react'
import type { ToolbarItem } from '../../abstract'

type CuiSidebarToolbarItemProps = Omit<ToolbarItem, 'label'>

export const CuiSidebarToolbarItem = ({
  icon,
  onClick,
  title,
}: CuiSidebarToolbarItemProps) => {
  return (
    <div className="h-full w-full" data-cy={`codelabui-toolbar-item-${title}`}>
      <Tooltip title={title}>
        <div
          className={`
          flex
          h-full
          w-full
          cursor-pointer
          flex-col
          items-center
          justify-center
          p-1
        `}
          onClick={onClick}
        >
          {icon}
        </div>
      </Tooltip>
    </div>
  )
}
