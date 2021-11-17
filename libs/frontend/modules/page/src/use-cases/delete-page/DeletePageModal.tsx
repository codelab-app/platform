import {
  ActionType,
  FormUniformsModal,
} from '@codelab/frontend/view/components'
import React from 'react'
import { usePageState } from '../../hooks'
import { DeletePageForm } from './DeletePageForm'
import { useDeletePageForm } from './useDeletePageForm'

export const DeletePageModal = () => {
  const { actionType } = usePageState()
  const { formProps, reset, state } = useDeletePageForm()
  const { isLoading } = state

  const modalProps = {
    visible: actionType === ActionType.Delete,
    onCancel: reset,
    okText: 'Delete Page',
    okButtonProps: { loading: isLoading },
  }

  return (
    <FormUniformsModal
      modalProps={modalProps}
      renderForm={() => <DeletePageForm {...formProps} />}
    />
  )
}
