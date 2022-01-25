import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { Form, FormModal } from '@codelab/frontend/view/components'
import React from 'react'
import tw from 'twin.macro'
import { AutoFields } from 'uniforms-antd'
import { TypeSelect } from '../../../shared'
import { CreateFieldInput, createFieldSchema } from './createFieldSchema'
import { useCreateFieldForm } from './useCreateFieldForm'

export const CreateFieldModal = () => {
  const {
    isLoading,
    actionType,
    onSubmitSuccess,
    reset,
    onSubmitError,
    onSubmit,
  } = useCreateFieldForm()

  return (
    <FormModal
      className="create-field-modal"
      okButtonProps={{
        loading: isLoading,
      }}
      okText="Create"
      onCancel={() => reset()}
      title={<span css={tw`font-semibold`}>Create field</span>}
      visible={actionType === CRUDActionType.Create}
    >
      {({ submitRef }) => (
        <Form<CreateFieldInput>
          model={{}}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={onSubmitSuccess}
          schema={createFieldSchema}
          submitRef={submitRef}
        >
          <AutoFields omitFields={['existingTypeId', 'interfaceId']} />
          <TypeSelect label="Type" name="existingTypeId" />
        </Form>
      )}
    </FormModal>
  )
}
