import { Button, Space, Tooltip } from 'antd'
import React from 'react'
import type { ToolbarItem } from '../../abstract'

type CuiHeaderToolbarItemProps = ToolbarItem

export const CuiHeaderToolbarItem = ({
  icon,
  label,
  onClick,
  title,
}: CuiHeaderToolbarItemProps) => {
  return (
    <div className="h-full w-full" data-cy={`codelabui-toolbar-item-${title}`}>
      <Tooltip title={title}>
        <Button className="h-8 px-2 py-1" onClick={onClick}>
          <Space>
            {icon}
            {label}
          </Space>
        </Button>
      </Tooltip>
    </div>
  )
}
