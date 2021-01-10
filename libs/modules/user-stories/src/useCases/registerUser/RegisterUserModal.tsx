import { Modal } from 'antd'
import React, { useRef } from 'react'
import { useRootMachine } from '../../../../../frontend/src/infrastructure/machine/useRootMachine'
import { useUserMachine } from '../../store'
import { RegisterUserForm } from './RegisterUserForm'

export const RegisterUserModal = () => {
  const root = useRootMachine()
  const user = useUserMachine()
  const submitBtnRef = useRef<HTMLButtonElement>()

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
      <RegisterUserForm
        hasSubmitButton={false}
        submitBtnRef={submitBtnRef as any}
      />
    </Modal>
  )
}
