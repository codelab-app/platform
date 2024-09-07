import { Cui } from '@codelab/frontend-application-shared-data'
import { Button, Tooltip } from 'antd'
import type { ReactNode } from 'react'
import React from 'react'
import type { ToolbarItem } from '../../abstract'

type CuiPopoverToolbarItemProps = Omit<ToolbarItem, 'icon'> & {
  icon?: ReactNode
}

export const CuiPopoverToolbarItem = ({
  cuiKey,
  icon,
  label,
  onClick,
  title,
}: CuiPopoverToolbarItemProps) => {
  return (
    <Tooltip title={title}>
      <Button
        data-cy={Cui.cuiToolbarItem(cuiKey)}
        icon={icon}
        onClick={onClick}
        type="text"
      >
        {label}
      </Button>
    </Tooltip>
  )
}
