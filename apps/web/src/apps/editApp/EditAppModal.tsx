import React from 'react'
import { useRecoilState } from 'recoil'
import { appState } from '../state'
import { EditAppForm } from './EditAppForm'
import { ModalForm } from '@codelab/frontend'

export const EditAppModal = () => {
  const [state, setAppState] = useRecoilState(appState)

  const { loading, editingApp, modalVisible } = state

  return (
    <ModalForm
      modalProps={{
        okText: 'Save',
        okButtonProps: {
          loading,
        },
        visible: modalVisible && !!editingApp,
        onCancel: () => setAppState({ ...state, modalVisible: false }),
      }}
      renderForm={() => (
        <EditAppForm
          onSubmitSuccessfully={() => {
            // Close the modal when the execution finishes
            setAppState({ ...state, modalVisible: false })
          }}
        />
      )}
    />
  )
}
