import {
  ActionType,
  FormUniformsModal,
} from '@codelab/frontend/view/components'
import React from 'react'
import { useAtomState } from '../../hooks'
import { CreateAtomForm } from './CreateAtomForm'
import { useCreateAtomForm } from './useCreateAtomForm'

export const CreateAtomModal = () => {
  const { actionType } = useAtomState()
  const { formProps, reset, state } = useCreateAtomForm()
  const { isLoading } = state

  const modalProps = {
    visible: actionType === ActionType.Create,
    onCancel: reset,
    okText: 'Create Atom',
    okButtonProps: { loading: isLoading },
  }

  return (
    <FormUniformsModal
      modalProps={modalProps}
      renderForm={() => <CreateAtomForm {...formProps} />}
    />
  )
}
