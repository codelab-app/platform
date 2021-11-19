import {
  ActionType,
  FormUniformsModal,
} from '@codelab/frontend/view/components'
import React from 'react'
import tw from 'twin.macro'
import { useFieldDispatch, useFieldState } from '../../../hooks'
import { DeleteFieldForm } from './DeleteFieldForm'
import { useDeleteFieldForm } from './useDeleteFieldForm'

export const DeleteFieldModal = () => {
  const { actionType } = useFieldState()
  const { resetModal } = useFieldDispatch()

  const {
    state: { isLoading },
    formProps,
  } = useDeleteFieldForm()

  return (
    <FormUniformsModal
      modalProps={{
        className: 'delete-field-modal',
        okText: 'Delete',
        okButtonProps: {
          loading: isLoading,
        },
        visible: actionType === ActionType.Delete,
        onCancel: () => resetModal(),
        title: <span css={tw`font-semibold`}>Delete field</span>,
      }}
      renderForm={() => <DeleteFieldForm {...formProps} />}
    />
  )
}

DeleteFieldModal.displayName = 'DeleteFieldModal'
