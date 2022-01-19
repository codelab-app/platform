import DeleteOutlined from '@ant-design/icons/lib/icons/DeleteOutlined'
import React from 'react'
import { ListItemButton, ListItemButtonProps } from './ListItemButton'

export type ListItemDeleteButtonProps = Omit<
  ListItemButtonProps,
  'icon' | 'danger'
>

export const ListItemDeleteButton = (props: ListItemDeleteButtonProps) => {
  return <ListItemButton danger={true} icon={<DeleteOutlined />} {...props} />
}
