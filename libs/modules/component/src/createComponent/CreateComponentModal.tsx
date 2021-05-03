import { ActionType, CrudModal, EntityType } from '@codelab/frontend/shared'
import React from 'react'
import { CreateComponentForm } from './CreateComponentForm'

export const CreateComponentModal = () => {
  return (
    <CrudModal
      modalProps={{
        className: 'create-component-modal',
      }}
      entityType={EntityType.Component}
      actionType={ActionType.Create}
      okText="Create Component"
      renderForm={() => <CreateComponentForm />}
    />
  )
}
