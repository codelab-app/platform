import React from 'react'
import { useAppMachine } from '../../model'
import { EditAppForm } from './EditAppForm'
import { ModalForm, useRootMachine } from '@codelab/frontend'

export const EditAppModal = () => {
  const root = useRootMachine()
  const app = useAppMachine()

  return (
    <ModalForm
      modalProps={{
        okText: 'Save',
        okButtonProps: {
          loading: app.state.value?.editingApp === 'submitting',
        },
        visible: typeof app.state.value.editingApp !== 'undefined',
        onCancel: () => root.send('ON_MODAL_CANCEL'),
        onOk: () => root.send('ON_MODAL_OK'),
      }}
      renderForm={() => <EditAppForm />}
    />
  )
}
