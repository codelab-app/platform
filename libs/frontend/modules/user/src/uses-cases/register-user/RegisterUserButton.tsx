import { Button } from 'antd'
import React from 'react'

export const RegisterUserButton = () => {
  return (
    <Button href="/api/auth/login" type="primary">
      Register
    </Button>
  )
}
