import {
  ActionType,
  FormUniformsModal,
} from '@codelab/frontend/view/components'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import tw from 'twin.macro'
import { selectType, typeActions } from '../../../store/typeState'
import { DeleteTypeForm } from './DeleteTypeForm'
import { useDeleteTypeForm } from './useDeleteTypeForm'

export const DeleteTypeModal = () => {
  const { actionType } = useSelector(selectType)
  const dispatch = useDispatch()
  const reset = () => dispatch(typeActions.resetModal())

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
        onCancel: () => reset(),
        title: <span css={tw`font-semibold`}>Delete type</span>,
      }}
      renderForm={() => <DeleteTypeForm {...formProps} />}
    />
  )
}
