import {
  ActionType,
  FormUniformsModal,
} from '@codelab/frontend/view/components'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import tw from 'twin.macro'
import { selectType, typeActions } from '../../../store/typeState'
import { CreateTypeForm } from './CreateTypeForm'
import { useCreateTypeForm } from './useCreateTypeForm'

export const CreateTypeModal = () => {
  const { actionType } = useSelector(selectType)
  const dispatch = useDispatch()
  const reset = () => dispatch(typeActions.resetModal())

  const {
    state: { isLoading },
    formProps,
  } = useCreateTypeForm()

  return (
    <FormUniformsModal
      modalProps={{
        className: 'create-type-modal',
        okText: 'Create',
        okButtonProps: {
          loading: isLoading,
        },
        visible: actionType === ActionType.Create,
        onCancel: () => reset(),
        title: <span css={tw`font-semibold`}>Create type</span>,
      }}
      renderForm={() => <CreateTypeForm {...formProps} />}
    />
  )
}
