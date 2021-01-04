import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button'
import React from 'react'

export type UserLoginButtonProps = ButtonProps

export const UserLoginButton = ({
  children,
  ...props
}: UserLoginButtonProps) => {
  return <Button {...props}>{children}</Button>
}
