import {
  ActionType,
  FormUniformsModal,
} from '@codelab/frontend/view/components'
import { ModalProps } from 'antd'
import React from 'react'
import tw from 'twin.macro'
import { useHookState } from '../../../hooks'
import { AddHookToElementForm } from './AddHookToElementForm'
import { AddHookToElementModalProps } from './types'
import { useAddHookToElementForm } from './useAddHookToElementForm'

export const AddHookToElementModal = ({
  elementId,
}: AddHookToElementModalProps) => {
  const { actionType } = useHookState()
  const { formProps, reset, state } = useAddHookToElementForm(elementId)
  const { isLoading } = state

  const modalProps: ModalProps = {
    visible: actionType === ActionType.Create,
    onCancel: reset,
    okText: 'Add hook',
    title: <span css={tw`font-semibold`}>Add hook to element</span>,
    okButtonProps: { loading: isLoading },
  }

  return (
    <FormUniformsModal
      modalProps={modalProps}
      renderForm={() => <AddHookToElementForm {...formProps} />}
    />
  )
}
