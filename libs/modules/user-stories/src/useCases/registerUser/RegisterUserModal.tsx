import { Modal } from 'antd'
import { ModalProps } from 'antd/lib/modal'
import React from 'react'
import { useUserMachine } from '../../store/useUserMachine'
import { RegisterUserForm } from './RegisterUserForm'
import { useRootMachine } from '@codelab/frontend'

const USER_SIGNUP_FORM = 'userSignupForm'

export const RegisterUserModal = () => {
  const root = useRootMachine()
  const user = useUserMachine()
  const sharedModalProps: ModalProps = {
    visible: user.state.value.guest.signingUp === 'idle',
    onCancel: () => root.send('ON_MODAL_CANCEL'),
    onOk: () => root.send('ON_MODAL_OK'),
  }

  return (
    <Modal
      okText="Sign Up"
      okButtonProps={{
        htmlType: 'submit',
        form: USER_SIGNUP_FORM, // This will trigger the form submission when OK is clicked
        loading: user.state.value.guest?.signingUp === 'loading',
      }}
      {...sharedModalProps}
    >
      <RegisterUserForm formId={USER_SIGNUP_FORM} hasSubmitButton={false} />
    </Modal>
  )
}
