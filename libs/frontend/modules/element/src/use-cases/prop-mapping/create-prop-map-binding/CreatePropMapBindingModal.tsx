import {
  ActionType,
  FormUniformsModal,
} from '@codelab/frontend/view/components'
import React from 'react'
import tw from 'twin.macro'
import { usePropMapBindingState } from '../../../hooks'
import {
  CreatePropMapBindingForm,
  CreatePropMapBindingFormProps,
} from './CreatePropMapBindingForm'
import { useCreatePropMapBindingForm } from './useCreatePropMapBindingForm'

export const CreatePropMapBindingModal = (
  props: Pick<
    CreatePropMapBindingFormProps,
    'elementId' | 'providePropCompletion' | 'tree'
  >,
) => {
  const { actionType } = usePropMapBindingState()

  const {
    formProps,
    state: { isLoading },
    reset,
  } = useCreatePropMapBindingForm()

  return (
    <FormUniformsModal
      modalProps={{
        okText: 'Create',
        okButtonProps: {
          loading: isLoading,
        },
        visible: actionType === ActionType.Create,
        onCancel: () => reset(),
        title: <span css={tw`font-semibold`}>Create prop binding</span>,
      }}
      renderForm={() => <CreatePropMapBindingForm {...props} {...formProps} />}
    />
  )
}
