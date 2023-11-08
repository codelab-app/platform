import { Button } from 'antd'
import React from 'react'

export const LoginUserButton = () => {
  return (
    <Button
      className="rounded-2xl !text-purple-500 hover:!bg-purple-400 hover:!text-white"
      ghost
      href="/api/auth/login"
      type="primary"
    >
      Login
    </Button>
  )
}
