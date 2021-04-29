import { SettingOutlined } from '@ant-design/icons'
import React from 'react'
export interface ListItemSettingsButtonProps {
  onClick: () => void
}
export const ListItemSettingsButton = ({
  onClick,
}: ListItemSettingsButtonProps) => {
  return <SettingOutlined title="Settings" onClick={onClick} />
}
