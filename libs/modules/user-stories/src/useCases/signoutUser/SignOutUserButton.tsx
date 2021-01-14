import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button'
import React from 'react'
import { useUserMachine } from '../../store'

export const SignOutUserButton = () => {
  const user = useUserMachine()

  const userSignupButtonProps: ButtonProps = {
    onClick: () => user.send('SIGN_OUT'),
    loading: user.state.value.authenticated === 'signingOut',
  }

  return <Button {...userSignupButtonProps}>Sign Out</Button>
}
