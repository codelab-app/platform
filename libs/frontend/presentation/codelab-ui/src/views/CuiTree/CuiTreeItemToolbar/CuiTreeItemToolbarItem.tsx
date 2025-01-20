import { CuiTestId } from '@codelab/frontend-application-shared-data'
import { Button, Popconfirm, Tooltip } from 'antd'

import type { ToolbarItem } from '../../../abstract'

type CuiTreeItemToolbarItemProps = Omit<ToolbarItem, 'label'>

export const CuiTreeItemToolbarItem = ({
  confirmText,
  cuiKey,
  icon,
  onClick,
  title,
}: CuiTreeItemToolbarItemProps) => {
  return (
    <Popconfirm disabled={!confirmText} onConfirm={onClick} title={confirmText}>
      <div className="size-full" data-testid={CuiTestId.cuiToolbarItem(cuiKey)}>
        <Tooltip title={title}>
          <Button
            icon={icon}
            onClick={confirmText ? undefined : onClick}
            size="small"
            type="text"
          />
        </Tooltip>
      </div>
    </Popconfirm>
  )
}
