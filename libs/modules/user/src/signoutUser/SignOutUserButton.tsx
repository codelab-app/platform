import { Button } from 'antd'
import React from 'react'

export const SignOutUserButton = () => {
  return (
    <Button type="primary" href="/api/auth/logout">
      Sign Out
    </Button>
  )
}
