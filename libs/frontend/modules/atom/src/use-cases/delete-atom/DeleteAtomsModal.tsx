import {
  ActionType,
  CrudModal,
  EntityType,
} from '@codelab/frontend/view/components'
import React from 'react'
import { DeleteAtomsForm } from './DeleteAtomsForm'

export const DeleteAtomsModal = () => (
  <CrudModal
    modalProps={{
      className: 'delete-atoms-modal',
      title: 'Delete Confirmation',
    }}
    entityType={EntityType.Atom}
    actionType={ActionType.Delete}
    okText="Delete Atom"
    renderForm={() => <DeleteAtomsForm />}
  />
)
