import { ActionType, CrudModal, EntityType } from '@codelab/frontend/shared'
import React from 'react'
import { CreateFieldForm } from './CreateFieldForm'

export const CreateFieldModal = () => {
  return (
    <CrudModal
      modalProps={{
        className: 'create-field-modal',
        title: 'Create field',
      }}
      entityType={EntityType.Field}
      actionType={ActionType.Create}
      okText="Create"
      renderForm={() => <CreateFieldForm />}
    />
  )
}
