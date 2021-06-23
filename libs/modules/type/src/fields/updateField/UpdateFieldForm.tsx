import {
  refetchGetInterfaceQuery,
  UpdateFieldMutation,
  UpdateFieldMutationVariables,
  useGetInterfacesQuery,
  useUpdateFieldMutation,
} from '@codelab/codegen/graphql'
import {
  createNotificationHandler,
  DisplayIfField,
  EntityType,
  FormUniforms,
  UniFormUseCaseProps,
  useMutationCrudForm,
} from '@codelab/frontend/shared'
import React, { useContext, useRef } from 'react'
import { AutoFields } from 'uniforms-antd'
import { InterfaceContext } from '../../interfaces'
import { TypeFields, TypeVariant } from '../createField'
import { mapFieldToFormModel } from './mapFieldToFormModel'
import { mapFormDataToInput } from './mapFormDataToInput'
import { updateFieldSchema, UpdateFieldSchemaType } from './updateFieldSchema'

export const UpdateFieldForm = (
  props: UniFormUseCaseProps<UpdateFieldSchemaType>,
) => {
  const {
    interface: { id: interfaceId },
    interfaceTypesById,
  } = useContext(InterfaceContext)

  const { data: allInterfaces } = useGetInterfacesQuery()

  const {
    handleSubmit,
    crudModal: {
      reset,
      state: { metadata },
    },
  } = useMutationCrudForm<
    UpdateFieldSchemaType,
    UpdateFieldMutation,
    UpdateFieldMutationVariables
  >({
    mutationOptions: {
      refetchQueries: [refetchGetInterfaceQuery({ input: { interfaceId } })],
    },
    useMutationFunction: useUpdateFieldMutation,
    mapVariables: (formData, crudState) => ({
      input: mapFormDataToInput(formData, crudState.updateId, interfaceId),
    }),
    entityType: EntityType.Field,
  })

  const interfacesOptions =
    allInterfaces?.getInterfaces?.map((i) => ({
      label: i.name,
      value: i.id,
    })) || []

  return (
    <FormUniforms<UpdateFieldSchemaType>
      onSubmit={handleSubmit}
      schema={updateFieldSchema as any}
      onSubmitError={createNotificationHandler({
        title: 'Error while creating field',
      })}
      model={mapFieldToFormModel(metadata, interfaceTypesById)}
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
