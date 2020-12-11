import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button'
import React from 'react'
import { useAppMachine } from '@codelab/ddd/modules/app-stories'

export type UserSignupButtonProps = ButtonProps

export const UserSignupButton = () => {
  const [appMachineState, appSend] = useAppMachine() as any

  // const app = useRecoilValue(appMachineAtom)
  // const [appMachineState, appSend] = useMachine(app)

  const userSignupButtonProps = {
    onClick: () => {
      console.log('click!')
      appSend('TOGGLE_MODAL')
    },
  }

  return <Button {...userSignupButtonProps}>Signup</Button>
}
