import { CRUDActionType } from '@codelab/frontend/abstract/core'
import {
  emptyJsonSchema,
  EmptyJsonSchemaType,
  Form,
  FormModal,
} from '@codelab/frontend/view/components'
import React from 'react'
import tw from 'twin.macro'
import { useUserDispatch, useUserState } from '../../hooks'
import { useDeleteUserForm } from './useDeleteUserForm'

export const DeleteUserModal = () => {
  const {
    onSubmit,
    onSubmitSuccess,
    reset,
    actionType,
    onSubmitError,
    isLoading,
  } = useDeleteUserForm()

  const { deleteMetadata } = useUserState()
  const { userNames } = deleteMetadata || { userNames: '' }

  return (
    <FormModal
      okButtonProps={{ loading: isLoading }}
      okText="Delete User"
      onCancel={() => reset()}
      title={<span css={tw`font-semibold`}>Delete user</span>}
      visible={actionType === CRUDActionType.Delete}
    >
      {({ submitRef }) => (
        <Form<EmptyJsonSchemaType>
          model={{}}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={onSubmitSuccess}
          schema={emptyJsonSchema}
          submitRef={submitRef}
        >
          <h4>Are you sure you want to delete Users {userNames}?</h4>
        </Form>
      )}
    </FormModal>
  )
}
