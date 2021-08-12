import {
  ActionType,
  CrudModal,
  EntityType,
} from '@codelab/frontend/view/components'
import React from 'react'
import { DeleteComponentForm } from './DeleteComponentForm'

export const DeleteComponentModal = () => {
  return (
    <CrudModal
      entityType={EntityType.Component}
      actionType={ActionType.Delete}
      okText="Delete"
      renderForm={() => <DeleteComponentForm />}
    />
  )
}
