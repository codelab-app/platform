import {
  ActionType,
  FormUniformsModal,
} from '@codelab/frontend/view/components'
import React from 'react'
import { useAtomState } from '../../hooks'
import { UpdateAtomForm } from './UpdateAtomForm'
import { useUpdateAtomForm } from './useUpdateAtomForm'

export const UpdateAtomModal = () => {
  const { actionType } = useAtomState()
  const { formProps, state, reset } = useUpdateAtomForm()
  const { isLoading } = state

  const modalProps = {
    visible: actionType === ActionType.Update,
    onCancel: reset,
    okText: 'Update Atom',
    okButtonProps: { loading: isLoading },
  }

  return (
    <FormUniformsModal
      modalProps={modalProps}
      renderForm={() => <UpdateAtomForm {...formProps} />}
    />
  )
}
