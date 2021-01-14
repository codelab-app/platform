import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button'
import React from 'react'
import { useUserMachine } from '../../store'

export const LoginUserButton = () => {
  const user = useUserMachine()

  const loginUserButtonProps: ButtonProps = {
    onClick: () => user.send('LOGIN'),
  }

  return <Button {...loginUserButtonProps}>Login</Button>
}
