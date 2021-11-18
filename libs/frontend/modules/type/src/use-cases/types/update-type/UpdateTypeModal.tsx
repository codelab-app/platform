import {
  ActionType,
  FormUniformsModal,
} from '@codelab/frontend/view/components'
import React from 'react'
import tw from 'twin.macro'
import { useTypeDispatch, useTypeState } from '../../../hooks'
import { UpdateTypeForm } from './UpdateTypeForm'
import { useUpdateTypeForm } from './useUpdateTypeForm'

export const UpdateTypeModal = () => {
  const { actionType } = useTypeState()
  const { resetModal } = useTypeDispatch()
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
        onCancel: () => resetModal(),
        title: <span css={tw`font-semibold`}>Update type</span>,
      }}
      renderForm={() => <UpdateTypeForm {...formProps} />}
    />
  )
}
