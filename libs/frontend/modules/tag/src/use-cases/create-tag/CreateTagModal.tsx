import {
  ActionType,
  FormUniformsModal,
} from '@codelab/frontend/view/components'
import { ModalProps } from 'antd'
import React from 'react'
import tw from 'twin.macro'
import { useTagState } from '../../hooks'
import { CreateTagForm } from './CreateTagForm'
import { useCreateTagForm } from './useCreateTagForm'

export const CreateTagModal = () => {
  const { selectedTag, actionType } = useTagState()
  const { formProps, reset, state } = useCreateTagForm(selectedTag?.toString())
  const { isLoading } = state

  const modalProps: ModalProps = {
    okText: 'Create Tag',
    okButtonProps: { loading: isLoading },
    visible: actionType === ActionType.Create,
    onCancel: () => reset(),
    title: <span css={tw`font-semibold`}>Add hook to element</span>,
  }

  return (
    <FormUniformsModal
      modalProps={modalProps}
      renderForm={() => <CreateTagForm {...formProps} />}
    />
  )
}
