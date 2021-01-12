import { Button } from 'antd'
import React from 'react'
import { useUserMachine } from '../../store'

export const RegisterUserButton = () => {
  const user = useUserMachine()

  const registerUserButtonProps = {
    onClick: () => user.send('REGISTER_USER'),
  }

  return (
    <Button type="primary" {...registerUserButtonProps}>
      Register
    </Button>
  )
}
