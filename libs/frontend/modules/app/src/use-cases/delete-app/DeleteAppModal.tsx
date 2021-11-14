import {
  ActionType,
  FormUniformsModal,
} from '@codelab/frontend/view/components'
import React from 'react'
import { useAppState } from '../../hooks'
import { DeleteAppForm } from './DeleteAppForm'
import { useDeleteAppForm } from './useDeleteAppForm'

export const DeleteAppModal = () => {
  const { actionType } = useAppState()
  const { formProps, reset, state } = useDeleteAppForm()
  const { isLoading } = state

  const modalProps = {
    visible: actionType === ActionType.Delete,
    onCancel: reset,
    okText: 'Delete App',
    okButtonProps: { loading: isLoading },
  }

  return (
    <FormUniformsModal
      modalProps={modalProps}
      renderForm={() => <DeleteAppForm {...formProps} />}
    />
  )
}
