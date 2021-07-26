import { ActionType, CrudModal, EntityType } from '@codelab/frontend/shared'
import React from 'react'
import { DeleteLambdaForm } from './DeleteLambdaForm'

export const DeleteLambdaModal = () => {
  return (
    <CrudModal
      entityType={EntityType.Lambda}
      actionType={ActionType.Delete}
      okText="Delete App"
      renderForm={() => <DeleteLambdaForm />}
    />
  )
}
