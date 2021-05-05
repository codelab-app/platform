import { ActionType, CrudModal, EntityType } from '@codelab/frontend/shared'
import React from 'react'
import { UpdatePageForm } from './UpdatePageForm'

export const UpdatePageModal = () => {
  return (
    <CrudModal
      entityType={EntityType.Page}
      actionType={ActionType.Update}
      okText="Update Page"
      renderForm={() => <UpdatePageForm />}
    />
  )
}
