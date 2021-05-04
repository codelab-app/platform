import { ActionType, CrudModal, EntityType } from '@codelab/frontend/shared'
import React from 'react'
import { DeletePropTypeCForm } from './DeletePropTypeCForm'

export const DeletePropTypeCsModal = () => (
  <CrudModal
    entityType={EntityType.PropTypeC}
    actionType={ActionType.Delete}
    okText="Delete PropTypeC"
    renderForm={() => <DeletePropTypeCForm />}
  />
)
