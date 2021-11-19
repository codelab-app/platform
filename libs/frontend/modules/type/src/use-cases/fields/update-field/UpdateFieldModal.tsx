import {
  ActionType,
  FormUniformsModal,
} from '@codelab/frontend/view/components'
import React from 'react'
import tw from 'twin.macro'
import { useFieldDispatch, useFieldState } from '../../../hooks'
import { UpdateFieldForm } from './UpdateFieldForm'
import { useUpdateFieldForm } from './useUpdateFieldForm'

export const UpdateFieldModal = () => {
  const { actionType } = useFieldState()
  const { resetModal } = useFieldDispatch()

  const {
    state: { isLoading },
    formProps,
  } = useUpdateFieldForm()

  return (
    <FormUniformsModal
      modalProps={{
        className: 'update-field-modal',
        okText: 'Update',
        okButtonProps: {
          loading: isLoading,
        },
        visible: actionType === ActionType.Update,
        onCancel: () => resetModal(),
        title: <span css={tw`font-semibold`}>Update field</span>,
      }}
      renderForm={() => <UpdateFieldForm {...formProps} />}
    />
  )
}
