import { ActionType, CrudModal, EntityType } from '@codelab/frontend/shared'
import React from 'react'
import { CreatePropForm } from './CreatePropForm'

export const CreatePropModal = () => {
  return (
    <CrudModal
      modalProps={{
        className: 'create-prop-modal',
        title: 'Add Prop',
      }}
      entityType={EntityType.Prop}
      actionType={ActionType.Create}
      okText="Create Prop"
      renderForm={() => <CreatePropForm />}
    />
  )
}
