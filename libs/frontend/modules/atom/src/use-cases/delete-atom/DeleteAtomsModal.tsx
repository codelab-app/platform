import {
  ActionType,
  FormUniformsModal,
} from '@codelab/frontend/view/components'
import React from 'react'
import { useAtomState } from '../../hooks'
import { DeleteAtomForm } from './DeleteAtomsForm'
import { useDeleteAtomForm } from './useDeleteAtomForm'

export const DeleteAtomModal = () => {
  const { actionType } = useAtomState()
  const { formProps, reset, state } = useDeleteAtomForm()
  const { isLoading } = state

  const modalProps = {
    visible: actionType === ActionType.Delete,
    onCancel: reset,
    okText: 'Delete Atom',
    okButtonProps: { loading: isLoading },
    className: 'delete-atoms-modal',
    title: 'Delete Confirmation',
  }

  return (
    <FormUniformsModal
      modalProps={modalProps}
      renderForm={() => <DeleteAtomForm {...formProps} />}
    />
  )
}
