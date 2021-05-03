import { FormUniformsModal } from '@codelab/frontend/shared'
import React from 'react'
import { useRecoilState } from 'recoil'
import { AutoFields } from 'uniforms-antd'
import { appState } from '../state'
import { UpdateAppForm } from './UpdateAppForm'

export const UpdateAppModal = () => {
  const [state, setAppState] = useRecoilState(appState)
  const { loading, editingApp, modalVisible } = state

  return (
    <FormUniformsModal
      modalProps={{
        okText: 'Save',
        okButtonProps: {
          loading,
        },
        visible: modalVisible && !!editingApp,
        onCancel: () => setAppState({ ...state, modalVisible: false }),
      }}
      renderForm={() => (
        <UpdateAppForm
          onSubmitSuccess={() => {
            // Close the modal when the execution finishes
            setAppState({ ...state, modalVisible: false })
          }}
        >
          <AutoFields />
        </UpdateAppForm>
      )}
    />
  )
}
