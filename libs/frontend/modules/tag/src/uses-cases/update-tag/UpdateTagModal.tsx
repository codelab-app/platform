import {
  ActionType,
  CrudModal,
  EntityType,
} from '@codelab/frontend/view/components'
import React from 'react'
import { UpdateTagForm } from './UpdateTagForm'

export const UpdateTagModal = () => {
  return (
    <CrudModal
      entityType={EntityType.Tag}
      actionType={ActionType.Update}
      okText="Update Tag"
      renderForm={() => <UpdateTagForm />}
    />
  )
}
