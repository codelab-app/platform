import { Button } from 'antd'
import React from 'react'
import { useUser } from '../../store'

export const RegisterUserButton = () => {
  const user = useUser()

  const registerUserButtonProps = {
    onClick: () => user.send('SIGN_UP'),
  }

  return <Button {...registerUserButtonProps}>Sign Up</Button>
}
