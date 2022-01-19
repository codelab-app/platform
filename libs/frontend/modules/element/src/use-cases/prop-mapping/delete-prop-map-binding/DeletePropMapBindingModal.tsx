import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { FormModal } from '@codelab/frontend/view/components'
import React from 'react'
import tw from 'twin.macro'
import { usePropMapBindingState } from '../../../hooks'
import { DeletePropMapBindingForm, ElementId } from './DeletePropMapBindingForm'
import { useDeletePropMapBindingForm } from './useDeletePropMapBindingForm'

export const DeletePropMapBindingModal = (props: ElementId) => {
  const {
    onSubmit,
    actionType,
    onSubmitError,
    entity,
    onSubmitSuccess,
    isLoading,
    reset,
  } = useDeletePropMapBindingForm(props.elementId)

  return (
    <FormModal
      okButtonProps={{
        loading: isLoading,
      }}
      okText="Delete"
      onCancel={() => reset()}
      title={<span css={tw`font-semibold`}>Delete prop binding</span>}
      visible={actionType === CRUDActionType.Delete}
    >
      {({ submitRef }) => (
        <DeletePropMapBindingForm
          entity={entity}
          model={{}}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={onSubmitSuccess}
          submitRef={submitRef}
        />
      )}
    </FormModal>
  )
}
