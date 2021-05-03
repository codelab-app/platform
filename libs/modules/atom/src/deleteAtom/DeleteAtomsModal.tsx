import { ActionType, CrudModal, EntityType } from '@codelab/frontend/shared'
import React from 'react'
import { DeleteAtomsForm } from './DeleteAtomsForm'

export const DeleteAtomsModal = () => (
  <CrudModal
    modalProps={{
      className: 'delete-atoms-modal',
    }}
    entityType={EntityType.Atom}
    actionType={ActionType.Delete}
    okText="Delete Atoms"
    renderForm={() => <DeleteAtomsForm />}
  />
)
