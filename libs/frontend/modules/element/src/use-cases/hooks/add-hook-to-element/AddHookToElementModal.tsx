import {
  ActionType,
  CrudModal,
  EntityType,
} from '@codelab/frontend/view/components'
import React from 'react'
import {
  AddHookToElementForm,
  AddHookToElementFormProps,
} from './AddHookToElementForm'

export const AddHookToElementModal = ({
  elementId,
}: Pick<AddHookToElementFormProps, 'elementId'>) => {
  return (
    <CrudModal
      entityType={EntityType.Hook}
      actionType={ActionType.Create}
      okText="New hook"
      renderForm={() => <AddHookToElementForm elementId={elementId} />}
    />
  )
}
