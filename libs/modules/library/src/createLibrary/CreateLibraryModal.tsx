import { ActionType, CrudModal, EntityType } from '@codelab/frontend/shared'
import React from 'react'
import { CreateLibraryForm } from './CreateLibraryForm'

export const CreateLibraryModal = () => {
  return (
    <CrudModal
      entityType={EntityType.Library}
      actionType={ActionType.Create}
      okText="Create library"
      renderForm={() => <CreateLibraryForm />}
    />
  )
}
