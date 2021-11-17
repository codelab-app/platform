import {
  ActionType,
  FormUniformsModal,
} from '@codelab/frontend/view/components'
import React from 'react'
import { useLambdaState } from '../../hooks'
import { UpdateLambdaForm } from './UpdateLambdaForm'
import { useUpdateLambdaForm } from './useUpdateLambdaForm'

export const UpdateLambdaModal = () => {
  const { actionType } = useLambdaState()
  const { formProps, state, reset } = useUpdateLambdaForm()
  const { isLoading } = state

  const modalProps = {
    visible: actionType === ActionType.Update,
    onCancel: reset,
    okText: 'Update Lambda',
    okButtonProps: { loading: isLoading },
  }

  return (
    <FormUniformsModal
      modalProps={modalProps}
      renderForm={() => <UpdateLambdaForm {...formProps} />}
    />
  )
}
