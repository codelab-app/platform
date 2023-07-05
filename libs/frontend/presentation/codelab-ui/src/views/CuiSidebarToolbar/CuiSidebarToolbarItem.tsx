import { Tooltip } from 'antd'
import React from 'react'
import type { ToolbarItem } from '../../abstract'

type CuiSidebarToolbarItemProps = Omit<ToolbarItem, 'label'>

export const CuiSidebarToolbarItem = ({
  icon,
  key,
  onClick,
  title,
}: CuiSidebarToolbarItemProps) => {
  return (
    <div className="h-full w-full" data-cy={`codelabui-toolbar-item-${title}`}>
      <Tooltip key={key} title={title}>
        <div className="flex flex-col items-center p-1" onClick={onClick}>
          {icon}
        </div>
      </Tooltip>
    </div>
  )
}
