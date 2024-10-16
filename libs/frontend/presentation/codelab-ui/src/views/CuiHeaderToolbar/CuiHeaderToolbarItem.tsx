import { CuiTestId } from '@codelab/frontend-application-shared-data'
import { Button, Space, Tooltip } from 'antd'

import type { ToolbarItem } from '../../abstract'

type CuiHeaderToolbarItemProps = ToolbarItem

export const CuiHeaderToolbarItem = ({
  ariaLabel,
  cuiKey,
  icon,
  label,
  onClick,
  title,
}: CuiHeaderToolbarItemProps) => {
  return (
    <div className="size-full" data-testid={CuiTestId.cuiToolbarItem(cuiKey)}>
      <Tooltip title={title}>
        <Button
          aria-label={ariaLabel}
          className="h-8 px-2 py-1"
          onClick={onClick}
        >
          <Space>
            {icon}
            {label}
          </Space>
        </Button>
      </Tooltip>
    </div>
  )
}
