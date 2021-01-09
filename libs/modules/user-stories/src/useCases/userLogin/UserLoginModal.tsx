import { Alert, Modal } from 'antd'
import React, { createRef } from 'react'
import { useUserMachine } from '../../store/useUserMachine'
import { UserLoginForm } from './UserLoginForm'
import { useRootMachine } from '@codelab/frontend'

export const UserLoginModal = () => {
  const app = useRootMachine()
  const user = useUserMachine()
  const submitBtnRef = createRef<HTMLButtonElement>()

  const error =
    user.state.event?.type === 'error.platform.executeLogIn' &&
    user.state.event?.data?.message
      ? user.state.event.data.message
      : undefined

  return (
    <Modal
      okText="Log in"
      destroyOnClose
      okButtonProps={{
        htmlType: 'submit',
        // form: USER_LOGIN_FORM, // This will trigger the form submission when OK is clicked. Not working with rjsf, use submitBtnRef
        loading: user.state.value.guest?.loggingIn === 'loading',
      }}
      visible={Boolean(user.state.value.guest?.loggingIn)}
      onCancel={() => app.send('ON_MODAL_CANCEL')}
      onOk={() => {
        if (!submitBtnRef.current)
          throw new Error('Submit button ref not initialized')

        submitBtnRef.current.click() // The form id trick doesn't seem to work with rjsf, so just call the click on the actual submit button
        app.send('ON_MODAL_OK')
      }}
    >
      <UserLoginForm hasSubmitButton={false} submitBtnRef={submitBtnRef} />

      {error && <Alert message={error} type="error" />}
    </Modal>
  )
}
