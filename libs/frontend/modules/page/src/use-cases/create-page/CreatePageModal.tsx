import {
  ActionType,
  FormUniformsModal,
} from '@codelab/frontend/view/components'
import React from 'react'
import { usePageState } from '../../hooks'
import { CreatePageForm } from './CreatePageForm'
import { useCreatePageForm } from './useCreatePageForm'

export const CreatePageModal = () => {
  const { actionType } = usePageState()
  const { formProps, reset, state } = useCreatePageForm()
  const { isLoading } = state

  const modalProps = {
    visible: actionType === ActionType.Create,
    onCancel: reset,
    okText: 'Create Page',
    okButtonProps: { loading: isLoading },
  }

  return (
    <FormUniformsModal
      modalProps={modalProps}
      renderForm={() => <CreatePageForm {...formProps} />}
    />
  )
}
