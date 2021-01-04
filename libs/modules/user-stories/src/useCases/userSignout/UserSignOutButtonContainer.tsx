import React from 'react'
import { useUser } from '../../store'
import { UserSignOutButton } from './UserSignOutButton'

export const UserSignOutButtonContainer = () => {
  const user = useUser()

  const userSignupButtonProps = {
    onClick: () => user.send('SIGN_OUT'),
    loading: user.state.value.authenticated === 'signingOut',
  }

  return (
    <UserSignOutButton {...userSignupButtonProps}>Sign Out</UserSignOutButton>
  )
}
