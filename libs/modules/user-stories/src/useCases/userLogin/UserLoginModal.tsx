import { Modal } from 'antd'
import { ModalProps } from 'antd/lib/modal'
import React from 'react'
import { useUserMachine } from '../../store/useUserMachine'
import { UserLoginForm } from './UserLoginForm'
import { useRootMachine } from '@codelab/frontend'

const USER_LOGIN_FORM = 'userLoginForm'

export const UserLoginModal = () => {
  const app = useRootMachine()
  const user = useUserMachine()

  const sharedModalProps: ModalProps = {
    visible: user.state.value.guest.loggingIn === 'idle',
    onCancel: () => app.send('ON_MODAL_CANCEL'),
    onOk: () => app.send('ON_MODAL_OK'),
  }

  return (
    <Modal
      okText="Sign Up"
      okButtonProps={{
        htmlType: 'submit',
        form: USER_LOGIN_FORM, // This will trigger the form submission when OK is clicked
        loading: user.state.value.guest?.signingUp === 'loading',
      }}
      {...sharedModalProps}
    >
      <UserLoginForm formId={USER_LOGIN_FORM} hasSubmitButton={false} />
    </Modal>
  )
}
