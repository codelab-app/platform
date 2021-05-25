import { ActionType, CrudModal, EntityType } from '@codelab/frontend/shared'
import React from 'react'
import { DeletePropForm } from './DeletePropForm'

export const DeletePropModal = () => (
  <CrudModal
    modalProps={{
      className: 'delete-prop-modal',
      title: 'Delete Confirmation',
    }}
    entityType={EntityType.Prop}
    actionType={ActionType.Delete}
    okText="Delete Prop"
    renderForm={() => <DeletePropForm />}
  />
)
