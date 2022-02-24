import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { Form, FormModal } from '@codelab/frontend/view/components'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { deleteComponentSchema } from './deleteComponentSchema'
import { DeleteComponentInput } from './types'
import { useDeleteComponentForm } from './useDeleteComponentForm'

export const DeleteComponentModal = () => {
  const {
    actionType,
    onSubmit,
    entity,
    onSubmitSuccess,
    onSubmitError,
    reset,
    isLoading,
    model,
  } = useDeleteComponentForm()

  return (
    <FormModal
      okButtonProps={{ loading: isLoading }}
      okText="Delete Component"
      onCancel={reset}
      visible={actionType === CRUDActionType.Delete}
    >
      {({ submitRef }) => (
        <Form<DeleteComponentInput>
          model={model}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={onSubmitSuccess}
          schema={deleteComponentSchema}
          submitRef={submitRef}
        >
          <h4>Are you sure you want to delete component "{entity?.name}"?</h4>
          <AutoFields omitFields={['componentId']} />
        </Form>
      )}
    </FormModal>
  )
}
