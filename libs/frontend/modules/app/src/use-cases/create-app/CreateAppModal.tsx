import {
  ActionType,
  CrudModal,
  EntityType,
} from '@codelab/frontend/view/components'
import React from 'react'
import { CreateAppForm } from './CreateAppForm'

export const CreateAppModal = () => {
  return (
    <CrudModal
      entityType={EntityType.App}
      actionType={ActionType.Create}
      okText="Create App"
      renderForm={() => <CreateAppForm />}
    />
  )
}
