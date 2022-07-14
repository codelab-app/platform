import { PlusOutlined } from '@ant-design/icons'
import React from 'react'
import { ListItemButton, ListItemButtonProps } from './ListItemButton'

export type ListItemCreateButtonProps = Omit<
  ListItemButtonProps,
  'icon' | 'title'
>

export const ListItemCreateButton = (props: ListItemCreateButtonProps) => (
  <ListItemButton icon={<PlusOutlined />} onClick={props.onClick} title="Add" />
)
