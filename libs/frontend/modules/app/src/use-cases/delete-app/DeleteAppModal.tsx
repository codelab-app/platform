import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { Form, FormModal } from '@codelab/frontend/view/components'
import { DeleteAppInput } from '@codelab/shared/abstract/codegen'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { deleteAppSchema } from './deleteAppSchema'
import { useDeleteAppForm } from './useDeleteAppForm'

export const DeleteAppModal = () => {
  const {
    model,
    onSubmit,
    entity,
    onSubmitSuccess,
    onSubmitError,
    reset,
    isLoading,
    actionType,
  } = useDeleteAppForm()

  return (
    <FormModal
      okButtonProps={{ loading: isLoading }}
      okText="Delete App"
      onCancel={reset}
      visible={actionType === CRUDActionType.Delete}
    >
      {({ submitRef }) => {
        return (
          <Form<DeleteAppInput>
            model={model}
            onSubmit={onSubmit}
            onSubmitError={onSubmitError}
            onSubmitSuccess={onSubmitSuccess}
            schema={deleteAppSchema}
            submitRef={submitRef}
          >
            <h4>Are you sure you want to delete app "{entity?.name}"?</h4>
            <AutoFields omitFields={['appId']} />
          </Form>
        )
      }}
    </FormModal>
  )
}
