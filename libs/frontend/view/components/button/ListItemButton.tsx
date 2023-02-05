import type { ButtonProps } from 'antd/lib/button/button'
import Button from 'antd/lib/button/button'
import React from 'react'

export type ListItemButtonProps = Required<
  Pick<ButtonProps, 'icon' | 'onClick'>
> &
  Pick<ButtonProps, 'danger' | 'title' | 'children' | 'loading' | 'disabled'>

export const ListItemButton = ({
  danger,
  icon,
  onClick,
  disabled = false,
  loading = false,
}: ListItemButtonProps) => {
  return (
    <Button
      danger={danger}
      disabled={disabled}
      icon={icon}
      loading={loading}
      onClick={onClick}
      size="small"
      type="text"
    />
  )
}
