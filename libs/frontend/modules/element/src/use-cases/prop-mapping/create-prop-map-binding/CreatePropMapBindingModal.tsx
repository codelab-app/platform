import {
  ActionType,
  FormUniformsModal,
} from '@codelab/frontend/view/components'
import React from 'react'
import { useSelector } from 'react-redux'
import tw from 'twin.macro'
import { selectPropMapBinding } from '../../../store'
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
  const { actionType } = useSelector(selectPropMapBinding)

  const {
    formProps,
    state: { isLoading },
    reset,
  } = useCreatePropMapBindingForm()

  console.log(actionType)

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
