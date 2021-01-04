import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button'
import React from 'react'

export type UserSignupButtonProps = ButtonProps

export const UserSignupButton = ({
  children,
  ...props
}: UserSignupButtonProps) => {
  return <Button {...props}>{children}</Button>
}
