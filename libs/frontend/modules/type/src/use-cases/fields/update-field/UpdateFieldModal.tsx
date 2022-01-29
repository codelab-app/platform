import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { Form, FormModal } from '@codelab/frontend/view/components'
import React from 'react'
import tw from 'twin.macro'
import { AutoFields } from 'uniforms-antd'
import { TypeSelect } from '../../../shared'
import { CreateFieldInput, createFieldSchema } from '../create-field'
import { useUpdateFieldForm } from './useUpdateFieldForm'

export type UpdateFieldModalProps = {
  interfaceId: string
}

export const UpdateFieldModal = ({ interfaceId }: UpdateFieldModalProps) => {
  const {
    onSubmit,
    model,
    onSubmitSuccess,
    onSubmitError,
    actionType,
    isLoading,
    reset,
  } = useUpdateFieldForm(interfaceId)

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
          <TypeSelect label="Type" name="existingTypeId" />
        </Form>
      )}
    </FormModal>
  )
}
