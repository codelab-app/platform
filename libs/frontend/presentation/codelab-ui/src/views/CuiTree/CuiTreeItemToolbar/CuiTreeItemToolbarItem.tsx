import { Cui } from '@codelab/frontend-application-shared-data'
import { Tooltip } from 'antd'
import type { ToolbarItem } from '../../../abstract'

type CuiTreeItemToolbarItemProps = Omit<ToolbarItem, 'label'>

export const CuiTreeItemToolbarItem = ({
  cuiKey,
  icon,
  onClick,
  title,
}: CuiTreeItemToolbarItemProps) => {
  return (
    <div className="size-full" data-cy={Cui.cuiToolbarItem(cuiKey)}>
      <Tooltip title={title}>
        <div className="flex flex-col items-center p-1" onClick={onClick}>
          {icon}
        </div>
      </Tooltip>
    </div>
  )
}
