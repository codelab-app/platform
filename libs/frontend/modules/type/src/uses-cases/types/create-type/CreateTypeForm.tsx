import { createNotificationHandler } from '@codelab/frontend/shared/utils'
import {
  DisplayIfField,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useCrudModalMutationForm,
} from '@codelab/frontend/view/components'
import { TypeKind } from '@codelab/shared/abstract/core'
import React from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { TypeSelect } from '../../../shared'
import { createNonUnionTypeOptionsForTypeSelect } from '../../../shared/createNonUnionTypeOptionsForTypeSelect'
import { useCreateTypeMutation } from '../typeEndpoints'
import {
  CreateTypeSchema,
  createTypeSchema,
  mapCreateTypeSchemaToTypeInput,
} from './createTypeSchema'

export const DisplayIfKind = ({
  kind,
  children,
}: React.PropsWithChildren<{ kind: TypeKind }>) => (
  <DisplayIfField<CreateTypeSchema> condition={(c) => c.model.kind === kind}>
    {children}
  </DisplayIfField>
)

export const CreateTypeForm = (
  props: UniFormUseCaseProps<CreateTypeSchema>,
) => {
  const {
    handleSubmit,
    crudModal: { reset },
  } = useCrudModalMutationForm({
    useMutationFunction: useCreateTypeMutation,
    mapVariables: (submitData: CreateTypeSchema) => ({
      input: mapCreateTypeSchemaToTypeInput(submitData),
    }),
    entityType: EntityType.Type,
  })

  return (
    <FormUniforms<CreateTypeSchema>
      onSubmit={handleSubmit}
      schema={createTypeSchema}
      onSubmitError={createNotificationHandler({
        title: 'Error while creating type',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <AutoFields fields={['name', 'kind']} />
      <DisplayIfKind kind={TypeKind.PrimitiveType}>
        <AutoField name={'primitiveKind'} />
      </DisplayIfKind>
      <DisplayIfKind kind={TypeKind.UnionType}>
        <AutoField
          createTypeOptions={createNonUnionTypeOptionsForTypeSelect}
          name={'typeIdsOfUnionType'}
        />
      </DisplayIfKind>
      {/* <ListField name="unionTypes" />; */}
      <DisplayIfKind kind={TypeKind.EnumType}>
        <AutoField name={'allowedValues'} />
      </DisplayIfKind>
      <DisplayIfKind kind={TypeKind.ArrayType}>
        <TypeSelect name={'arrayItemTypeId'} label="Array item type" />
      </DisplayIfKind>
      <DisplayIfKind kind={TypeKind.ElementType}>
        <AutoField name={'elementKind'} label="Element kind" />
      </DisplayIfKind>
    </FormUniforms>
  )
}
