import React from 'react'
import { useUser } from '../../store'
import { UserLoginButton } from './UserLoginButton'

export const UserLoginButtonContainer = () => {
  const user = useUser()

  const userLoginButtonProps = {
    onClick: () => user.send('LOGIN'),
  }

  return <UserLoginButton {...userLoginButtonProps}>Login</UserLoginButton>
}
