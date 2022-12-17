import DeleteOutlined from '@ant-design/icons/lib/icons/DeleteOutlined'
import React from 'react'
import type { ListItemButtonProps } from './ListItemButton'
import { ListItemButton } from './ListItemButton'

export type ListItemDeleteButtonProps = Omit<
  ListItemButtonProps,
  'icon' | 'danger'
>

export const ListItemDeleteButton = (props: ListItemDeleteButtonProps) => {
  return (
    <ListItemButton
      children={props.children}
      danger={true}
      icon={<DeleteOutlined />}
      onClick={props.onClick}
    />
  )
}
