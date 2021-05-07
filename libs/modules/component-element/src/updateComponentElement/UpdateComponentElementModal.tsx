import { ActionType, CrudModal, EntityType } from '@codelab/frontend/shared'
import React from 'react'
import { UpdateComponentElementForm } from './UpdateComponentElementForm'

export const UpdateComponentElementModal = () => {
  return (
    <CrudModal
      modalProps={{
        className: 'update-component-modal',
      }}
      entityType={EntityType.ComponentElement}
      actionType={ActionType.Update}
      okText="Update Component"
      renderForm={() => <UpdateComponentElementForm />}
    />
  )
}
