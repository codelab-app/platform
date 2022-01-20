import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { Form, FormModal } from '@codelab/frontend/view/components'
import { DeletePageInput } from '@codelab/shared/abstract/codegen'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { deletePageSchema } from './deletePageSchema'
import { useDeletePageForm } from './useDeletePageForm'

export const DeletePageModal = () => {
  const {
    actionType,
    onSubmit,
    entity,
    onSubmitSuccess,
    onSubmitError,
    reset,
    isLoading,
    model,
  } = useDeletePageForm()

  return (
    <FormModal
      okButtonProps={{ loading: isLoading }}
      okText="Delete Page"
      onCancel={reset}
      visible={actionType === CRUDActionType.Delete}
    >
      {({ submitRef }) => (
        <Form<DeletePageInput>
          model={model}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={onSubmitSuccess}
          schema={deletePageSchema}
          submitRef={submitRef}
        >
          <h4>Are you sure you want to delete page "{entity?.name}"?</h4>
          <AutoFields omitFields={['pageId']} />
        </Form>
      )}
    </FormModal>
  )
}
