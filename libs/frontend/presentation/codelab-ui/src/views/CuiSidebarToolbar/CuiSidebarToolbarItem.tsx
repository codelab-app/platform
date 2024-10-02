import { CuiTestId } from '@codelab/frontend-application-shared-data'
import { Button, Tooltip } from 'antd'

import type { ToolbarItem } from '../../abstract'

type CuiSidebarToolbarItemProps = Omit<ToolbarItem, 'label'>

export const CuiSidebarToolbarItem = ({
  cuiKey,
  icon,
  onClick,
  title,
}: CuiSidebarToolbarItemProps) => {
  return (
    <div
      className="size-full content-center"
      data-testid={CuiTestId.cuiToolbarItem(cuiKey)}
    >
      <Tooltip title={title}>
        {onClick ? (
          <Button
            aria-label={cuiKey}
            icon={icon}
            onClick={onClick}
            size="small"
            type="text"
          />
        ) : (
          <div className="flex items-center">{icon}</div>
        )}
      </Tooltip>
    </div>
  )
}
