import { ActionType, CrudModal, EntityType } from '@codelab/frontend/shared'
import React from 'react'
import { CreateInterfaceForm } from './CreateInterfaceForm'

export const CreateInterfaceModal = () => {
  return (
    <CrudModal
      modalProps={{
        className: 'create-interface-modal',
        title: 'Create interface',
      }}
      entityType={EntityType.Interface}
      actionType={ActionType.Create}
      okText="Create"
      renderForm={() => <CreateInterfaceForm />}
    />
  )
}
