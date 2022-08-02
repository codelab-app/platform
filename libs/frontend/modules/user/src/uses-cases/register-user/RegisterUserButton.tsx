import { Button } from 'antd'
import React from 'react'
import tw from 'twin.macro'

export const RegisterUserButton = () => {
  return (
    <Button css={tw`!text-white`} href="/api/auth/login" type="primary">
      Register
    </Button>
  )
}
