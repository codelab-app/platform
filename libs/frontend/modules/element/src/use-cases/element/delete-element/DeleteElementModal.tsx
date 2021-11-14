import {
  ActionType,
  FormUniformsModal,
} from '@codelab/frontend/view/components'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import tw from 'twin.macro'
import { elementActions, selectElement } from '../../../store'
import { DeleteElementForm, DeleteElementFormProps } from './DeleteElementForm'
import { useDeleteElementForm } from './useDeleteElementForm'

interface Props {
  formProps?: Partial<DeleteElementFormProps>
}

export const DeleteElementModal = ({ formProps }: Props) => {
  const { actionType } = useSelector(selectElement)
  const dispatch = useDispatch()
  const reset = () => dispatch(elementActions.resetModal())

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
        onCancel: () => reset(),
        title: <span css={tw`font-semibold`}>Delete element</span>,
      }}
      renderForm={() => <DeleteElementForm {...formProps} {...hookFormProps} />}
    />
  )
}
