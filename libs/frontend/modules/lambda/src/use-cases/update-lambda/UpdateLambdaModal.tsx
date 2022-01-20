import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { Form, FormModal } from '@codelab/frontend/view/components'
import { UpdateLambdaInput } from '@codelab/shared/abstract/codegen'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { useLambdaState } from '../../hooks'
import { updateLambdaSchema } from './updateLambdaSchema'
import { useUpdateLambdaForm } from './useUpdateLambdaForm'

export const UpdateLambdaModal = () => {
  const {
    onSubmit,
    actionType,
    onSubmitSuccess,
    onSubmitError,
    isLoading,
    reset,
    model,
  } = useUpdateLambdaForm()

  return (
    <FormModal
      okButtonProps={{ loading: isLoading }}
      okText="Update Lambda"
      onCancel={reset}
      visible={actionType === CRUDActionType.Update}
    >
      {({ submitRef }) => (
        <Form<UpdateLambdaInput>
          model={model}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={onSubmitSuccess}
          schema={updateLambdaSchema}
          submitRef={submitRef}
        >
          <AutoFields />
        </Form>
      )}
    </FormModal>
  )
}
