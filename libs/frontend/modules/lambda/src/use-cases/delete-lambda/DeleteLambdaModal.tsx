import {
  ActionType,
  FormUniformsModal,
} from '@codelab/frontend/view/components'
import React from 'react'
import { useLambdaState } from '../../hooks'
import { DeleteLambdaForm } from './DeleteLambdaForm'
import { useDeleteLambdaForm } from './useDeleteLambdaForm'

export const DeleteLambdaModal = () => {
  const { actionType } = useLambdaState()
  const { formProps, reset, state } = useDeleteLambdaForm()
  const { isLoading } = state

  const modalProps = {
    visible: actionType === ActionType.Delete,
    onCancel: reset,
    okText: 'Delete Lambda',
    okButtonProps: { loading: isLoading },
  }

  return (
    <FormUniformsModal
      modalProps={modalProps}
      renderForm={() => <DeleteLambdaForm {...formProps} />}
    />
  )
}
