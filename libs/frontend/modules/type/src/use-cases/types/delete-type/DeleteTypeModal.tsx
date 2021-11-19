import {
  ActionType,
  FormUniformsModal,
} from '@codelab/frontend/view/components'
import React from 'react'
import tw from 'twin.macro'
import { useTypeDispatch, useTypeState } from '../../../hooks'
import { DeleteTypeForm } from './DeleteTypeForm'
import { useDeleteTypeForm } from './useDeleteTypeForm'

export const DeleteTypeModal = () => {
  const { actionType } = useTypeState()
  const { resetModal } = useTypeDispatch()

  const {
    state: { isLoading },
    formProps,
  } = useDeleteTypeForm()

  return (
    <FormUniformsModal
      modalProps={{
        className: 'delete-type-modal',
        okText: 'Delete',
        okButtonProps: {
          loading: isLoading,
        },
        visible: actionType === ActionType.Delete,
        onCancel: () => resetModal(),
        title: <span css={tw`font-semibold`}>Delete type</span>,
      }}
      renderForm={() => <DeleteTypeForm {...formProps} />}
    />
  )
}
