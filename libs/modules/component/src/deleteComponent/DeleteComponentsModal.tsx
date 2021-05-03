import { ActionType, CrudModal, EntityType } from '@codelab/frontend/shared'
import React from 'react'
import { DeleteComponentsForm } from './DeleteComponentsForm'

export const DeleteComponentsModal = () => {
  return (
    <CrudModal
      modalProps={{
        className: 'delete-components-modal',
      }}
      entityType={EntityType.Component}
      actionType={ActionType.Delete}
      okText="Delete Component"
      renderForm={() => <DeleteComponentsForm />}
    />
  )
}
