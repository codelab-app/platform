import {
  ActionType,
  FormUniformsModal,
} from '@codelab/frontend/view/components'
import React from 'react'
import { useSelector } from 'react-redux'
import tw from 'twin.macro'
import { selectHook } from '../../../store'
import {
  AddHookToElementForm,
  AddHookToElementFormProps,
} from './AddHookToElementForm'
import { useAddHookToElementForm } from './useAddHookToElementForm'

export const AddHookToElementModal = ({
  elementId,
}: Pick<AddHookToElementFormProps, 'elementId'>) => {
  const { actionType } = useSelector(selectHook)

  const {
    formProps,
    reset,
    state: { isLoading },
  } = useAddHookToElementForm(elementId)

  return (
    <FormUniformsModal
      modalProps={{
        okText: 'Add hook',
        okButtonProps: {
          loading: isLoading,
        },
        visible: actionType === ActionType.Create,
        onCancel: () => reset(),
        title: <span css={tw`font-semibold`}>Add hook to element</span>,
      }}
      renderForm={() => (
        <AddHookToElementForm elementId={elementId} {...formProps} />
      )}
    />
  )
}
