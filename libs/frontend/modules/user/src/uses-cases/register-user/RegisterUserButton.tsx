import { Button } from 'antd'
import React from 'react'

export const RegisterUserButton = () => {
  return (
    <Button type="primary" href="/api/auth/login">
      Register
    </Button>
  )
}
