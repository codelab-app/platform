import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button'
import React from 'react'
import { useUser } from '../../store'

export const UserSignOutButton = () => {
  const user = useUser()

  const userSignupButtonProps: ButtonProps = {
    onClick: () => user.send('SIGN_OUT'),
    loading: user.state.value.authenticated === 'signingOut',
  }

  return <Button {...userSignupButtonProps}>Sign Out</Button>
}
