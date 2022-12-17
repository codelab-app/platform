import EditOutlined from '@ant-design/icons/lib/icons/EditOutlined'
import React from 'react'
import type { ListItemButtonProps } from './ListItemButton'
import { ListItemButton } from './ListItemButton'

export type ListItemEditButtonProps = Omit<
  ListItemButtonProps,
  'icon' | 'title'
>

export const ListItemEditButton = (props: ListItemEditButtonProps) => {
  return (
    <ListItemButton
      icon={<EditOutlined />}
      onClick={props.onClick}
      title="Edit"
    />
  )
}
