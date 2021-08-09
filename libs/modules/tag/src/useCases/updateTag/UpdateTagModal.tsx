import { ActionType, CrudModal, EntityType } from '@codelab/frontend/shared'
import React from 'react'
import { UpdateTagForm } from './UpdateTagForm'

export const UpdateTagModal = () => {
  return (
    <CrudModal
      entityType={EntityType.Tag}
      actionType={ActionType.Update}
      okText="Tag"
      renderForm={() => <UpdateTagForm />}
    />
  )
}
