import { ActionType, CrudModal, EntityType } from '@codelab/frontend/shared'
import React from 'react'
import { DeletePageForm } from './DeletePageForm'

export const DeletePageModal = () => {
  return (
    <CrudModal
      entityType={EntityType.Page}
      actionType={ActionType.Delete}
      okText="Delete Page"
      renderForm={() => <DeletePageForm />}
    />
  )
}
