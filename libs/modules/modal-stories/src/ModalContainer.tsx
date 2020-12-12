import React from 'react'
import { AppModalProps, Modal } from './Modal'
import { useApp } from '@codelab/modules/app-stories'
import { useLayout } from '@codelab/modules/layout-stories'
import { useUser } from '@codelab/modules/users-stories'

export const ModalContainer = () => {
  const app = useApp()
  const layout = useLayout()
  const user = useUser()

  console.log(user.state.value.guest)

  const appModalProps: AppModalProps = {
    // TODO: Use mediator computed value, access from app via getter
    visible:
      user.state.value.guest === 'signingUp' ||
      user.state.value.guest === 'loggingIn',
    onCancel: () => app.send('ON_MODAL_CANCEL'),
    onOk: () => app.send('ON_MODAL_OK'),
  }

  return (
    <Modal {...appModalProps}>
      <h1>Modal</h1>
    </Modal>
  )
}
