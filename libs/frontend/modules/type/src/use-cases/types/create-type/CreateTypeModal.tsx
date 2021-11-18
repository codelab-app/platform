import {
  ActionType,
  FormUniformsModal,
} from '@codelab/frontend/view/components'
import React from 'react'
import tw from 'twin.macro'
import { useTypeDispatch, useTypeState } from '../../../hooks'
import { CreateTypeForm } from './CreateTypeForm'
import { useCreateTypeForm } from './useCreateTypeForm'

export const CreateTypeModal = () => {
  const { actionType } = useTypeState()
  const { resetModal } = useTypeDispatch()

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
        onCancel: () => resetModal(),
        title: <span css={tw`font-semibold`}>Create type</span>,
      }}
      renderForm={() => <CreateTypeForm {...formProps} />}
    />
  )
}
