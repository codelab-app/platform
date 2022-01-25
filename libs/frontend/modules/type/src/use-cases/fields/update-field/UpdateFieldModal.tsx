import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { Form, FormModal } from '@codelab/frontend/view/components'
import React from 'react'
import tw from 'twin.macro'
import { AutoFields } from 'uniforms-antd'
import { useFieldState } from '../../../hooks'
import { TypeSelect } from '../../../shared'
import { CreateFieldInput, createFieldSchema } from '../create-field'
import {
  useUpdateFieldForm,
  UseUpdateFieldFormInput,
} from './useUpdateFieldForm'

export type UpdateFieldModalProps = UseUpdateFieldFormInput

export const UpdateFieldModal = ({ interfaceId }: UpdateFieldModalProps) => {
  const { actionType } = useFieldState()

  const { onSubmit, model, onSubmitSuccess, onSubmitError, isLoading, reset } =
    useUpdateFieldForm({ interfaceId })

  return (
    <FormModal
      className="update-field-modal"
      okButtonProps={{
        loading: isLoading,
      }}
      okText="Update"
      onCancel={() => reset()}
      title={<span css={tw`font-semibold`}>Update field</span>}
      visible={actionType === CRUDActionType.Update}
    >
      {({ submitRef }) => (
        <Form<CreateFieldInput>
          model={model}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={onSubmitSuccess}
          schema={createFieldSchema}
          submitRef={submitRef}
        >
          <AutoFields fields={['key', 'name', 'description']} />
          <TypeSelect label="Type" name="typeId" />
        </Form>
      )}
    </FormModal>
  )
}
