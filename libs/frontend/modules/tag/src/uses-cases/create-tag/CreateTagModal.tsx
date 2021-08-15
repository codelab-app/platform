import {
  ActionType,
  CrudModal,
  EntityType,
} from '@codelab/frontend/view/components'
import React from 'react'
import { useTagTree } from '../../useTagTree'
import { CreateTagForm } from './CreateTagForm'

export const CreateTagModal = () => {
  const { selectedTag } = useTagTree()

  return (
    <CrudModal
      entityType={EntityType.Tag}
      actionType={ActionType.Create}
      okText="Create Tag"
      renderForm={() => <CreateTagForm parentTagId={selectedTag} />}
    />
  )
}
