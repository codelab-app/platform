import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { Form, FormModal } from '@codelab/frontend/view/components'
import { CreateLambdaInput } from '@codelab/shared/abstract/codegen'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { useLambdaState } from '../../hooks'
import { createLambdaSchema } from './createLambdaSchema'
import { useCreateLambdaForm } from './useCreateLambdaForm'

export const CreateLambdaModal = () => {
  const {
    onSubmit,
    actionType,
    reset,
    isLoading,
    onSubmitSuccess,
    onSubmitError,
    model,
  } = useCreateLambdaForm()

  return (
    <FormModal
      okButtonProps={{ loading: isLoading }}
      okText="Create Lambda"
      onCancel={reset}
      visible={actionType === CRUDActionType.Create}
    >
      {({ submitRef }) => (
        <Form<CreateLambdaInput>
          model={model}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={onSubmitSuccess}
          schema={createLambdaSchema}
          submitRef={submitRef}
        >
          <AutoFields />
        </Form>
      )}
    </FormModal>
  )
}
