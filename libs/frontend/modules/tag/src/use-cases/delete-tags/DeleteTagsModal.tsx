import {
  ActionType,
  FormUniformsModal,
} from '@codelab/frontend/view/components'
import { ModalProps } from 'antd'
import React from 'react'
import tw from 'twin.macro'
import { useTagState } from '../../hooks'
import { DeleteTagsForm } from './DeleteTagsForm'
import { useDeleteTagForm } from './useDeleteTagsForm'

export const DeleteTagsModal = () => {
  const { actionType } = useTagState()
  const { formProps, reset, state } = useDeleteTagForm()
  const { isLoading } = state

  const modalProps: ModalProps = {
    okText: 'Delete Tags',
    okButtonProps: {
      loading: isLoading,
    },
    visible: actionType === ActionType.Delete,
    onCancel: () => reset(),
    title: <span css={tw`font-semibold`}>Delete tags</span>,
  }

  return (
    <FormUniformsModal
      modalProps={modalProps}
      renderForm={() => <DeleteTagsForm {...formProps} />}
    />
  )
}
