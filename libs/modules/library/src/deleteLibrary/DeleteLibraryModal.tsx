import { ActionType, CrudModal, EntityType } from '@codelab/frontend/shared'
import React from 'react'
import { DeleteLibraryForm } from './DeleteLibraryForm'

export const DeleteLibraryModal = () => {
  return (
    <CrudModal
      entityType={EntityType.Library}
      actionType={ActionType.Delete}
      okText="Delete library"
      renderForm={() => <DeleteLibraryForm />}
    />
  )
}
