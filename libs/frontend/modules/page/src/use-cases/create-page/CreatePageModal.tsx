import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { Form, FormModal } from '@codelab/frontend/view/components'
import { CreatePageInput } from '@codelab/shared/abstract/codegen'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { usePageState } from '../../hooks'
import { createPageSchema } from './createPageSchema'
import { useCreatePageForm } from './useCreatePageForm'

export const CreatePageModal = () => {
  const {
    onSubmit,
    onSubmitSuccess,
    actionType,
    onSubmitError,
    reset,
    isLoading,
  } = useCreatePageForm()

  return (
    <FormModal
      okButtonProps={{ loading: isLoading }}
      okText="Create Page"
      onCancel={() => reset()}
      visible={actionType === CRUDActionType.Create}
    >
      {({ submitRef }) => (
        <Form<CreatePageInput>
          model={{}}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={onSubmitSuccess}
          schema={createPageSchema}
          submitRef={submitRef}
        >
          <AutoFields omitFields={['appId']} />
        </Form>
      )}
    </FormModal>
  )
}
