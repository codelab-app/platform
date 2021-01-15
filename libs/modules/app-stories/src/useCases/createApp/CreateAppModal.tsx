import React from 'react'
import { useAppMachine } from '../../model'
import { CreateAppForm } from './CreateAppForm'
import { ModalForm, useRootMachine } from '@codelab/frontend'

export const CreateAppModal = () => {
  const root = useRootMachine()
  const app = useAppMachine()

  return (
    <ModalForm
      modalProps={{
        okText: 'Create App',
        okButtonProps: {
          loading: app.state.value?.creatingApp === 'submitting',
        },
        visible: typeof app.state.value.creatingApp !== 'undefined',
        onCancel: () => root.send('ON_MODAL_CANCEL'),
        onOk: () => root.send('ON_MODAL_OK'),
      }}
      renderForm={() => <CreateAppForm />}
    />
  )
}
