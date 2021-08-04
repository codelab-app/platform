import { DeleteOutlined } from '@ant-design/icons'
import React from 'react'
import { ListItemButton, ListItemButtonProps } from './ListItemButton'

export type ListItemDeleteButtonProps = Omit<
  ListItemButtonProps,
  'icon' | 'danger'
>

export const ListItemDeleteButton = (props: ListItemDeleteButtonProps) => {
  return (
    <ListItemButton
      icon={<DeleteOutlined />}
      danger={true}
      {...props}
    ></ListItemButton>
  )
}
