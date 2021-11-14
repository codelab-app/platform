import {
  ActionType,
  FormUniformsModal,
} from '@codelab/frontend/view/components'
import React from 'react'
import { useAppState } from '../../hooks'
import { UpdateAppForm } from './UpdateAppForm'
import { useUpdateAppForm } from './useUpdateAppForm'

export const UpdateAppModal = () => {
  const { actionType } = useAppState()
  const { formProps, state, reset } = useUpdateAppForm()
  const { isLoading } = state

  const modalProps = {
    visible: actionType === ActionType.Update,
    onCancel: reset,
    okText: 'Update App',
    okButtonProps: { loading: isLoading },
  }

  return (
    <FormUniformsModal
      modalProps={modalProps}
      renderForm={() => <UpdateAppForm {...formProps} />}
    />
  )
}
