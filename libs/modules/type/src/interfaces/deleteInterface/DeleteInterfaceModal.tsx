import { ActionType, CrudModal, EntityType } from '@codelab/frontend/shared'
import React from 'react'
import { DeleteInterfaceForm } from './DeleteInterfaceForm'

export const DeleteInterfaceModal = () => {
  return (
    <CrudModal
      entityType={EntityType.Interface}
      actionType={ActionType.Delete}
      okText="Delete Interface"
      renderForm={() => <DeleteInterfaceForm />}
    />
  )
}
