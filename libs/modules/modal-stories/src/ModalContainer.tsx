import React from 'react'
import { AppModalProps, Modal } from './Modal'
import { useApp } from '@codelab/modules/app-stories'
import {
  UserLoginForm,
  UserSignupForm,
  useUser,
} from '@codelab/modules/user-stories'

const getRandomId = () =>
  `login_form_${Math.random().toString(36).substr(2, 9)}`

export const ModalContainer = () => {
  const app = useApp()
  const user = useUser()

  const isSigningUp = Boolean(user.state.value?.guest?.signingUp)
  const isLoggingIn = Boolean(user.state.value?.guest?.loggingIn)

  const formId = getRandomId()

  const sharedModalProps: AppModalProps = {
    visible: true,
    onCancel: () => app.send('ON_MODAL_CANCEL'),
    onOk: () => app.send('ON_MODAL_OK'),
  }

  if (isSigningUp) {
    const isSignedUp = Boolean(user.state.value.guest.signingUp === 'signedUp')

    if (!isSignedUp) {
      return (
        <Modal
          okText="Sign Up"
          okButtonProps={{
            htmlType: 'submit',
            form: formId, // This will trigger the form submission when OK is clicked
            loading: user.state.value.guest?.signingUp === 'loading',
          }}
          {...sharedModalProps}
        >
          <UserSignupForm formId={formId} hasSubmitButton={false} />
        </Modal>
      )
    }

    return (
      <Modal
        {...sharedModalProps}
        onCancel={undefined}
        cancelButtonProps={{ hidden: true }}
      >
        You have signed up successfully! You can log in now
      </Modal>
    )
  }

  if (isLoggingIn) {
    const isLoggedIn = Boolean(user.state.value.guest.loggingIn === 'loggedIn')

    if (isLoggedIn) return null

    return (
      <Modal
        okText="Log In"
        okButtonProps={{
          htmlType: 'submit',
          form: formId, // This will trigger the form submission when OK is clicked
          loading: user.state.value.guest?.loggingIn === 'loading',
        }}
        {...sharedModalProps}
      >
        <UserLoginForm formId={formId} hasSubmitButton={false} />
      </Modal>
    )
  }

  return null
}
