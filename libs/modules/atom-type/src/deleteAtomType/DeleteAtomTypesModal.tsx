import { ActionType, CrudModal, EntityType } from '@codelab/frontend/shared'
import React from 'react'
import { DeleteAtomTypesForm } from './DeleteAtomTypesForm'

export const DeleteAtomTypesModal = () => {
  return (
    <CrudModal
      modalProps={{
        className: 'delete-atomTypes-modal',
      }}
      entityType={EntityType.AtomType}
      actionType={ActionType.Delete}
      okText="Delete AtomTypes"
      renderForm={() => <DeleteAtomTypesForm />}
    />
  )
}
