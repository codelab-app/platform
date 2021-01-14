import React from 'react'
import { useUserMachine } from '../../store'
import { UserLoginForm } from './UserLoginForm'
import { ModalForm, useRootMachine } from '@codelab/frontend'

export const UserLoginModal = () => {
  const app = useRootMachine()
  const user = useUserMachine()

  return (
    <ModalForm
      modalProps={{
        okText: 'Log in',
        okButtonProps: {
          loading: user.state.value.guest?.loggingIn === 'loading',
        },
        visible: Boolean(user.state.value.guest?.loggingIn),
        onCancel: () => app.send('ON_MODAL_CANCEL'),
        onOk: () => app.send('ON_MODAL_OK'),
      }}
      renderForm={() => <UserLoginForm />}
    />
  )
}
