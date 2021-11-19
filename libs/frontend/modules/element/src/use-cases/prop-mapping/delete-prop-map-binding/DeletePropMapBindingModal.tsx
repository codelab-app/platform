import {
  ActionType,
  FormUniformsModal,
} from '@codelab/frontend/view/components'
import React from 'react'
import tw from 'twin.macro'
import { usePropMapBindingState } from '../../../hooks'
import {
  DeletePropMapBindingForm,
  DeletePropMapBindingFormProps,
} from './DeletePropMapBindingForm'
import { useDeletePropMapBindingForm } from './useDeletePropMapBindingForm'

export const DeletePropMapBindingModal = (
  props: Pick<DeletePropMapBindingFormProps, 'elementId'>,
) => {
  const { actionType } = usePropMapBindingState()

  const {
    formProps,
    state: { isLoading },
    reset,
  } = useDeletePropMapBindingForm()

  return (
    <FormUniformsModal
      modalProps={{
        okText: 'Delete',
        okButtonProps: {
          loading: isLoading,
        },
        visible: actionType === ActionType.Delete,
        onCancel: () => reset(),
        title: <span css={tw`font-semibold`}>Delete prop binding</span>,
      }}
      renderForm={() => <DeletePropMapBindingForm {...props} {...formProps} />}
    />
  )
}
