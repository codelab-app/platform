import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { Form, FormModal } from '@codelab/frontend/view/components'
import { DeleteLambdaInput } from '@codelab/shared/abstract/codegen'
import React from 'react'
import { deleteLambdaSchema } from './deleteLambdaSchema'
import { useDeleteLambdaForm } from './useDeleteLambdaForm'

export const DeleteLambdaModal = () => {
  const {
    onSubmitSuccess,
    onSubmit,
    actionType,
    onSubmitError,
    reset,
    isLoading,
    model,
    entity,
  } = useDeleteLambdaForm()

  return (
    <FormModal
      okButtonProps={{ loading: isLoading }}
      okText="Delete Lambda"
      onCancel={reset}
      visible={actionType === CRUDActionType.Delete}
    >
      {({ submitRef }) => (
        <Form<DeleteLambdaInput>
          model={model}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={onSubmitSuccess}
          schema={deleteLambdaSchema}
          submitRef={submitRef}
        >
          <h4>Are you sure you want to delete lambda "{entity}"?</h4>
        </Form>
      )}
    </FormModal>
  )
}
