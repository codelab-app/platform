import { Button, ButtonProps } from 'antd'
import React from 'react'

export const signoutHref = '/api/auth/logout'

export const SignOutUserButton = (props: ButtonProps) => {
  return (
    <Button type="primary" href={signoutHref} {...props}>
      Sign Out
    </Button>
  )
}
