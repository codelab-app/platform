import { ActionType, CrudModal, EntityType } from '@codelab/frontend/shared'
import React from 'react'
import { DeleteTypeForm } from './DeleteTypeForm'

export const DeleteTypeModal = () => {
  return (
    <CrudModal
      entityType={EntityType.Type}
      actionType={ActionType.Delete}
      okText="Delete Type"
      renderForm={() => <DeleteTypeForm />}
    />
  )
}
