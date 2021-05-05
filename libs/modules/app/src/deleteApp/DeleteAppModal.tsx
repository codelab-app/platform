import { ActionType, CrudModal, EntityType } from '@codelab/frontend/shared'
import React from 'react'
import { DeleteAppForm } from './DeleteAppForm'

export const DeleteAppModal = () => {
  return (
    <CrudModal
      entityType={EntityType.App}
      actionType={ActionType.Delete}
      okText="Delete App"
      renderForm={() => <DeleteAppForm />}
    />
  )
}
