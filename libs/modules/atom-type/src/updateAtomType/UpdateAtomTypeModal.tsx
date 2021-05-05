import { ActionType, CrudModal, EntityType } from '@codelab/frontend/shared'
import React from 'react'
import { UpdateAtomTypeForm } from './UpdateAtomTypeForm'

export const UpdateAtomTypeModal = () => {
  return (
    <CrudModal
      modalProps={{
        className: 'update-atomType-modal',
      }}
      entityType={EntityType.AtomType}
      actionType={ActionType.Update}
      okText="Update AtomType"
      renderForm={() => <UpdateAtomTypeForm />}
    />
  )
}
