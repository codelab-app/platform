import {
  ActionType,
  FormUniformsModal,
} from '@codelab/frontend/view/components'
import React from 'react'
import { useLambdaState } from '../../hooks'
import { CreateLambdaForm } from './CreateLambdaForm'
import { useCreateLambdaForm } from './useCreateLambdaForm'

export const CreateLambdaModal = () => {
  const { actionType } = useLambdaState()
  const { formProps, reset, state } = useCreateLambdaForm()
  const { isLoading } = state

  const modalProps = {
    visible: actionType === ActionType.Create,
    onCancel: reset,
    okText: 'Create Lambda',
    okButtonProps: { loading: isLoading },
  }

  return (
    <FormUniformsModal
      modalProps={modalProps}
      renderForm={() => <CreateLambdaForm {...formProps} />}
    />
  )
}
