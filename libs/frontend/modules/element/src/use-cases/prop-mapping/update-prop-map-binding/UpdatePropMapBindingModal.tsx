import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { FormModal } from '@codelab/frontend/view/components'
import React from 'react'
import tw from 'twin.macro'
import { usePropMapBindingState } from '../../../hooks'
import { PropMapBindingProps } from '../create-prop-map-binding'
import {
  UpdatePropMapBindingForm,
  UpdatePropMapBindingFormProps,
} from './UpdatePropMapBindingForm'
import { useUpdatePropMapBindingForm } from './useUpdatePropMapBindingForm'

export const UpdatePropMapBindingModal = ({
  elementId,
  providePropCompletion,
  tree,
}: PropMapBindingProps) => {
  const {
    isLoading,
    reset,
    actionType,
    onSubmitError,
    onSubmitSuccess,
    onSubmit,
    model,
  } = useUpdatePropMapBindingForm(elementId)

  return (
    <FormModal
      okButtonProps={{
        loading: isLoading,
      }}
      okText="Update"
      onCancel={() => reset()}
      title={<span css={tw`font-semibold`}>Update prop binding</span>}
      visible={actionType === CRUDActionType.Update}
    >
      {({ submitRef }) => (
        <UpdatePropMapBindingForm
          elementId={elementId}
          model={model}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={onSubmitSuccess}
          providePropCompletion={providePropCompletion}
          submitRef={submitRef}
          tree={tree}
        />
      )}
    </FormModal>
  )
}
