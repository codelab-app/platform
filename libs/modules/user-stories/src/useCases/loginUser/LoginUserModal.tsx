import React from 'react'
import { useUserMachine } from '../../store'
import { LoginUserForm } from './LoginUserForm'
import { ModalForm, useRootMachine } from '@codelab/frontend'

export const LoginUserModal = () => {
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
      renderForm={() => <LoginUserForm />}
    />
  )
}
