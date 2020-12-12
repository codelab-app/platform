import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button'
import React from 'react'
import { useLayout } from '../../../../layout-stories/src/useLayout'

export type UserSignupButtonProps = ButtonProps

export const UserSignupButton = () => {
  const layout = useLayout()

  const userSignupButtonProps = {
    onClick: () => {
      console.log('click!')
      layout.send('TOGGLE_MODAL')
    },
  }

  return <Button {...userSignupButtonProps}>Signup</Button>
}
