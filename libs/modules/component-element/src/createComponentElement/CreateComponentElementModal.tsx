import { ActionType, CrudModal, EntityType } from '@codelab/frontend/shared'
import React from 'react'
import { CreateComponentElementForm } from './CreateComponentElementForm'

interface CreateComponentElementModalProps {
  componentId: string
}

export const CreateComponentElementModal = ({
  componentId,
}: CreateComponentElementModalProps) => {
  return (
    <CrudModal
      modalProps={{
        className: 'create-component-element-modal',
      }}
      entityType={EntityType.ComponentElement}
      actionType={ActionType.Create}
      okText="Create ComponentElement"
      renderForm={() => (
        <CreateComponentElementForm componentId={componentId} />
      )}
    />
  )
}
