import React from 'react'
import { useRootMachine } from '../../../../../frontend/src/infrastructure/machine/useRootMachine'
import { useUserMachine } from '../../store'
import { RegisterUserForm } from './RegisterUserForm'
import { ModalForm } from '@codelab/frontend'

export const RegisterUserModal = () => {
  const root = useRootMachine()
  const user = useUserMachine()

  return (
    <ModalForm
      modalProps={{
        okText: 'Register',
        okButtonProps: {
          loading: user.state.value.guest?.signingUp === 'loading',
        },
        visible: Boolean(user.state.value.guest?.signingUp),
        onCancel: () => root.send('ON_MODAL_CANCEL'),
        onOk: () => root.send('ON_MODAL_OK'),
      }}
      renderForm={() => <RegisterUserForm />}
    />
  )
}
