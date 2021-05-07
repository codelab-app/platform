import { ActionType, CrudModal, EntityType } from '@codelab/frontend/shared'
import React from 'react'
import { DeleteComponentElementsForm } from './DeleteComponentElementsForm'

export const DeleteComponentElementsModal = () => {
  return (
    <CrudModal
      modalProps={{
        className: 'delete-componentElements-modal',
      }}
      entityType={EntityType.ComponentElement}
      actionType={ActionType.Delete}
      okText="Delete ComponentElements"
      renderForm={() => <DeleteComponentElementsForm />}
    />
  )
}
