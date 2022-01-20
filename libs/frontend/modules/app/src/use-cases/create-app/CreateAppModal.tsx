import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { Form, FormModal } from '@codelab/frontend/view/components'
import { CreateAppInput } from '@codelab/shared/abstract/codegen'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { useAppState } from '../../hooks'
import { createAppSchema } from './createAppSchema'
import { useCreateAppForm } from './useCreateAppForm'

export const CreateAppModal = () => {
  const {
    onSubmit,
    onSubmitSuccess,
    onSubmitError,
    reset,
    isLoading,
    actionType,
  } = useCreateAppForm()

  return (
    <FormModal
      okButtonProps={{ loading: isLoading }}
      okText="Create App"
      onCancel={() => reset()}
      visible={actionType === CRUDActionType.Create}
    >
      {({ submitRef }) => (
        <Form<CreateAppInput>
          model={{}}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={onSubmitSuccess}
          schema={createAppSchema}
          submitRef={submitRef}
        >
          <AutoFields />
        </Form>
      )}
    </FormModal>
  )
}
