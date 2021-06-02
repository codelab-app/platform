import { ActionType, CrudModal, EntityType } from '@codelab/frontend/shared'
import React from 'react'
import {
  DeletePageElementForm,
  DeletePageElementFormProps,
} from './DeletePageElementForm'

interface Props {
  formProps?: DeletePageElementFormProps
}

export const DeletePageElementModal = ({ formProps }: Props) => {
  return (
    <CrudModal
      entityType={EntityType.PageElement}
      actionType={ActionType.Delete}
      okText="Delete"
      renderForm={() => <DeletePageElementForm {...formProps} />}
    />
  )
}
