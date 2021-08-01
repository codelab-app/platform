import { ActionType, CrudModal, EntityType } from '@codelab/frontend/shared'
import React from 'react'
import { UpdateLambdaForm } from './UpdateLambdaForm'

export const UpdateLambdaModal = () => {
  return (
    <CrudModal
      entityType={EntityType.Lambda}
      actionType={ActionType.Update}
      okText="Update Lambda"
      renderForm={() => <UpdateLambdaForm />}
    />
  )
}
