import { ActionType, CrudModal, EntityType } from '@codelab/frontend/shared'
import React from 'react'
import { CreateTypeForm } from './CreateTypeForm'

export const CreateTypeModal = () => {
  return (
    <CrudModal
      modalProps={{
        className: 'create-type-modal',
        title: 'Create type',
      }}
      entityType={EntityType.Type}
      actionType={ActionType.Create}
      okText="Create"
      renderForm={() => <CreateTypeForm />}
    />
  )
}
