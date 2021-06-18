import {
  createNotificationHandler,
  DisplayIfField,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useMutationCrudForm,
} from '@codelab/frontend/shared'
import {
  CreateFieldMutation,
  CreateFieldMutationVariables,
  refetchGetInterfaceQuery,
  Unit as UnitEnum,
  useCreateFieldMutation,
  useGetInterfacesQuery,
} from '@codelab/graphql'
import React, { useContext } from 'react'
import { AutoFields } from 'uniforms-antd'
import { InterfaceContext } from '../../interfaces'
import {
  createFieldSchema,
  CreateFieldSchemaObject,
  TypeVariant,
} from './createFieldSchema'
import { mapFormDataToInput } from './mapFormDataToInput'
import { TypeFields } from './TypeFIelds'

const defaultUnitOptions = Object.values(UnitEnum)

export const CreateFieldForm = (
  props: UniFormUseCaseProps<CreateFieldSchemaObject>,
) => {
  const {
    interface: { id: interfaceId },
  } = useContext(InterfaceContext)

  const { data: allInterfaces } = useGetInterfacesQuery()

  const {
    handleSubmit,
    crudModal: { reset },
  } = useMutationCrudForm<
    CreateFieldSchemaObject,
    CreateFieldMutation,
    CreateFieldMutationVariables
  >({
    mutationOptions: {
      refetchQueries: [refetchGetInterfaceQuery({ input: { interfaceId } })],
    },
    useMutationFunction: useCreateFieldMutation,
    mapVariables: (formData) => ({
      input: mapFormDataToInput(formData, interfaceId),
    }),
    entityType: EntityType.Field,
  })

  const interfacesOptions =
    allInterfaces?.getInterfaces?.map((i) => ({
      label: i.name,
      value: i.id,
    })) || []

  return (
    <FormUniforms<CreateFieldSchemaObject>
      onSubmit={handleSubmit}
      schema={createFieldSchema as any}
      onSubmitError={createNotificationHandler({
        title: 'Error while creating fields',
      })}
      model={{
        //Default to all units
        allowedUnits: defaultUnitOptions,
        arrayType: {
          allowedUnits: defaultUnitOptions,
        },
      }}
      onSubmitSuccess={() => reset()}
      {...props}
    >
      <AutoFields fields={['key', 'name', 'description']} />
      {/* AutoFields doesn't work well here for some reason, it always displays the nested arrayType.* fields, even if omitted */}
      <TypeFields
        interfacesOptions={interfacesOptions}
        extractTypeFromContext={(c) => c.model.type as any}
      />

      <DisplayIfField
        condition={(c) => (c.model as any).type === TypeVariant.Array}
      >
        <TypeFields
          typeFieldProps={{ label: 'Array item type' }}
          interfacesOptions={interfacesOptions}
          namePrefix="arrayType."
          extractTypeFromContext={(c) => c.model.arrayType?.type as any}
        />
      </DisplayIfField>
    </FormUniforms>
  )
}
