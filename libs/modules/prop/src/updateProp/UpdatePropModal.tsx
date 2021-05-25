import { ActionType, CrudModal, EntityType } from '@codelab/frontend/shared'
import React from 'react'
import { UpdatePropForm } from './UpdatePropForm'

export const UpdatePropModal = () => (
  <CrudModal
    modalProps={{
      className: 'update-prop-modal',
      title: 'Update Prop',
    }}
    entityType={EntityType.Prop}
    actionType={ActionType.Update}
    okText="Update Prop"
    renderForm={() => <UpdatePropForm />}
  />
)
