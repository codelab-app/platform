import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button'
import React from 'react'
import { useUser } from '../../store'

export const UserLoginButton = () => {
  const user = useUser()

  const userLoginButtonProps: ButtonProps = {
    onClick: () => user.send('LOGIN'),
  }

  return <Button {...userLoginButtonProps}>Login</Button>
}
