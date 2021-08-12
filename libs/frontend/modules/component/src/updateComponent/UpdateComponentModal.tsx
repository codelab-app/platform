import {
  ActionType,
  CrudModal,
  EntityType,
} from '@codelab/frontend/view/components'
import React from 'react'
import { UpdateComponentForm } from './UpdateComponentForm'

export const UpdateComponentModal = () => {
  return (
    <CrudModal
      entityType={EntityType.Component}
      actionType={ActionType.Update}
      okText="Update Component"
      renderForm={() => <UpdateComponentForm />}
    />
  )
}
