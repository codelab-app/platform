import {
  ActionType,
  CrudModal,
  EntityType,
} from '@codelab/frontend/view/components'
import React from 'react'
import { useTagState } from '../../domain/use-tag/useTagState'
import { CreateTagForm } from './CreateTagForm'

export const CreateTagModal = () => {
  const { selectedTag } = useTagState()

  return (
    <CrudModal
      entityType={EntityType.Tag}
      actionType={ActionType.Create}
      okText="Create Tag"
      renderForm={() => <CreateTagForm parentTagId={selectedTag?.toString()} />}
    />
  )
}
