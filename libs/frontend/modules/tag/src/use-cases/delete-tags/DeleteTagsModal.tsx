import {
  ActionType,
  CrudModal,
  EntityType,
} from '@codelab/frontend/view/components'
import React from 'react'
import { DeleteTagsForm } from './DeleteTagsForm'

export const DeleteTagsModal = () => {
  return (
    <CrudModal
      entityType={EntityType.Tag}
      actionType={ActionType.Delete}
      okText="Delete Tags"
      renderForm={() => <DeleteTagsForm />}
    />
  )
}
