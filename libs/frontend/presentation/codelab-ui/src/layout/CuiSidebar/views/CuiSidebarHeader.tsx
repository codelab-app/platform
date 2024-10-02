import { CuiTestId } from '@codelab/frontend-application-shared-data'
import { Typography } from 'antd'

import type { ToolbarProps } from '../../../abstract'
import type { CuiSidebarProps } from '../CuiSidebar'

import { CuiSidebarToolbar } from '../../../views'

type ICuiSidebarHeader = Pick<CuiSidebarProps, 'label'> & {
  toolbar?: ToolbarProps
}

/**
 * If we only have 1 view item, we use that data as the header. Otherwise
 */
export const CuiSidebarHeader = ({ label, toolbar }: ICuiSidebarHeader) => {
  return (
    <div
      className={`
        flex h-10 w-full
        flex-row items-center justify-between
        border-0 border-b-2 border-solid
        border-gray-300 bg-neutral-100
      `}
      data-testid={CuiTestId.cuiSidebarHeader()}
    >
      <Typography className="pl-4">{label}</Typography>
      {toolbar ? (
        <CuiSidebarToolbar items={toolbar.items} title={toolbar.title} />
      ) : null}
    </div>
  )
}
