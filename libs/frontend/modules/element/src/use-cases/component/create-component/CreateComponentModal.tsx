import {
  ActionType,
  CrudModal,
  EntityType,
} from '@codelab/frontend/view/components'
import React from 'react'
import { CreateComponentForm } from './CreateComponentForm'

export const CreateComponentModal = () => {
  return (
    <CrudModal
      entityType={EntityType.Component}
      actionType={ActionType.Create}
      okText="Create Component"
      renderForm={() => <CreateComponentForm />}
    />
  )
}
