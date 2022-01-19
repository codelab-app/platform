import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { FormModal } from '@codelab/frontend/view/components'
import React from 'react'
import tw from 'twin.macro'
import { usePropMapBindingState } from '../../../hooks'
import {
  CreatePropMapBindingForm,
  PropMapBindingProps,
} from './CreatePropMapBindingForm'
import { useCreatePropMapBindingForm } from './useCreatePropMapBindingForm'

export const CreatePropMapBindingModal = (props: PropMapBindingProps) => {
  const {
    onSubmit,
    actionType,
    onSubmitSuccess,
    onSubmitError,
    isLoading,
    reset,
  } = useCreatePropMapBindingForm()

  return (
    <FormModal
      okButtonProps={{
        loading: isLoading,
      }}
      okText="Create"
      onCancel={() => reset()}
      title={<span css={tw`font-semibold`}>Create prop binding</span>}
      visible={actionType === CRUDActionType.Create}
    >
      {({ submitRef }) => (
        <CreatePropMapBindingForm
          elementId={props.elementId}
          model={{}}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={onSubmitSuccess}
          providePropCompletion={props.providePropCompletion}
          submitRef={submitRef}
          tree={props.tree}
        />
      )}
    </FormModal>
  )
}
