import { ActionType, CrudModal, EntityType } from '@codelab/frontend/shared'
import React from 'react'
import { UpdateAtomForm } from './UpdateAtomForm'

export const UpdateAtomModal = () => (
  <CrudModal
    modalProps={{
      className: 'update-atom-modal',
    }}
    entityType={EntityType.Atom}
    actionType={ActionType.Update}
    okText="Update Atom"
    renderForm={() => <UpdateAtomForm />}
  />
)
