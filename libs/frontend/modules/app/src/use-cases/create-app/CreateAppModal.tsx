import {
  ActionType,
  FormUniformsModal,
} from '@codelab/frontend/view/components'
import React from 'react'
import { useAppState } from '../../hooks'
import { CreateAppForm } from './CreateAppForm'
import { useCreateAppForm } from './useCreateAppForm'

export const CreateAppModal = () => {
  const { actionType } = useAppState()
  const { formProps, reset, state } = useCreateAppForm()
  const { isLoading } = state

  const modalProps = {
    visible: actionType === ActionType.Create,
    onCancel: reset,
    okText: 'Create App',
    okButtonProps: { loading: isLoading },
  }

  return (
    <FormUniformsModal
      modalProps={modalProps}
      renderForm={() => <CreateAppForm {...formProps} />}
    />
  )
}
