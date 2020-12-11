import { Button } from 'antd'
import { ButtonProps } from 'antd/lib/button'
import React from 'react'
import { useLayoutActor } from '../../../../app-stories/src/model/store/machine-app'

export type UserSignupButtonProps = ButtonProps

export const UserSignupButton = () => {
  const layout = useLayoutActor()

  // const app = useRecoilValue(appMachineAtom)
  // const [appMachineState, appSend] = useMachine(app)

  const userSignupButtonProps = {
    onClick: () => {
      console.log('click!')
      layout.send('TOGGLE_MODAL')
    },
  }

  return <Button {...userSignupButtonProps}>Signup</Button>
}
