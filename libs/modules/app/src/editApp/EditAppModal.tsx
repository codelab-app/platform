import React from 'react'
import { useRecoilState } from 'recoil'
import { AutoFields } from 'uniforms-antd'
import { appState } from '../state'
import { EditAppForm } from './EditAppForm'
import { ModalUniForm } from '@codelab/frontend'

export const EditAppModal = () => {
  const [state, setAppState] = useRecoilState(appState)

  const { loading, editingApp, modalVisible } = state

  return (
    <ModalUniForm
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
          onSubmitSuccess={() => {
            // Close the modal when the execution finishes
            setAppState({ ...state, modalVisible: false })
          }}
        >
          <AutoFields />
        </EditAppForm>
      )}
    />
  )
}
