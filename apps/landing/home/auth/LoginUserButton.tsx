import { Button } from 'antd'
import React from 'react'
import tw from 'twin.macro'

export const LoginUserButton = () => {
  return (
    <Button
      css={tw`!text-purple-500 hover:!bg-purple-400 hover:!text-white`}
      ghost
      href="/api/auth/login"
      type="primary"
    >
      Login
    </Button>
  )
}
