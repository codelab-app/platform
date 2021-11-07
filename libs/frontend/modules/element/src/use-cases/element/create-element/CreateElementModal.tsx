import {
  ActionType,
  CrudModal,
  EntityType,
} from '@codelab/frontend/view/components'
import React from 'react'
import { CreateElementForm, CreateElementFormProps } from './CreateElementForm'

export const CreateElementModal = ({
  formProps,
}: {
  formProps: CreateElementFormProps
}) => {
  return (
    <CrudModal
      entityType={EntityType.Element}
      actionType={ActionType.Create}
      okText="Create"
      renderForm={() => <CreateElementForm {...formProps} />}
    />
  )
}
