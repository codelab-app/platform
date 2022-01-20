import { CRUDActionType } from '@codelab/frontend/abstract/core'
import { Form, FormModal } from '@codelab/frontend/view/components'
import { TypeKind } from '@codelab/shared/abstract/core'
import React from 'react'
import tw from 'twin.macro'
import { AutoField, AutoFields } from 'uniforms-antd'
import { useTypeDispatch, useTypeState } from '../../../hooks'
import { TypeSelect } from '../../../shared'
import { createNonUnionTypeOptionsForTypeSelect } from '../../../shared/createNonUnionTypeOptionsForTypeSelect'
import { CreateTypeSchema, createTypeSchema } from './createTypeSchema'
import { DisplayIfKind } from './DisplayIfKind'
import { useCreateTypeForm } from './useCreateTypeForm'

export const CreateTypeModal = () => {
  const {
    isLoading,
    onSubmit,
    reset,
    actionType,
    onSubmitSuccess,
    onSubmitError,
  } = useCreateTypeForm()

  return (
    <FormModal
      className="create-type-modal"
      okButtonProps={{
        loading: isLoading,
      }}
      okText="Create"
      onCancel={() => reset()}
      title={<span css={tw`font-semibold`}>Create type</span>}
      visible={actionType === CRUDActionType.Create}
    >
      {({ submitRef }) => (
        <Form<CreateTypeSchema>
          model={{}}
          onSubmit={onSubmit}
          onSubmitError={onSubmitError}
          onSubmitSuccess={onSubmitSuccess}
          schema={createTypeSchema}
          submitRef={submitRef}
        >
          <AutoFields fields={['name', 'kind']} />
          <DisplayIfKind kind={TypeKind.PrimitiveType}>
            <AutoField name="primitiveKind" />
          </DisplayIfKind>
          <DisplayIfKind kind={TypeKind.UnionType}>
            <AutoField
              createTypeOptions={createNonUnionTypeOptionsForTypeSelect}
              name="typeIdsOfUnionType"
            />
          </DisplayIfKind>
          {/* <ListField name="unionTypes" />; */}
          <DisplayIfKind kind={TypeKind.EnumType}>
            <AutoField name="allowedValues" />
          </DisplayIfKind>
          <DisplayIfKind kind={TypeKind.ArrayType}>
            <TypeSelect label="Array item type" name="arrayItemTypeId" />
          </DisplayIfKind>
          <DisplayIfKind kind={TypeKind.ElementType}>
            <AutoField label="Element kind" name="elementKind" />
          </DisplayIfKind>
          <DisplayIfKind kind={TypeKind.MonacoType}>
            <AutoField label="Language" name="language" />
          </DisplayIfKind>
        </Form>
      )}
    </FormModal>
  )
}
