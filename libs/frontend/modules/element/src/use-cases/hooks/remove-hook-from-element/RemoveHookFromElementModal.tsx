import {
  ActionType,
  FormUniformsModal,
} from '@codelab/frontend/view/components'
import React from 'react'
import tw from 'twin.macro'
import { useHookState } from '../../../hooks'
import { RemoveHookFromElementForm } from './RemoveHookFromElementForm'
import { useRemoveHookFromElementForm } from './useRemoveHookFromElementForm'

export interface RemoveHookFromElementModalProps {
  elementId: string
}

export const RemoveHookFromElementModal = ({
  elementId,
}: RemoveHookFromElementModalProps) => {
  const { actionType } = useHookState()

  const {
    formProps,
    reset,
    state: { isLoading },
  } = useRemoveHookFromElementForm(elementId)

  return (
    <FormUniformsModal
      modalProps={{
        okText: 'Remove',
        okButtonProps: {
          loading: isLoading,
        },
        visible: actionType === ActionType.Delete,
        onCancel: () => reset(),
        title: <span css={tw`font-semibold`}>Remove hook</span>,
      }}
      renderForm={() => <RemoveHookFromElementForm {...formProps} />}
    />
  )
}
