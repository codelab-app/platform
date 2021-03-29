import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button'
import React from 'react'

export const SignOutUserButton = () => {
  // const { signOut } = useSignOutUser()

  const userSignupButtonProps: ButtonProps = {
    href: '/api/auth/logout',
    type: 'ghost',
  }

  return <Button {...userSignupButtonProps}>Sign Out</Button>
}
