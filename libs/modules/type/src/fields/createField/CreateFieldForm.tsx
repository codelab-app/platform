import {
  createNotificationHandler,
  DisplayIfField,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useMutationCrudForm,
} from '@codelab/frontend/shared'
import {
  refetchGetInterfaceQuery,
  Unit,
  useCreateFieldMutation,
  useGetInterfacesQuery,
} from '@codelab/graphql'
import React, { useContext } from 'react'
import { AutoField, AutoFields, ListField, SelectField } from 'uniforms-antd'
import { InterfaceContext } from '../../interfaces'
import {
  createFieldSchema,
  CreateFieldSchemaType,
  TypeVariant,
} from './createFieldSchema'

export const CreateFieldForm = (
  props: UniFormUseCaseProps<CreateFieldSchemaType>,
) => {
  const {
    interface: { id: interfaceId },
  } = useContext(InterfaceContext)

  const { data: allInterfaces } = useGetInterfacesQuery()

  const {
    handleSubmit,
    crudModal: { reset },
  } = useMutationCrudForm({
    mutationOptions: {
      refetchQueries: [refetchGetInterfaceQuery({ input: { interfaceId } })],
    },
    useMutationFunction: useCreateFieldMutation,
    mapVariables: (submitData: CreateFieldSchemaType) => ({
      input: { ...submitData },
    }),
    entityType: EntityType.Field,
  })

  const interfacesOptions =
    allInterfaces?.getInterfaces?.map((i) => ({
      label: i.name,
      value: i.id,
    })) || []

  return (
    <FormUniforms<CreateFieldSchemaType>
      onSubmit={handleSubmit}
      schema={createFieldSchema as any}
      onSubmitError={createNotificationHandler({
        title: 'Error while creating fields',
      })}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <AutoFields
        omitFields={['allowedValues', 'interfaceId', 'allowedUnits']}
      />

      <DisplayIfField<CreateFieldSchemaType>
        condition={(context) => context.model.type === TypeVariant.Enum}
      >
        <ListField name="allowedValues" />
      </DisplayIfField>

      <DisplayIfField<CreateFieldSchemaType>
        condition={(context) => context.model.type === TypeVariant.Interface}
      >
        <SelectField name="interfaceId" options={interfacesOptions} />
      </DisplayIfField>

      <DisplayIfField<CreateFieldSchemaType>
        condition={(context) => context.model.type === TypeVariant.Unit}
      >
        <SelectField name="allowedUnits" />
      </DisplayIfField>
    </FormUniforms>
  )
}
