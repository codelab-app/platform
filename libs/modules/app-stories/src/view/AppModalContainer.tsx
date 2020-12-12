import React from 'react'
import { AppModal, AppModalProps } from './AppModal'
import { useLayout } from '@codelab/modules/layout-stories'

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
