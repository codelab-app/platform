import { Button } from 'antd'
import React from 'react'

export const LoginUserButton = () => {
  return (
    <Button className="login-button" href="/api/auth/login" type="link">
      Login
    </Button>
  )
}
