import { CY_DATA } from '@codelab/frontend-application-shared-data/cy-data'
import { Tooltip } from 'antd'
import React from 'react'
import type { ToolbarItem } from '../../abstract'

type CuiSidebarToolbarItemProps = Omit<ToolbarItem, 'label'>

export const CuiSidebarToolbarItem = ({
  cuiKey,
  icon,
  onClick,
  title,
}: CuiSidebarToolbarItemProps) => {
  return (
    <div className="size-full" data-cy={CY_DATA.cuiToolbarItem(cuiKey).cyData}>
      <Tooltip title={title}>
        <div
          className="
            flex
            size-full
            cursor-pointer
            flex-col
            items-center
            justify-center
            p-1
          "
          onClick={onClick}
        >
          {icon}
        </div>
      </Tooltip>
    </div>
  )
}
