import {
  ActionType,
  FormUniformsModal,
} from '@codelab/frontend/view/components'
import { ModalProps } from 'antd'
import React from 'react'
import tw from 'twin.macro'
import { useTypeDispatch, useTypeState } from '../../../hooks'
import { UpdateTypeForm } from './UpdateTypeForm'
import { useUpdateTypeForm } from './useUpdateTypeForm'

export const UpdateTypeModal = () => {
  const { actionType } = useTypeState()
  const { resetModal } = useTypeDispatch()
  const { isLoading, formProps } = useUpdateTypeForm()

  const modalProps: ModalProps = {
    className: 'update-type-modal',
    okText: 'Update',
    okButtonProps: {
      loading: isLoading,
    },
    visible: actionType === ActionType.Update,
    onCancel: () => resetModal(),
    title: <span css={tw`font-semibold`}>Update type</span>,
  }

  return (
    <FormUniformsModal
      modalProps={modalProps}
      renderForm={() => <UpdateTypeForm {...formProps} />}
    />
  )
}
