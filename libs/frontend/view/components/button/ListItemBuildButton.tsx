import ToolOutlined from '@ant-design/icons/lib/icons/ToolOutlined'
import React from 'react'
import type { ListItemButtonProps } from './ListItemButton'
import { ListItemButton } from './ListItemButton'

export type ListItemBuildButtonProps = Omit<
  ListItemButtonProps,
  'icon' | 'title'
> & { loading: boolean }

export const ListItemBuildButton = (props: ListItemBuildButtonProps) => {
  return (
    <ListItemButton
      disabled={props.disabled}
      icon={<ToolOutlined />}
      loading={props.loading}
      onClick={props.onClick}
      title="Build"
    />
  )
}
