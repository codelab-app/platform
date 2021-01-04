import React from 'react'
import { useUser } from '../../store'
import { UserSignupButton } from './UserSignupButton'

export const UserSignupButtonContainer = () => {
  const user = useUser()

  const userSignupButtonProps = {
    onClick: () => user.send('SIGN_UP'),
  }

  return <UserSignupButton {...userSignupButtonProps}>Sign Up</UserSignupButton>
}
