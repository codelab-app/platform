import { Modal } from 'antd'
import { ModalProps } from 'antd/lib/modal'
import React from 'react'
import { useUser } from '../../store/useUser'
import { RegisterUserForm } from './RegisterUserForm'
import { useApp } from '@codelab/modules/app-stories'

const USER_SIGNUP_FORM = 'userSignupForm'

export const RegisterUserModal = () => {
  const app = useApp()
  const user = useUser()
  const sharedModalProps: ModalProps = {
    visible: user.state.value.guest.signingUp === 'idle',
    onCancel: () => app.send('ON_MODAL_CANCEL'),
    onOk: () => app.send('ON_MODAL_OK'),
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
