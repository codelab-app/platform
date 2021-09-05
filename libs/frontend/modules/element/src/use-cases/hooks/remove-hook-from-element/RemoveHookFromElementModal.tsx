import {
  ActionType,
  CrudModal,
  EntityType,
} from '@codelab/frontend/view/components'
import React from 'react'
import {
  RemoveHookFromElementForm,
  RemoveHookFromElementFormProps,
} from './RemoveHookFromElementForm'

export const RemoveHookFromElementModal = ({
  elementId,
}: Pick<RemoveHookFromElementFormProps, 'elementId'>) => {
  return (
    <CrudModal
      entityType={EntityType.Hook}
      actionType={ActionType.Delete}
      okText="Remove"
      renderForm={() => <RemoveHookFromElementForm elementId={elementId} />}
    />
  )
}
