import React from 'react'
import { AppModal, AppModalProps } from '@codelab/ddd/modules/app-stories'
import { useLayout } from '@codelab/ddd/modules/layout-stories'

export const AppModalContainer = () => {
  const layout = useLayout()

  const appModalProps: AppModalProps = {
    visible: layout.state.value.modal === 'active',
    onCancel: () => layout.send('TOGGLE_MODAL'),
    onOk: () => layout.send('TOGGLE_MODAL'),
  }

  return (
    <AppModal {...appModalProps}>
      <h1>Modal</h1>
    </AppModal>
  )
}
