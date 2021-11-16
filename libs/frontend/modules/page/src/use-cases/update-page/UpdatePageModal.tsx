import {
  ActionType,
  FormUniformsModal,
} from '@codelab/frontend/view/components'
import React from 'react'
import { usePageState } from '../../hooks'
import { UpdatePageForm } from './UpdatePageForm'
import { useUpdatePageForm } from './useUpdateAppForm'

export const UpdatePageModal = () => {
  const { actionType } = usePageState()
  const { formProps, state, reset } = useUpdatePageForm()
  const { isLoading } = state

  const modalProps = {
    visible: actionType === ActionType.Update,
    onCancel: reset,
    okText: 'Update Page',
    okButtonProps: { loading: isLoading },
  }

  return (
    <FormUniformsModal
      modalProps={modalProps}
      renderForm={() => <UpdatePageForm {...formProps} />}
    />
  )
}
