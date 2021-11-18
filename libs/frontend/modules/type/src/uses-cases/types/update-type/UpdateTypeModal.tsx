import {
  ActionType,
  FormUniformsModal,
} from '@codelab/frontend/view/components'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import tw from 'twin.macro'
import { selectType, typeActions } from '../../../store/typeState'
import { UpdateTypeForm } from './UpdateTypeForm'
import { useUpdateTypeForm } from './useUpdateTypeForm'

export const UpdateTypeModal = () => {
  const { actionType } = useSelector(selectType)
  const dispatch = useDispatch()
  const reset = () => dispatch(typeActions.resetModal())
  const { isLoading, formProps } = useUpdateTypeForm()

  return (
    <FormUniformsModal
      modalProps={{
        className: 'update-type-modal',
        okText: 'Update',
        okButtonProps: {
          loading: isLoading,
        },
        visible: actionType === ActionType.Update,
        onCancel: () => reset(),
        title: <span css={tw`font-semibold`}>Update type</span>,
      }}
      renderForm={() => <UpdateTypeForm {...formProps} />}
    />
  )
}
