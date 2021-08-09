import { ActionType, CrudModal, EntityType } from '@codelab/frontend/shared'
import React from 'react'
import { CreateTagForm } from './CreateTagForm'

export const CreateTagModal = () => {
  return (
    <CrudModal
      entityType={EntityType.Tag}
      actionType={ActionType.Create}
      okText="Create Tag"
      renderForm={() => <CreateTagForm />}
    />
  )
}
