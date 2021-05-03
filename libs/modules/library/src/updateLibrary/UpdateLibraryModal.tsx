import { ActionType, CrudModal, EntityType } from '@codelab/frontend/shared'
import React from 'react'
import { UpdateLibraryForm } from './UpdateLibraryForm'

export const UpdateLibraryModal = () => {
  return (
    <CrudModal
      entityType={EntityType.Library}
      actionType={ActionType.Update}
      okText="Update library"
      renderForm={() => <UpdateLibraryForm />}
    />
  )
}
