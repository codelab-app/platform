import { Modal } from 'antd'
import { ModalProps } from 'antd/lib/modal'
import React from 'react'
import { useAppMachine } from '../../model/store/useAppMachine'
import { CreateAppForm } from './CreateAppForm'
import { useRootMachine } from '@codelab/frontend'

const CREATE_APP_FORM = 'createAppForm'

export const CreateAppModal = () => {
  const root = useRootMachine()
  const app = useAppMachine()

  const sharedModalProps: ModalProps = {
    visible: typeof app.state.value.creatingApp !== 'undefined',
    onCancel: () => root.send('ON_MODAL_CANCEL'),
    onOk: () => root.send('ON_MODAL_OK'),
  }

  console.log(app.state.value)
  console.log(typeof app.state.value.creatingApp)

  return (
    <Modal
      okText="Create App"
      okButtonProps={{
        htmlType: 'submit',
        form: CREATE_APP_FORM, // This will trigger the form submission when OK is clicked
        // loading: typeof app.state.value.creatingApp !== undefined,
      }}
      {...sharedModalProps}
    >
      <CreateAppForm formId={CREATE_APP_FORM} />
    </Modal>
  )
}
