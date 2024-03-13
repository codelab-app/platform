import { CY_DATA } from '@codelab/frontend/application/shared/data'
import { Button, Space, Tooltip } from 'antd'
import React from 'react'
import type { ToolbarItem } from '../../abstract'

type CuiHeaderToolbarItemProps = ToolbarItem

export const CuiHeaderToolbarItem = ({
  icon,
  key,
  label,
  onClick,
  title,
}: CuiHeaderToolbarItemProps) => {
  return (
    <div className="size-full" data-cy={CY_DATA.cuiToolbarItem(key)}>
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
