import { Button } from 'antd'
import React from 'react'
import { useUserMachine } from '../../store'

export const RegisterUserButton = () => {
  const user = useUserMachine()

  return (
    <Button type="primary" onClick={() => user.send('REGISTER_USER')}>
      Register
    </Button>
  )
}
