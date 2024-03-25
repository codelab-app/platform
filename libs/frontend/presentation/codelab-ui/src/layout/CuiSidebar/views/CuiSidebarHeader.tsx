import { CY_DATA } from '@codelab/frontend/application/shared/data'
import { Typography } from 'antd'
import React from 'react'
import type { ToolbarProps } from '../../../abstract'
import { CuiSidebarToolbar } from '../../../views'
import type { CuiSidebarProps, CuiSidebarView } from '../CuiSidebar'

type CuiSidebarHeader = Pick<CuiSidebarProps, 'label'> & {
  toolbar?: ToolbarProps
}

/**
 * If we only have 1 view item, we use that data as the header. Otherwise
 */
export const CuiSidebarHeader = ({ label, toolbar }: CuiSidebarHeader) => {
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
      data-cy={CY_DATA.cuiSidebarHeader().cyData}
    >
      <Typography className="pl-4">{label}</Typography>
      {toolbar ? (
        <div className="max-w-lg">
          <CuiSidebarToolbar items={toolbar.items} title={toolbar.title} />
        </div>
      ) : null}
    </div>
  )
}
