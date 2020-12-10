import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button'
import React from 'react'
import { useAppMachine } from '@codelab/ddd/modules/app-stories/model/store/appMachine/appMachine'

export type UserSignupButtonProps = ButtonProps

export const UserSignupButton = () => {
  const [appMachineState, appSend] = useAppMachine() as any

  console.log(appMachineState.value)

  const userSignupButtonProps = {
    onClick: () => {
      console.log('click!')
      appSend('TOGGLE_MODAL')
    },
  }

  return <Button {...userSignupButtonProps}>Signup</Button>
}
