import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { DeleteUseCaseFormWithRef } from '@codelab/frontend/abstract/types'
import { Form, FormModal } from '@codelab/frontend/view/components'
import { DeleteElementInput } from '@codelab/shared/abstract/codegen'
import React from 'react'
import tw from 'twin.macro'
import { AutoFields } from 'uniforms-antd'
import { useElementDispatch, useElementState } from '../../../hooks'
import { deleteElementSchema } from './deleteElementSchema'
import { useDeleteElementForm } from './useDeleteElementForm'

export const DeleteElementModal = () => {
  const {
    isLoading,
    actionType,
    reset,
    onSubmit,
    entity,
    onSubmitError,
    onSubmitSuccess,
    model,
  } = useDeleteElementForm()

  return (
    <FormModal
      okButtonProps={{
        loading: isLoading,
      }}
      okText="Delete"
      onCancel={() => reset()}
      title={<span css={tw`font-semibold`}>Delete element</span>}
      visible={actionType === CRUDActionType.Delete}
    >
      {({ submitRef }) => (
        <Form<DeleteElementInput>
          model={model}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={onSubmitSuccess}
          schema={deleteElementSchema}
          submitRef={submitRef}
        >
          <h4>
            Are you sure you want to delete
            {entity?.name ? `the element "${entity?.name}"` : 'that element'}?
          </h4>
          <AutoFields />
        </Form>
      )}
    </FormModal>
  )
}
