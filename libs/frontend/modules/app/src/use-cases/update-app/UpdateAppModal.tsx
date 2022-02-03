import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { Form, FormModal } from '@codelab/frontend/view/components'
import { CreateAppInput } from '@codelab/shared/abstract/codegen'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { useAppState } from '../../hooks'
import { updateAppSchema } from './updateAppSchema'
import { useUpdateAppForm } from './useUpdateAppForm'

export const UpdateAppModal = () => {
  const {
    onSubmit,
    onSubmitSuccess,
    actionType,
    model,
    onSubmitError,
    isLoading,
    reset,
  } = useUpdateAppForm()

  return (
    <FormModal
      okButtonProps={{ loading: isLoading }}
      okText="Update App"
      onCancel={() => reset()}
      visible={actionType === CRUDActionType.Update}
    >
      {({ submitRef }) => (
        <Form<CreateAppInput>
          model={model}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={onSubmitSuccess}
          schema={updateAppSchema}
          submitRef={submitRef}
        >
          <AutoFields />
        </Form>
      )}
    </FormModal>
  )
}
