import SettingOutlined from '@ant-design/icons/lib/icons/SettingOutlined'
import React from 'react'
import { ListItemButton, ListItemButtonProps } from './ListItemButton'

export type ListItemSettingsButtonProps = Omit<
  ListItemButtonProps,
  'icon' | 'title'
>

export const ListItemSettingsButton = (props: ListItemSettingsButtonProps) => {
  return (
    <ListItemButton icon={<SettingOutlined />} title="Settings" {...props} />
  )
}
