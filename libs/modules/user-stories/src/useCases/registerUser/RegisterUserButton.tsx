import { Button } from 'antd'
import React from 'react'
import { useUserMachine } from '../../store'

export const RegisterUserButton = () => {
  const user = useUserMachine()

  const registerUserButtonProps = {
    onClick: () => user.send('SIGN_UP'),
  }

  return <Button {...registerUserButtonProps}>Sign Up</Button>
}
