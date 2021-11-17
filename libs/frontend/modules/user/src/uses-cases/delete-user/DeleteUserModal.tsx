import {
  ActionType,
  FormUniformsModal,
} from '@codelab/frontend/view/components'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import tw from 'twin.macro'
import { selectUser, userActions } from '../../store/userState'
import { DeleteUserForm } from './DeleteUserForm'
import { useDeleteUserForm } from './useDeleteUserForm'

export const DeleteUserModal = () => {
  const { actionType } = useSelector(selectUser)
  const dispatch = useDispatch()
  const reset = () => dispatch(userActions.resetModal())

  const {
    state: { isLoading },
    formProps,
  } = useDeleteUserForm()

  return (
    <FormUniformsModal
      modalProps={{
        okText: 'Delete User',
        okButtonProps: {
          loading: isLoading,
        },
        visible: actionType === ActionType.Delete,
        onCancel: () => reset(),
        title: <span css={tw`font-semibold`}>Delete user</span>,
      }}
      renderForm={() => <DeleteUserForm {...formProps} />}
    />
  )
}
