import React from 'react'
import { useRecoilState } from 'recoil'
import { appState } from '../state'
import { CreateAppForm } from './CreateAppForm'
import { ModalForm } from '@codelab/frontend'

export const CreateAppModal = () => {
  const [state, setAppState] = useRecoilState(appState)
  const { loading, editingApp, modalVisible } = state

  return (
    <ModalForm
      modalProps={{
        okText: 'Create App',
        okButtonProps: {
          loading,
        },
        visible: modalVisible && !editingApp,
        onCancel: () => setAppState({ ...state, modalVisible: false }),
      }}
      renderForm={() => (
        <CreateAppForm
          onSubmitSuccess={() => {
            // Close the modal when the execution finishes
            setAppState({ ...state, modalVisible: false })
          }}
        />
      )}
    />
  )
}
