import { Cui } from '@codelab/frontend-application-shared-data'
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
    <div className="size-full" data-cy={Cui.cuiToolbarItem(cuiKey)}>
      <Tooltip title={title}>
        <Button
          aria-label={cuiKey}
          icon={icon}
          onClick={onClick}
          size="small"
          type="text"
        />
      </Tooltip>
    </div>
  )
}
