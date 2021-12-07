import {
  ActionType,
  FormUniformsModal,
} from '@codelab/frontend/view/components'
import { ModalProps } from 'antd'
import React from 'react'
import tw from 'twin.macro'
import { useUserDispatch, useUserState } from '../../hooks'
import { DeleteUserForm } from './DeleteUserForm'
import { useDeleteUserForm } from './useDeleteUserForm'

export const DeleteUserModal = () => {
  const { actionType } = useUserState()
  const { resetModal } = useUserDispatch()
  const { formProps, state } = useDeleteUserForm()
  const { isLoading } = state

  const modalProps: ModalProps = {
    okText: 'Delete User',
    okButtonProps: { loading: isLoading },
    visible: actionType === ActionType.Delete,
    onCancel: () => resetModal(),
    title: <span css={tw`font-semibold`}>Delete user</span>,
  }

  return (
    <FormUniformsModal
      modalProps={modalProps}
      renderForm={() => <DeleteUserForm {...formProps} />}
    />
  )
}
