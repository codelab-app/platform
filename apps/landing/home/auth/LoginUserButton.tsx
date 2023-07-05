import { Button } from 'antd'
import React from 'react'

export const LoginUserButton = () => {
  return (
    <Button
      className="!text-purple-500 hover:!bg-purple-400 rounded-2xl hover:!text-white"
      ghost
      href="/api/auth/login"
      type="primary"
    >
      Login
    </Button>
  )
}
