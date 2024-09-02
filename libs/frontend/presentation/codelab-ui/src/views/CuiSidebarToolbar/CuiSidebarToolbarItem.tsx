import { Cui } from '@codelab/frontend-application-shared-data'
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
    <div className="size-full" data-cy={Cui.cuiToolbarItem(cuiKey)}>
      <Tooltip title={title}>
        <button
          aria-label={cuiKey}
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
        </button>
      </Tooltip>
    </div>
  )
}
