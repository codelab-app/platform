import {
  ActionType,
  CrudModal,
  EntityType,
} from '@codelab/frontend/view/components'
import React from 'react'
import { CreateLambdaForm } from './CreateLambdaForm'

export const CreateLambdaModal = () => {
  return (
    <CrudModal
      entityType={EntityType.Lambda}
      actionType={ActionType.Create}
      okText="Create Lambda"
      modalProps={{ width: '80vw' }}
      renderForm={() => <CreateLambdaForm />}
    />
  )
}
