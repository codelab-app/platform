import {
  refetchGetTypesQuery,
  useCreateTypeMutation,
} from '@codelab/codegen/graphql'
import {
  createNotificationHandler,
  DisplayIfField,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useMutationCrudForm,
} from '@codelab/frontend/shared'
import React from 'react'
import { AutoField, AutoFields } from 'uniforms-antd'
import { TypeKind, TypeSelect } from '../../shared'
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
  } = useMutationCrudForm({
    mutationOptions: { refetchQueries: [refetchGetTypesQuery()] },
    useMutationFunction: useCreateTypeMutation,
    mapVariables: (submitData: CreateTypeSchema) => ({
      input: mapCreateTypeSchemaToTypeInput(submitData.kind, submitData),
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

      <DisplayIfKind kind={TypeKind.Simple}>
        <AutoField name={'primitiveType'} />
      </DisplayIfKind>

      <DisplayIfKind kind={TypeKind.Enum}>
        <AutoField name={'allowedValues'} />
      </DisplayIfKind>

      <DisplayIfKind kind={TypeKind.Array}>
        <TypeSelect name={'arrayItemTypeId'} label="Array item type" />
      </DisplayIfKind>
    </FormUniforms>
  )
}
