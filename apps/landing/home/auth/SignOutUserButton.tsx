import type { ButtonProps } from 'antd'
import { Button } from 'antd'
import React from 'react'

export const signOutHref = '/api/auth/logout'

export const SignOutUserButton = ({ type = 'primary' }: ButtonProps) => {
  return (
    <Button href={signOutHref} type={type}>
      Sign Out
    </Button>
  )
}
