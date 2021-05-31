import { Button } from 'antd'
import React from 'react'

export const LoginUserButton = () => {
  return (
    <Button className="login-button" type="link" href="/api/auth/login">
      Login
    </Button>
  )
}
