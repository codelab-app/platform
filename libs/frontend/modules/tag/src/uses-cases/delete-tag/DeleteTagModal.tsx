import {
  ActionType,
  CrudModal,
  EntityType,
} from '@codelab/frontend/view/components'
import React from 'react'
import { DeleteTagForm } from './DeleteTagForm'

export const DeleteTagModal = () => {
  return (
    <CrudModal
      entityType={EntityType.Tag}
      actionType={ActionType.Delete}
      okText="Delete Tag"
      renderForm={() => <DeleteTagForm />}
    />
  )
}
