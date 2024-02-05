import { CY_DATA } from '@codelab/frontend/application/shared/data'
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
    <div className="size-full" data-cy={CY_DATA.cuiToolbarItem(title)}>
      <Tooltip title={title}>
        <div
          className={`
          size-full
          flex
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
