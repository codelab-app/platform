import {
  ActionType,
  CrudModal,
  EntityType,
} from '@codelab/frontend/view/components'
import React from 'react'
import { UpdateTypeForm } from './UpdateTypeForm'

export const UpdateTypeModal = () => {
  return (
    <CrudModal
      modalProps={{
        className: 'update-type-modal',
        title: 'Update type',
      }}
      entityType={EntityType.Type}
      actionType={ActionType.Update}
      okText="Update"
      renderForm={() => <UpdateTypeForm />}
    />
  )
}
