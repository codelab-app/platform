import {
  ActionType,
  CrudModal,
  EntityType,
} from '@codelab/frontend/view/components'
import React from 'react'
import { UpdateFieldForm } from './UpdateFieldForm'

export const UpdateFieldModal = () => {
  return (
    <CrudModal
      modalProps={{
        className: 'update-field-modal',
        title: 'Update field',
      }}
      entityType={EntityType.Field}
      actionType={ActionType.Update}
      okText="Update"
      renderForm={() => <UpdateFieldForm />}
    />
  )
}
