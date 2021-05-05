import { ActionType, CrudModal, EntityType } from '@codelab/frontend/shared'
import React from 'react'
import { CreateAtomTypeForm } from './CreateAtomTypeForm'

export const CreateAtomTypeModal = () => {
  return (
    <CrudModal
      modalProps={{
        className: 'create-atomType-modal',
      }}
      entityType={EntityType.AtomType}
      actionType={ActionType.Create}
      okText="Create AtomType"
      renderForm={() => <CreateAtomTypeForm />}
    />
  )
}
