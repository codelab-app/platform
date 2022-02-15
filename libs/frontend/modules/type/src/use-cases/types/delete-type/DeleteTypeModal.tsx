import { CRUDActionType } from '@codelab/frontend/abstract/core'
import {
  emptyJsonSchema,
  EmptyJsonSchemaType,
  Form,
  FormModal,
} from '@codelab/frontend/view/components'
import React from 'react'
import tw from 'twin.macro'
import { useDeleteTypeForm } from './useDeleteTypeForm'

export const DeleteTypeModal = () => {
  const {
    onSubmit,
    entity,
    onSubmitSuccess,
    onSubmitError,
    reset,
    model,
    isLoading,
    actionType,
  } = useDeleteTypeForm()

  return (
    <FormModal
      okButtonProps={{
        loading: isLoading,
      }}
      okText="Delete"
      onCancel={() => reset()}
      title={<span css={tw`font-semibold`}>Delete type</span>}
      visible={actionType === CRUDActionType.Delete}
    >
      {({ submitRef }) => (
        <Form<EmptyJsonSchemaType>
          model={model}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={onSubmitSuccess}
          schema={emptyJsonSchema}
          submitRef={submitRef}
        >
          <h4>Are you sure you want to delete type "{entity?.name}"?</h4>
        </Form>
      )}
    </FormModal>
  )
}
