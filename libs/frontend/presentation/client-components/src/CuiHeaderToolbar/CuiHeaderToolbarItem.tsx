import type { ModelActionKey } from '@codelab/frontend/abstract/types'
import { CY_DATA } from '@codelab/frontend/application/shared/data'
import { Button, Space, Tooltip } from 'antd'
import React from 'react'

export interface ToolbarItem {
  cuiKey: ModelActionKey

  icon: React.ReactNode
  label?: string
  title: string
  onClick?(): void
}

export const CuiHeaderToolbarItem = ({
  cuiKey,
  icon,
  label,
  onClick,
  title,
}: ToolbarItem) => {
  return (
    <div className="size-full" data-cy={CY_DATA.cuiToolbarItem(cuiKey).cyData}>
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
