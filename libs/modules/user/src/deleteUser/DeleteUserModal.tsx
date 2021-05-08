import { ActionType, CrudModal, EntityType } from '@codelab/frontend/shared'
import React from 'react'
import { DeleteUserForm } from './DeleteUserForm'

export const DeleteUserModal = () => (
  <CrudModal
    modalProps={{
      className: 'delete-user-modal',
    }}
    entityType={EntityType.User}
    actionType={ActionType.Delete}
    okText="Delete User"
    renderForm={() => <DeleteUserForm />}
  />
)
