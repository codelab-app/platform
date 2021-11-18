import {
  ActionType,
  FormUniformsModal,
} from '@codelab/frontend/view/components'
import React from 'react'
import tw from 'twin.macro'
import { useElementDispatch, useElementState } from '../../../hooks'
import { DeleteElementForm, DeleteElementFormProps } from './DeleteElementForm'
import { useDeleteElementForm } from './useDeleteElementForm'

interface Props {
  formProps?: Partial<DeleteElementFormProps>
}

export const DeleteElementModal = ({ formProps }: Props) => {
  const { actionType } = useElementState()
  const { resetModal } = useElementDispatch()

  const {
    state: { isLoading },
    formProps: hookFormProps,
  } = useDeleteElementForm()

  return (
    <FormUniformsModal
      modalProps={{
        okText: 'Delete',
        okButtonProps: {
          loading: isLoading,
        },
        visible: actionType === ActionType.Delete,
        onCancel: () => resetModal(),
        title: <span css={tw`font-semibold`}>Delete element</span>,
      }}
      renderForm={() => <DeleteElementForm {...formProps} {...hookFormProps} />}
    />
  )
}
