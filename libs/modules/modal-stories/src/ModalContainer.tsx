import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { AppModalProps, Modal } from './Modal'
import { useApp } from '@codelab/modules/app-stories'
import { useLayout } from '@codelab/modules/layout-stories'
import {
  UserLoginForm,
  UserSignupForm,
  useUser,
} from '@codelab/modules/users-stories'

export const ModalContainer = () => {
  const app = useApp()
  const layout = useLayout()
  const user = useUser()

  const appModalProps: AppModalProps = {
    // TODO: Use mediator computed value, access from app via getter
    visible:
      user.state.value.guest === 'signingUp' ||
      user.state.value.guest === 'loggingIn',
    onCancel: () => app.send('ON_MODAL_CANCEL'),
    onOk: () => app.send('ON_MODAL_OK'),
  }

  console.log(user.state.value.guest)

  return (
    <Modal {...appModalProps}>
      <Switch>
        <Route path="/guest/sign-up">
          <UserSignupForm />
        </Route>
        <Route path="/guest/login">
          <UserLoginForm />
        </Route>
      </Switch>
    </Modal>
  )
}
