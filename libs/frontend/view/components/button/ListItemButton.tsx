import type { ButtonProps } from 'antd/lib/button/button'
import Button from 'antd/lib/button/button'
import React from 'react'

export type ListItemButtonProps = Required<
  Pick<ButtonProps, 'icon' | 'onClick'>
> &
  Pick<ButtonProps, 'danger' | 'title' | 'children'>

export const ListItemButton = ({
  danger,
  icon,
  onClick,
}: ListItemButtonProps) => {
  return (
    <Button
      danger={danger}
      icon={icon}
      onClick={onClick}
      size="small"
      type="text"
    />
  )
}
