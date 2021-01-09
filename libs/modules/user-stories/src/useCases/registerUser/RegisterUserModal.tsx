import { Alert, Modal } from 'antd'
import React, { createRef } from 'react'
import { useUserMachine } from '../../store/useUserMachine'
import { RegisterUserForm } from './RegisterUserForm'
import { useRootMachine } from '@codelab/frontend'

export const RegisterUserModal = () => {
  const root = useRootMachine()
  const user = useUserMachine()
  const submitBtnRef = createRef<HTMLButtonElement>()

  const error =
    user.state.event?.type === 'error.platform.executeRegister' &&
    user.state.event?.data?.message
      ? user.state.event.data.message
      : undefined

  return (
    <Modal
      okText="Register"
      destroyOnClose
      okButtonProps={{
        htmlType: 'submit',
        // form: USER_SIGNUP_FORM, // This will trigger the form submission when OK is clicked. Not working with rjsf, use submitBtnRef
        loading: user.state.value.guest?.signingUp === 'loading',
      }}
      visible={Boolean(user.state.value.guest?.signingUp)}
      onCancel={() => root.send('ON_MODAL_CANCEL')}
      onOk={() => {
        if (!submitBtnRef.current)
          throw new Error('Submit button ref not initialized')

        submitBtnRef.current.click() // The form id trick doesn't seem to work with rjsf, so just call the click on the actual submit button
        root.send('ON_MODAL_OK')
      }}
    >
      <RegisterUserForm hasSubmitButton={false} submitBtnRef={submitBtnRef} />

      {error && <Alert message={error} type="error" />}
    </Modal>
  )
}
