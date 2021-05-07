import { useComponentBuilder } from '@codelab/frontend/builder'
import { ActionType, CrudModal, EntityType } from '@codelab/frontend/shared'
import React from 'react'
import { AddChildComponentElementForm } from './AddChildComponentElementForm'

interface AddChildComponentElementModalProps {
  parentComponentElementId: string | undefined
}

export const AddChildComponentElementModal = ({
  parentComponentElementId,
}: AddChildComponentElementModalProps) => {
  const { getSelectedComponentId } = useComponentBuilder()

  if (!parentComponentElementId) {
    return null
    // throw new Error('Missing parentComponentElementId')
  }

  return (
    <CrudModal
      modalProps={{
        className: 'create-childComponentElement-modal',
      }}
      entityType={EntityType.ChildComponentElement}
      actionType={ActionType.Create}
      okText="Create ChildComponentElement"
      renderForm={() => (
        <AddChildComponentElementForm
          componentId={getSelectedComponentId()}
          parentComponentElementId={parentComponentElementId}
        />
      )}
    />
  )
}
