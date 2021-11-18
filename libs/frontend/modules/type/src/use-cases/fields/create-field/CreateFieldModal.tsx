import {
  ActionType,
  FormUniformsModal,
} from '@codelab/frontend/view/components'
import React from 'react'
import tw from 'twin.macro'
import { useFieldDispatch, useFieldState } from '../../../hooks'
import { CreateFieldForm } from './CreateFieldForm'
import { useCreateFieldForm } from './useCreateFieldForm'

export const CreateFieldModal = () => {
  const { actionType } = useFieldState()
  const { resetModal } = useFieldDispatch()

  const {
    state: { isLoading },
    formProps,
  } = useCreateFieldForm()

  return (
    <FormUniformsModal
      modalProps={{
        className: 'create-field-modal',
        okText: 'Create',
        okButtonProps: {
          loading: isLoading,
        },
        visible: actionType === ActionType.Create,
        onCancel: () => resetModal(),
        title: <span css={tw`font-semibold`}>Create field</span>,
      }}
      renderForm={() => <CreateFieldForm {...formProps} />}
    />
  )
}
