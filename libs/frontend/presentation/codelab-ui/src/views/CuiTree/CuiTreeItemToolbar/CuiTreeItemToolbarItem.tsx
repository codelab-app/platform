import { Tooltip } from 'antd'
import React from 'react'
import type { ToolbarItem } from '../../../abstract'

type CuiTreeItemToolbarItemProps = Omit<ToolbarItem, 'label'>

export const CuiTreeItemToolbarItem = ({
  icon,
  onClick,
  title,
}: CuiTreeItemToolbarItemProps) => {
  return (
    <div className="h-full w-full" data-cy={`codelabui-toolbar-item-${title}`}>
      <Tooltip title={title}>
        <div className="flex flex-col items-center p-1" onClick={onClick}>
          {icon}
        </div>
      </Tooltip>
    </div>
  )
}
