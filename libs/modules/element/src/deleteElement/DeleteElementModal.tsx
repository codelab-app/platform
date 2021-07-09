import { ActionType, CrudModal, EntityType } from '@codelab/frontend/shared'
import React from 'react'
import { DeleteElementForm, DeleteElementFormProps } from './DeleteElementForm'

interface Props {
  formProps?: DeleteElementFormProps
}

export const DeleteElementModal = ({ formProps }: Props) => {
  return (
    <CrudModal
      entityType={EntityType.Element}
      actionType={ActionType.Delete}
      okText="Delete"
      renderForm={() => <DeleteElementForm {...formProps} />}
    />
  )
}
