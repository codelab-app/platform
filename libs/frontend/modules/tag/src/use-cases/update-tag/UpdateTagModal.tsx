import {
  ActionType,
  FormUniformsModal,
} from '@codelab/frontend/view/components'
import { ModalProps } from 'antd'
import React from 'react'
import tw from 'twin.macro'
import { useTagState } from '../../hooks'
import { UpdateTagForm } from './UpdateTagForm'
import { useUpdateTagForm } from './useUpdateTagForm'

export const UpdateTagModal = () => {
  const { actionType } = useTagState()
  const { formProps, reset, state } = useUpdateTagForm()
  const { isLoading } = state

  const modalProps: ModalProps = {
    okText: 'Update Tag',
    okButtonProps: {
      loading: isLoading,
    },
    visible: actionType === ActionType.Update,
    onCancel: () => reset(),
    title: <span css={tw`font-semibold`}>Update Component</span>,
  }

  return (
    <FormUniformsModal
      modalProps={modalProps}
      renderForm={() => <UpdateTagForm {...formProps} />}
    />
  )
}
