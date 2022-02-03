import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { Form, FormModal } from '@codelab/frontend/view/components'
import React from 'react'
import { AutoFields } from 'uniforms-antd'
import { CreateAtomInput } from '../create-atom'
import { updateAtomSchema } from './updateAtomSchema'
import { useUpdateAtomForm } from './useUpdateAtomForm'

export const UpdateAtomModal = () => {
  const {
    onSubmit,
    actionType,
    onSubmitSuccess,
    onSubmitError,
    model,
    isLoading,
    reset,
  } = useUpdateAtomForm()

  return (
    <FormModal
      okButtonProps={{ loading: isLoading }}
      okText="Update Atom"
      onCancel={reset}
      visible={actionType === CRUDActionType.Update}
    >
      {({ submitRef }) => (
        <Form<CreateAtomInput>
          model={model}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={onSubmitSuccess}
          schema={updateAtomSchema}
          submitRef={submitRef}
        >
          <AutoFields omitFields={['api']} />
        </Form>
      )}
    </FormModal>
  )
}
