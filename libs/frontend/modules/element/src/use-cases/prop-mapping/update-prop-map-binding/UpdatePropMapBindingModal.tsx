import {
  ActionType,
  FormUniformsModal,
} from '@codelab/frontend/view/components'
import React from 'react'
import { useSelector } from 'react-redux'
import tw from 'twin.macro'
import { selectPropMapBinding } from '../../../store'
import {
  UpdatePropMapBindingForm,
  UpdatePropMapBindingFormProps,
} from './UpdatePropMapBindingForm'
import { useUpdatePropMapBindingForm } from './updatePropMapBindingForm'

export const UpdatePropMapBindingModal = (
  props: Pick<
    UpdatePropMapBindingFormProps,
    'elementId' | 'providePropCompletion' | 'tree'
  >,
) => {
  const { actionType } = useSelector(selectPropMapBinding)

  const {
    state: { isLoading },
    reset,
    formProps,
  } = useUpdatePropMapBindingForm()

  return (
    <FormUniformsModal
      modalProps={{
        okText: 'Update',
        okButtonProps: {
          loading: isLoading,
        },
        visible: actionType === ActionType.Update,
        onCancel: () => reset(),
        title: <span css={tw`font-semibold`}>Update prop binding</span>,
      }}
      renderForm={() => <UpdatePropMapBindingForm {...props} {...formProps} />}
    />
  )
}
