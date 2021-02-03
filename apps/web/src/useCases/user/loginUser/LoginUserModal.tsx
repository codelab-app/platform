import React from 'react'
import { useRecoilState } from 'recoil'
import { userState } from '../state'
import { LoginUserForm } from './LoginUserForm'
import { ModalForm } from '@codelab/frontend'

export const LoginUserModal = () => {
  const [{ loading, modalVisible }, setState] = useRecoilState(userState)

  return (
    <ModalForm
      modalProps={{
        okText: 'Log in',
        okButtonProps: {
          loading,
        },
        visible: modalVisible === 'login',
        onCancel: () => setState((s) => ({ ...s, modalVisible: undefined })),
      }}
      renderForm={() => (
        <LoginUserForm
          onSubmitSuccess={() => {
            // Close the modal when the execution finishes
            setState((s) => ({ ...s, modalVisible: undefined }))
          }}
        />
      )}
    />
  )
}
